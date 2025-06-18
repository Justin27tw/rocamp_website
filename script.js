// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // 載入導覽列的 JavaScript 函數
    // 確保 'navbar.html' 的路徑正確，根據您的檔案結構調整。
    // 如果 navbar.html 和您的主 HTML 檔案在同一個目錄，直接寫 'navbar.html'。
    // 如果 navbar.html 在專案根目錄，而您的 js/script.js 也在根目錄，那路徑是 'navbar.html'。
    // 如果您的 js/script.js 在 js/ 目錄下，而 navbar.html 在專案根目錄，那路徑是 '../navbar.html'。
    // 根據您之前提供的結構，navbar.html 應該在專案根目錄，所以直接寫 'navbar.html' 可能是最常見的情況。
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                // 如果 HTTP 狀態碼不是 200-299，則拋出錯誤
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;

                // 處理導航項的 active 狀態
                const currentPath = window.location.pathname;
                const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
                navLinks.forEach(link => {
                    // 重置所有 active 狀態
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');

                    // 判斷並設定當前頁面的 active 狀態
                    const linkHref = link.getAttribute('href');

                    // 處理首頁的特殊情況（例如 href="#" 或 "/" 或 "/index.html"）
                    // 確保這裡的判斷邏輯符合您的路由習慣
                    if (
                        (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/')) &&
                        (linkHref === '#' || linkHref === '/' || linkHref === '/index.html')
                    ) {
                        if (link.textContent.trim() === '首頁') { // 使用 .trim() 避免空白字符影響判斷
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        }
                    }
                    // 處理其他頁面，檢查當前路徑是否包含導覽列項目的 href
                    else if (linkHref && linkHref !== '#' && currentPath.includes(linkHref)) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            // 您可以在這裡添加一些錯誤處理，例如顯示一個錯誤訊息
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = '<p style="color: red;">導覽列載入失敗。</p>';
            }
        });

    // 如果您有其他需要在 DOMContentLoaded 後執行的腳本（例如視差滾動），也可以放在這裡
    // 例如：
    // const bannerSection = document.querySelector('.banner-section');
    // if (bannerSection) {
    //     // 您的視差滾動或其他頁面專屬的 JS 邏輯
    // }
});