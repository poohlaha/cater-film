// Main View

import SwiftUI
import WebKit

struct MainView: UIViewRepresentable {
    
    let webView: WKWebView
    
    func makeUIView(context: Context) -> some UIView {
        return webView
    }
    
    func updateUIView(_ uiView: UIViewType, context: Context) {}

}

class MainWebViewModel: NSObject, ObservableObject, WKScriptMessageHandler, WKNavigationDelegate {
    let webView: WKWebView
    
    @Published var isSettingViewVisible = false
    
    override init() {
        let pres = WKWebpagePreferences()
        pres.allowsContentJavaScript = true
        
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences = pres
        config.allowsInlineMediaPlayback = false // 禁止设备旋转
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs") // 解决 web 同源策略问题
        self.webView = WKWebView(frame: .zero, configuration: config)
        
        // 调用父类的构造函数
        super.init()
        
        // 生产环境加载本地 html
       // let HTMLSTRING = try! String(contentsOfFile: Bundle.main.path(forResource: "index", ofType: "html")!,encoding: .utf8)
       // self.webview.loadHTMLString(HTMLSTRING, baseURL: Bundle.main.resourceURL);
       
        // 禁止整个 webview 下拉
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.isScrollEnabled = true
        webView.navigationDelegate = self
        webView.configuration.userContentController.add(self, name: "invoke")
        webView.configuration.userContentController.add(self, name: "onOpenSettingDialog")
        
        #if DEBUG
            let url = URL(string: "http://localhost:9999")!
            webView.load(URLRequest(url: url))
        #else
        // 在生产环境使用本地目录
        if let url = Bundle.main.url(forResource: "dist/index", withExtension: "html") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        #endif
        
    }
    
    // 接收用户消息
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        let request = Request()
        
        // http 请求
        if message.name == "invoke", let body = message.body as? [String: Any] {
            // 处理来自 JavaScript 的消息
           print("Received message from JavaScript: \(body)")
           let result = request.process(body)
           let script = "onHandleResult(\(result))"
           webView.evaluateJavaScript(script, completionHandler: { (result, error) in
                if let error = error {
                    print("Failed to execute JavaScript: \(error)")
                }
            })
        }
        
        // 打开设置 webview
        if message.name == "onOpenSettingDialog" {
            print("open setting webView !")
            self.isSettingViewVisible = true
        }
    }
    
    // 与 JavaScript 交互的示例方法
    func executeJavaScript(_ script: String, completion: ((Any?, Error?) -> Void)? = nil) {
        webView.evaluateJavaScript(script) { result, error in
            if let error = error {
               print("JavaScript execution error: \(error)")
            }
            completion?(result, error)
        }
    }

}
