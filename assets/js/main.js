// 数据配置 - 只保留Demo作品

const videosData = [
    {
        id: 1,
        title: "滚动棋子",
        description: "一个控制骰子的地牢策略闯关游戏。",
        filePath: "作品/滚动棋子.mp4",
        duration: "视频演示"
    },
    {
        id: 2,
        title: "鼠标",
        description: "一个控制鼠标的肉鸽游戏。",
        filePath: "作品/鼠标.mp4",
        duration: "视频演示"
    }
];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    renderVideos();
    initializeSmoothScrolling();
});



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


