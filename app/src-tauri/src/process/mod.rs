//! 处理

use std::fs::create_dir_all;
use std::path::PathBuf;
use crate::error::Error;
use crate::home::Home;
use crate::prepare::{HttpResponse, Prepare};
use async_trait::async_trait;
use log::info;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
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
    async fn prepare(app: &AppHandle, name: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
        // 设置图片目录
        if !NAMES.contains(&name) {
            return Err(Error::convert_string("`name` field is error !"));
        }

        // home
        if Self::find_name_by_index(name, 0) {
            return Home::prepare(app, name, order).await;
        }

        // rank
        if Self::find_name_by_index(name, 1) {
            return Rank::prepare(app, name, order).await;
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

    /// 获取 App 数据目录
    pub fn get_data_dir(app: &AppHandle, dir_name: &str) -> Result<PathBuf, String> {
        let home_dir = app.path().home_dir().map_err(|_| Error::convert_string("获取 App 主目录失败 !"))?;
        let mut dir = home_dir.join("cater-film");
        info!("data dir: {:#?}", dir);

        if !dir_name.is_empty() {
            dir = dir.join(dir_name);
            // return Err(format!("data dir: {:#?}", dir));

            if !dir.exists() {
                create_dir_all(dir.clone()).map_err(|_| Error::convert_string(&format!("创建目录 `{}` 失败", dir_name)))?;
            }
        }

        Ok(dir)
    }

    /// 图片目录
    pub fn get_image_dir(app: &AppHandle) -> Result<PathBuf, String> {
        return Self::get_data_dir(app, "images");
    }

    /// 临时目录
    pub fn get_tmp_dir(app: &AppHandle) -> Result<PathBuf, String> {
        return Self::get_data_dir(app, "tmp");
    }
}

/// 导出
#[tauri::command]
pub async fn handle(app: tauri::AppHandle, name: &str, order: Order) -> Result<Vec<HttpResponse>, String> {
    Process::prepare(&app, name, order).await
}

#[tauri::command]
pub async fn get_setting_window(app: tauri::AppHandle) -> Result<(), String> {
    let window = app.windows();
    println!("all windows: {:#?}", window.keys());

    let window = window.get("setting");
    if let Some(window) = window {
        println!("get setting window: {:#?}", window.label());
        /*
        window.show().map_err(|err| Error::convert_string(&err.to_string()).to_string())?;
        window.set_always_on_top(true).map_err(|err| Error::convert_string(&err.to_string()).to_string())?;
         */
        Ok(())
    } else {
        Err(Error::convert_string("open `setting` window error, can not found `setting` window !"))
    }

}
