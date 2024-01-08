//! 导出 c 类型函数
use crate::prepare::HttpResponse;
use crate::process::{Order, Process};
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::ptr;
use crate::prepare::Prepare;

#[repr(C)]
pub struct CHttpResponse {
    name: *mut c_char,
    code: u16,
    headers: *mut HashMapEntry,
    body: *mut c_char,
    error: *mut c_char,
}

#[repr(C)]
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
pub extern "C" fn handle(name: *const c_char, order: *const COrder) -> *mut CResult {
    // Convert the name C string to Rust String
    let name_str = unsafe { CStr::from_ptr(name).to_string_lossy().into_owned() };

    // Convert the COrder to Order
    let order_struct = unsafe { convert_to_order(order) };

    // Call the async function
    let result = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(async {
            Process::prepare(&name_str, order_struct).await
        });

    return match result {
        Ok(response) => {
            let c_result = Box::new(CResult {
                data: convert_to_c_http_response(response),
                error: ptr::null_mut(),
            });
            Box::into_raw(c_result)
        }
        Err(err) => {
            let error_msg = CString::new(err.to_string()).unwrap();
            let c_result = Box::new(CResult {
                data: ptr::null_mut(),
                error: CString::into_raw(error_msg),
            });
            Box::into_raw(c_result)
        }
    }
}

fn convert_to_order(c_order: *const COrder) -> Order {
    unsafe {
        Order {
            name: CString::from_raw((*c_order).name).to_string_lossy().into_owned(),
            class: CString::from_raw((*c_order).class).to_string_lossy().into_owned(),
            area: CString::from_raw((*c_order).area).to_string_lossy().into_owned(),
            lang: CString::from_raw((*c_order).lang).to_string_lossy().into_owned(),
            year: CString::from_raw((*c_order).year).to_string_lossy().into_owned(),
            sort: CString::from_raw((*c_order).sort).to_string_lossy().into_owned(),
            page: (*c_order).page,
            tid: CString::from_raw((*c_order).tid).to_string_lossy().into_owned(),
            text: CString::from_raw((*c_order).text).to_string_lossy().into_owned(),
        }
    }
}

fn convert_to_c_http_response(responses: Vec<HttpResponse>) -> *mut CHttpResponse {
    let mut res: Vec<CHttpResponse> = Vec::new();
    for response in responses.iter() {
        let name = CString::new(response.name.as_str()).expect("CString::new failed");
        let body = CString::new(response.body.as_str().unwrap_or("")).expect("CString::new failed");

        let mut headers_entries = Vec::new();
        for (key, value) in response.headers.clone().into_iter() {
            let key_cstr = CString::new(key).expect("CString::new failed");
            let value_cstr = CString::new(value).expect("CString::new failed");
            headers_entries.push(HashMapEntry {
                key: key_cstr.into_raw(),
                value: value_cstr.into_raw(),
            });
        }

        res.push(CHttpResponse {
            name: name.into_raw(),
            code: response.code,
            headers: headers_entries.as_mut_ptr(),
            body: body.into_raw(),
            error: CString::new(response.error.as_str()).expect("CString::new failed").into_raw(),
        })
    }

    let boxed_slice = res.into_boxed_slice();
    let boxed_ptr = boxed_slice;
    Box::into_raw(boxed_ptr) as *mut CHttpResponse
}

// Free memory used by CHttpResponse
#[no_mangle]
pub extern "C" fn free_c_http_response(response: *mut CHttpResponse) {
    if response.is_null() {
        return;
    }

    unsafe {
        let _ = CString::from_raw((*response).name);
        let _ = CString::from_raw((*response).body);
        let _ = CString::from_raw((*response).error);

        let headers_entries = Vec::from_raw_parts((*response).headers, 0, 0);
        for entry in headers_entries {
            let _ = CString::from_raw(entry.key);
            let _ = CString::from_raw(entry.value);
        }
    }

    // Free the main structure
    unsafe { let _ = Box::from_raw(response); };
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
    unsafe { Box::from_raw(c_order); };
}
