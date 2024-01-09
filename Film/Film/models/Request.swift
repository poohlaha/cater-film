// Request 请求

import Foundation

class Request {
    
    func process(_ body: [String: Any]) -> String {
        guard let orderDict = body["order"] as? [String: Any],
              let name = body["name"] as? String else {
            // 处理 body 为 nil 或者缺少必要字段的情况
            return ""
        }
        
        var order = COrder(
            name: strdup(orderDict["name"] as? String ?? ""),
            class: strdup(orderDict["class"] as? String ?? ""),
            area: strdup(orderDict["area"] as? String ?? ""),
            lang: strdup(orderDict["lang"] as? String ?? ""),
            year: strdup(orderDict["year"] as? String ?? ""),
            sort: strdup(orderDict["sort"] as? String ?? ""),
            page: UInt64(orderDict["page"] as? Int ?? 1),
            tid: strdup(orderDict["tid"] as? String ?? ""),
            text: strdup(orderDict["text"] as? String ?? "")
        )
        
       
        let result = handle(name, &order)
        return String(cString: result!)
    }
}
