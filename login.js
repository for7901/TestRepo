// 登录页面逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const rememberCheckbox = document.querySelector('input[name="remember"]');
  
  // 密码显示/隐藏切换
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // 切换图标
    const icon = this.querySelector('i');
    icon.className = type === 'password' ? 'fa fa-eye-slash' : 'fa fa-eye';
  });
  
  // 表单提交处理
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // 获取输入值
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // 清除之前的错误提示
    clearErrorMessages();
    
    // 验证用户名 (支持用户名、手机号、邮箱)
    if (!username) {
      showError(usernameInput, '请输入用户名/手机号/邮箱');
      isValid = false;
    } else if (
      !common.validator.isUsername(username) && 
      !common.validator.isPhone(username) && 
      !common.validator.isEmail(username)
    ) {
      showError(usernameInput, '请输入有效的用户名/手机号/邮箱');
      isValid = false;
    }
    
    // 验证密码
    if (!password) {
      showError(passwordInput, '请输入密码');
      isValid = false;
    } else if (!common.validator.isPassword(password)) {
      showError(passwordInput, '密码至少6位，需包含字母和数字');
      isValid = false;
    }
    
    // 验证通过，处理登录
    if (isValid) {
      // 模拟登录验证（实际项目中应调用API）
      // 这里简化处理，假设验证成功
      const userInfo = {
        username: username,
        loginTime: common.formatTime(),
        // 可以添加更多用户信息
      };
      
      // 保存用户信息
      common.storage.set('userInfo', userInfo);
      
      // 记住我
      if (rememberCheckbox.checked) {
        common.storage.set('rememberUser', username);
      } else {
        common.storage.remove('rememberUser');
      }
      
      // 跳转首页
      common.goToPage('index.html');
    }
  });
  
  // 辅助函数：显示错误信息
  function showError(input, message) {
    let errorEl = input.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.classList.add('show');
    input.classList.add('error');
  }
  
  // 辅助函数：清除所有错误提示
  function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.classList.remove('show');
    });
    
    document.querySelectorAll('.form-control').forEach(el => {
      el.classList.remove('error');
    });
  }
  
  // 自动填充记住的用户名
  const rememberedUser = common.storage.get('rememberUser');
  if (rememberedUser) {
    usernameInput.value = rememberedUser;
    rememberCheckbox.checked = true;
  }
});