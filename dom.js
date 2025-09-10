/**
 * 获取DOM元素
 * @param {string} selector - 选择器
 * @param {HTMLElement} parent - 父元素，默认是document
 * @returns {HTMLElement|null} DOM元素
 */
function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * 获取多个DOM元素
 * @param {string} selector - 选择器
 * @param {HTMLElement} parent - 父元素，默认是document
 * @returns {NodeList} DOM元素列表
 */
function getElements(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * 创建DOM元素
 * @param {string} tag - 标签名
 * @param {object} props - 元素属性（class、id、style、dataset等）
 * @param {string|HTMLElement} content - 元素内容（文本或DOM元素）
 * @returns {HTMLElement} 创建的DOM元素
 */
function createElement(tag, props = {}, content = '') {
  const element = document.createElement(tag);

  // 设置元素属性
  for (const key in props) {
    if (key === 'class') {
      element.className = props[key];
    } else if (key === 'style' && typeof props[key] === 'object') {
      Object.assign(element.style, props[key]);
    } else if (key === 'dataset') {
      Object.assign(element.dataset, props[key]);
    } else {
      element.setAttribute(key, props[key]);
    }
  }

  // 设置元素内容
  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  }

  return element;
}

/**
 * 绑定事件
 * @param {HTMLElement} element - DOM元素
 * @param {string} event - 事件类型
 * @param {Function} callback - 事件回调函数
 * @param {boolean|object} options - 事件选项
 */
function on(element, event, callback, options = false) {
  if (element && element.addEventListener) {
    element.addEventListener(event, callback, options);
  }
}

/**
 * 解绑事件
 * @param {HTMLElement} element - DOM元素
 * @param {string} event - 事件类型
 * @param {Function} callback - 事件回调函数
 * @param {boolean|object} options - 事件选项
 */
function off(element, event, callback, options = false) {
  if (element && element.removeEventListener) {
    element.removeEventListener(event, callback, options);
  }
}

/**
 * 事件委托
 * @param {HTMLElement} parent - 父元素
 * @param {string} child - 子元素选择器
 * @param {string} event - 事件类型
 * @param {Function} callback - 事件回调函数
 */
function delegate(parent, child, event, callback) {
  on(parent, event, function(e) {
    const target = e.target.closest(child);
    if (target) {
      callback.call(target, e, target);
    }
  });
}

/**
 * 切换元素类名
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 */
function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * 添加元素类名
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 */
function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

/**
 * 移除元素类名
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 */
function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * 检查元素是否有某个类名
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 * @returns {boolean} 是否有该类名
 */
function hasClass(element, className) {
  return element ? element.classList.contains(className) : false;
}

/**
 * 设置元素样式
 * @param {HTMLElement} element - DOM元素
 * @param {object} styles - 样式对象
 */
function setStyle(element, styles) {
  if (element && typeof styles === 'object') {
    Object.assign(element.style, styles);
  }
}

// 导出DOM操作函数
window.getElement = getElement;
window.getElements = getElements;
window.createElement = createElement;
window.on = on;
window.off = off;
window.delegate = delegate;
window.toggleClass = toggleClass;
window.addClass = addClass;
window.removeClass = removeClass;
window.hasClass = hasClass;
window.setStyle = setStyle;