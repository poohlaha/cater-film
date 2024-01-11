// 详情

import UIKit
import WebKit

class DetailViewController: BaseWebViewController {
    
    var topView: WKWebView! // 顶部 webView
    var bottomView: WKWebView! // 底部 webView
    var hasLandscape: Bool = false // 是否横屏
    var topViewRect: CGRect!
    var navigationHeight: CGFloat!
    var statusBarHeight: CGFloat!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // main webView
        super.initWebView(
            navigationProps: NavigationProps(need: true, title: "详情"),
            bounds: self.view.bounds,
            url: ""
        )
        
        self.mainView.configuration.allowsInlineMediaPlayback = true // 允许 设备旋转
        self.mainView.configuration.allowsPictureInPictureMediaPlayback = true // 允许画中画
        navigationHeight = self.navigationController?.navigationBar.frame.size.height
        statusBarHeight = customerViewController.getTopNoSafeAreaHeight()
        print("navigationHeight: \(String(describing: navigationHeight))")
        print("statusBarHeight: \(String(describing: statusBarHeight))")
        
        initTopWebView()
        initBottomWebView()
        
        // 监听手机旋转
        NotificationCenter.default.addObserver(self, selector: #selector(orientationDidChange), name:UIDevice.orientationDidChangeNotification, object: nil)
    }
    
    func initTopWebView() {
        let bounds = self.view.bounds
        let height = bounds.height / 3
        let rect = CGRect(x: 0, y: 0, width: bounds.width, height: height)
        topViewRect = rect
        
        let config = WKWebViewConfiguration()
        topView = WKWebView(frame: rect, configuration: config)
        customerViewController.openSafariDebug(mainView: topView)
        self.mainView.addSubview(topView)
        
        addComponentsInTopWebView()
    }
    
    // 添加组件到 topWebView
    func addComponentsInTopWebView() {
        let imageView = UIImageView(image: UIImage(named: "test"))
        imageView.frame = CGRectMake(0, 0, topView.bounds.width, topView.bounds.height)
        topView.addSubview(imageView)
    }
    
    func initBottomWebView() {
        let bounds = self.view.bounds
       
        let height = bounds.height - topView.bounds.height
        let rect = CGRect(x: 0, y: topView.bounds.height, width: bounds.width, height: height)
        
        let config = customerViewController.initConfig()
        bottomView = WKWebView(frame: rect, configuration: config)
        bottomView.scrollView.isScrollEnabled = false // 不允许下拉
        customerViewController.openSafariDebug(mainView: bottomView)
        
        self.mainView.addSubview(bottomView)
        self.customerViewController.loadUrl(mainView: self.bottomView, url: "/detail")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    // 监听手机旋转
    @objc func orientationDidChange() {
        // 判断手机是不是横屏
        if UIDevice.current.orientation.isLandscape {
            print("横屏")
            // 判断顶部 webView 是否已经横过来了
            if hasLandscape {
                return
            }
            
            print("横屏 bounds: \(UIScreen.main.bounds)")
            // 把顶部的 webview 横过来，铺满整个屏幕
            topView.transform = CGAffineTransform(rotationAngle: CGFloat.pi / 2)
            let top = navigationHeight + statusBarHeight
            let landscapeHeight = UIScreen.main.bounds.height + top
            topView.frame = CGRect(x: 0, y: 0, width: landscapeHeight, height: UIScreen.main.bounds.width)
            print("横屏 topView bounds: \(topView.frame)")

            self.navigationController?.isNavigationBarHidden = true // 隐藏导航栏
            bottomView.isHidden = true
            hasLandscape = true
        } else {
            print("竖屏")
            print("竖屏 bounds: \(UIScreen.main.bounds)")
            hasLandscape = false
            // 竖屏了，把顶部的 webview 还原
            topView.transform = CGAffineTransform.identity
            topView.frame = topViewRect
            self.navigationController?.isNavigationBarHidden = false // 显示导航栏
            bottomView.isHidden = false
        }
    }
    
}
