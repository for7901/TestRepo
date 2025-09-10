// 本地存储工具
const storage = {
  get: function(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  set: function(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  remove: function(key) {
    localStorage.removeItem(key);
  },
  clear: function() {
    localStorage.clear();
  }
};

// 页面跳转
function goToPage(url) {
  window.location.href = url;
}

// 验证工具
const validator = {
  isUsername: function(username) {
    // 用户名验证：4-20位字母、数字或下划线
    return /^[a-zA-Z0-9_]{4,20}$/.test(username);
  },
  isPhone: function(phone) {
    // 手机号验证
    return /^1[3-9]\d{9}$/.test(phone);
  },
  isEmail: function(email) {
    // 邮箱验证
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  isPassword: function(password) {
    // 密码验证：至少6位，包含字母和数字
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
  }
};

// 格式化时间
function formatTime(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 检查用户是否登录
function checkLogin() {
  return storage.get('userInfo');
}

// 更新导航栏状态
function updateNavbar() {
  const userInfo = checkLogin();
  const loginRegisterItems = document.querySelectorAll('.nav-item.login-register');
  const userCenterItem = document.querySelector('.nav-item.user-center');
  
  // 如果有登录注册项，移除它们
  loginRegisterItems.forEach(item => {
    item.remove();
  });
  
  // 添加用户相关导航项
  const navList = document.querySelector('.nav-list');
  
  if (userInfo) {
    // 已登录，显示用户头像和个人中心
    const userItem = document.createElement('li');
    userItem.className = 'nav-item user-avatar-item';
    userItem.innerHTML = `
      <a href="user-center.html" class="nav-link avatar-link">
        <img src="https://ts1.tc.mm.bing.net/th/id/R-C.0d20d8d7c25a33f1c9339d86bf2a22d2?rik=VDSFsoC%2f6equYA&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f03-21%2f75594%2fwater_75594_698_698_.png&ehk=R7reeR0GJ1cVX2cr2Q9Tiz9G2VIefkNxeB2dWkmdPBE%3d&risl=&pid=ImgRaw&r=0" alt="用户头像" class="user-avatar">
      </a>
    `;
    navList.appendChild(userItem);
  } else {
    // 未登录，显示登录和注册按钮
    const loginItem = document.createElement('li');
    loginItem.className = 'nav-item login-register';
    loginItem.innerHTML = '<a href="login.html" class="nav-link">登录</a>';
    
    const registerItem = document.createElement('li');
    registerItem.className = 'nav-item login-register';
    registerItem.innerHTML = '<a href="register.html" class="nav-link btn btn-secondary">注册</a>';
    
    navList.appendChild(loginItem);
    navList.appendChild(registerItem);
  }
}

// 页面加载完成后更新导航栏
document.addEventListener('DOMContentLoaded', function() {
  updateNavbar();
});

// 暴露公共方法
window.common = {
  storage,
  goToPage,
  validator,
  formatTime,
  checkLogin,
  updateNavbar
};