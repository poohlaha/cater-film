//! utils

pub struct Utils;

impl Utils {
    /**
    驼峰转换下划线
    str: 要转换的字符串
    spec: 字符, 默认为 `_`
     */
    pub fn hump_with_line(str: &str, spec: Option<char>) -> String {
        let mut underline = '_';
        if spec.is_some() {
            let spec = spec.unwrap();
            underline = spec;
        }

        let mut chars = String::new();
        for (_, c) in str.chars().enumerate() {
            if c.is_uppercase() {
                chars.push(underline);
                chars.push(c.to_lowercase().next().unwrap());
            } else {
                chars.push(c)
            }
        }

        chars
    }
}
