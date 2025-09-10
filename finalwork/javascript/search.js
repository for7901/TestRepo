// 搜索结果页面逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取URL中的搜索关键词
  function getSearchKeyword() {
    const params = new URLSearchParams(window.location.search);
    return params.get('keyword') || '';
  }

  // 从flowerData转换为搜索所需格式
  const allFlowers = Object.values(flowersData).map(flower => ({
    name: flower.name,
    img: flower.images[0],
    desc: flower.intro.substring(0, 100) + '...',
    tag: flower.tags.join('、'),
    url: `detail.html?flower=${encodeURIComponent(flower.name)}`,
    scientificName: flower.scientificName,
    family: flower.family,
    flowerLanguage: flower.flowerLanguage,
    bloomingPeriod: flower.bloomingPeriod,
    origin: flower.origin,
    care: flower.care,
    disease: flower.disease
  }));

  // 从花卉数据中提取知识文章
  const allArticles = [];
  Object.values(flowersData).forEach(flower => {
    // 养护知识
    allArticles.push({
      title: `${flower.name}的养护技巧`,
      time: '2025-04-10',
      author: '花百科',
      view: Math.floor(Math.random() * 2000) + 500,
      desc: `${flower.name}是${flower.family}植物，${flower.care.light.substring(0, 80)}...`,
      url: `knowledge-detail.html?flower=${encodeURIComponent(flower.name)}&type=care`
    });
    
    // 病虫害防治知识
    if (flower.disease && flower.disease.length > 0) {
      flower.disease.forEach(disease => {
        allArticles.push({
          title: `${flower.name}的${disease.name}防治方法`,
          time: '2025-03-20',
          author: '花匠',
          view: Math.floor(Math.random() * 1500) + 300,
          desc: `${flower.name}的${disease.name}症状为：${disease.symptom.substring(0, 80)}...`,
          url: `knowledge-detail.html?flower=${encodeURIComponent(flower.name)}&disease=${encodeURIComponent(disease.name)}`
        });
      });
    }
  });

  // DOM元素获取工具函数
  function getElement(selector) {
    return document.querySelector(selector);
  }

  // 创建元素工具函数
  function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(key => {
      element.setAttribute(key, attributes[key]);
    });
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  }

  // 事件绑定工具函数
  function on(element, event, handler) {
    element.addEventListener(event, handler);
  }

  // 样式设置工具函数
  function setStyle(element, styles) {
    Object.keys(styles).forEach(key => {
      element.style[key] = styles[key];
    });
  }

  // DOM元素
  const keywordEl = getElement('#searchKeyword');
  const flowersResult = getElement('#flowersResult');
  const knowledgeResult = getElement('#knowledgeResult');
  const noResult = getElement('#noResult');
  const searchInput = getElement('#searchInput');
  const searchBtn = getElement('#searchBtn');

  // 初始化页面
  function initPage() {
    const keyword = getSearchKeyword();
    if (keyword) {
      keywordEl.textContent = keyword;
      searchInput.value = keyword;
      searchAndRender(keyword);
    }
  }

  // 搜索并渲染结果
  function searchAndRender(keyword) {
    if (!keyword.trim()) return;
    
    const lowerKeyword = keyword.toLowerCase();
    
    // 搜索花卉（更全面的搜索范围）
    const matchedFlowers = allFlowers.filter(flower => 
      flower.name.toLowerCase().includes(lowerKeyword) ||
      flower.scientificName.toLowerCase().includes(lowerKeyword) ||
      flower.family.toLowerCase().includes(lowerKeyword) ||
      flower.flowerLanguage.toLowerCase().includes(lowerKeyword) ||
      flower.bloomingPeriod.toLowerCase().includes(lowerKeyword) ||
      flower.origin.toLowerCase().includes(lowerKeyword) ||
      flower.desc.toLowerCase().includes(lowerKeyword) ||
      flower.tag.toLowerCase().includes(lowerKeyword) ||
      Object.values(flower.care).some(careItem => 
        careItem.toLowerCase().includes(lowerKeyword)
      ) ||
      (flower.disease && flower.disease.some(disease => 
        disease.name.toLowerCase().includes(lowerKeyword) ||
        disease.symptom.toLowerCase().includes(lowerKeyword)
      ))
    );

    // 搜索知识文章
    const matchedArticles = allArticles.filter(article => 
      article.title.toLowerCase().includes(lowerKeyword) || 
      article.desc.toLowerCase().includes(lowerKeyword)
    );

    // 渲染结果
    renderFlowerResults(matchedFlowers);
    renderKnowledgeResults(matchedArticles);

    // 显示无结果提示
    if (matchedFlowers.length === 0 && matchedArticles.length === 0) {
      setStyle(noResult, { display: 'block' });
    } else {
      setStyle(noResult, { display: 'none' });
    }
  }

  // 渲染花卉搜索结果
  function renderFlowerResults(flowers) {
    flowersResult.innerHTML = '';
    
    if (flowers.length === 0) {
      flowersResult.innerHTML = '<p class="no-result-item">未找到相关花卉</p>';
      return;
    }
    
    flowers.forEach(flower => {
      const item = createElement('div', { class: 'flower-card' });
      item.innerHTML = `
        <img src="${flower.img}" alt="${flower.name}" class="flower-img">
        <div class="flower-info">
          <h3 class="flower-name">${flower.name} <span class="scientific-name">(${flower.scientificName})</span></h3>
          <span class="flower-tag">${flower.tag}</span>
          <p class="flower-desc">${flower.desc}</p>
          <div class="flower-meta">
            <span><i class="fa fa-calendar"></i> 花期: ${flower.bloomingPeriod}</span>
            <span><i class="fa fa-map-marker"></i> 原产地: ${flower.origin}</span>
          </div>
          <a href="${flower.url}" class="btn btn-detail">查看详情</a>
        </div>
      `;
      flowersResult.appendChild(item);
    });
  }

  // 渲染知识文章搜索结果
  function renderKnowledgeResults(articles) {
    knowledgeResult.innerHTML = '';
    
    if (articles.length === 0) {
      knowledgeResult.innerHTML = '<p class="no-result-item">未找到相关知识</p>';
      return;
    }
    
    articles.forEach(article => {
      const item = createElement('div', { class: 'knowledge-item' });
      item.innerHTML = `
        <h3 class="knowledge-title"><a href="${article.url}">${article.title}</a></h3>
        <div class="article-meta">
          <span><i class="fa fa-calendar"></i> ${article.time}</span>
          <span><i class="fa fa-user"></i> ${article.author}</span>
          <span><i class="fa fa-eye"></i> ${article.view} 阅读</span>
        </div>
        <p class="knowledge-desc">${article.desc}</p>
      `;
      knowledgeResult.appendChild(item);
    });
  }

  // 执行搜索
  function search(keyword) {
    if (keyword.trim()) {
      window.location.href = `search.html?keyword=${encodeURIComponent(keyword)}`;
    }
  }

  // 绑定搜索事件
  on(searchBtn, 'click', function() {
    search(searchInput.value);
  });

  on(searchInput, 'keydown', function(e) {
    if (e.key === 'Enter') {
      search(searchInput.value);
    }
  });

  // 回到顶部功能
  const backToTopBtn = getElement('#backToTop');
  on(window, 'scroll', function() {
    setStyle(backToTopBtn, { 
      display: window.scrollY > 300 ? 'block' : 'none' 
    });
  });

  on(backToTopBtn, 'click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 初始化
  initPage();
});