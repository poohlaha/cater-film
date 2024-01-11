//
//  SettingViewController.swift
//  Film
//
//  Created by Smile on 2024/1/9.
//

import UIKit
import WebKit

class SettingViewController: BaseWebViewController {
 
    override func viewDidLoad() {
        super.viewDidLoad()
       
        super.initWebView(
            navigationProps: NavigationProps(need: true, title: "设置"),
            bounds: self.view.bounds,
            url: "/setting"
        )
    }
    
}
