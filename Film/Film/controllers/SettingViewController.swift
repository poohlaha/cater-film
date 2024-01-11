//
//  SettingViewController.swift
//  Film
//
//  Created by Smile on 2024/1/9.
//

import UIKit
import WebKit

class SettingViewController: UIViewController, WKNavigationDelegate {
    
    var settingView: WKWebView!
    var isLoadUrl: Bool = false
    var customerViewController: CustomViewController!
    
    override func viewDidLoad() {
        super.viewDidLoad()
       
        initWebView()
        
        // 手势
        self.navigationController!.interactivePopGestureRecognizer!.delegate = self;
    }
    
    func initWebView() {
        self.customerViewController = CustomViewController()
        self.navigationItem.title = "设置" // 标题
        self.navigationItem.leftBarButtonItem = setNavigationLeftBarItem()
        
        let config = customerViewController.initConfig()
        self.settingView = WKWebView(frame: self.view.bounds, configuration: config)
        self.settingView.scrollView.isScrollEnabled = false
        self.view.addSubview(self.settingView)
    }
    
    
    // 导航条左侧定定义返回
    func setNavigationLeftBarItem() -> UIBarButtonItem {
        let imageView = UIImageView(image: UIImage(named: "Back"))
        imageView.frame = CGRectMake(0, 0, 20, 20)
        imageView.layer.masksToBounds = true
        let button = UIBarButtonItem(customView: imageView)
        
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(backButtonTapped))
        imageView.addGestureRecognizer(tapGesture)
        imageView.isUserInteractionEnabled = true // 确保 UIImageView 可以响应点击事件
        return button
    }
    
    @objc func backButtonTapped() {
        self.navigationController?.popViewController(animated: true)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        if !self.isLoadUrl {
            self.customerViewController.loadUrl(mainView: self.settingView, url: "/setting")
            self.isLoadUrl = true
        }
    }
    
}

// 手势从左边滑动关闭设置webView
extension SettingViewController: UIGestureRecognizerDelegate {
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        return true
    }
}
