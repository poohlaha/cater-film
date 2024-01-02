//! 首页

use std::path::PathBuf;
use crate::config::{Conf, get_conf, Home as HomeConf};
use crate::error::Error;
use crate::prepare::{HttpResponse, HttpSendRequest, Prepare};
use crate::process::{Order, Process};
use async_trait::async_trait;
use log::error;
use tauri::AppHandle;

pub struct Home;

pub const NAMES: [&str; 8] = ["recommend", "dramaSeries", "movie", "cartoon", "variety", "children", "record", "search"];

#[async_trait]
impl Prepare<HttpResponse> for Home {
    async fn prepare(app: &AppHandle, _: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
        let conf = get_conf();
        if conf.is_none() {
            return Err(Error::convert_string("analyze `conf.toml` error !"));
        }

        if let Some(conf) = conf {
            let mut request = HttpSendRequest::default();
            request.name = order.name.to_string();

            let images_path = Process::get_image_dir(app)?;
            let tmp_dir = Process::get_tmp_dir(app)?;

            // recommend
            if let Some(name) = Self::get_name_by_index(0).ok() {
                if &order.name == name {
                    return Self::prepare_recommend(request, &conf.domain, &conf.home, &images_path, &tmp_dir).await;
                }
            }

            // 其他
            let method = String::from("GET");
            let url = Self::get_params_by_name(&order.name, &conf);
            if url.is_empty() {
                error!("error by empty url to query data !");
                return Ok(Vec::new());
            }

            return Self::prepare_normal(request, &conf.domain, order.clone(), &order.name, &method, &url, &images_path, &tmp_dir).await;
        }

        return Ok(Vec::new());
    }
}

impl Home {
    async fn prepare_request(
        request: HttpSendRequest,
        domain: &str,
        urls: Vec<(HttpSendRequest, Option<Order>)>,
        images_path: &PathBuf,
        tmp_path: &PathBuf
    ) -> Result<Vec<HttpResponse>, String> {
        let mut requests: Vec<HttpSendRequest> = Vec::new();
        urls.iter().for_each(|(req, order)| {
            let mut request = request.clone();
            request.name = req.name.clone();
            let mut param = String::new();
            if let Some(order) = order {
                param = Self::prepare_sort(order);
            }

            if req.url.starts_with("http://") || req.url.starts_with("https://") {
                request.url = Self::prepare_url("", &req.url, &param);
            } else {
                request.url = Self::prepare_url(domain, &req.url, &param);
            }

            request.method = req.method.clone();
            requests.push(request)
        });

        Self::send(requests, images_path, tmp_path).await
    }

    /// 推荐列表
    async fn prepare_recommend(request: HttpSendRequest, domain: &str, conf: &HomeConf, images_path: &PathBuf, tmp_path: &PathBuf) -> Result<Vec<HttpResponse>, String> {
        let mut banner_request = request.clone();
        banner_request.method = Some("GET".to_string());
        banner_request.url = conf.banner_url.clone();
        banner_request.name = "banner".to_string();

        // recommend
        let mut recommend_request = request.clone();
        recommend_request.method = Some("GET".to_string());
        recommend_request.url = conf.recommend_url.clone();
        recommend_request.name = "recommend".to_string();

        let mut list: Vec<(HttpSendRequest, Option<Order>)> = Vec::new();
        list.push((banner_request, None));
        list.push((recommend_request, None));

        // 发送请求
        Self::prepare_request(request, &domain, list, images_path, tmp_path).await
    }

    /// 发送数据
    async fn prepare_normal(
        request: HttpSendRequest,
        domain: &str,
        order: Order,
        name: &str,
        method: &str,
        url: &str,
        images_path: &PathBuf,
        tmp_path: &PathBuf
    ) -> Result<Vec<HttpResponse>, String> {
        let mut http_request = request.clone();
        http_request.name = name.to_string();
        http_request.method = Some(method.to_string());
        http_request.url = url.to_string();
        Self::prepare_request(request, domain, vec![(http_request, Some(order))], images_path, tmp_path).await
    }

    /// 获取 URL
    fn prepare_url(domain: &str, url: &str, param: &str) -> String {
        let mut request_url = String::from(domain);
        request_url.push_str(url);
        if !param.is_empty() {
            request_url.push_str(&format!("&{}", param));
        }
        return request_url;
    }

    /// 根据索引获取名字
    fn get_name_by_index<'a>(index: usize) -> Result<&'a str, String> {
        if let Some(name) = NAMES.get(index) {
            return Ok(name.as_ref());
        }

        Err(Error::convert_string("cant not find name by index: index"))
    }

    /// 查找名字是否存在, 并获取 url 等
    fn get_params_by_name(name: &str, conf: &Conf) -> String {
        let mut index = -1;
        for n in NAMES {
            if n == name {
                index += 1;
            }
        }

        // 找到名字, 大写转驼峰
        if index != -1 {
            return Self::find_url_by_name(name, conf);
        }

        error!("error by name: `{}` to query data !", &name);
        return String::new();
    }

    pub fn find_url_by_name(name: &str, conf: &Conf) -> String {
        let home_conf = &conf.home;
        let search_conf = &conf.search;

        //dramaSeries
        if let Some(n) = Self::get_name_by_index(1).ok() {
            if name == n {
                return home_conf.drama_series_url.clone();
            }
        }

        // movie
        if let Some(n) = Self::get_name_by_index(2).ok() {
            if name == n {
                return home_conf.movie_url.clone();
            }
        }

        // cartoon
        if let Some(n) = Self::get_name_by_index(3).ok() {
            if name == n {
                return home_conf.cartoon_url.clone();
            }
        }

        // variety
        if let Some(n) = Self::get_name_by_index(4).ok() {
            if name == n {
                return home_conf.variety_url.clone();
            }
        }

        // children
        if let Some(n) = Self::get_name_by_index(5).ok() {
            if name == n {
                return home_conf.children_url.clone();
            }
        }

        // record
        if let Some(n) = Self::get_name_by_index(6).ok() {
            if name == n {
                return home_conf.record_url.clone();
            }
        }

        // search
        if let Some(n) = Self::get_name_by_index(7).ok() {
            if name == n {
                return search_conf.url.clone();
            }
        }

        return String::new();
    }

    /// 准备参数
    fn prepare_sort(order: &Order) -> String {
        // 默认按 time 排序 class=$1&area=$2&lang=$3&year=$4&order=%5
        let mut sort = order.sort.clone();
        if sort.is_empty() {
            sort = String::from("time");
        }

        let mut param = Vec::new();
        param.push(format!("pg={}", order.page));
        param.push(format!("class={}", order.class));
        param.push(format!("area={}", order.area));
        param.push(format!("lang={}", order.lang));
        param.push(format!("year={}", order.year));
        param.push(format!("order={}", &sort));
        if !order.tid.is_empty() {
            param.push(format!("tid={}", &order.tid));
        }

        if !order.text.is_empty() {
            param.push(format!("text={}", &order.text));
        }
        return param.join("&");
    }
}
