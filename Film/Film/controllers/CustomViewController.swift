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
        // let baseUrl = "http://localhost:9999"
        let baseUrl = "http://10.31.23.169:9999"
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

    // 获取顶部非安全区域高度
    func getTopNoSafeAreaHeight() -> CGFloat {
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
            let statusBarManager = windowScene.statusBarManager!
            let statusBarFrame = statusBarManager.statusBarFrame
            let topNonSafeAreaHeight = statusBarFrame.size.height
            print("Top non-safe area height: \(topNonSafeAreaHeight)")
            return topNonSafeAreaHeight
        }
        
        return 0
    }
    
    // 获取底部非安全区域高度
    func getBottomNoSafeAreaHeight() -> CGFloat {
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
            let height = windowScene.keyWindow?.safeAreaInsets.bottom ?? 0
            print("Bottom non-safe area height: \(height)")
            return height
        }
        
        return 0
    }
    
    // 设置全屏, 即 top 为 -非安全区域高度
    func setViewFullscreen(mainView: WKWebView) {
        mainView.insetsLayoutMarginsFromSafeArea = false
        let topHeight = getTopNoSafeAreaHeight()
        let bottomHeight = getBottomNoSafeAreaHeight()
        let height = UIScreen.main.bounds.size.height + topHeight + bottomHeight
        mainView.frame = CGRect(x: 0, y: -topHeight, width: UIScreen.main.bounds.size.width, height: height)
    }

    // 测试环境打开 safari 调试
    func openSafariDebug(mainView: WKWebView) {
        #if DEBUG
            mainView.isInspectable = true // safari 调试
        #else
            mainView.isInspectable = false // 关闭safari 调试
        #endif
    }
}
