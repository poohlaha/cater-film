//
//  ContentView.swift
//  Film
//
//  Created by Smile on 2024/1/8.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var web = WebViewModel()
    
    var body: some View {
        VStack {
            MainView(webView: web.webView)
        }
    }
}

#Preview {
    ContentView()
}
