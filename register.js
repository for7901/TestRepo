// 注册页面逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('regUsername');
  const phoneInput = document.getElementById('regPhone');
  const passwordInput = document.getElementById('regPassword');
  const confirmPasswordInput = document.getElementById('regConfirmPassword');
  const togglePassword = document.getElementById('toggleRegPassword');
  const passwordStrength = document.getElementById('passwordStrength');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  
  // 密码显示/隐藏切换
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmPasswordInput.setAttribute('type', type);
    
    // 切换图标
    const icon = this.querySelector('i');
    icon.className = type === 'password' ? 'fa fa-eye-slash' : 'fa fa-eye';
  });
  
  // 密码强度检测
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    if (password.length === 0) {
      passwordStrength.classList.remove('show');
      strengthText.classList.remove('show');
      return;
    }
    
    passwordStrength.classList.add('show');
    strengthText.classList.add('show');
    
    // 简单的密码强度检测
    let strength = 0;
    let strengthMsg = '';
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // 更新强度条
    if (strength <= 2) {
      strengthBar.className = 'strength-bar weak';
      strengthMsg = '弱：密码强度较低，容易被破解';
    } else if (strength <= 4) {
      strengthBar.className = 'strength-bar medium';
      strengthMsg = '中：密码强度中等，可以增加长度提高安全性';
    } else {
      strengthBar.className = 'strength-bar strong';
      strengthMsg = '强：密码强度较高，安全性好';
    }
    
    strengthText.textContent = strengthMsg;
  });
  
  // 表单提交处理
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // 获取输入值
    const username = usernameInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    // 清除之前的错误提示
    clearErrorMessages();
    
    // 验证用户名
    if (!username) {
      showError(usernameInput, '请设置用户名');
      isValid = false;
    } else if (!common.validator.isUsername(username)) {
      showError(usernameInput, '用户名只能包含字母、数字和下划线，长度4-20位');
      isValid = false;
    }
    
    // 验证手机号
    if (!phone) {
      showError(phoneInput, '请输入手机号');
      isValid = false;
    } else if (!common.validator.isPhone(phone)) {
      showError(phoneInput, '请输入有效的手机号');
      isValid = false;
    }
    
    // 验证密码
    if (!password) {
      showError(passwordInput, '请设置密码');
      isValid = false;
    } else if (!common.validator.isPassword(password)) {
      showError(passwordInput, '密码至少6位，需包含字母和数字');
      isValid = false;
    }
    
    // 验证确认密码
    if (!confirmPassword) {
      showError(confirmPasswordInput, '请确认密码');
      isValid = false;
    } else if (confirmPassword !== password) {
      showError(confirmPasswordInput, '两次输入的密码不一致');
      isValid = false;
    }
    
    // 验证通过，处理注册
    if (isValid) {
      // 模拟注册（实际项目中应调用API）
      const userInfo = {
        username: username,
        phone: phone,
        registerTime: common.formatTime(),
        loginTime: common.formatTime()
      };
      
      // 保存用户信息
      common.storage.set('userInfo', userInfo);
      
      // 提示注册成功并跳转到登录页
      alert('注册成功，请登录');
      common.goToPage('login.html');
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
});