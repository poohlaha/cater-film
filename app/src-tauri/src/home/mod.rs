//! 首页

use crate::config::{get_conf, Home as HomeConf};
use crate::error::Error;
use crate::prepare::{HttpResponse, HttpSendRequest, Prepare};
use async_trait::async_trait;

pub struct Home;

#[async_trait]
impl Prepare<HttpResponse> for Home {
    async fn prepare(_: &str, query_name: &str) -> Result<Vec<HttpResponse>, String> {
        let conf = get_conf();
        if conf.is_none() {
            return Err(Error::convert_string("analyze `conf.toml` error !"));
        }

        if let Some(conf) = conf {
            let mut request = HttpSendRequest::default();
            request.name = query_name.to_string();

            if query_name == "recommend" {
                return Self::prepare_recommend(request, &conf.domain, &conf.home).await;
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
        banner_request.url = Self::prepare_url(domain, &conf.banner_url);
        banner_request.name = "banner".to_string();

        // recommend
        let mut recommend_request = request.clone();
        recommend_request.method = Some("GET".to_string());
        recommend_request.url = Self::prepare_url(domain, &conf.recommend_url);
        recommend_request.name = "recommend".to_string();

        let mut list: Vec<HttpSendRequest> = Vec::new();
        list.push(banner_request);
        list.push(recommend_request);

        // 发送请求
        Self::send(list).await
    }

    /// 剧集列表
    fn prepare_drama_series() {}

    /// 电影列表
    fn prepare_movie() {}

    /// 动漫
    fn prepare_cartoon() {}

    /// 综艺
    fn prepare_variety() {}

    /// 少儿
    fn prepare_children() {}

    /// 记录
    fn prepare_record() {}

    /// 获取 URL
    fn prepare_url(domain: &str, url: &str) -> String {
        let mut request_url = String::from(domain);
        request_url.push_str(url);
        return request_url;
    }
}
