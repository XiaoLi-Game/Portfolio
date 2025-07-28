# 简洁版作品集使用指南

## 🎯 重新制作完成！

按照您的要求，已经重新制作了一个更简洁、专业的版本：

### ✅ 实现的功能

1. **简洁布局**
   - 最大宽度：960px，居中显示
   - 边距留白：100px（桌面），16px（移动）
   - 固定导航栏，简洁设计

2. **PDF展示**
   ```html
   <iframe src="/your-work.pdf" width="100%" height="700px"></iframe>
   ```
   - 直接嵌入PDF，无需复杂的PDF.js
   - 高度：700px（桌面），500px（移动）
   - 自带下载按钮

3. **视频展示**
   ```html
   <video controls width="100%">
     <source src="/demo.mp4" type="video/mp4" />
   </video>
   ```
   - 原生HTML5 video标签
   - 16:9宽高比，自动适应
   - 圆角设计，微弱阴影

4. **字体和样式**
   - Inter字体，16-18px字号，1.6行距
   - 现代化配色方案
   - 响应式设计

## 📁 文件结构

```
├── index.html              # 主页面
├── assets/
│   ├── css/styles.css      # 样式文件
│   ├── js/main.js          # 脚本文件
│   └── *.pdf, *.mp4        # 媒体文件
├── demo.html               # 演示页面
└── USAGE.md                # 使用说明
```

## 🚀 如何使用

### 1. 添加PDF文档

在 `assets/js/main.js` 中更新：

```javascript
const documentsData = [
    {
        id: 1,
        title: "您的文档标题",
        description: "文档描述",
        filePath: "assets/your-document.pdf"
    }
];
```

### 2. 添加视频

在 `assets/js/main.js` 中更新：

```javascript
const videosData = [
    {
        id: 1,
        title: "您的视频标题",
        description: "视频描述",
        filePath: "your-video.mp4",
        duration: "2:33"
    }
];
```

### 3. 自定义样式

编辑 `assets/css/styles.css`，所有CSS变量都在文件顶部定义。

## ✨ 主要特点

- ✅ **极简设计**：符合现代审美
- ✅ **原生技术**：无复杂依赖
- ✅ **高性能**：快速加载
- ✅ **响应式**：完美适配各种设备
- ✅ **易维护**：代码简洁清晰

## 🎨 设计规范

- **最大宽度**：960px
- **边距**：100px（桌面），16px（移动）
- **PDF高度**：700px（桌面），500px（移动）
- **视频比例**：16:9
- **字体**：Inter, 16px, 1.6行距
- **主色调**：#2563eb

现在您拥有一个完全符合要求的简洁、专业作品集网站！🎉
