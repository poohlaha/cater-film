//! 文件助手

use crate::error::Error;
use std::fs::File;
use std::io::{Read};

pub struct FileUtils;

impl FileUtils {
    /// 打开文件
    pub fn open_file(file_path: &str) -> Result<File, String> {
        let file = File::open(&file_path).map_err(|err| Error::Error(err.to_string()).to_string())?;
        Ok(file)
    }

    /// 读取文件 - 字节
    pub fn read_file(file_path: &str) -> Result<Vec<u8>, String> {
        let mut file = Self::open_file(file_path)?;
        let mut contents: Vec<u8> = Vec::new();
        file.read_to_end(&mut contents).map_err(|err| Error::Error(err.to_string()).to_string())?;
        Ok(contents)
    }


    /// 读取文件 - 字符串
    pub fn read_file_string(file_path: &str) -> Result<String, String> {
        let mut file = Self::open_file(file_path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .map_err(|err| Error::Error(err.to_string()).to_string())?;
        Ok(contents)
    }
}
