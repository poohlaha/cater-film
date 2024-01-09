//
//  CustomViewController.swift
//  Film
//
//  Created by Smile on 2024/1/9.
//
import WebKit

class CustomViewController {
    
    // 初始化配置
    func initConfig() -> WKWebViewConfiguration {
        let pres = WKWebpagePreferences()
        pres.allowsContentJavaScript = true
        
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences = pres
        config.allowsInlineMediaPlayback = false // 禁止设备旋转
        config.preferences.javaScriptCanOpenWindowsAutomatically = true
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs") // 解决 web 同源策略问题
        return config
    }
    
    // 加载数据
    func loadUrl(mainView: WKWebView, url: String) {
        let baseUrl = "http://localhost:9999"
        var requestUrl = ""
        if  url.isEmpty {
            requestUrl = baseUrl
        } else {
            requestUrl = baseUrl + url
        }
        
        #if DEBUG
        /*
            let url = URL(string: requestUrl)!
            mainView.load(URLRequest(url: url))
         */
        
        if let url = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "dist") {
            let fileUrl = URL(fileURLWithPath: url)
            mainView.loadFileURL(fileUrl, allowingReadAccessTo: fileUrl)
        }
   
        
        #else
            // 在生产环境使用本地目录
            if let url = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "dist") {
                let fileURL = URL(fileURLWithPath: url)
                let request = URLRequest(url: fileURL)
                mainView.load(request)
            }
        #endif
    }
    
}
