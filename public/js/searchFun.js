// 获取搜索框和内容元素
const searchBox = document.getElementById('search-box-wubu');
const searchBtn = document.getElementById('search-btn-wubu');
const content = document.getElementById('content-wubu');
const originalContent = content.innerHTML; // 获取原始文本

// 监听搜索框输入事件
searchBtn.addEventListener('click', function () {
    const searchText = searchBox.value.trim(); // 获取搜索内容
    updateHighlight(searchText)
});


function updateHighlight(searchText) {
    if (searchText) {
        // 清空之前的高亮
        content.innerHTML = originalContent;

        // 遍历内容容器的所有子节点
        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
        let firstMatch = null; // 记录第一个匹配的位置

        let spanArray = [], nodeArray = [];

        while (walker.nextNode()) {
            
            const node = walker.currentNode;
            const text = node.nodeValue;
            const regex = new RegExp(`(${searchText})`, 'gi'); // 创建正则表达式
            const highlightedText = text.replace(regex, '<span class="highlight-wubu">$1</span>'); // 高亮匹配内容

            if (highlightedText !== text) {
                // 创建新的 HTML 片段
                const span = document.createElement('span');
                span.innerHTML = highlightedText;

                spanArray.push(span)
                nodeArray.push(node)

            }
        }

        for (let index = 0; index < spanArray.length; index++) {
            const span = spanArray[index];
            const node = nodeArray[index];
            // 替换文本节点为高亮后的 HTML 片段
            node.parentNode.replaceChild(span, node);
            
            // 如果第一个匹配未记录，则记录位置
            if (!firstMatch) {
                firstMatch = span.querySelector('.highlight-wubu');
            }
        }

        // 如果有匹配内容，滚动到第一个匹配位置
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        // 如果没有搜索内容，恢复原始内容
        content.innerHTML = originalContent;
    }
}