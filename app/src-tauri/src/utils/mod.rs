//! utils

pub mod file;

use base64::Engine;
use crate::utils::file::FileUtils;

pub struct Utils;

impl Utils {

    /// 生成 base64 图片
    pub fn generate_image(file_path: &str) -> Result<String, String> {
        let data = FileUtils::read_file(&file_path)?;
        let str = base64::engine::general_purpose::STANDARD.encode::<Vec<u8>>(data);
        let mut content = String::from("data:image/png;base64,");
        content.push_str(&str);
       Ok(content)
    }
}
