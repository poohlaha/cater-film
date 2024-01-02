//! 发送请求

use crate::error::Error;
use crate::prepare::{HttpResponse, HttpResponseData, HttpSendRequest};
use futures::future::join_all;
use serde_json::Value;
use std::collections::HashMap;
use std::ffi::OsStr;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Arc;
use images_compressor::compressor::{Compressor, CompressorArgs};
use images_compressor::factor::Factor;
use log::info;
use request_http::download;
use request_http::download::DownloadOptions;
use tauri::async_runtime::spawn;
use crate::utils::Utils;

pub struct Request;

impl Request {
    /// 发送请求
    async fn send(param: HttpSendRequest) -> HttpResponse {
        let opts = request_http::options::Options {
            url: param.url.clone(),
            method: param.method.clone(),
            data: None,
            form: None,
            headers: Some(Self::get_headers(param.headers.clone())),
            timeout: None,
        };

        let res = request_http::client_send(opts, false).await;
        return match res {
            Ok(res) => {
                let mut response = Self::convert_response(res);
                response.name = param.name.clone();
                response
            }
            Err(err) => {
                let response = Self::get_error_response(&param.name, err.to_string().as_str());
                response
            }
        };
    }

    /// 批量发送请求
    pub(crate) async fn send_batch<R>(params: Vec<HttpSendRequest>, images_path: &PathBuf, tmp_path: &PathBuf) -> Result<Vec<HttpResponse>, String>
    where
        R: HttpResponseData,
    {
        if params.len() == 0 {
            return Err(Error::convert_string("params is empty !"));
        }

        Ok(Self::task(&params, images_path, tmp_path).await)
    }

    /// 执行异步任务
    pub(crate) async fn task(params: &Vec<HttpSendRequest>, images_path: &PathBuf, tmp_path: &PathBuf) -> Vec<HttpResponse> {
        let mut tasks = Vec::new();
        for param in params.clone() {
            tasks.push(spawn(async move { Self::send(param.clone()).await }));
        }

        let mut response_list: Vec<HttpResponse> = Vec::new();
        let results = join_all(tasks).await;
        for (i, result) in results.iter().enumerate() {
            if result.is_err() {
                let name = params.get(i).unwrap().name.as_str();
                let response = Self::get_error_response(name, result.as_ref().err().unwrap().to_string().as_str());
                response_list.push(response);
                continue;
            }

            if let Some(result) = result.as_ref().ok() {
                response_list.push(result.clone());
            }
        }

        // 解析 result, 下载图片，并进行压缩和截图保存
       // let result = Self::analysis_images(&mut response_list, images_path, tmp_path).await;
        // result
        response_list
    }

    /// 下载图片，并进行压缩和截图保存
    async fn analysis_images(response_list: &mut Vec<HttpResponse>, images_path: &PathBuf, tmp_path: &PathBuf) -> Vec<HttpResponse> {
        if response_list.is_empty() {
            return Vec::new();
        }

        let mut reset_data = || {
            let mut urls: Vec<String> = Vec::new();
            response_list.iter_mut().for_each(|response| {
                let data = response.body.get_mut("data");
                if let Some(data) = data {
                    Self::reset_pic(data, &mut urls, images_path);
                }
            });
            urls
        };

        let urls = reset_data();
        let _ = Self::handle_images(&urls, images_path, tmp_path).await;

        // 重新组装数据
        reset_data();
        response_list.to_vec()
    }

    fn reset_pic(data: &mut Value, urls: &mut Vec<String>, images_path: &PathBuf) {
        if let Value::Array(data) = data {
            data.iter_mut().for_each(|d| {
                Self::reset_pic(d, urls, images_path);
            });
        } else {
            if let Value::Object(res) = data {
                println!("res: {:#?}", res);
                let list = res.get_mut("vlist");
                if let Some(list) = list {
                    Self::reset_pic(list, urls, images_path);
                } else {
                    if let Some(pic) = res.get_mut("vod_pic") {
                        let url = pic.as_str();
                        info!("download url: {:#?}", url);
                        if let Some(url) = url {
                            // 判断图片是否存在
                            let filename = Path::new(url).file_name().unwrap_or(OsStr::new("")).to_string_lossy().to_string();
                            if !filename.is_empty() {
                                // 判断图片是否存在
                                let file_path = images_path.join(&filename);
                                if file_path.exists() {
                                    let base64_url = Utils::generate_image(file_path.to_string_lossy().to_string().as_str()).unwrap_or(String::from(url));
                                    pic["vod_pic"] = Value::from(base64_url);
                                } else {
                                    urls.push(url.to_string())
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /// 处理图片
    async fn handle_images(urls: &Vec<String>, images_path: &PathBuf, tmp_path: &PathBuf) -> Result<(), String> {
        if urls.is_empty() {
            return Err(Error::convert_string("image url is empty !").to_string());
        }

        let tmp_dir = tmp_path.to_string_lossy().to_string();
        // 批量下载
        let mut tasks = Vec::new();

        urls.iter().for_each(|url| {
            let url_clone = Arc::new(url.clone());
            let tmp_dir_clone = Arc::new(tmp_dir.clone());
            tasks.push(spawn(async move {
                let cloned_url = &*url_clone;
                let cloned_tmp_dir = &*tmp_dir_clone;
               let result = download(
                   DownloadOptions {
                       url: cloned_url.to_string(),
                       file_name: None,
                       timeout: Some(10),
                       output_dir: Some(cloned_tmp_dir.clone()),
                       overwrite: Some(true),
                   },
                   None
               ).await;

                if result.is_err() {
                    return Err(format!("{:#?}", result.err()));
                }

                Ok(result.unwrap())
            }));
        });

        let results = join_all(tasks).await;
        for (_, result) in results.iter().enumerate() {
            if result.is_err() {
                continue;
            }

            if let Some(result) = result.as_ref().ok() {
                if let Some(result) = result.as_ref().ok() {
                    if !result.success && !result.file_name.is_empty()  {
                        // 删除错误文件
                        let file_path = tmp_path.join(&result.file_name);
                        if file_path.exists() {
                            fs::remove_file(file_path).map_err(|err| Error::convert_string(&err.to_string()).to_string())?;
                        }
                    }
                }
            }
        }

        let factor = Factor {
            quality: 60.0,  // 品质: 0 - 100
            size_ratio: 0.6, // // 压缩比例: 0 - 1
        };

        // 压缩图片
         Compressor::new(CompressorArgs {
            factor: Some(factor),
            origin: tmp_dir.clone(),
            dest: tmp_dir.clone(),
            thread_count: None,
            image_size: 0,
        }).compress()?;

        // 移去图片到 image_path 目录
        fs::copy(tmp_path.clone(), images_path.clone()).map_err(|err| Error::convert_string(&err.to_string()).to_string())?;

        Ok(())
    }

    /// 获取 header 头
    fn get_headers(headers: HashMap<String, String>) -> Value {
        let mut map = serde_json::map::Map::new();
        for (key, value) in headers {
            map.insert(key, Value::String(value));
        }

        return Value::Object(map);
    }

    /// 处理返回
    fn convert_response(res: request_http::options::HttpResponse) -> HttpResponse {
        let mut response = HttpResponse::default();
        response.code = res.status_code;
        response.headers = res.headers;
        response.body = res.body;
        response.error = res.error;
        return response;
    }

    /// 获取错误的 response
    pub(crate) fn get_error_response(name: &str, err: &str) -> HttpResponse {
        let mut response = HttpResponse::default();
        response.code = 500;
        response.name = name.to_string();
        response.error = err.to_string();
        return response;
    }
}
