//! 排行版

use async_trait::async_trait;
use crate::config::get_conf;
use crate::error::Error;
use crate::prepare::{HttpResponse, HttpSendRequest, Prepare};
use crate::process::Order;

pub struct Rank;

#[async_trait]
impl Prepare<HttpResponse> for Rank {
    async fn prepare(_: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
        let conf = get_conf();
        if conf.is_none() {
            return Err(Error::convert_string("analyze `conf.toml` error !"));
        }

        if let Some(conf) = conf {
            let mut request = HttpSendRequest::default();
            request.name = order.name.to_string();
            request.method = Some(String::from("GET"));
            request.url = Self::prepare_url(&conf.domain, &conf.rank.url, order.page);
            return Self::send(vec![request]).await
        }

        return Ok(Vec::new());
    }
}

impl Rank {

    /// 准备 URL
    fn prepare_url(domain: &str, url: &str, id: u64) -> String {
        let mut request_url = String::from(domain);
        request_url.push_str(url);
        request_url.push_str(&format!("&id={}", id));
        return request_url;
    }
}