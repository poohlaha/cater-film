# cater film

# 打包遇到问题
  1. GCC_PREPROCESSOR_DEFINITIONS: parameter null or not set
  ```
  look `XCode` 
  `Build Settings` -> TARGETS -> `Apple Clang - Preprocssing -> Preprocessor Macros -> release -> DEBUG=0
  ```

http://23.225.92.244:12345/tiankong.php/v6/index_video?token=&csrf=
http://23.225.92.244:12345/tiankong.php/v6/index_video?token=&csrf=MdLGCYNldHX7cwBG%2FDaaRxHNDjtb2lChNClGgoZnkz%2F9hWY17o1ylmuJmCaIDHPn7%2BFpy9XwcJaXw49yUtFpZpiADbcaFW%2B4wcG4RLAJSTLKdxxLLU2%2FZUXC%2FsyPrlpxoLgpsbSuw4kRr7JwDBq6h8PrKuO9nVUBz1ZQLCYAr7k%3D

# 生成 `swift` 中的 `xxxlib.a` 文件
具体请看: https://book.showgp.com/3Practices/3rust_swift_interop

```shell
rustup target add aarch64-apple-ios x86_64-apple-ios
cargo install cargo-lipo
cargo lipo --release
```