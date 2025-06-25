# Stealthed Reader · 隐形摸鱼阅读器

> _“鼠标悬停即显，移开瞬间隐身”_  
> 在办公室悄悄看小说、技术文档或任何 TXT 文件的桌面应用，支持 Windows / macOS / Linux。



---

## ✨ 主要特性

| 分类 | 详情 |
|------|------|
| 隐蔽模式 | *鼠标悬停* → 全不透明并可交互；*鼠标移出* → 0% 透明并忽略鼠标事件；支持 **Boss Key `Ctrl + Alt + Q`** 一键收起到托盘 |
| 文件管理 | 最近阅读、收藏夹；自动检测编码（UTF-8 / GBK / Shift-JIS…）|
| 阅读体验 | 按字数分页、记忆进度、章节目录（`第×章/回` 正则识别）、自动滚屏、搜索 & 高亮 |
| 外观主题 | 亮/夜间、字体/字号/行距、窗口透明度 0–100 %；支持「假装 Excel 界面」换肤 |
| 快捷键 | ←/→ 翻页 · F5 重新加载 · Esc 快速隐藏 · F3 查找下一处 · Boss Key 见上 |
| 打包体积 | Electron 版安装包 ≈ 100 MB；可选 PyQt 单文件版 ≈ 25 MB |
| 跨平台 | 代码即写即跑；electron-builder / PyInstaller 一键出 .exe 或 .dmg |

---

## 🚀 快速开始

```bash
git clone https://github.com/<you>/stealthed-reader.git
cd stealthed-reader
npm install                 # 第一次安装依赖
npm start                   # 开发模式运行
国内用户 推荐切换淘宝镜像
npm config set registry https://registry.npmmirror.com

🏗 本地打包 (.exe / .dmg)
bash
复制
编辑
npm run dist    # Windows: 生成 dist/*Setup.exe
# npm run dist:mac  # macOS 可选，需在 macOS 运行
或者双击根目录的 打包一键.bat（Windows）。

☁️ GitHub Actions 自动打包
已内置 .github/workflows/build.yml，推送到 main 分支后，Actions 会自动：

安装 Node.js 20

npm install（淘宝镜像）

npm run dist

上传 Artifacts → dist-win
下载后解压即可获得安装包。

⌨️ 快捷键速查
快捷键	功能
Ctrl + Alt + Q	Boss Key：隐藏/恢复
← / →	上/下一页
Esc	立即隐藏窗口
F5	重新加载当前文件
F3	查找并高亮下一处
Space	暂停/继续自动滚屏

📁 目录结构
bash
复制
编辑
stealthed-reader/
├─ renderer/            # 前端页面 (HTML/CSS/JS)
│  ├─ skins/            # Excel / Night 皮肤
│  └─ ...
├─ src/
│  ├─ modules/          # fileManager / pager / themes / autoScroll
│  └─ ...
├─ main.js              # Electron 主进程
├─ preload.js
├─ package.json
└─ README.md
🛠 技术栈
Electron 30 · HTML/CSS/JS

electron-builder 打包发行

chardet + iconv-lite 编码探测 & 解码

mousetrap / electron-localshortcut 全局/局部快捷键

可选 PyQt 6 + PyInstaller 轻量替代


MIT © 2025 Stealthed Reader Team

