import axios from 'axios';

// Single axios instance for both public & admin with JWT support
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor gắn JWT cho tất cả request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('ADMIN_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Public (Customer) Endpoints ===
export const getCategories = () =>
  api.get('/api/category').then(res => res.data);

export const getCategory = id =>
  api.get(`/api/category/${id}`).then(res => res.data);

export const getBrands = () =>
  api.get('/api/brand').then(res => res.data);

export const getBrand = id =>
  api.get(`/api/brand/${id}`).then(res => res.data);

export const getProducts = (params = {}) =>
  api.get('/api/product', { params }).then(res => res.data);

export const getProduct = id =>
  api.get(`/api/product/${id}`).then(res => res.data);

export const createOrder = payload =>
  api.post('/api/order', payload).then(res => res.data);

// === Admin Endpoints ===
// Categories
export const getCategoriesAdmin = () =>
  api.get('/admin/category').then(res => res.data);

export const createCategoryAdmin = payload =>
  api.post('/admin/category', payload).then(res => res.data);

export const updateCategoryAdmin = (id, payload) =>
  api.put(`/admin/category/${id}`, payload).then(res => res.data);

export const deleteCategoryAdmin = id =>
  api.delete(`/admin/category/${id}`).then(res => res.data);

// Brands
export const getBrandsAdmin = () =>
  api.get('/admin/brand').then(res => res.data);

export const createBrandAdmin = payload =>
  api.post('/admin/brand', payload).then(res => res.data);

export const updateBrandAdmin = (id, payload) =>
  api.put(`/admin/brand/${id}`, payload).then(res => res.data);

export const deleteBrandAdmin = id =>
  api.delete(`/admin/brand/${id}`).then(res => res.data);

// Products
export const getProductsAdmin = (params = {}) =>
  api.get('/admin/product', { params }).then(res => res.data);

export const getProductAdmin = id =>
  api.get(`/admin/product/${id}`).then(res => res.data);

export const createProductAdmin = payload =>
  api.post('/admin/product', payload).then(res => res.data);

export const updateProductAdmin = (id, payload) =>
  api.put(`/admin/product/${id}`, payload).then(res => res.data);

export const deleteProductAdmin = id =>
  api.delete(`/admin/product/${id}`).then(res => res.data);

// Orders (Admin)
export const getOrdersAdmin = () =>
  api.get('/admin/order').then(res => res.data);

export const getOrderAdmin = id =>
  api.get(`/admin/order/${id}`).then(res => res.data);

export const updateOrderAdmin = (id, payload) =>
  api.put(`/admin/order/${id}`, payload).then(res => res.data);

export const deleteOrderAdmin = id =>
  api.delete(`/admin/order/${id}`).then(res => res.data);

// Default export
export default api;
