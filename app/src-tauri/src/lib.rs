mod config;
mod error;
mod home;
mod prepare;
mod process;

use process::handle;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_log::Builder::default().build())
        .invoke_handler(tauri::generate_handler![handle])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
