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
  api.get('/categories').then(res => res.data);

export const getCategory = id =>
  api.get(`/categories/${id}`).then(res => res.data);

export const createCategory = payload =>
  api.post('/categories', payload).then(res => res.data);

export const updateCategory = (id, payload) =>
  api.put(`/categories/${id}`, payload).then(res => res.data);

export const deleteCategory = id =>
  api.delete(`/categories/${id}`).then(res => res.data);

// === BRANDS ===
export const getBrands = () =>
  api.get('/brands').then(res => res.data);

export const getBrand = id =>
  api.get(`/brands/${id}`).then(res => res.data);

export const createBrand = payload =>
  api.post('/brands', payload).then(res => res.data);

export const updateBrand = (id, payload) =>
  api.put(`/brands/${id}`, payload).then(res => res.data);

export const deleteBrand = id =>
  api.delete(`/brands/${id}`).then(res => res.data);

// === PRODUCTS ===
export const getProducts = (params = {}) =>
  api.get('/products', { params }).then(res => res.data);

export const getProduct = id =>
  api.get(`/products/${id}`).then(res => res.data);

export const createProduct = payload =>
  api.post('/products', payload).then(res => res.data);

export const updateProduct = (id, payload) =>
  api.put(`/products/${id}`, payload).then(res => res.data);

export const deleteProduct = id =>
  api.delete(`/products/${id}`).then(res => res.data);

// === ORDERS ===
// Khách (no auth)
export const createOrder = payload =>
  api.post('/orders', payload).then(res => res.data);

// Admin
export const getOrders = () =>
  api.get('/orders').then(res => res.data);

export const getOrder = id =>
  api.get(`/orders/${id}`).then(res => res.data);

// === UTILS ===
export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
