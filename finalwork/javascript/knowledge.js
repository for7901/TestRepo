// 花卉知识页面逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 知识分类标签切换
  const tagItems = getElements('.knowledge-tag');
  const knowledgeList = getElement('#knowledgeList');
  
  // 模拟知识数据
  const knowledgeData = {
    all: [
      {
        id: 1,
        title: '玫瑰的种植与养护技巧',
        img: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/2d2cfc4b627649d098f98cd7a254ea90.png~tplv-a9rns2rl98-24:720:720.png',
        time: '2025-01-15',
        view: 1243,
        brief: '玫瑰是喜光植物，需要充足的阳光和适当的水分，种植时应选择排水良好的土壤...'
      },
      {
        id: 2,
        title: '百合常见病虫害防治',
        img: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/099e9793770848748058fa0992c51515.png~tplv-a9rns2rl98-24:720:720.png',
        time: '2025-02-20',
        view: 876,
        brief: '百合在生长过程中容易受到蚜虫和白粉病的影响，定期喷洒杀虫剂和杀菌剂可以有效预防...'
      },
      {
        id: 3,
        title: '多肉植物浇水指南',
        img: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/2b351fd2d9bf42ba8b4e7ba56edd6501.png~tplv-a9rns2rl98-24:720:720.png',
        time: '2025-03-05',
        view: 2154,
        brief: '多肉植物耐旱怕涝，浇水应遵循"见干见湿"原则，夏季避免正午浇水，冬季减少浇水频率...'
      }
    ],
    planting: [
      {
        id: 4,
        title: '春季花卉种植最佳时间',
        img: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/2d2cfc4b627649d098f98cd7a254ea90.png~tplv-a9rns2rl98-24:720:720.png',
        time: '2025-02-10',
        view: 987,
        brief: '春季气温回升后，当土壤温度稳定在10℃以上时适合大多数花卉种植，尤其是球根花卉...'
      }
    ],
    pest: [
      {
        id: 5,
        title: '常见花卉害虫识别与防治',
        img: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/099e9793770848748058fa0992c51515.png~tplv-a9rns2rl98-24:720:720.png',
        time: '2025-01-28',
        view: 1562,
        brief: '蚜虫、红蜘蛛和介壳虫是花卉常见害虫，可采用生物防治和化学防治相结合的方法处理...'
      }
    ]
  };

  // 渲染知识列表
  function renderKnowledge(data) {
    knowledgeList.innerHTML = '';
    if (data.length === 0) {
      knowledgeList.innerHTML = '<div class="no-data">暂无相关知识文章</div>';
      return;
    }

    data.forEach(item => {
      const card = createElement('div', { class: 'knowledge-card' });
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="knowledge-img">
        <div class="knowledge-content">
          <h3 class="knowledge-title">${item.title}</h3>
          <div class="knowledge-meta">
            <span><i class="fa fa-calendar"></i> ${item.time}</span>
            <span><i class="fa fa-eye"></i> ${item.view} 阅读</span>
          </div>
          <p class="knowledge-brief">${item.brief}</p>
          <a href="knowledge-detail.html?id=${item.id}" class="btn btn-primary">阅读全文</a>
        </div>
      `;
      knowledgeList.appendChild(card);
    });
  }

  // 初始渲染全部知识
  renderKnowledge(knowledgeData.all);

  // 标签点击事件
  tagItems.forEach(tag => {
    on(tag, 'click', function() {
      // 切换激活状态
      tagItems.forEach(t => removeClass(t, 'active'));
      addClass(this, 'active');
      
      // 获取标签类型
      const type = this.dataset.type || 'all';
      // 渲染对应数据
      renderKnowledge(knowledgeData[type] || knowledgeData.all);
    });
  });

  // 分页功能
  const pageBtns = getElements('.page-btn');
  pageBtns.forEach(btn => {
    on(btn, 'click', function() {
      pageBtns.forEach(b => removeClass(b, 'active'));
      addClass(this, 'active');
      // 实际项目中应根据页码加载对应数据
    });
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
});