#!/bin/bash

echo "=========================================="
echo "   村规民约积分查询系统 - Android打包工具"
echo "=========================================="
echo ""

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

check_dependencies() {
    echo "检查环境依赖..."
    
    local missing=""
    
    if ! command -v node &> /dev/null; then
        missing="$missing Node.js"
    fi
    
    if ! command -v npm &> /dev/null; then
        missing="$missing npm"
    fi
    
    if ! command -v npx &> /dev/null; then
        missing="$missing npx"
    fi
    
    if [ -n "$missing" ]; then
        echo "❌ 缺少必要依赖:$missing"
        echo ""
        echo "请先安装 Node.js:"
        echo "  Windows: https://nodejs.org/"
        echo "  macOS: brew install node"
        echo "  Linux: sudo apt install nodejs npm"
        return 1
    fi
    
    echo "✅ Node.js 环境检查通过"
    return 0
}

install_dependencies() {
    echo ""
    echo "正在安装依赖..."
    npm install
    echo "✅ 依赖安装完成"
}

build_android() {
    echo ""
    echo "正在生成Android项目..."
    npx cap add android
    echo "✅ Android项目生成完成"
    
    echo ""
    echo "正在同步Web内容..."
    npx cap sync
    echo "✅ 内容同步完成"
    
    echo ""
    echo "正在编译APK..."
    cd android
    ./gradlew assembleDebug
    cd ..
    
    if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
        echo ""
        echo "=========================================="
        echo "   ✅ APK打包成功!"
        echo "=========================================="
        echo ""
        echo "APK文件位置:"
        echo "  $PROJECT_DIR/android/app/build/outputs/apk/debug/app-debug.apk"
        echo ""
        echo "将APK文件传到手机即可安装使用。"
    else
        echo "❌ APK编译失败，请检查错误信息"
    fi
}

open_android_studio() {
    echo ""
    echo "打开Android Studio..."
    npx cap open android
}

main() {
    echo "选项:"
    echo "  1) 安装依赖并打包APK"
    echo "  2) 仅同步并打包"
    echo "  3) 在Android Studio中打开"
    echo "  4) 退出"
    echo ""
    read -p "请选择操作 [1-4]: " choice
    
    case $choice in
        1)
            if check_dependencies; then
                install_dependencies
                build_android
            fi
            ;;
        2)
            build_android
            ;;
        3)
            open_android_studio
            ;;
        4)
            echo "退出"
            ;;
        *)
            echo "无效选项"
            ;;
    esac
}

main
