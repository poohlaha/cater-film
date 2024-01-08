//! 导出 c 类型函数
use crate::prepare::HttpResponse;
use crate::prepare::Prepare;
use crate::process::{Order, Process};
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::ptr;

#[repr(C)]
#[derive(Debug)]
pub struct CHttpResponse {
    name: *mut c_char,
    code: u16,
    headers: *mut HashMapEntry,
    body: *mut c_char,
    error: *mut c_char,
}

#[repr(C)]
#[derive(Debug)]
pub struct HashMapEntry {
    key: *mut c_char,
    value: *mut c_char,
}

#[repr(C)]
pub struct CResult {
    data: *mut CHttpResponse,
    error: *mut c_char,
}

#[repr(C)]
pub struct COrder {
    name: *mut c_char,
    class: *mut c_char,
    area: *mut c_char,
    lang: *mut c_char,
    year: *mut c_char,
    sort: *mut c_char,
    page: u64,
    tid: *mut c_char,
    text: *mut c_char,
}

#[no_mangle]
pub extern "C" fn handle(name: *const c_char, order: *const COrder) -> *mut c_char {
    // Convert the name C string to Rust String
    let name_str = unsafe { CStr::from_ptr(name).to_string_lossy().into_owned() };

    // Convert the COrder to Order
    let order_struct = unsafe { convert_to_order(order) };

    let rt = tokio::runtime::Builder::new_multi_thread()
        .worker_threads(2)
        .enable_all()
        .build()
        .unwrap();
    // Call the async function
    let res = rt.block_on(async { Process::prepare(&name_str, order_struct).await });

    match res {
        Ok(response) => {
            let res: String = serde_json::to_string(&response).unwrap_or(String::new());
            CString::new(res).unwrap().into_raw()
        }
        Err(err) => {
            let mut response = HttpResponse::default();
            response.code = 500;
            response.error = err;

            let res: String = serde_json::to_string(&vec![response]).unwrap_or(String::new());
            CString::new(res).unwrap().into_raw()
        }
    }
}

fn convert_to_order(c_order: *const COrder) -> Order {
    unsafe {
        Order {
            name: CString::from_raw((*c_order).name)
                .to_string_lossy()
                .into_owned(),
            class: CString::from_raw((*c_order).class)
                .to_string_lossy()
                .into_owned(),
            area: CString::from_raw((*c_order).area)
                .to_string_lossy()
                .into_owned(),
            lang: CString::from_raw((*c_order).lang)
                .to_string_lossy()
                .into_owned(),
            year: CString::from_raw((*c_order).year)
                .to_string_lossy()
                .into_owned(),
            sort: CString::from_raw((*c_order).sort)
                .to_string_lossy()
                .into_owned(),
            page: (*c_order).page,
            tid: CString::from_raw((*c_order).tid)
                .to_string_lossy()
                .into_owned(),
            text: CString::from_raw((*c_order).text)
                .to_string_lossy()
                .into_owned(),
        }
    }
}

// Free memory used by COrder
#[no_mangle]
pub extern "C" fn free_c_order(c_order: *mut COrder) {
    if c_order.is_null() {
        return;
    }

    unsafe {
        let _ = CString::from_raw((*c_order).name);
        let _ = CString::from_raw((*c_order).class);
        let _ = CString::from_raw((*c_order).area);
        let _ = CString::from_raw((*c_order).lang);
        let _ = CString::from_raw((*c_order).year);
        let _ = CString::from_raw((*c_order).sort);
        let _ = CString::from_raw((*c_order).tid);
        let _ = CString::from_raw((*c_order).text);
    }

    // Free the structure
    unsafe {
        let _ = Box::from_raw(c_order);
    };
}
