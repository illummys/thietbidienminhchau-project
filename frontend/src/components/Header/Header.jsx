import React, { useState, useEffect } from 'react';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import LogoImg from '../../assets/images/Logo.png';
import { Input } from 'antd';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Nếu cuộn xuống quá 100px và đang cuộn xuống (currentScrollY > lastScrollY)
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const menuItems = [
    {
      id: 1,
      key: 'catalog',
      icon: <AppstoreOutlined />,
      label: 'Catalog',
      children: [
        { key: 'p1', label: 'DÂY CÁP ĐIỆN', path: '/products?category_id=1' },
        { key: 'p2', label: 'THIẾT BỊ ĐÓNG CẮT CÔNG NGHIỆP', path: '/products?category_id=2' },
        { key: 'p3', label: 'ĐIỆN DÂN DỤNG VÀ CHIẾU SÁNG', path: '/products?category_id=3' },
      ]
    },
    {
      id: 2,
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      path: '/'
    },
    {
      id: 3,
      key: 'products',
      icon: <ShoppingCartOutlined />,
      label: 'Sản phẩm',
      path: '/products'
    },
    {
      id: 4,
      key: 'services',
      icon: <InfoCircleOutlined />,
      label: 'Dịch vụ',
      path: '/electrical-devices'
    },
    {
      id: 5,
      key: 'partners',
      icon: <UserOutlined />,
      label: 'Đối tác',
      path: '/lighting'
    },
    {
      id: 6,
      key: 'news',
      icon: <InfoCircleOutlined />,
      label: 'Tin tức',
      path: '/news'
    },
    {
      id: 7,
      key: 'contact',
      icon: <PhoneOutlined />,
      label: 'Liên hệ',
      path: '/contact'
    }
  ];

  // Trong Header.jsx, thay đổi handleMenuClick như sau:

const handleMenuClick = ({ key }) => {
    // Tìm item hoặc child có key bằng key được click
    let pathTo = null;

    for (let item of menuItems) {
      if (item.key === key && item.path) {
        pathTo = item.path;
        break;
      }
      if (item.children) {
        const child = item.children.find(c => c.key === key);
        if (child) {
          pathTo = child.path;
          break;
        }
      }
    }

    if (pathTo) {
      // Nếu muốn filter theo category_id, đảm bảo path dùng ?category_id=…
      navigate(pathTo);
      // Đóng mobile menu/search nếu cần
      if (window.innerWidth <= 992) {
        setIsMobileMenuOpen(false);
        setIsMobileSearchVisible(false);
      }
    }
  };


  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchVisible(false);
  };

  const handleMobileSearchToggle = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Bar */}
      <div className={`top-bar ${isScrolled ? 'top-bar-hidden' : ''}`}>
        <div className="top-bar-container">
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
            <a href="mailto:contact@example.com">
              <MailOutlined />
            </a>
          </div>
          <div className="address">
            <EnvironmentOutlined />
            <span>12A Phạm Hồng Thái, Phường Vạn Thạnh, Thành Phố Nha Trang, Tỉnh Khánh Hoà, Việt Nam</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src={LogoImg} alt="Thiết Bị Điện Minh Châu" />
          </a>
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            <button type="button">Tìm kiếm</button>
          </div>
          {/* Mobile Search Icon */}
          <div className="mobile-search-icon" onClick={handleMobileSearchToggle}>
            <SearchOutlined />
          </div>

          <div className="header-actions">
            <a href="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span>Giỏ hàng</span>
            </a>
          </div>
          <button className="mobile-menu-toggle" onClick={handleMenuToggle}>
            <MenuOutlined />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchVisible && (
        <div className="mobile-search-bar">
          <Input.Search 
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            size="large"
            onSearch={(value) => {
              console.log('Searching for:', value);
              // TODO: Implement search functionality
              setIsMobileSearchVisible(false);
            }}
          />
        </div>
      )}

      {/* Main Menu */}
      <div className={`main-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="menu-container">
          <Menu
            mode={window.innerWidth <= 992 && isMobileMenuOpen ? 'inline' : 'horizontal'}
            items={menuItems}
            onClick={handleMenuClick}
            className="menu-list"
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              justifyContent: 'center',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 