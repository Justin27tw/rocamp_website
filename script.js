document.addEventListener('DOMContentLoaded', function() {
    // 載入導覽列的 JavaScript 函數
    fetch('navbar.html') // 確保 'navbar.html' 的路徑正確，根據您的檔案位置調整
        .then(response => response.text())
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
                    if ((currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/')) && (linkHref === '#' || linkHref === '/' || linkHref === '/index.html')) {
                        if (link.textContent === '首頁') {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        }
                    }
                    // 處理其他頁面
                    else if (linkHref && currentPath.includes(linkHref) && linkHref !== '#') {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    // 注意：您原始的視差滾動代碼不屬於導覽列本身，如果需要，請在您的主頁面JS中保留。
    // 如果您需要將視差滾動部分也獨立出來，請告知。
});