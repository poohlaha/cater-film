//! 发送请求

use crate::error::Error;
use crate::prepare::{HttpResponse, HttpResponseData, HttpSendRequest};
use futures::future::join_all;
use serde_json::Value;
use std::collections::HashMap;
use log::info;
use tauri::async_runtime::spawn;

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
    pub(crate) async fn send_batch<R>(params: Vec<HttpSendRequest>) -> Result<Vec<HttpResponse>, String>
        where
            R: HttpResponseData,
    {
        if params.len() == 0 {
            return Err(Error::convert_string("params is empty !"));
        }

        Ok(Self::task(&params).await)
    }

    /// 执行异步任务
    pub(crate) async fn task(params: &Vec<HttpSendRequest>) -> Vec<HttpResponse> {
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
