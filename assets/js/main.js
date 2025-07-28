// 文档数据配置
const documentsData = [
    {
        id: 1,
        title: "BUMP！SuperBrawl深度体验与拆解分析报告",
        description: "对BUMP！SuperBrawl游戏的深度分析报告，包含游戏机制、用户体验和商业模式分析。",
        filePath: "assets/BUMP！SuperBrawl深度体验与拆解分析报告.pdf",
        coverImage: null // 如果有封面图片，可以设置路径
    }
    // 可以添加更多文档
];

// 视频数据配置
const videosData = [
    {
        id: 1,
        title: "游戏演示视频",
        description: "展示游戏核心玩法和特色功能",
        filePath: "assets/2025-07-22 22-33-14.mp4",
        duration: "2:33"
    }
    // 可以添加更多视频
];

// PDF相关变量
let currentPDF = null;
let currentPage = 1;
let totalPages = 0;
let currentScale = 1.0;

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    // 配置PDF.js worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    initializeDocuments();
    initializeVideos();
    initializePDFModal();
    initializeVideoModal();
});

// 初始化文档卡片
function initializeDocuments() {
    const documentsGrid = document.getElementById('documentsGrid');

    documentsData.forEach(doc => {
        const docCard = createDocumentCard(doc);
        documentsGrid.appendChild(docCard);
    });
}

// 创建文档卡片
function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'document-card';
    card.onclick = () => openPDFModal(doc);

    card.innerHTML = `
        <div class="document-preview">
            <div class="loading">正在加载预览...</div>
        </div>
        <div class="document-info">
            <h3 class="document-title">${doc.title}</h3>
            <p class="document-description">${doc.description}</p>
        </div>
    `;

    // 异步加载PDF预览
    loadPDFPreview(doc.path, card.querySelector('.document-preview'));

    return card;
}

// 加载PDF预览
async function loadPDFPreview(pdfPath, previewContainer) {
    try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        // 计算合适的缩放比例
        const viewport = page.getViewport({ scale: 1 });
        const containerWidth = previewContainer.clientWidth || 280;
        const containerHeight = previewContainer.clientHeight || 396; // A4比例

        const scaleX = containerWidth / viewport.width;
        const scaleY = containerHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY) * 0.9; // 留一些边距

        const scaledViewport = page.getViewport({ scale });

        // 创建canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        // 渲染PDF页面
        await page.render({
            canvasContext: context,
            viewport: scaledViewport
        }).promise;

        // 替换loading内容
        previewContainer.innerHTML = '';
        previewContainer.appendChild(canvas);

    } catch (error) {
        console.error('PDF预览加载失败:', error);
        previewContainer.innerHTML = `
            <div class="loading">
                📄
                <span>预览加载失败</span>
            </div>
        `;
    }
}

// 初始化视频卡片
function initializeVideos() {
    const videosGrid = document.getElementById('videosGrid');

    videosData.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

// 创建视频卡片
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';

    card.innerHTML = `
        <div class="video-container">
            <video class="video-preview" preload="none" muted>
                <source src="${video.filePath}" type="video/mp4">
            </video>
            <div class="video-overlay">
                <div class="play-button" onclick="openVideoModal('${video.filePath}')">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5,3 19,12 5,21"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <span class="video-duration">${video.duration}</span>
        </div>
    `;

    // 优化悬停播放功能
    const videoElement = card.querySelector('.video-preview');
    let hoverTimeout;
    let isLoaded = false;

    card.addEventListener('mouseenter', () => {
        // 延迟加载和播放，避免不必要的网络请求
        hoverTimeout = setTimeout(() => {
            if (!isLoaded) {
                videoElement.preload = 'metadata';
                isLoaded = true;
            }
            videoElement.play().catch(e => {
                // 静默处理播放失败
            });
        }, 500);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        videoElement.pause();
        videoElement.currentTime = 0;
    });

    return card;
}

// 打开PDF模态框
function openPDFModal(doc) {
    const modal = document.getElementById('pdfModal');
    const modalTitle = document.getElementById('modalTitle');
    const downloadBtn = document.getElementById('downloadBtn');

    modalTitle.textContent = doc.title;
    downloadBtn.onclick = () => downloadPDF(doc.filePath, doc.title);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    loadPDF(doc.filePath);
}

// 加载PDF
async function loadPDF(pdfPath) {
    try {
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        currentPDF = await loadingTask.promise;
        totalPages = currentPDF.numPages;
        currentPage = 1;

        updatePageInfo();
        renderPage(currentPage);
    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('无法加载PDF文件');
    }
}

// 渲染PDF页面
async function renderPage(pageNum) {
    try {
        const page = await currentPDF.getPage(pageNum);
        const canvas = document.getElementById('pdfCanvas');
        const context = canvas.getContext('2d');

        const viewport = page.getViewport({ scale: currentScale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;
    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

// 更新页面信息
function updatePageInfo() {
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `${currentPage} / ${totalPages}`;
}

// 初始化PDF模态框
function initializePDFModal() {
    const modal = document.getElementById('pdfModal');
    const closeBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomLevel = document.getElementById('zoomLevel');

    // 关闭模态框
    closeBtn.onclick = closePDFModal;
    modal.onclick = (e) => {
        if (e.target === modal) closePDFModal();
    };

    // 页面导航
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
            updatePageInfo();
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
            updatePageInfo();
        }
    };

    // 缩放控制
    zoomInBtn.onclick = () => {
        currentScale += 0.25;
        if (currentScale > 3) currentScale = 3;
        renderPage(currentPage);
        zoomLevel.textContent = Math.round(currentScale * 100) + '%';
    };

    zoomOutBtn.onclick = () => {
        currentScale -= 0.25;
        if (currentScale < 0.5) currentScale = 0.5;
        renderPage(currentPage);
        zoomLevel.textContent = Math.round(currentScale * 100) + '%';
    };

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePDFModal();
        }
    });
}

// 关闭PDF模态框
function closePDFModal() {
    const modal = document.getElementById('pdfModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentPDF = null;
    currentPage = 1;
    currentScale = 1.0;
}

// 下载PDF
function downloadPDF(filePath, fileName) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 打开视频模态框
function openVideoModal(videoPath) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('fullscreenVideo');

    video.src = videoPath;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 初始化视频模态框
function initializeVideoModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeVideoModal');
    const video = document.getElementById('fullscreenVideo');

    // 关闭模态框
    closeBtn.onclick = closeVideoModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeVideoModal();
    };

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// 关闭视频模态框
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('fullscreenVideo');

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    video.pause();
    video.src = '';
}
