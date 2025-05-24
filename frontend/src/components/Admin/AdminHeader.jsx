import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import './AdminHeader.css';

const { Header } = Layout;

const AdminHeader = ({ collapsed, toggleCollapsed }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/admin/profile')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout
    }
  ];

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/admin/dashboard')
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: 'Quản lý sản phẩm',
      onClick: () => navigate('/admin/products')
    }
  ];

  return (
    <Header className="admin-header">
      <div className="admin-header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          className="collapse-button"
        />
        <Menu
          mode="horizontal"
          items={menuItems}
          className="admin-menu"
        />
      </div>
      
      <div className="admin-header-right">
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <Button type="text" className="user-button">
            <UserOutlined />
            <span className="user-name">{user?.name || 'Admin'}</span>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminHeader; 