// 设置 View

import SwiftUI
import WebKit

struct SettingView: UIViewRepresentable {
    
    let webView: WKWebView
    
    func makeUIView(context: Context) -> some UIView {
        return webView
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {}

}

class SettingWebViewModel: NSObject, ObservableObject, WKNavigationDelegate {
    
    let webView: WKWebView
    
    override init() {
        let pres = WKWebpagePreferences()
        pres.allowsContentJavaScript = true
        
        
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences = pres
        config.allowsInlineMediaPlayback = false // 禁止设备旋转
        // config.allowsPictureInPictureMediaPlayback = true // 画中画
        // config.allowsInlineMediaPlayback = true // 允许使用在线播放
        self.webView = WKWebView(frame: .zero, configuration: config)
        
        // 调用父类的构造函数
        super.init()
        
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.isScrollEnabled = true
        webView.navigationDelegate = self
        webView.allowsBackForwardNavigationGestures = true // 允许左滑返回
        
        // 定义导航栏
        let titleItem = UINavigationItem(title: "设置")
        let navigationBarAppearance = UINavigationBarAppearance()
        
        #if DEBUG
            let url = URL(string: "http://localhost:9999/setting")!
            webView.load(URLRequest(url: url))
        #else
        // 在生产环境使用本地目录
        if let url = Bundle.main.url(forResource: "dist/index", withExtension: "html") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        #endif
    }
}

