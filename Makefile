SHELL := /bin/bash
help:
	@echo "webInstall - install web dependencies"
	@echo "run - run application"
	@echo "build - build application"
	@echo "tools - build tools"


# 定义根路径
ROOT_ENCLOSURE_DIR = app
ROOT_WEB_DIR = packages/web

# 安装 web 依赖
webInstall:
	cd $(ROOT_WEB_DIR) && pnpm i

run:
	$(call webInstall)
	cd $(ROOT_ENCLOSURE_DIR) && pnpm i && pnpm tauri dev

runIOS:
	$(call webInstall)
	cd $(ROOT_ENCLOSURE_DIR) && pnpm i && pnpm tauri ios init && pnpm tauri ios dev

runAndroid:
	$(call webInstall)
	cd $(ROOT_ENCLOSURE_DIR) && pnpm i && pnpm tauri android init && pnpm tauri ios dev

build:
	$(call webInstall)
	cd $(ROOT_ENCLOSURE_DIR) && pnpm i && pnpm tauri build



