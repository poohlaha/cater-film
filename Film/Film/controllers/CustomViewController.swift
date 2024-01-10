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
            let url = URL(string: requestUrl)!
            mainView.load(URLRequest(url: url))
        #else
            // 在生产环境使用本地目录
            if let path = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "dist") {
                // # 不转码, 手动拼接
                let encodedPath = path.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!
                let encodedUrl = url.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed)!
                var urlString = "file://" + encodedPath
                if !url.isEmpty {
                    urlString = urlString + "#" + encodedUrl
                }
                
                let fileURL = URL(string: urlString)!
                mainView.loadFileURL(fileURL, allowingReadAccessTo: fileURL)
            }
        #endif
    }

    
}
