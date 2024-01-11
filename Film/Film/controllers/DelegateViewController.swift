// 首页监听

import UIKit
import WebKit


class DelegateViewController: UIViewController, WKScriptMessageHandler {
    
    var mainView: WKWebView!
    var customerViewController: CustomViewController!
    var settingController: SettingViewController?
    var detailController: DetailViewController?
    let request = Request()
    
    override func viewDidLoad() {
        super.viewDidLoad()
       
        // 消息
        self.mainView.configuration.userContentController.add(self, name: "invoke")
        self.mainView.configuration.userContentController.add(self, name: "onOpenSettingDialog")
        self.mainView.configuration.userContentController.add(self, name: "onGetNoSafeHeight")
        self.mainView.configuration.userContentController.add(self, name: "onOpenDetailPage")
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        // http 请求
        if message.name == "invoke", let body = message.body as? [String: Any] {
           getRequest(body: body)
        }
        
        // 打开设置 webview
        if message.name == "onOpenSettingDialog" {
            openSettingWebView()
        }
        
        // 获取顶部和底部高度
        if message.name == "onGetNoSafeHeight" {
            getNoSafeHeight()
        }
        
        // 打开详情 webView
        if message.name == "onOpenDetailPage" {
            openDetailWebView()
        }
    }
    
    // 与 JavaScript 交互的示例方法
    func executeJavaScript(_ script: String, completion: ((Any?, Error?) -> Void)? = nil) {
        self.mainView.evaluateJavaScript(script) { result, error in
            if let error = error {
               print("JavaScript execution error: \(error)")
            }
            completion?(result, error)
        }
    }
    
    // 发送请求
    private func getRequest(body: [String: Any]) {
        // 处理来自 JavaScript 的消息
       print("Received message from JavaScript: \(body)")
       let result = request.process(body)
       let script = "onHandleResultCallback(\(result))"
        self.mainView.evaluateJavaScript(script, completionHandler: { (result, error) in
            if let error = error {
                print("Failed to execute JavaScript: \(error)")
            }
        })
    }
    
    // 打开设置webView
    private func openSettingWebView() {
        print("open setting webView !")
        if settingController == nil {
            settingController = SettingViewController()
        }
        
        self.navigationController?.pushViewController(settingController!, animated: true)
    }
    
    // 打开设置webView
    private func openDetailWebView() {
        print("open detail webView !")
        if detailController == nil {
            detailController = DetailViewController()
        }
        
        self.navigationController?.pushViewController(detailController!, animated: true)
    }
    
    // 获取顶部和底部高度
    private func getNoSafeHeight() {
        print("get webView no safe area height !")
        let topHeight = customerViewController.getTopNoSafeAreaHeight()
        let bottomHeight = customerViewController.getBottomNoSafeAreaHeight()
        let script = "onGetNoSafeHeightCallback(\(topHeight), \(bottomHeight))"
         self.mainView.evaluateJavaScript(script, completionHandler: { (result, error) in
             if let error = error {
                 print("Failed to execute JavaScript: \(error)")
             }
         })
    }
}
