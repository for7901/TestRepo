// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 1. 汉堡菜单交互
  const hamburger = getElement('#hamburger');
  const navList = getElement('#navList');

  on(hamburger, 'click', function() {
    toggleClass(navList, 'active');
    const icon = getElement('i', hamburger);
    if (hasClass(navList, 'active')) {
      icon.className = 'fa fa-times';
      setStyle(navList, { display: 'flex' });
    } else {
      icon.className = 'fa fa-bars';
      setStyle(navList, { display: 'none' });
    }
  });

  // 2. 轮播图交互 - 完整实现
  const bannerItems = getElements('.banner-item');
  const indicators = getElements('.indicator');
  const bannerPrev = getElement('#bannerPrev');
  const bannerNext = getElement('#bannerNext');
  let currentIndex = 0;
  let bannerTimer;
  let isTransitioning = false; // 防止快速点击导致的动画冲突

  // 初始化轮播图
  function initBanner() {
    // 隐藏所有轮播项，显示当前项
    bannerItems.forEach((item, index) => {
      if (index === currentIndex) {
        setStyle(item, { 
          display: 'block',
          opacity: '1',
          transform: 'translateX(0)'
        });
        addClass(item, 'active');
      } else if (index < currentIndex) {
        // 左侧隐藏项
        setStyle(item, { 
          display: 'block',
          opacity: '0',
          transform: 'translateX(-100%)'
        });
        removeClass(item, 'active');
      } else {
        // 右侧隐藏项
        setStyle(item, { 
          display: 'block',
          opacity: '0',
          transform: 'translateX(100%)'
        });
        removeClass(item, 'active');
      }
    });

    // 更新指示器状态
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        addClass(indicator, 'active');
      } else {
        removeClass(indicator, 'active');
      }
    });

    // 重置自动播放定时器
    resetAutoPlay();
  }

  // 切换到指定索引的轮播图
  function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    
    isTransitioning = true;
    currentIndex = index;
    
    // 为当前激活的轮播项添加离开动画
    const activeItem = getElement('.banner-item.active');
    setStyle(activeItem, {
      opacity: '0',
      transform: currentIndex > Array.from(bannerItems).indexOf(activeItem) 
        ? 'translateX(-100%)' 
        : 'translateX(100%)'
    });
    
    // 动画结束后完成切换
    setTimeout(() => {
      initBanner();
      isTransitioning = false;
    }, 500); // 与CSS过渡时间保持一致
  }

  // 上一张轮播图
  function prevSlide() {
    if (isTransitioning) return;
    currentIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
    goToSlide(currentIndex);
  }

  // 下一张轮播图
  function nextSlide() {
    if (isTransitioning) return;
    currentIndex = (currentIndex + 1) % bannerItems.length;
    goToSlide(currentIndex);
  }

  // 自动播放
  function startAutoPlay() {
    bannerTimer = setInterval(nextSlide, 5000); // 每5秒切换一次
  }

  // 重置自动播放
  function resetAutoPlay() {
    clearInterval(bannerTimer);
    startAutoPlay();
  }

  // 绑定轮播控制事件
  on(bannerPrev, 'click', prevSlide);
  on(bannerNext, 'click', nextSlide);

  // 点击指示器切换轮播图
  delegate(getElement('#bannerIndicators'), '.indicator', 'click', function(e, target) {
    const index = Array.from(indicators).indexOf(target);
    goToSlide(index);
  });

  // 鼠标悬停时暂停自动播放
  const banner = getElement('#banner');
  on(banner, 'mouseenter', () => clearInterval(bannerTimer));
  on(banner, 'mouseleave', startAutoPlay);

  // 初始化轮播图
  initBanner();

  // 3. 热门花卉推荐动态渲染
  const flowersList = getElement('#flowersList');
  const flowersData = [
    {
      name: '玫瑰',
      img: 'https://n.sinaimg.cn/sinacn10111/0/w2048h1152/20190929/2cb6-ifffqup8873733.jpg',
      desc: '玫瑰是爱情的象征，花色丰富，香气浓郁，是著名的观赏花卉。',
      url: 'detail.html?flower=玫瑰'
    },
    {
      name: '百合',
      img: 'https://t3.focus-img.cn/sh740wsh/zx/duplication/9aec104f-1380-4425-a5c6-bc03000c4332.JPEG',
      desc: '百合是百合科百合属植物，花型优美，花色洁白，象征纯洁和高雅。',
      url: 'detail.html?flower=百合'
    },
    {
      name: '多肉植物',
      img: 'https://ts1.tc.mm.bing.net/th/id/R-C.54b2c66098e73577562f9a8cf4cf1e47?rik=lCaZ9Zw7dhGCDA&riu=http%3a%2f%2fwww.1818hm.com%2ffile%2fupload%2f201508%2f29%2f09-26-26-29-5.jpg&ehk=qgdd7ph8xpWyIq78ZJwJJWJi%2ftDEHowUechAJkSboXg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
      desc: '多肉植物是指植物的根、茎、叶三种营养器官中至少有一种是肥厚多汁并且具备储藏大量水分功能的植物。',
      url: 'detail.html?flower=多肉植物'
    },
    {
      name: '茉莉',
      img: 'https://ts1.tc.mm.bing.net/th/id/R-C.82a759a4a95d886f9e0ec230a30c7a05?rik=D9fNFyQKMS7wjg&riu=http%3a%2f%2fimgs.bzw315.com%2fUploadFiles%2fVersion2%2f0%2f20160530%2f201605301607229532.png&ehk=nYXTPJ3Wdb2MiPo3ARoiBy4axp%2f7CjjONgSHM7sOjag%3d&risl=&pid=ImgRaw&r=0',
      desc: '茉莉是木犀科茉莉属植物，花白色，香气清新，是著名的观赏和芳香花卉。',
      url: 'detail.html?flower=茉莉'
    },
    {
    name: '薰衣草',
    img: 'https://image.jiajiase.com/5390e656b6cac197e222d02dfcddbddc.jpg',
    desc: '唇形科薰衣草属植物，花色紫色，香气浓郁，具有镇静安神的功效。',
    url: 'detail.html?flower=薰衣草'
   },
   {
    name: '月季',
    img: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.JpphsMkiSVTQaQD_wS49XAHaF3?w=256&h=203&c=7&r=0&o=5&cb=ucfimgc2&dpr=2&pid=1.7',
    desc: '月季与玫瑰同属蔷薇科，花期长，花色丰富，是常见的观赏花卉。',
    url: 'detail.html?flower=月季'
  }



  ];

  // 渲染花卉列表
  function renderFlowers() {
    flowersList.innerHTML = '';
    flowersData.forEach(flower => {
      const card = createElement('div', { class: 'card' });
      
      const img = createElement('img', { 
        class: 'card-img', 
        src: flower.img, 
        alt: flower.name 
      });
      
      const cardContent = createElement('div', { class: 'card-content' });
      
      const title = createElement('h3', { class: 'card-title' }, flower.name);
      
      const desc = createElement('p', { class: 'card-desc' }, flower.desc);
      
      const link = createElement('a', { 
        class: 'btn', 
        href: flower.url 
      }, '查看详情');
      
      cardContent.appendChild(title);
      cardContent.appendChild(desc);
      cardContent.appendChild(link);
      card.appendChild(img);
      card.appendChild(cardContent);
      flowersList.appendChild(card);
    });
  }

  renderFlowers();

  // 5. 回到顶部功能
  const backToTop = getElement('#backToTop');

  on(window, 'scroll', function() {
    if (window.scrollY > 500) {
      setStyle(backToTop, { display: 'block' });
    } else {
      setStyle(backToTop, { display: 'none' });
    }
  });

  on(backToTop, 'click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 6. 响应式适配
  function handleResize() {
    if (window.innerWidth > 768) {
      setStyle(navList, { display: 'flex' });
      const icon = getElement('i', hamburger);
      icon.className = 'fa fa-bars';
    } else {
      if (!hasClass(navList, 'active')) {
        setStyle(navList, { display: 'none' });
      }
    }
  }

  handleResize();
  on(window, 'resize', handleResize);
});
// 轮播图相关变量
let bannerItems = document.querySelectorAll('.banner-item');
let indicators = document.querySelectorAll('.indicator');
let bannerPrev = document.getElementById('bannerPrev');
let bannerNext = document.getElementById('bannerNext');
let currentIndex = 0;
let autoPlayTimer = null;
const intervalTime = 5000; // 自动切换间隔时间(ms)

