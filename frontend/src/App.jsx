import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from 'antd';
import './App.css';
import HomePage from './pages/HomePage/HomePage.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import FixedContactButtons from './components/FixedContactButtons/FixedContactButtons.jsx';
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import LoginPage from './pages/Admin/LoginPage';
// import AdminHeader from './components/Admin/AdminHeader';
import ProductsPage from './pages/Products/ProductsPage';
// import './AdminLayout.css';
import ProductDetailPage from './pages/ProductDetailPage';

// const { Content } = Layout;

// Layout component cho các trang admin
// const AdminLayout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Layout className="admin-layout">
//       <AdminHeader 
//         collapsed={collapsed} 
//         toggleCollapsed={() => setCollapsed(!collapsed)} 
//       />
//       <Layout>
//         <Content className="admin-content">
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <FixedContactButtons />
              <Footer />
            </>
            }/>

          <Route path="/products" element={
            <>
              <Header />
              <ProductsPage />
              <FixedContactButtons />
              <Footer />
            </>
          }/>

          <Route path="/product/:productId" element={
            <>
              <Header />
              <ProductDetailPage />
              <FixedContactButtons />
              <Footer />
            </>
          }/>

          {/* Admin routes
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<LoginPage />} />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <div>Admin Dashboard</div>
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/products" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <div>Product Management</div>
              </AdminLayout>
            </ProtectedRoute>
          } /> */}

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
