// dynamic-links.js
(function() {
    // 图片与对应的 API 地址映射
    const links = [
        { img: '/img/demo.png', api: 'http://dslyell.nat123.net:8111/pims-site/ipv6url.html' },
        { img: '/img/demo2.png', api: 'http://dslyell.nat123.net:8111/pims-site/ipv4url.html' }
    ];

    // 为单张图片绑定链接
    function bindLink({ img: imgSrc, api: apiUrl }) {
        const img = document.querySelector(`img[src="${imgSrc}"]`);
        if (!img) return;                       // 没有这张图片就跳过
        if (img.parentElement?.tagName === 'A') return; // 已绑定过

        fetch(apiUrl)
            .then(res => res.text())               // 获取完整 URL 文本
            .then(url => {
                url = url.trim();
                if (!url) return;
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';                 // 可选：新标签打开
                img.parentNode.insertBefore(a, img);
                a.appendChild(img);
            })
            .catch(err => console.warn(`绑定失败 (${imgSrc}):`, err));
    }

    // 执行所有绑定
    function bindAll() {
        links.forEach(bindLink);
    }

    // 页面加载时执行
    document.addEventListener('DOMContentLoaded', bindAll);
    // Butterfly 主题 PJAX 切换后重新执行
    document.addEventListener('pjax:complete', bindAll);
})();