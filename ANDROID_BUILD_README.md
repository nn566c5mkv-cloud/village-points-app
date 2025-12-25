# Android APK 打包指南

## 概述

本项目支持通过 Capacitor 将 PWA 应用打包为 Android APK 安装包。

## 环境要求

### 必须安装的软件

1. **Node.js** (v14 或更高版本)
   - 下载地址: https://nodejs.org/
   - 安装后验证: `node --version`

2. **Java JDK** (v11 或更高版本)
   - 下载地址: https://www.oracle.com/java/technologies/downloads/
   - 或使用 OpenJDK: https://adoptium.net/
   - 需要配置 JAVA_HOME 环境变量

3. **Android Studio** (可选，用于调试)
   - 下载地址: https://developer.android.com/studio
   - 安装后需要安装 Android SDK

### Android SDK 配置

如果使用 Android Studio:
1. 打开 Android Studio
2. 进入 "SDK Manager"
3. 安装以下组件:
   - Android SDK Platform (最新版本)
   - Android SDK Build-Tools (最新版本)
   - Android SDK Command-line Tools

如果只使用命令行:
```bash
# 安装 sdkmanager (在 Android Studio 中)
# 或通过命令行工具

# 设置环境变量
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

## 打包步骤

### 方式一：使用批处理脚本（推荐）

1. **安装依赖并打包**
   ```bash
   build-android.bat
   ```
   选择选项 `1` 执行完整打包流程。

2. **仅打包（跳过依赖安装）**
   ```bash
   build-android.bat
   ```
   选择选项 `2`。

3. **在 Android Studio 中打开**
   ```bash
   build-android.bat
   ```
   选择选项 `3`，可在 Android Studio 中进行调试和签名。

### 方式二：手动执行命令

1. **安装依赖**
   ```bash
   npm install
   ```

2. **添加 Android 平台**
   ```bash
   npx cap add android
   ```

3. **同步 Web 内容**
   ```bash
   npx cap sync
   ```

4. **编译 APK**
   ```bash
   cd android
   ./gradlew assembleDebug
   cd ..
   ```

## APK 文件位置

打包成功后，APK 文件位于:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 安装 APK

1. **传输 APK 到手机**
   - 通过数据线连接电脑和手机
   - 或使用网盘、微信等工具传输

2. **在手机上安装**
   - 打开文件管理器
   - 点击 APK 文件
   - 允许安装未知来源应用
   - 完成安装

## 签名 APK（正式发布）

### 创建签名密钥

```bash
keytool -genkeypair -v -storetype PKCS12 -keyalg RSA -keysize 2048 \
  -validity 10000 -keystore my-release-key.jks \
  -alias my-alias-name
```

### 对 APK 签名

```bash
# 1. 将 APK 转换为 release 版本
cd android
./gradlew assembleRelease
cd ..

# 2. 使用 apksigner 签名
apksigner sign --ks my-release-key.jks \
  --ks-key-alias my-alias-name \
  --out app-release-signed.apk \
  android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 优化 APK（可选）

```bash
zipalign -v 4 app-release-signed.apk app-release-aligned.apk
```

## 常见问题

### 问题 1：找不到 Java

```
'java' is not recognized as an internal or external command
```

**解决方法：**
1. 确保已安装 JDK
2. 配置 JAVA_HOME 环境变量:
   ```
   JAVA_HOME=C:\Program Files\Java\jdk-11
   PATH=%JAVA_HOME%\bin
   ```

### 问题 2：Gradle 编译失败

```
Gradle build failed
```

**解决方法：**
1. 检查 Android SDK 是否正确安装
2. 确保网络连接正常（需要下载依赖）
3. 尝试清理构建:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

### 问题 3：APK 无法安装

```
App not installed
```

**解决方法：**
1. 检查手机是否已安装相同应用（先卸载）
2. 确保手机系统版本 >= Android 5.0
3. 确认 APK 与手机架构兼容（arm64-v8a, armeabi-v7a, x86）

### 问题 4：应用无法加载内容

```
net::ERR_INTERNET_DISCONNECTED
```

**解决方法：**
1. 确保 `capacitor.config.json` 中的 server.url 配置正确
2. 检查网络连接
3. 在 Android 11+ 设备上，可能需要在 `AndroidManifest.xml` 中添加网络权限

## 配置文件说明

### package.json
```json
{
  "name": "village-points-app",
  "appId": "com.village.pointsapp",
  "webDir": ".",
  "bundledWebRuntime": false
}
```

| 配置项 | 说明 |
|--------|------|
| appId | 应用包名，格式: com.example.appname |
| webDir | Web 资源目录，当前项目使用根目录 |
| bundledWebRuntime | 是否捆绑 WebView 运行时 |

### AndroidManifest.xml 权限

应用已自动添加以下权限:
- `INTERNET`: 网络访问
- `ACCESS_NETWORK_STATE`: 网络状态检测

## 发布到应用商店

### Google Play

1. 创建 Google Play 开发者账号
2. 准备应用截图和描述
3. 生成签名 APK
4. 在 Play Console 中创建应用
5. 上传 APK 并填写信息
6. 提交审核

### 国内应用商店

可上传 APK 到以下平台:
- 华为应用市场
- 小米应用商店
- OPPO 软件商店
- vivo 应用商店
- 腾讯应用宝

## 更新应用

1. 修改 Web 内容
2. 重新打包:
   ```bash
   npx cap sync
   cd android
   ./gradlew assembleDebug
   cd ..
   ```
3. 发布新 APK

## 技术原理

Capacitor 工作流程:
```
PWA Web 应用
    ↓
Capacitor WebView 容器
    ↓
Android 原生应用
    ↓
APK 安装包
```

## 推荐方式

对于本项目，**推荐使用 PWABuilder 在线打包**：

1. 访问 https://pwabuilder.com/
2. 输入你的网站 URL
3. 选择 Android 平台
4. 下载 APK

这种方式：
- ✅ 简单快捷
- ✅ 无需配置复杂环境
- ✅ 自动处理签名
- ✅ 适合快速部署测试
