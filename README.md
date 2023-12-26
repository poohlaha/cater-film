# cater film

# 打包遇到问题
  1. GCC_PREPROCESSOR_DEFINITIONS: parameter null or not set
  ```
  look `XCode` 
  `Build Settings` -> TARGETS -> `Apple Clang - Preprocssing -> Preprocessor Macros -> release -> DEBUG=0
  
  add Release to DEBUG=0
  ```