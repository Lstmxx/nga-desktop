// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use store::StoreBuilder;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("hello, {}", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
