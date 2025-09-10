// 全局变量 - 当前花卉名称
let flowerName = '';

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前花卉名称
  const urlParams = new URLSearchParams(window.location.search);
  flowerName = urlParams.get('flower');
  
  // 初始化页面数据
  initFlowerData();
  initCollectButton(); // 初始化收藏按钮
  initCommentFunction();
});

// 初始化花卉数据
function initFlowerData() {
  const flower = flowersData[flowerName];
  if (!flower) return;
  
  // 设置页面标题和面包屑
  document.title = flower.name + " - 花百科";
  document.getElementById('flowerNameBreadcrumb').textContent = flower.name;
  document.getElementById('flowerTitle').textContent = flower.name;
  
  // 设置花卉基本信息
  document.getElementById('scientificName').textContent = flower.scientificName;
  document.getElementById('family').textContent = flower.family;
  document.getElementById('bloomingPeriod').textContent = flower.bloomingPeriod;
  document.getElementById('origin').textContent = flower.origin;
  document.getElementById('flowerLanguage').textContent = flower.flowerLanguage;
  
  // 设置标签
  const tagsContainer = document.getElementById('flowerTags');
  flower.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });
  
  // 设置图片
  const mainImg = document.getElementById('mainImg');
  const thumbImgList = document.getElementById('thumbImgList');
  mainImg.src = flower.images[0];
  
  flower.images.forEach(img => {
    const thumbImg = document.createElement('div');
    thumbImg.className = 'thumb-img';
    thumbImg.innerHTML = `<img src="${img}" alt="${flower.name}">`;
    thumbImg.addEventListener('click', () => {
      mainImg.src = img;
    });
    thumbImgList.appendChild(thumbImg);
  });
  
  // 设置标签页内容
  document.getElementById('introTab').innerHTML = `<p>${flower.intro}</p>`;
  
  const careTab = document.getElementById('careTab');
  careTab.innerHTML = `
    <div class="care-item"><strong>光照：</strong>${flower.care.light}</div>
    <div class="care-item"><strong>浇水：</strong>${flower.care.water}</div>
    <div class="care-item"><strong>施肥：</strong>${flower.care.fertilizer}</div>
    <div class="care-item"><strong>修剪：</strong>${flower.care.pruning}</div>
  `;
  
  const diseaseTab = document.getElementById('diseaseTab');
  let diseaseHtml = '';
  flower.disease.forEach(disease => {
    diseaseHtml += `
      <div class="disease-item">
        <h4>${disease.name}</h4>
        <p><strong>症状：</strong>${disease.symptom}</p>
        <p><strong>防治：</strong>${disease.prevention}</p>
      </div>
    `;
  });
  diseaseTab.innerHTML = diseaseHtml;
  
  // 初始化标签页切换
  initTabs();
  
  // 加载评论
  loadComments();
}

// 初始化标签页
function initTabs() {
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有活跃状态
      tabItems.forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // 添加当前活跃状态
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}Tab`).classList.add('active');
    });
  });
}

// 初始化收藏按钮状态
function initCollectButton() {
  const collectBtn = document.getElementById('collectBtn');
  const collectedFlowers = storage.get('collectedFlowers') || [];
  
  // 检查是否已收藏
  if (collectedFlowers.includes(flowerName)) {
    collectBtn.innerHTML = '<i class="fa fa-heart"></i> 已收藏';
    collectBtn.classList.add('collected');
  }
  
  // 绑定收藏点击事件
  collectBtn.addEventListener('click', toggleCollection);
}

// 切换收藏状态
function toggleCollection() {
  const collectBtn = document.getElementById('collectBtn');
  let collectedFlowers = storage.get('collectedFlowers') || [];
  const index = collectedFlowers.indexOf(flowerName);
  
  if (index > -1) {
    // 取消收藏
    collectedFlowers.splice(index, 1);
    collectBtn.innerHTML = '<i class="fa fa-heart-o"></i> 收藏';
    collectBtn.classList.remove('collected');
    alert('已取消收藏');
  } else {
    // 添加收藏
    collectedFlowers.push(flowerName);
    collectBtn.innerHTML = '<i class="fa fa-heart"></i> 已收藏';
    collectBtn.classList.add('collected');
    alert('收藏成功');
  }
  
  // 保存到本地存储
  storage.set('collectedFlowers', collectedFlowers);
}

// 初始化评论功能
function initCommentFunction() {
  const commentBtn = document.getElementById('commentBtn');
  commentBtn.addEventListener('click', function() {
    const commentInput = document.getElementById('commentInput');
    const content = commentInput.value.trim();
    
    if (!content) {
      alert('请输入评论内容');
      return;
    }
    
    // 获取当前用户信息
    const userInfo = storage.get('userInfo') || { name: '匿名用户' };
    
    // 创建新评论
    const newComment = {
      id: Date.now().toString(),
      flower: flowerName,
      name: userInfo.name,
      content: content,
      time: new Date().toLocaleString(),
      like: 0
    };
    
    // 保存评论
    const allComments = storage.get('comments') || [];
    allComments.push(newComment);
    storage.set('comments', allComments);
    
    // 重新加载评论
    loadComments();
    
    // 清空输入框
    commentInput.value = '';
  });
}

// 加载本地存储的评论（按花卉名称区分）
function loadComments() {
  const allComments = storage.get('comments') || [];
  // 过滤出当前花卉的评论
  const flowerComments = allComments.filter(comment => comment.flower === flowerName);
  const commentList = document.getElementById('commentList');
  commentList.innerHTML = ''; // 清空列表
  
  if (flowerComments.length === 0) {
    commentList.innerHTML = '<div class="no-data" style="padding: 30px 0;"><p>暂无评论，快来发表第一条评论吧~</p></div>';
    return;
  }
  
  flowerComments.forEach(comment => {
    const commentItem = createElement('div', { 
      class: 'comment-item',
      dataset: { id: comment.id }
    });
    
    // 评论内容结构
    commentItem.innerHTML = `
      <div class="comment-avatar">
        <img src="./assets/images/icons/avatar-default.png" alt="用户头像">
      </div>
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-name">${comment.name}</span>
          <span class="comment-time">${comment.time}</span>
        </div>
        <p class="comment-text">${comment.content}</p>
        <div class="comment-actions">
          <button class="like-btn"><i class="fa fa-thumbs-o-up"></i> 点赞(${comment.like})</button>
        </div>
      </div>
    `;
    
    commentList.appendChild(commentItem);
  });
}