//
//  ViewController.swift
//  Film
//
//  Created by Smile on 2024/1/9.
//

import UIKit
import WebKit

class ViewController: DelegateViewController, WKNavigationDelegate {

    // var networkManager = NetworkManager()
    var isUrlLoaded = false
    
    override func viewDidLoad() {
        initWebView()
        super.viewDidLoad()
        
        // 强制竖屏
        // UIDevice.current.setValue(UIInterfaceOrientation.portrait.rawValue, forKey: "orientation")
    }
    
    // 初始化 webView
    func initWebView() {
        self.customerViewController = CustomViewController()
        let config = customerViewController.initConfig()
        self.mainView = WKWebView(frame: self.view.bounds, configuration: config)
        self.mainView.insetsLayoutMarginsFromSafeArea = false
        
        // 更新视图的frame，使其超出安全区域
        customerViewController.setViewFullscreen(mainView: self.mainView)

        self.view.addSubview(self.mainView)
        
        // 设置 webview 与 js 交互事件
        self.mainView.allowsBackForwardNavigationGestures = true
        self.mainView.scrollView.isScrollEnabled = false
        self.mainView.navigationDelegate = self
        
        customerViewController.openSafariDebug(mainView: self.mainView)
        // customerViewController.loadUrl(mainView: self.mainView, url: "")
    
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.isNavigationBarHidden = true // 隐藏导航栏
        // self.navigationController?.navigationBar.isTranslucent = false // 设置导航栏透明
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

