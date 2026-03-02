// ========================================
// UTILITY FUNCTIONS
// Premium Helpers for Common Tasks
// ========================================

/**
 * Утилита для форматирования цены
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price);
};

/**
 * Утилита для форматирования даты
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

/**
 * Утилита для валидации email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Утилита для валидации телефона
 */
export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]*$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Утилита для генерации ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Утилита для сортировки массива
 */
export const sortArray = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};

/**
 * Утилита для фильтрации массива
 */
export const filterArray = (array, key, value) => {
  return array.filter(item => 
    String(item[key]).toLowerCase().includes(String(value).toLowerCase())
  );
};

/**
 * Утилита для группировки массива
 */
export const groupByKey = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});
};

/**
 * Утилита для слияния объектов
 */
export const mergeObjects = (...objects) => {
  return objects.reduce((merged, obj) => ({
    ...merged,
    ...obj
  }), {});
};

/**
 * Утилита для глубокого копирования
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Утилита для задержки
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Утилита для проверки пустого объекта
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Утилита для проверки типа
 */
export const getType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

/**
 * Утилита для округления числа
 */
export const roundNumber = (number, decimals = 2) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Утилита для чтение localStorage с предзначением
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Утилита для записи в localStorage
 */
export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
};

/**
 * Утилита для удаления из localStorage
 */
export const removeLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export default {
  formatPrice,
  formatDate,
  validateEmail,
  validatePhone,
  generateId,
  sortArray,
  filterArray,
  groupByKey,
  mergeObjects,
  deepClone,
  delay,
  isEmptyObject,
  getType,
  roundNumber,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
};
