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
    // var networkManager = NetworkManager()
    var customerViewController: CustomViewController!
    var isUrlLoaded = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initWebView()
    }
    
    // 初始化 webView
    func initWebView() {
        self.customerViewController = CustomViewController()
        let config = customerViewController.initConfig()
        self.mainView = WKWebView(frame: self.view.bounds, configuration: config)
        self.mainView.insetsLayoutMarginsFromSafeArea = false
        
        // 更新视图的frame，使其超出安全区域
        customerViewController.setViewFullscreen(mainView: self.mainView)
        /*
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
         */
        self.view.addSubview(self.mainView)
        
        // 设置 webview 与 js 交互事件
        self.mainView.allowsBackForwardNavigationGestures = true
        self.mainView.scrollView.isScrollEnabled = false
        self.mainView.navigationDelegate = self
        
        #if DEBUG
            self.mainView.isInspectable = true // safari 调试
        #else
            self.mainView.isInspectable = false // 关闭safari 调试
        #endif
        
        // 消息
        self.mainView.configuration.userContentController.add(self, name: "invoke")
        self.mainView.configuration.userContentController.add(self, name: "onOpenSettingDialog")
        self.mainView.configuration.userContentController.add(self, name: "onGetNoSafeHeight")
        
        // customerViewController.loadUrl(mainView: self.mainView, url: "")
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        let request = Request()
        
        // http 请求
        if message.name == "invoke", let body = message.body as? [String: Any] {
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
        
        // 打开设置 webview
        if message.name == "onOpenSettingDialog" {
            print("open setting webView !")
            if settingController == nil {
                settingController = SettingViewController()
            }
            
            self.navigationController?.pushViewController(settingController!, animated: true)
        }
        
        // 获取顶部和底部高度
        if message.name == "onGetNoSafeHeight" {
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
        super.viewWillAppear(animated)
        self.navigationController?.isNavigationBarHidden = true // 隐藏导航栏
        //self.navigationController?.navigationBar.isTranslucent = false // 设置导航栏透明
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = false // 显示导航栏
    }

    override func viewDidAppear(_ animated: Bool) {
       super.viewDidAppear(animated)
        if !self.isUrlLoaded {
            self.customerViewController.loadUrl(mainView: self.mainView, url: "")
            self.isUrlLoaded = true
        }
        
   }

}

