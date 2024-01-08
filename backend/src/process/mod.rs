//! 处理

use crate::error::Error;
use crate::home::Home;
use crate::prepare::{HttpResponse, Prepare};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use crate::rank::Rank;

pub struct Process;

const NAMES: [&str; 3] = ["HOME", "RANK", "MY"];

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct Order {
    pub(crate) name: String,
    pub(crate) class: String,
    pub(crate) area: String,
    pub(crate) lang: String,
    pub(crate) year: String,
    pub(crate) sort: String,
    pub(crate) page: u64,
    pub(crate) tid: String,
    pub(crate) text: String
}

#[async_trait]
impl Prepare<HttpResponse> for Process {
    async fn prepare(name: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
        // 设置图片目录
        if !NAMES.contains(&name) {
            return Err(Error::convert_string("`name` field is error !"));
        }

        // home
        if Self::find_name_by_index(name, 0) {
            return Home::prepare(name, order).await;
        }

        // rank
        if Self::find_name_by_index(name, 1) {
            return Rank::prepare(name, order).await;
        }

        Err(Error::convert_string(&format!("cant not find name by name: {}", name)))
    }
}

impl Process {
    /// 根据索引获取名字
    fn find_name_by_index(name: &str, index: usize) -> bool {
        if let Some(n) = NAMES.get(index) {
            return &name == n
        }

        return false
    }
}

