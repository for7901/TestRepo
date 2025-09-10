// 花卉分类页面逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 分类数据 - 修改为草本、木本、多肉三大类
  const categories = [
    { id: 'all', name: '全部花卉' },
    { id: '草本', name: '草本植物' },
    { id: '木本', name: '木本植物' },
    { id: '多肉', name: '多肉植物' }
  ];

  // 花卉数据 - 添加百合、茉莉、月季
  const flowersData = [
    {
      name: '玫瑰',
      type: '木本',
      img: 'https://img95.699pic.com/photo/60063/2006.jpg_wh860.jpg',
      desc: '爱情的象征，花色丰富，香气浓郁',
      url: 'detail.html?flower=玫瑰'
    },
    {
      name: '百合',
      type: '草本',
      img: 'https://t3.focus-img.cn/sh740wsh/zx/duplication/9aec104f-1380-4425-a5c6-bc03000c4332.JPEG',
      desc: '花型优美，花色洁白，象征纯洁和高雅',
      url: 'detail.html?flower=百合'
    },
    {
      name: '薰衣草',
      type: '草本',
      img: 'https://img95.699pic.com/photo/50771/3184.jpg_wh860.jpg',
      desc: '唇形科薰衣草属植物，花色紫色，香气浓郁',
      url: 'detail.html?flower=薰衣草'
    },
    {
      name: '多肉植物',
      type: '多肉',
      img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mUkmehGdkIzuPSkGjAkZuwHaE8?w=291&h=194&c=7&r=0&o=7&cb=ucfimgc2&dpr=2&pid=1.7&rm=3',
      desc: '营养器官肥厚多汁的植物，种类繁多，形态各异',
      url: 'detail.html?flower=多肉植物'
    },
    {
      name: '茉莉',
      type: '木本',
      img: 'https://img95.699pic.com/photo/50250/7736.jpg_wh860.jpg',
      desc: '花香浓郁，夏季开花，具有很高的观赏价值',
      url: 'detail.html?flower=茉莉'
    },
    {
      name: '月季',
      type: '木本',
      img: 'https://img.redocn.com/photo/20131020/Redocn_2013101818261367.jpg',
      desc: '花中皇后，花色艳丽，花期长，品种繁多',
      url: 'detail.html?flower=月季'
    },
    
  ];

  // 分页配置
  const pageSize = 3; // 每页显示3个
  let currentPage = 1;
  let filteredFlowers = [...flowersData];

  // 获取DOM元素
  const filterBtns = document.querySelectorAll('.filter-btn');
  const flowersGrid = document.getElementById('flowersGrid');
  const categoryTitle = document.getElementById('categoryTitle');
  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  document.querySelector('.category-main .container').appendChild(pagination);

  // 渲染花卉列表
  function renderFlowers() {
    flowersGrid.innerHTML = '';
    
    // 计算当前页显示的花卉
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFlowers = filteredFlowers.slice(startIndex, endIndex);

    if (currentFlowers.length === 0) {
      flowersGrid.innerHTML = '<div class="no-flowers">该分类下暂无花卉</div>';
      pagination.innerHTML = '';
      return;
    }

    currentFlowers.forEach(flower => {
      const card = document.createElement('div');
      card.className = 'flower-card';
      card.innerHTML = `
        <img src="${flower.img}" alt="${flower.name}" class="flower-img">
        <div class="flower-info">
          <h3 class="flower-name">${flower.name}</h3>
          <span class="flower-tag">${flower.type}植物</span>
          <p class="flower-desc">${flower.desc}</p>
          <a href="${flower.url}" class="btn btn-detail">查看详情</a>
        </div>
      `;
      flowersGrid.appendChild(card);
    });

    renderPagination();
  }

  // 渲染分页
  function renderPagination() {
    const totalPages = Math.ceil(filteredFlowers.length / pageSize);
    pagination.innerHTML = '';

    // 上一页按钮
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn prev';
    prevBtn.innerHTML = '<i class="fa fa-angle-left"></i> 上一页';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderFlowers();
      }
    });
    pagination.appendChild(prevBtn);

    // 页码按钮
    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'page-numbers';
    
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
      pageBtn.textContent = i;
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderFlowers();
      });
      pageNumbers.appendChild(pageBtn);
    }
    pagination.appendChild(pageNumbers);

    // 下一页按钮
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn next';
    nextBtn.innerHTML = '下一页 <i class="fa fa-angle-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderFlowers();
      }
    });
    pagination.appendChild(nextBtn);
  }

  // 筛选花卉
  function filterFlowers(type) {
    if (type === 'all') {
      filteredFlowers = [...flowersData];
      categoryTitle.textContent = '全部花卉';
    } else {
      filteredFlowers = flowersData.filter(flower => flower.type === type);
      categoryTitle.textContent = `${type}植物`;
    }
    currentPage = 1; // 重置到第一页
    renderFlowers();
  }

  // 绑定筛选按钮事件
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新活跃状态
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 筛选花卉
      const type = btn.getAttribute('data-type');
      filterFlowers(type);
    });
  });

  // 初始化页面
  renderFlowers();

  // 搜索功能
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  function handleSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword) {
      filteredFlowers = flowersData.filter(flower => 
        flower.name.toLowerCase().includes(keyword) || 
        flower.desc.toLowerCase().includes(keyword) ||
        flower.type.toLowerCase().includes(keyword)
      );
    } else {
      // 搜索为空时显示当前分类
      const activeType = document.querySelector('.filter-btn.active').getAttribute('data-type');
      filterFlowers(activeType);
      return;
    }
    currentPage = 1;
    categoryTitle.textContent = `搜索结果: "${keyword}"`;
    renderFlowers();
  }

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // 回到顶部功能
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  backToTopBtn.style.display = 'none';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});