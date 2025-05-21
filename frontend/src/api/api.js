// src/api/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Nếu bạn lưu token admin trong localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === AUTH (Admin) ===
export const loginAdmin = async ({ username, password }) => {
  const res = await api.post('/auth/login', { username, password });
  // lưu token nếu dùng adminAuth middleware
  localStorage.setItem('token', res.data.token);
  return res.data;
};

// === CATEGORIES ===
export const getCategories = () =>
  api.get('/category').then(res => res.data);

export const getCategory = id =>
  api.get(`/category/${id}`).then(res => res.data);

export const createCategory = payload =>
  api.post('/category', payload).then(res => res.data);

export const updateCategory = (id, payload) =>
  api.put(`/category/${id}`, payload).then(res => res.data);

export const deleteCategory = id =>
  api.delete(`/category/${id}`).then(res => res.data);

// === BRANDS ===
export const getBrands = () =>
  api.get('/brand').then(res => res.data);

export const getBrand = id =>
  api.get(`/brand/${id}`).then(res => res.data);

export const createBrand = payload =>
  api.post('/brand', payload).then(res => res.data);

export const updateBrand = (id, payload) =>
  api.put(`/brand/${id}`, payload).then(res => res.data);

export const deleteBrand = id =>
  api.delete(`/brand/${id}`).then(res => res.data);

// === PRODUCTS ===
export const getProducts = (params = {}) =>
  api.get('/product', { params }).then(res => res.data);

export const getProduct = id =>
  api.get(`/product/${id}`).then(res => res.data);

export const createProduct = payload =>
  api.post('/product', payload).then(res => res.data);

export const updateProduct = (id, payload) =>
  api.put(`/product/${id}`, payload).then(res => res.data);

export const deleteProduct = id =>
  api.delete(`/product/${id}`).then(res => res.data);

// === ORDERS ===
// Khách (no auth)
export const createOrder = payload =>
  api.post('/order', payload).then(res => res.data);

// Admin
export const getOrders = () =>
  api.get('/order').then(res => res.data);

export const getOrder = id =>
  api.get(`/order/${id}`).then(res => res.data);

// === UTILS ===
export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
