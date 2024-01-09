// 设置视图

import SwiftUI

enum Settings {
    case mode;
    case version;
    case cache;
    case about;
}

struct SettingContentView: View {
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationStack {
            VStack {
                List {
                  NavigationLink("深色模式", value: Settings.mode)
                  NavigationLink("版本更新", value: Settings.version)
                  NavigationLink("清除缓存", value: Settings.cache)
                  NavigationLink("联系我们", value: Settings.about)
               }
                .navigationDestination(for: Settings.self) { settings in
                    Text("Link to \(settings.hashValue)")
               }
            }
            .navigationBarItems(
                leading: Button(action: {
                    // 关闭视图的动作
                    presentationMode.wrappedValue.dismiss()
                }) {
                    Image(systemName: "chevron.backward").imageScale(.large)
                }
            )
            .navigationBarTitle("设置", displayMode: .inline).background(Color.black)
        }.navigationViewStyle(StackNavigationViewStyle())
           
         
    }
}

#Preview {
    SettingContentView()
}

