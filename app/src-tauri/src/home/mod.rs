//! 首页

use crate::config::{get_conf, Home as HomeConf};
use crate::error::Error;
use crate::prepare::{HttpResponse, HttpSendRequest, Prepare};
use async_trait::async_trait;
use crate::process::Order;

pub struct Home;

const NAMES: [&str; 4] = [
    "recommend",
    "dramaSeries",
    "movie",
    "cartoon"
];

#[async_trait]
impl Prepare<HttpResponse> for Home {
    async fn prepare(_: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
        let conf = get_conf();
        if conf.is_none() {
            return Err(Error::convert_string("analyze `conf.toml` error !"));
        }

        if let Some(conf) = conf {
            let mut request = HttpSendRequest::default();
            request.name = order.name.to_string();

            // recommend
            if let Some(name) = Self::get_name_by_index(0).ok() {
                if &order.name == name {
                    return Self::prepare_recommend(request, &conf.domain, &conf.home).await;
                }
            }

            // dramaSeries
            if let Some(name) = Self::get_name_by_index(1).ok() {
                if &order.name == name {
                    return Self::prepare_drama_series(request, &conf.domain, &conf.home, &order).await;
                }
            }

            // movie
            if let Some(name) = Self::get_name_by_index(2).ok() {
                if &order.name == name {
                    return Self::prepare_movie(request, &conf.domain, &conf.home, &order).await;
                }
            }

            // cartoon
            if let Some(name) = Self::get_name_by_index(3).ok() {
                if &order.name == name {
                    return Self::prepare_cartoon(request, &conf.domain, &conf.home, &order).await;
                }
            }

        }

        return Ok(Vec::new());
    }
}

impl Home {

    /// 推荐列表
    async fn prepare_recommend(request: HttpSendRequest, domain: &str, conf: &HomeConf) -> Result<Vec<HttpResponse>, String> {
        // banner
        let mut banner_request = request.clone();
        banner_request.method = Some("GET".to_string());
        banner_request.url = Self::prepare_url(domain, &conf.banner_url, "");
        banner_request.name = "banner".to_string();

        // recommend
        let mut recommend_request = request.clone();
        recommend_request.method = Some("GET".to_string());
        recommend_request.url = Self::prepare_url(domain, &conf.recommend_url, "");
        recommend_request.name = "recommend".to_string();

        let mut list: Vec<HttpSendRequest> = Vec::new();
        list.push(banner_request);
        list.push(recommend_request);

        // 发送请求
        Self::send(list).await
    }

    fn prepare_sort(order: &Order) -> String {
        // 默认按 time 排序 class=$1&area=$2&lang=$3&year=$4&order=%5
        let mut sort = order.sort.clone();
        if sort.is_empty() {
            sort = String::from("time");
        }

        let mut param = Vec::new();
        param.push(format!("class={}", order.class));
        param.push(format!("area={}", order.area));
        param.push(format!("lang={}", order.lang));
        param.push(format!("year={}", order.year));
        param.push(format!("order={}", &sort));
        return param.join("&");
    }

    /// 剧集列表
    async fn prepare_drama_series(request: HttpSendRequest, domain: &str, conf: &HomeConf, order: &Order) -> Result<Vec<HttpResponse>, String> {
        // recommend
        let mut request = request.clone();
        request.method = Some("GET".to_string());
        request.name = "dramaSeries".to_string();

        // 默认按 time 排序 class=$1&area=$2&lang=$3&year=$4&order=%5
        request.url = Self::prepare_url(domain, &conf.drama_series_url, &Self::prepare_sort(order));
        Self::send(vec![request]).await
    }

    /// 电影列表
    async fn prepare_movie(request: HttpSendRequest, domain: &str, conf: &HomeConf, order: &Order) -> Result<Vec<HttpResponse>, String> {
        // recommend
        let mut request = request.clone();
        request.method = Some("GET".to_string());
        request.name = "movie".to_string();

        // 默认按 time 排序 class=$1&area=$2&lang=$3&year=$4&order=%5
        request.url = Self::prepare_url(domain, &conf.movie_url, &Self::prepare_sort(order));
        Self::send(vec![request]).await
    }

    /// 动漫
    async fn prepare_cartoon(request: HttpSendRequest, domain: &str, conf: &HomeConf, order: &Order) -> Result<Vec<HttpResponse>, String> {
        // recommend
        let mut request = request.clone();
        request.method = Some("GET".to_string());
        request.name = "cartoon".to_string();

        // 默认按 time 排序 class=$1&area=$2&lang=$3&year=$4&order=%5
        request.url = Self::prepare_url(domain, &conf.cartoon_url, &Self::prepare_sort(order));
        Self::send(vec![request]).await
    }

    /// 综艺
    fn prepare_variety() {}

    /// 少儿
    fn prepare_children() {}

    /// 记录
    fn prepare_record() {}

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
}
