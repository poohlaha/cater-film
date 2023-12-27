//! 处理

use crate::error::Error;
use crate::home::Home;
use crate::prepare::{HttpResponse, Prepare};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

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
}

#[async_trait]
impl Prepare<HttpResponse> for Process {
    async fn prepare(name: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
        if !NAMES.contains(&name) {
            return Err(Error::convert_string("`name` field is error !"));
        }

        // home
        if let Some(name) = Self::get_name_by_index(0).ok() {
            return Home::prepare(name, order).await;
        }

        Err(Error::convert_string("`name` field is error !"))
    }
}

impl Process {
    /// 根据索引获取名字
    fn get_name_by_index<'a>(index: usize) -> Result<&'a str, String> {
        if let Some(name) = NAMES.get(index) {
            return Ok(name.as_ref());
        }

        Err(Error::convert_string("cant not find name by index: index"))
    }
}

/// 导出
#[tauri::command]
pub async fn handle(name: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
    Process::prepare(name, order).await
}
