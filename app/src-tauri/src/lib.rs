mod config;
mod error;
mod home;
mod prepare;
mod process;
mod utils;
mod rank;

use tauri::Manager;
use process::handle;
use process::get_setting_window;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_log::Builder::default().build())
        .setup(move |app| {
            if let Some(window) = app.get_window("main") {
                let _ = window.show();
                let _ = window.set_focus();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![handle, get_setting_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
