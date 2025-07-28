// 数据配置
const documentsData = [
    {
        id: 1,
        title: "游戏策划文档示例1",
        description: "这是一个游戏策划文档的示例，展示游戏设计理念和核心玩法机制。",
        filePath: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
        id: 2,
        title: "游戏策划文档示例2",
        description: "这是第二个游戏策划文档示例，包含详细的系统设计和平衡性分析。",
        filePath: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
        id: 3,
        title: "游戏策划文档示例3",
        description: "这是第三个游戏策划文档示例，展示完整的游戏开发流程和规范。",
        filePath: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    }
];

const videosData = [
    {
        id: 1,
        title: "游戏Demo示例1",
        description: "这是一个游戏Demo示例，展示核心玩法和游戏特色。",
        filePath: "https://www.w3schools.com/html/mov_bbb.mp4",
        duration: "0:10"
    },
    {
        id: 2,
        title: "游戏Demo示例2",
        description: "这是第二个游戏Demo示例，展示完整的游戏流程和体验。",
        filePath: "https://www.w3schools.com/html/movie.mp4",
        duration: "0:13"
    }
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
        <div class="pdf-viewer">
            <div class="pdf-content">
                <h3>Firefox 无法打开此页面</h3>
                <p>为了保护您的安全，www.w3.org 禁不允许 Firefox 显示该页面，如果该网站包含恶意软件，或者是一个网络钓鱼网站，则打开该页面可能会危及您的计算机。</p>
                <a href="#" class="retry-link">再试一次...</a>
            </div>
            <div class="pdf-footer">
                <a href="${doc.filePath}" class="pdf-button" target="_blank">查看PDF</a>
            </div>
        </div>
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


