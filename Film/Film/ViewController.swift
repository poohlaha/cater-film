//
//  ViewController.swift
//  Film
//
//  Created by Smile on 2024/1/9.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {

    var mainView: WKWebView!
    var settingController: SettingViewController?
    
   
    override func viewDidLoad() {
        super.viewDidLoad()
        initWebView()
    }
    
    // 初始化 webView
    func initWebView() {
        let customerViewController = CustomViewController()
        let config = customerViewController.initConfig()
        self.mainView = WKWebView(frame: self.view.bounds, configuration: config)
        self.view.addSubview(self.mainView)
        
        // 设置 webview 与 js 交互事件
        self.mainView.allowsBackForwardNavigationGestures = true
        self.mainView.scrollView.isScrollEnabled = true
        self.mainView.navigationDelegate = self
        
        #if DEBUG
            self.mainView.isInspectable = true // safari 调试
        #else
            self.mainView.isInspectable = false // 关闭safari 调试
        #endif
        
        // 消息
        self.mainView.configuration.userContentController.add(self, name: "invoke")
        self.mainView.configuration.userContentController.add(self, name: "onOpenSettingDialog")
        
        customerViewController.loadUrl(mainView: self.mainView, url: "")
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        let request = Request()
        
        // http 请求
        if message.name == "invoke", let body = message.body as? [String: Any] {
            // 处理来自 JavaScript 的消息
           print("Received message from JavaScript: \(body)")
           let result = request.process(body)
           let script = "onHandleResult(\(result))"
            self.mainView.evaluateJavaScript(script, completionHandler: { (result, error) in
                if let error = error {
                    print("Failed to execute JavaScript: \(error)")
                }
            })
        }
        
        // 打开设置 webview
        if message.name == "onOpenSettingDialog" {
            print("open setting webView !")
            if settingController == nil {
                settingController = SettingViewController()
            }
            
           
            self.navigationController?.pushViewController(settingController!, animated: true)
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

    override func viewWillAppear(_ animated: Bool) {
        self.navigationController?.isNavigationBarHidden = true // 隐藏导航栏
        self.navigationController?.navigationBar.isTranslucent = true // 设置导航栏透明
        self.modalPresentationStyle = .fullScreen // 全屏
        self.isModalInPresentation = true // 禁用下拉
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        self.navigationController?.isNavigationBarHidden = false
        self.isModalInPresentation = false
    }
}

