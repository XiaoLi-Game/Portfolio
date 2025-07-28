# 小栗Game - 游戏策划作品集

一个现代化的游戏策划作品集网站，专为展示PDF策划文档和游戏演示视频而设计。采用极简设计理念，注重用户体验和性能优化。

## ✨ 功能特点

### 📄 PDF文档展示
- **智能预览**：内置PDF.js阅读器，支持在线预览
- **完整控制**：翻页、缩放、下载功能一应俱全
- **响应式设计**：适配各种屏幕尺寸
- **快速加载**：优化的加载策略，提升用户体验

### 🎥 视频演示
- **悬停预览**：鼠标悬停时智能预览播放
- **全屏播放**：点击进入沉浸式观看体验
- **性能优化**：延迟加载，减少不必要的网络请求
- **多格式支持**：支持MP4等主流视频格式

### 🎨 现代化设计
- **极简美学**：清爽的界面设计，突出内容本身
- **流畅动画**：精心设计的过渡效果和交互反馈
- **响应式布局**：完美适配桌面、平板、手机
- **无障碍访问**：遵循Web无障碍设计标准

### ⚡ 性能优化
- **资源预加载**：关键资源预加载，提升首屏速度
- **懒加载策略**：视频和图片按需加载
- **代码优化**：精简的CSS和JavaScript代码
- **缓存友好**：合理的缓存策略

## 📁 项目结构

```
├── index.html              # 主页面
├── favicon.svg             # 网站图标
├── assets/
│   ├── css/
│   │   └── styles.css      # 优化后的样式文件
│   ├── js/
│   │   └── main.js         # 主要JavaScript功能
│   ├── *.pdf               # PDF文档文件
│   └── *.mp4               # 视频文件
└── README.md               # 项目说明文档
```

## 🚀 快速开始

### 本地运行
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx serve .

# 然后访问 http://localhost:8000
```

### 在线部署
项目支持部署到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- 阿里云OSS
- 腾讯云COS

## 如何添加内容

### 添加PDF文档

1. 将PDF文件放入 `assets/` 文件夹
2. （可选）将封面图片放入 `assets/covers/` 文件夹
3. 在 `assets/js/main.js` 中的 `documentsData` 数组添加新文档信息：

```javascript
{
    id: 2,
    title: "文档标题",
    description: "文档描述",
    filePath: "assets/文档名称.pdf",
    coverImage: "assets/covers/封面图片.jpg" // 可选
}
```

### 添加视频

1. 将视频文件放入 `assets/` 文件夹
2. 在 `assets/js/main.js` 中的 `videosData` 数组添加新视频信息：

```javascript
{
    id: 2,
    title: "视频标题",
    description: "视频描述",
    filePath: "assets/视频名称.mp4",
    duration: "视频时长"
}
```

## 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画
- **JavaScript (ES6+)** - 交互功能
- **PDF.js** - PDF预览功能
- **响应式设计** - 适配各种设备

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 部署说明

### GitHub Pages 部署

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 访问 `https://用户名.github.io/仓库名`

### 本地预览

直接在浏览器中打开 `index.html` 文件即可预览。

注意：由于浏览器安全限制，PDF预览功能在本地文件系统中可能无法正常工作，建议通过HTTP服务器访问。

## 自定义配置

### 修改主题色彩

在 `assets/css/styles.css` 中修改CSS变量：

```css
:root {
  --primary-color: #2563eb;    /* 主色调 */
  --primary-hover: #1d4ed8;    /* 悬停色 */
  /* 其他颜色变量... */
}
```

### 修改网站标题

在 `index.html` 中修改：

```html
<title>你的网站标题</title>
<h1 class="logo">你的名称</h1>
<p class="subtitle">你的副标题</p>
```

## 许可证

MIT License - 可自由使用和修改。
