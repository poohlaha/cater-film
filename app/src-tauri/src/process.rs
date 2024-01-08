//! 导出

use tauri::{Manager};
use backend::prelude::*;

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
