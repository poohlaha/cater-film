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

class WebViewModel: NSObject, ObservableObject, WKScriptMessageHandler {
    let webView: WKWebView
    
    override init() {
        let pres = WKWebpagePreferences()
        pres.allowsContentJavaScript = true
        
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences = pres
        config.allowsInlineMediaPlayback = false // 禁止设备旋转
        self.webView = WKWebView(frame: .zero, configuration: config)
        
        // 调用父类的构造函数
        super.init()
        
        // 生产环境加载本地 html
       // let HTMLSTRING = try! String(contentsOfFile: Bundle.main.path(forResource: "index", ofType: "html")!,encoding: .utf8)
       // self.webview.loadHTMLString(HTMLSTRING, baseURL: Bundle.main.resourceURL);
       
        // 禁止整个 webview 下拉
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.isScrollEnabled = true
        
        #if DEBUG
            let url = URL(string: "http://localhost:9999")!
            webView.load(URLRequest(url: url))
            webView.configuration.userContentController.add(self, name: "invoke")
        #else
        // 在生产环境使用本地目录
        if let path = Bundle.main.path(forResource: "dist/index", ofType: "html") {
            let htmlString = try! String(contentsOfFile: path, encoding: .utf8)
            let baseURL = URL(fileURLWithPath: path)
            webView.loadHTMLString(htmlString, baseURL: baseURL)
        }
        #endif
        
    }
    
    // 接收用户消息
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        let request = Request()
        
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
