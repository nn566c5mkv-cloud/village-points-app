# GitHub部署与在线打包指南

## 一、准备工作

### 1.1 注册GitHub账号
- 访问 [GitHub官网](https://github.com)
- 点击"Sign up"注册账号
- 完成邮箱验证

### 1.2 安装Git（可选）
- 下载地址：https://git-scm.com/download/win
- 安装后可在命令提示符中使用Git命令

## 二、上传项目到GitHub

### 2.1 创建新仓库
1. 登录GitHub，点击右上角"+"号，选择"New repository"
2. 填写仓库信息：
   - Repository name：`village-points-app`（或其他名称）
   - Description：`村规民约积分查询系统`
   - 选择"Public"（公开仓库，GitHub Pages才能访问）
   - **不要**初始化README（我们已有项目文件）
3. 点击"Create repository"

### 2.2 上传文件（推荐使用GitHub网页）

#### 方法一：网页上传（推荐）
1. 进入刚创建的仓库页面
2. 点击"uploading an existing file"
3. 拖拽所有项目文件到上传区域
4. 点击"Commit changes"提交

#### 方法二：使用Git命令
```bash
# 打开项目目录
cd d:\YANG\新建文件夹 (2)\yang

# 初始化Git仓库（如果未初始化）
git init
git add .
git commit -m "Initial commit: 村规民约积分查询系统"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/village-points-app.git

# 推送代码到GitHub
git push -u origin main
```

### 2.3 创建必要文件
确保项目包含以下文件：
- ✅ `.github/workflows/deploy.yml`（已自动创建）
- ✅ `index.html`
- ✅ `manifest.json`
- ✅ `service-worker.js`
- ✅ `icons/icon.svg`

## 三、启用GitHub Pages

### 3.1 配置Pages
1. 进入仓库页面，点击"Settings"
2. 左侧菜单选择"Pages"
3. 在"Build and deployment"部分：
   - Source选择"Deploy from a branch"
   - Branch选择"gh-pages" / "(root)"
   - 点击"Save"
4. 等待部署完成（可能需要1-2分钟）

### 3.2 访问你的网站
- 访问地址：`https://你的用户名.github.io/village-points-app/`
- 或从Settings > Pages页面获取链接
- 记录此地址，后面打包APK需要用到

## 四、使用PWABuilder在线打包

### 4.1 访问PWABuilder
1. 打开浏览器访问：https://www.pwabuilder.com/
2. 点击"Start"

### 4.2 输入网站地址
1. 在输入框中粘贴你的GitHub Pages地址：
   ```
   https://你的用户名.github.io/village-points-app/
   ```
2. 点击"Analyze"

### 4.3 打包Android应用
1. 分析完成后，向下滚动到"Android"部分
2. 点击"Package"按钮
3. 等待打包完成
4. 点击"Download"下载APK文件

### 4.4 安装APK
1. 将下载的APK文件传输到手机
2. 在手机上打开文件
3. 按照提示完成安装
4. 首次安装可能需要允许"未知来源"应用

## 五、常见问题解决

### 5.1 GitHub Pages部署失败
- 确保仓库设置为Public
- 检查是否有index.html文件
- 等待几分钟后刷新页面

### 5.2 PWABuilder无法访问
- 检查GitHub Pages是否已部署成功
- 确认网站地址可正常访问
- 尝试使用其他浏览器

### 5.3 APK无法安装
- 在手机上启用"未知来源"安装权限
- 确保下载完整的APK文件
- 部分手机需要关闭"纯净模式"

### 5.4 应用无法离线使用
- 确保manifest.json配置正确
- 首次打开需要联网加载Service Worker
- 检查manifest.json中的start_url配置

## 六、更新应用

### 6.1 更新网站内容
1. 修改本地文件
2. 上传到GitHub（git add -> commit -> push）
3. GitHub Actions自动部署（1-2分钟）
4. 访问https://你的用户名.github.io/village-points-app/ 查看更新

### 6.2 重新打包APK
1. 访问PWABuilder
2. 重新输入网站地址
3. 下载新的APK
4. 安装到手机覆盖旧版本

## 七、补充说明

### 7.1 项目结构
```
village-points-app/
├── .github/
│   └── workflows/
│       └── deploy.yml      # 自动部署配置
├── icons/
│   └── icon.svg            # 应用图标
├── css/
│   ├── style.css           # 样式文件
│   └── icons.css           # 图标样式
├── js/
│   ├── app.js              # 主应用逻辑
│   └── data.js             # 数据管理
├── index.html              # 主页面
├── manifest.json           # PWA配置
├── service-worker.js       # 离线支持
└── package.json            # 项目配置
```

### 7.2 技术栈
- 前端：HTML5、CSS3、JavaScript
- PWA特性：Service Worker、Manifest
- 部署：GitHub Pages
- 打包：PWABuilder

### 7.3 功能特性
- 村规民约查询
- 居民积分查询
- 积分兑换商品
- 离线访问支持
- 手机应用安装

## 八、获取帮助

如遇到问题：
1. 查看GitHub Actions运行日志
2. 访问 https://docs.github.com/pages 查阅文档
3. 访问 https://docs.pwabuilder.com 查看PWABuilder文档
4. 确认manifest.json和service-worker.js配置正确