// 工具函数 - 设置样式
function setStyle(element, styles) {
  if (element && typeof styles === 'object') {
    Object.assign(element.style, styles);
  }
}

// 工具函数 - 添加类名
function addClass(element, className) {
  if (element && !element.classList.contains(className)) {
    element.classList.add(className);
  }
}

// 工具函数 - 移除类名
function removeClass(element, className) {
  if (element && element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

// 初始化轮播图
function initBanner() {
  // 隐藏所有轮播项，显示当前项
  bannerItems.forEach((item, index) => {
    if (index === currentIndex) {
      setStyle(item, { 
        display: 'block',
        opacity: '1',
        transform: 'translateX(0)'
      });
      addClass(item, 'active');
    } else if (index < currentIndex) {
      // 左侧隐藏项
      setStyle(item, { 
        display: 'block',
        opacity: '0',
        transform: 'translateX(-100%)'
      });
      removeClass(item, 'active');
    } else {
      // 右侧隐藏项
      setStyle(item, { 
        display: 'block',
        opacity: '0',
        transform: 'translateX(100%)'
      });
      removeClass(item, 'active');
    }
  });

  // 更新指示器状态
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      addClass(indicator, 'active');
    } else {
      removeClass(indicator, 'active');
    }
  });

  // 重置自动播放定时器
  resetAutoPlay();
}

