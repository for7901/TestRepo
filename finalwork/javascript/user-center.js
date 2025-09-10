// 用户中心页面逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 检查用户是否登录
  function checkLogin() {
    const userInfo = storage.get('userInfo');
    if (!userInfo) {
      // 未登录，跳转到登录页
      goToPage('login.html');
      return false;
    }
    return userInfo;
  }

  // DOM元素
  const userAvatarEl = getElement('#userAvatar');
  const usernameEl = getElement('#username');
  const lastLoginEl = getElement('#lastLogin');
  const joinTimeEl = getElement('#joinTime');
  const collectionsList = getElement('#collectionsList');
  const emptyCollections = getElement('#emptyCollections');
  const logoutBtn = getElement('#logoutBtn');
  const tabItems = document.querySelectorAll('.tab-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const settingsForm = getElement('#settingsForm');
  
  // 标签页切换
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      const tab = this.dataset.tab;
      
      // 更新标签样式
      tabItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      
      // 更新内容区域
      tabPanes.forEach(pane => pane.classList.remove('active'));
      getElement(`#${tab}Tab`).classList.add('active');
    });
  });

  // 初始化用户信息
  function initUserInfo(userInfo) {
    usernameEl.textContent = userInfo.username;
    lastLoginEl.textContent = userInfo.loginTime || formatTime();
    
    // 如果没有注册时间，设置一个默认值并保存
    if (!userInfo.joinTime) {
      userInfo.joinTime = '2025-01-15';
      storage.set('userInfo', userInfo);
    }
    joinTimeEl.textContent = userInfo.joinTime;
  }

  // 渲染收藏列表
  function renderCollectedFlowers() {
    const collected = storage.get('collectedFlowers') || [];
    
    // 显示/隐藏空状态
    if (collected.length === 0) {
      collectionsList.innerHTML = '';
      emptyCollections.style.display = 'block';
      return;
    } else {
      emptyCollections.style.display = 'none';
    }

    // 从花卉数据中匹配收藏的花卉
    const flowersData = [
      {
        name: '玫瑰',
        img: 'https://img95.699pic.com/photo/60063/2006.jpg_wh860.jpg',
        url: 'detail.html?flower=玫瑰'
      },
      {
        name: '百合',
        img: 'https://photo-static-api.fotomore.com/creative/vcg/veer/612/veer-101804271.jpg',
        url: 'detail.html?flower=百合'
      },
      {
        name: '多肉植物',
        img: 'https://img.shetu66.com/2024/04/24/171395364312771271.png',
        url: 'detail.html?flower=多肉植物'
      },
      {
        name: '茉莉',
        img: 'https://img95.699pic.com/photo/50250/7736.jpg_wh860.jpg',
        url: 'detail.html?flower=茉莉'
      },
      {
        name: '熏衣草',
        img: 'https://img95.699pic.com/photo/30506/5734.jpg_wh860.jpg',
        url: 'detail.html?flower=熏衣草'
      },
      {
        name: '月季',
        img: 'https://img.redocn.com/photo/20131020/Redocn_2013101818261367.jpg',
        url: 'detail.html?flower=月季'
      }
    ];

    collectionsList.innerHTML = '';
    collected.forEach(flowerName => {
      const flower = flowersData.find(f => f.name === flowerName);
      if (flower) {
        const item = createElement('div', { class: 'collection-item' });
        item.innerHTML = `
          <img src="${flower.img}" alt="${flower.name}" class="collection-img">
          <div class="collection-info">
            <h4 class="collection-name"><a href="${flower.url}">${flower.name}</a></h4>
          </div>
          <div class="collection-actions">
            <button class="btn btn-remove" data-name="${flower.name}">
              <i class="fa fa-trash"></i> 取消收藏
            </button>
          </div>
        `;
        collectionsList.appendChild(item);
      }
    });
  }

  // 取消收藏
  delegate(collectionsList, '.btn-remove', 'click', function() {
    const flowerName = this.dataset.name;
    let collected = storage.get('collectedFlowers') || [];
    collected = collected.filter(name => name !== flowerName);
    storage.set('collectedFlowers', collected);
    renderCollectedFlowers(); // 重新渲染列表
    
    // 显示提示
    alert(`已取消收藏 ${flowerName}`);
  });

  // 退出登录
  on(logoutBtn, 'click', function() {
    if (confirm('确定要退出登录吗？')) {
      storage.remove('userInfo');
      // 刷新导航栏状态
      updateNavbar();
      // 跳转到登录页
      goToPage('login.html');
    }
  });

  // 验证用户名
  function validateUsername(username) {
    if (!username) return '用户名不能为空';
    if (username.length < 2 || username.length > 20) return '用户名长度必须在2-20个字符之间';
    if (!/^[a-zA-Z0-9\u4e00-\u9fa5_]+$/.test(username)) return '用户名只能包含汉字、字母、数字和下划线';
    return true;
  }

  // 验证密码
  function validatePassword(password) {
    if (!password) return '密码不能为空';
    if (password.length < 6 || password.length > 16) return '密码长度必须在6-16位之间';
    if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) return '密码必须包含字母和数字';
    return true;
  }

  // 处理账户设置表单提交
  on(settingsForm, 'submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // 获取表单值
    const newUsername = getElement('#newUsername').value.trim();
    const oldPassword = getElement('#oldPassword').value.trim();
    const newPassword = getElement('#newPassword').value.trim();
    const confirmPassword = getElement('#confirmPassword').value.trim();
    
    // 清除之前的错误提示
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.classList.remove('show');
    });
    
    // 获取用户信息
    let userInfo = storage.get('userInfo');
    
    // 验证用户名（如果填写了）
    if (newUsername) {
      const usernameResult = validateUsername(newUsername);
      if (usernameResult !== true) {
        getElement('#usernameError').textContent = usernameResult;
        getElement('#usernameError').classList.add('show');
        isValid = false;
      }
    }
    
    // 密码修改验证（如果填写了旧密码）
    if (oldPassword) {
      // 简单验证：实际项目中应该与服务器存储的密码比对
      // 这里假设密码存储在userInfo中
      if (!userInfo.password || oldPassword !== userInfo.password) {
        getElement('#oldPasswordError').textContent = '原密码不正确';
        getElement('#oldPasswordError').classList.add('show');
        isValid = false;
      }
      
      // 验证新密码
      if (newPassword) {
        const passwordResult = validatePassword(newPassword);
        if (passwordResult !== true) {
          getElement('#newPasswordError').textContent = passwordResult;
          getElement('#newPasswordError').classList.add('show');
          isValid = false;
        } else if (newPassword !== confirmPassword) {
          getElement('#confirmPasswordError').textContent = '两次输入的密码不一致';
          getElement('#confirmPasswordError').classList.add('show');
          isValid = false;
        }
      } else {
        getElement('#newPasswordError').textContent = '请输入新密码';
        getElement('#newPasswordError').classList.add('show');
        isValid = false;
      }
    } else if (newPassword || confirmPassword) {
      // 如果填写了新密码但没填旧密码
      getElement('#oldPasswordError').textContent = '请输入原密码';
      getElement('#oldPasswordError').classList.add('show');
      isValid = false;
    }
    
    // 验证通过，保存设置
    if (isValid) {
      // 更新用户名
      if (newUsername) {
        userInfo.username = newUsername;
      }
      
      // 更新密码
      if (oldPassword && newPassword) {
        userInfo.password = newPassword;
      }
      
      // 保存更新后的用户信息
      storage.set('userInfo', userInfo);
      
      // 更新页面显示
      initUserInfo(userInfo);
      
      // 显示成功提示
      alert('设置保存成功');
      
      // 重置表单
      settingsForm.reset();
    }
  });

  // 格式化时间
  function formatTime(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // 初始化页面
  const userInfo = checkLogin();
  if (userInfo) {
    initUserInfo(userInfo);
    renderCollectedFlowers();
  }
});
// 渲染用户评论列表
function renderUserComments() {
  // 模拟评论数据 - 虚拟评论
  const mockComments = [
    {
      id: '1',
      flower: '玫瑰',
      flowerUrl: 'detail.html?flower=玫瑰',
      content: '这朵玫瑰真的很美，我家也种了几株，就是需要经常修剪才能开得更好。特别是在花期过后，适当的修剪可以促进下次开花更多。',
      time: '2025-09-10 09:30',
      like: 5,
      avatar: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.UMhxmW1NqgE4lCdd55pA3AAAAA?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: '2',
      flower: '百合',
      flowerUrl: 'detail.html?flower=百合',
      content: '百合的香气太迷人了，放在客厅放一束，整个屋子都是香的。不过要注意有些人可能对花粉过敏，建议放在通风良好的地方。',
      time: '2025-09-05 15:45',
      like: 3,
      avatar: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.UMhxmW1NqgE4lCdd55pA3AAAAA?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: '3',
      flower: '多肉植物',
      flowerUrl: 'detail.html?flower=多肉',
      content: '新手养多肉，感觉很适合懒人，不用经常浇水，形态也很可爱。我最近刚入手了一盆熊童子，叶片毛茸茸的特别有意思。',
      time: '2025-08-28 11:20',
      like: 8,
      avatar: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.UMhxmW1NqgE4lCdd55pA3AAAAA?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: '4',
      flower: '向日葵',
      flowerUrl: 'detail.html?flower=向日葵',
      content: '向日葵真的很神奇，总是朝着太阳转。我在阳台种了几棵，从种子开始培育，现在已经开花了，每天看着它们心情都变好。',
      time: '2025-08-15 08:40',
      like: 12,
      avatar: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.UMhxmW1NqgE4lCdd55pA3AAAAA?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3'
    }
  ];
  
  const commentsList = document.getElementById('userCommentsList');
  const emptyComments = document.getElementById('emptyComments');
  
  // 显示/隐藏空状态
  if (mockComments.length === 0) {
    commentsList.innerHTML = '';
    emptyComments.style.display = 'block';
    return;
  } else {
    emptyComments.style.display = 'none';
  }
  
  // 渲染评论列表
  commentsList.innerHTML = '';
  mockComments.forEach(comment => {
    const commentItem = document.createElement('div');
    commentItem.className = 'user-comment-item';
    commentItem.innerHTML = `
      <div class="comment-header">
        <div class="comment-avatar">
          <img src="${comment.avatar}" alt="用户头像">
        </div>
        <div class="comment-flower">
          评论了 <a href="${comment.flowerUrl}">${comment.flower}</a>
        </div>
      </div>
      <div class="comment-text">${comment.content}</div>
      <div class="comment-meta">
        <span class="comment-time">${comment.time}</span>
        <div class="comment-actions">
          <button class="btn-edit">编辑</button>
          <button class="btn-delete">删除</button>
          <button class="like-btn">
            <i class="fa fa-thumbs-o-up"></i> ${comment.like}
          </button>
        </div>
      </div>
    `;
    commentsList.appendChild(commentItem);
  });
  
  // 添加编辑和删除按钮事件（仅作演示）
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('编辑功能待实现');
    });
  });
  
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('确定要删除这条评论吗？')) {
        this.closest('.user-comment-item').remove();
        // 检查是否还有评论
        if (commentsList.children.length === 0) {
          emptyComments.style.display = 'block';
        }
      }
    });
  });
  
  // 点赞功能
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const likeCount = parseInt(this.textContent.trim());
      this.innerHTML = `<i class="fa fa-thumbs-up"></i> ${likeCount + 1}`;
      this.style.color = '#f44336';
    });
  });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  // 渲染收藏列表（如果有）
  if (typeof renderCollectedFlowers === 'function') {
    renderCollectedFlowers();
  }
  
  // 渲染评论列表
  renderUserComments();
  
  // 标签页切换
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除所有活跃状态
      tabItems.forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // 添加当前活跃状态
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}Tab`).classList.add('active');
    });
  });
});