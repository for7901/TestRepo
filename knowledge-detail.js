// 知识详情页逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取URL中的文章ID参数
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  
  // 模拟文章详细数据
  const articlesData = {
    1: {
      id: 1,
      title: '不同花卉的浇水技巧大全',
      tag: '浇水',
      date: '2025-08-15',
      views: 1258,
      content: `
        <p>浇水是养花过程中最基础也最重要的环节之一，但很多花友常常掌握不好浇水的分寸。本文将详细介绍不同类型花卉的浇水技巧，帮助你成为浇水"高手"。</p>
        
        <h2>一、浇水的基本原则</h2>
        <p>无论什么花卉，浇水都应遵循"见干见湿"的基本原则。即等到盆土表面干燥后再浇水，浇水时要一次性浇透，直到盆底有水渗出为止。</p>
        
        <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.yollt3Kv_6aRDrDPhR1LVwHaFQ?w=260&h=184&c=7&r=0&o=7&cb=ucfimgc2&dpr=2&pid=1.7&rm=3" alt="花卉浇水">
        
        <h2>二、不同类型花卉的浇水技巧</h2>
        
        <h3>1. 草本花卉</h3>
        <p>草本花卉根系较浅，对水分反应敏感，夏季蒸发快时可早晚各浇一次水，冬季则应减少浇水次数，保持土壤微干。</p>
        
        <h3>2. 木本花卉</h3>
        <p>木本花卉如月季、栀子花等，根系发达，浇水间隔可适当延长，一般在盆土表面2-3厘米干燥后再浇水。花期前后可适当增加浇水量。</p>
        
        <h3>3. 多肉植物</h3>
        <p>多肉植物耐旱怕涝，浇水应"宁干勿湿"，夏季高温和冬季低温时都要控制浇水，甚至断水。浇水时避免浇到叶片上，以防腐烂。</p>
        
        <h3>4. 水生花卉</h3>
        <p>如荷花、睡莲等，需要生活在水中，应保持一定的水位，避免缺水导致生长不良。</p>
        
        <h2>三、浇水时间的选择</h2>
        <p>夏季应选择早晨或傍晚浇水，避免正午高温时浇水；冬季则应在正午气温较高时浇水，避免水温过低刺激根系。</p>
        
        <h2>四、浇水常见误区</h2>
        <ul>
          <li>误区一：每天固定时间浇水，不看土壤干湿情况</li>
          <li>误区二：浇水只浇表面，没有浇透</li>
          <li>误区三：用冷水直接浇灌，尤其是冬季</li>
          <li>误区四：频繁少量浇水，导致"半截水"</li>
        </ul>
        
        <p>掌握正确的浇水方法需要长期实践，花友们应根据自己种植的花卉种类、气候条件和盆土情况灵活调整，才能让花卉健康生长。</p>
      `,
      related: [
        {id: 3, title: '多肉植物浇水指南'},
        {id: 6, title: '盆栽花卉浇水常见问题解答'},
        {id: 8, title: '季节性浇水调整技巧'}
      ]
    },
    2: {
      id: 2,
      title: '常见花卉病虫害防治指南',
      tag: '病虫害',
      date: '2025-07-28',
      views: 986,
      content: `
        <p>花卉在生长过程中难免会受到病虫害的侵袭，及时发现并采取正确的防治措施，才能让花卉健康生长。本文总结了10种最常见的花卉病虫害及其防治方法。</p>
        
        <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.dIEpNpFMlP1zavNqPfoY1AHaEV?w=263&h=180&c=7&r=0&o=7&cb=ucfimgc2&dpr=2&pid=1.7&rm=3" alt="花卉病虫害防治">
        
        <h2>一、常见病害防治</h2>
        
        <h3>1. 白粉病</h3>
        <p><strong>症状：</strong>叶片上出现白色粉末状物质，严重时会导致叶片变黄脱落。</p>
        <p><strong>防治：</strong>加强通风，降低湿度。发病初期可喷洒多菌灵或甲基托布津溶液，每7-10天一次，连续2-3次。</p>
        
        <h3>2. 黑斑病</h3>
        <p><strong>症状：</strong>叶片上出现黑色圆形斑点，逐渐扩大并导致叶片枯萎。</p>
        <p><strong>防治：</strong>及时清除病叶并销毁。定期喷洒波尔多液或百菌清进行预防，发病后增加喷洒频率。</p>
        
        <h2>二、常见虫害防治</h2>
        
        <h3>1. 蚜虫</h3>
        <p><strong>症状：</strong>聚集在嫩梢和叶片背面，吸食汁液，导致叶片卷曲变形。</p>
        <p><strong>防治：</strong>少量蚜虫可人工清除或用清水冲洗。严重时可喷洒吡虫啉或敌敌畏乳油，注意喷洒叶片背面。</p>
        
        <h3>2. 红蜘蛛</h3>
        <p><strong>症状：</strong>叶片出现黄白色小点，严重时叶片枯黄脱落，叶片背面可见细小红色虫子。</p>
        <p><strong>防治：</strong>保持环境湿润，避免干燥。发病后可喷洒阿维菌素或克螨特，连续喷洒2-3次。</p>
        
        <h2>三、综合防治建议</h2>
        <ul>
          <li>加强养护管理，增强花卉抵抗力</li>
          <li>保持环境通风透光，减少病虫害滋生</li>
          <li>定期检查，早发现早治疗</li>
          <li>合理轮作，避免连作障碍</li>
          <li>尽量采用生物防治，减少化学农药使用</li>
        </ul>
        
        <p>病虫害防治的关键在于预防，日常养护中应注意观察花卉生长状况，发现异常及时处理，才能有效控制病虫害的蔓延。</p>
      `,
      related: [
        {id: 5, title: '常见花卉害虫识别与防治'},
        {id: 9, title: '家庭自制无公害杀虫剂'},
        {id: 12, title: '多肉植物病虫害防治要点'}
      ]
    }
  };
  
  // 获取当前文章数据
  const article = articlesData[articleId];
  if (!article) {
    // 未找到文章时显示提示
    document.querySelector('.knowledge-article').innerHTML = `
      <div class="no-data">
        <i class="fa fa-file-text-o"></i>
        <p>未找到该知识文章</p>
        <a href="knowledge.html" class="btn">返回知识列表</a>
      </div>
    `;
    return;
  }
  
  // 填充文章内容
  document.getElementById('articleTitle').textContent = article.title;
  document.getElementById('articleTitleBreadcrumb').textContent = article.title;
  document.getElementById('articleTag').textContent = article.tag;
  document.getElementById('articleDate').textContent = article.date;
  document.getElementById('articleViews').textContent = article.views;
  document.getElementById('articleContent').innerHTML = article.content;
  
  // 渲染相关文章
  const relatedContainer = document.getElementById('relatedArticles');
  article.related.forEach(item => {
    const li = createElement('li');
    li.innerHTML = `<a href="knowledge-detail.html?id=${item.id}">${item.title}</a>`;
    relatedContainer.appendChild(li);
  });
  
  // 评论功能
  const commentInput = document.getElementById('commentInput');
  const commentBtn = document.getElementById('commentBtn');
  const commentList = document.getElementById('commentList');
  
  // 加载评论
  function loadComments() {
    const allComments = common.get('knowledgeComments') || [];
    const articleComments = allComments.filter(comment => comment.articleId === articleId);
    commentList.innerHTML = '';
    
    if (articleComments.length === 0) {
      commentList.innerHTML = '<div class="no-data"><p>暂无评论，快来发表第一条评论吧~</p></div>';
      return;
    }
    
    articleComments.forEach(comment => {
      const commentItem = createElement('div', { class: 'comment-item' });
      commentItem.innerHTML = `
        <div class="comment-header">
          <span class="comment-name">${comment.name}</span>
          <span class="comment-time">${comment.time}</span>
        </div>
        <p class="comment-text">${comment.content}</p>
      `;
      commentList.appendChild(commentItem);
    });
  }
  
  // 保存评论
  function saveComment(comment) {
    let allComments = common.get('knowledgeComments') || [];
    comment.id = Date.now().toString();
    comment.articleId = articleId;
    allComments.unshift(comment);
    common.set('knowledgeComments', allComments);
  }
  
  // 初始加载评论
  loadComments();
  
  // 发表评论
  commentBtn.addEventListener('click', function() {
    const content = commentInput.value.trim();
    if (!content) {
      alert('请输入评论内容');
      return;
    }
    
    const comment = {
      name: '花友',
      time: common.formatTime(),
      content: content
    };
    
    saveComment(comment);
    loadComments();
    commentInput.value = '';
  });
  
  // 点赞功能
  const likeBtn = document.querySelector('.like-btn');
  likeBtn.addEventListener('click', function() {
    if (this.classList.contains('liked')) {
      this.classList.remove('liked');
      this.innerHTML = '<i class="fa fa-thumbs-o-up"></i> 点赞';
    } else {
      this.classList.add('liked');
      this.innerHTML = '<i class="fa fa-thumbs-up"></i> 已点赞';
    }
  });
  
  // 收藏功能
  const collectBtn = document.querySelector('.collect-btn');
  let collectedArticles = common.get('collectedArticles') || [];
  
  // 初始化收藏状态
  if (collectedArticles.includes(articleId)) {
    collectBtn.classList.add('collected');
    collectBtn.innerHTML = '<i class="fa fa-heart"></i> 已收藏';
  }
  
  collectBtn.addEventListener('click', function() {
    if (this.classList.contains('collected')) {
      // 取消收藏
      this.classList.remove('collected');
      this.innerHTML = '<i class="fa fa-heart-o"></i> 收藏';
      collectedArticles = collectedArticles.filter(id => id !== articleId);
    } else {
      // 添加收藏
      this.classList.add('collected');
      this.innerHTML = '<i class="fa fa-heart"></i> 已收藏';
      collectedArticles.push(articleId);
    }
    common.set('collectedArticles', collectedArticles);
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