//! prepare

pub mod request;

use serde::de::DeserializeOwned;
use std::fmt::Debug;

use crate::prepare::request::Request;
use crate::process::Order;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct HttpResponse {
    pub(crate) name: String,
    pub(crate) code: u16,
    pub(crate) headers: HashMap<String, String>,
    pub(crate) body: serde_json::Value,
    pub(crate) error: String,
}

#[derive(Debug, Default, Clone)]
pub struct HttpSendRequest {
    pub(crate) name: String,
    pub(crate) url: String,
    pub(crate) method: Option<String>,
    pub(crate) headers: HashMap<String, String>,
}

impl HttpResponseData for HttpResponse {}

pub trait HttpResponseData:
    Default + Debug + Clone + Serialize + DeserializeOwned + 'static
{
}

#[async_trait]
pub trait Prepare<R>
where
    R: HttpResponseData,
{
    async fn send(params: Vec<HttpSendRequest>) -> Result<Vec<HttpResponse>, String> {
        Request::send_batch::<R>(params).await
    }

    async fn prepare(name: &str, order: Order) -> Result<Vec<HttpResponse>, String>;
}
