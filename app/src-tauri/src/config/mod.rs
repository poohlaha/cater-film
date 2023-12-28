//! 读取配置文件

use lazy_static::lazy_static;
use log::{error, info};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::sync::MutexGuard;

const CONFIG_TOML: &[u8] = include_bytes!("../../conf.toml");

#[derive(Clone, Debug, Default, Deserialize, Serialize)]
pub struct Conf {
    pub domain: String,
    pub home: Home,
    pub rank: Rank
}

#[derive(Clone, Debug, Default, Deserialize, Serialize)]
pub struct Home {
    pub(crate) banner_url: String,       // banner
    pub(crate) recommend_url: String,    // 推荐
    pub(crate) drama_series_url: String, // 剧集 tid = 20
    pub(crate) movie_url: String,        // 电影 tid = 21
    pub(crate) cartoon_url: String,      // 动漫 tid = 22
    pub(crate) variety_url: String,      // 综艺 tid = 23
    pub(crate) children_url: String,     // 少儿 tid = 24
    pub(crate) record_url: String,       // 记录 tid = 25
}

#[derive(Clone, Debug, Default, Deserialize, Serialize)]
pub struct Rank {
    pub(crate) url: String,
}

#[derive(Debug, Default, Deserialize, Serialize)]
pub struct Config {
    pub instance: Option<Conf>,
}

lazy_static! {
    static ref GLOBAL_CONFIG: Mutex<Option<Conf>> = Mutex::new(None);
}

impl Config {
    pub fn new() -> Self {
        let mut config = Config { instance: None };
        let mut global_config: MutexGuard<Option<Conf>> = GLOBAL_CONFIG.lock().unwrap();
        if let Some(g_conf) = &*global_config {
            config.instance = Some(g_conf.clone());
        } else {
            let new_config = get_config();
            config.instance = new_config.clone();
            *global_config = new_config.clone();
        }

        return config;
    }
}

fn get_config() -> Option<Conf> {
    let config_str = match std::str::from_utf8(CONFIG_TOML) {
        Ok(config) => Some(config),
        Err(err) => {
            error!("read `conf.toml` error: {:#?} !", err);
            None
        }
    };

    if let Some(config) = config_str {
        if config.is_empty() {
            error!("`conf.toml` is empty, please check it !");
            return None;
        }

        return match toml::from_str(config) {
            Ok(config) => Some(config),
            Err(err) => {
                info!("parse `conf.toml` error: {:#?} !", err);
                None
            }
        };
    }

    return None;
}

/// 对外可调用方法
pub fn get_conf() -> Option<Conf> {
    let conf = Config::new();
    let instance = conf.instance;

    if let Some(instance) = instance {
        return Some(instance);
    }

    return None;
}
