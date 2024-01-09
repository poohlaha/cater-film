//
//  ContentView.swift
//  Film
//
//  Created by Smile on 2024/1/8.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var mainWeb = MainWebViewModel()
    @ObservedObject var settingWeb = SettingWebViewModel()
    
    var body: some View {
        VStack {
            MainView(webView: mainWeb.webView).edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
        }.fullScreenCover(isPresented: $mainWeb.isSettingViewVisible) {
            SettingView(webView: settingWeb.webView)
        }
    }
}

#Preview {
    ContentView()
}