// 切换到下一张
function nextBanner() {
  const prevIndex = currentIndex;
  currentIndex = (currentIndex + 1) % bannerItems.length;
  animateBanner(prevIndex, currentIndex);
}

// 切换到上一张
function prevBanner() {
  const prevIndex = currentIndex;
  currentIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
  animateBanner(prevIndex, currentIndex);
}

// 轮播动画
function animateBanner(prevIndex, currentIndex) {
  // 隐藏上一张
  const prevItem = bannerItems[prevIndex];
  setStyle(prevItem, {
    opacity: '0',
    transform: 'translateX(-100%)'
  });
  removeClass(prevItem, 'active');

  // 显示当前张
  const currentItem = bannerItems[currentIndex];
  setStyle(currentItem, {
    display: 'block',
    opacity: '0',
    transform: 'translateX(100%)'
  });
  
  // 触发重排后再设置动画
  setTimeout(() => {
    setStyle(currentItem, {
      opacity: '1',
      transform: 'translateX(0)'
    });
    addClass(currentItem, 'active');
  }, 50);

  // 更新指示器
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      addClass(indicator, 'active');
    } else {
      removeClass(indicator, 'active');
    }
  });

  // 重置自动播放
  resetAutoPlay();
}

// 重置自动播放定时器
function resetAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
  }
  autoPlayTimer = setInterval(nextBanner, intervalTime);
}

// 点击指示器切换
function bindIndicatorEvents() {
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      if (index !== currentIndex) {
        const prevIndex = currentIndex;
        currentIndex = index;
        animateBanner(prevIndex, currentIndex);
      }
    });
  });
}

// 绑定按钮事件
function bindButtonEvents() {
  // 上一张按钮
  bannerPrev.addEventListener('click', () => {
    prevBanner();
  });

  // 下一张按钮
  bannerNext.addEventListener('click', () => {
    nextBanner();
  });

  // 鼠标悬停时暂停自动播放
  const banner = document.getElementById('banner');
  banner.addEventListener('mouseenter', () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
  });

  // 鼠标离开时恢复自动播放
  banner.addEventListener('mouseleave', () => {
    resetAutoPlay();
  });
}

// 初始化函数
function init() {
  initBanner();
  bindIndicatorEvents();
  bindButtonEvents();
  // 启动自动播放
  resetAutoPlay();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);