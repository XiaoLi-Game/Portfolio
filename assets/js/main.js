// 数据配置
const documentsData = [
    {
        id: 1,
        title: "BUMP！SuperBrawl深度体验与拆解分析报告",
        description: "对BUMP！SuperBrawl游戏的深度分析报告，包含游戏机制、用户体验和商业模式分析。",
        filePath: "作品\文档\BUMP！SuperBrawl深度体验与拆解分析报告.pdf"
    }
    // 添加更多文档...
];

const videosData = [
    {
        id: 1,
        title: "滚动棋子",
        description: "一个控制骰子的地牢策略闯关游戏",
        filePath: "作品\文档\Demo\滚动棋子.mp4",
        duration: "1:15"
    },

    {
        id: 2,
        title: "鼠标",
        description: "一个控制鼠标的肉鸽游戏",
        filePath: "作品\文档\Demo\鼠标.mp4",
        duration: "1:11"
    }
    // 添加更多视频...
];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    renderDocuments();
    renderVideos();
    initializeSmoothScrolling();
});

// 渲染文档
function renderDocuments() {
    const container = document.querySelector('#documents .content-grid');

    documentsData.forEach(doc => {
        const documentElement = createDocumentElement(doc);
        container.appendChild(documentElement);
    });
}

// 创建文档元素
function createDocumentElement(doc) {
    const article = document.createElement('article');
    article.className = 'pdf-document';

    article.innerHTML = `
        <header class="pdf-header">
            <h3 class="pdf-title">${doc.title}</h3>
            <p class="pdf-description">${doc.description}</p>
        </header>
        <iframe
            src="${doc.filePath}"
            class="pdf-viewer"
            title="${doc.title}"
            loading="lazy">
        </iframe>
        <footer class="pdf-actions">
            <a href="${doc.filePath}"
               download="${doc.title}.pdf"
               class="download-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                下载PDF
            </a>
        </footer>
    `;

    return article;
}

// 渲染视频
function renderVideos() {
    const container = document.querySelector('#videos .content-grid');

    videosData.forEach(video => {
        const videoElement = createVideoElement(video);
        container.appendChild(videoElement);
    });
}

// 创建视频元素
function createVideoElement(video) {
    const article = document.createElement('article');
    article.className = 'video-container';

    article.innerHTML = `
        <header class="video-header">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
        </header>
        <div class="video-player">
            <video
                controls
                preload="metadata"
                width="100%">
                <source src="${video.filePath}" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
        </div>
        <footer class="video-controls">
            <span class="video-duration">${video.duration}</span>
        </footer>
    `;

    return article;
}

// 初始化平滑滚动
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑固定导航栏高度

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}


