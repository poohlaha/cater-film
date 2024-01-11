// web view controller

import UIKit
import WebKit

// 导航条属性
struct NavigationProps {
    var need: Bool
    var title: String
}

class BaseWebViewController: UIViewController, WKNavigationDelegate {
    
    var isLoadUrl: Bool = false
    var customerViewController: CustomViewController = CustomViewController()
    var url: String = ""
    var mainView: WKWebView!
    var bounds: CGRect = CGRect(x: 0, y: 0, width: 0, height: 0)

    override func viewDidLoad() {
        super.viewDidLoad()
        // 手势
        self.navigationController!.interactivePopGestureRecognizer!.delegate = self;
    }
    
    func initWebView(navigationProps: NavigationProps, bounds: CGRect, url: String) {
        initProps(navigationProps: navigationProps, bounds: bounds, url: url)
        let config = customerViewController.initConfig()
        self.mainView = WKWebView(frame: self.view.bounds, configuration: config)
        self.view.addSubview(self.mainView)
    }
    
    // 初始化属性
    private func initProps(navigationProps: NavigationProps, bounds: CGRect, url: String) {
        print(url)
        print(bounds)
        self.url = url
        self.bounds = bounds
        
        print(navigationProps)
        if navigationProps.need {
            self.navigationItem.title = navigationProps.title // 标题
            self.navigationItem.leftBarButtonItem = setNavigationLeftBarItem()
        }
    }
    
    // 导航条左侧定定义返回
    private func setNavigationLeftBarItem() -> UIBarButtonItem {
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
        if !self.isLoadUrl && !self.url.isEmpty {
            self.customerViewController.loadUrl(mainView: self.mainView, url: self.url)
            self.isLoadUrl = true
        }
    }
}


// 手势从左边滑动关闭设置webView
extension BaseWebViewController: UIGestureRecognizerDelegate {
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        return true
    }
}
