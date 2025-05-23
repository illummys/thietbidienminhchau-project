import React, { useState, useRef, useEffect } from 'react';
import { LeftOutlined, RightOutlined, ShoppingCartOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons';
import { Spin, message, Button, Tag } from 'antd';
import { getProducts } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import './ProductImageSlider.css';

const ProductImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const itemsToShow = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const firstItem = document.querySelector('.product-slider-item');
    if (firstItem) {
      const width = firstItem.offsetWidth;
      const style = getComputedStyle(firstItem);
      const marginRight = parseFloat(style.marginRight);
      const marginLeft = parseFloat(style.marginLeft);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight = parseFloat(style.paddingRight);
      setItemWidth(width + marginLeft + marginRight + paddingLeft + paddingRight);
    }
  }, [products]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const items = await getProducts({ featured: true });
      setProducts(items.rows || []);
      console.log(items.rows);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      message.error('Không thể tải sản phẩm nổi bật');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    message.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const next = () => {
    if (currentIndex < products.length - itemsToShow) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      sliderRef.current?.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      sliderRef.current?.scrollTo({
        left: prevIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="product-slider-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className="product-slider-container">
      <div className="slider-header">
        <div className="slider-title">
          <h2>Sản phẩm nổi bật</h2>
          <p className="slider-subtitle">Khám phá các sản phẩm được yêu thích nhất</p>
        </div>
        <div className="slider-controls">
          <button
            className="slider-nav-button prev"
            onClick={previous}
            disabled={currentIndex === 0}
          >
            <LeftOutlined />
          </button>
          <button
            className="slider-nav-button next"
            onClick={next}
            disabled={currentIndex >= products.length - itemsToShow}
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="product-slider" ref={sliderRef}>
        <div className="product-slider-track">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-slider-item"
            >
              <div className="product-card">
                <div 
                  className="product-image-container"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="product-slider-image"
                  />
                  {product.best_seller && (
                    <Tag color="red" className="best-seller-tag">
                      <TagOutlined /> Bán chạy
                    </Tag>
                  )}
                  <div className="product-overlay">
                    <div className="product-actions">
                      <Link to={`/product/${product.id}`}>
                        <Button 
                          type="primary" 
                          icon={<EyeOutlined />}
                          className="view-details-btn"
                        >
                          Xem chi tiết
                        </Button>
                      </Link>
                      <Button 
                        type="primary" 
                        icon={<ShoppingCartOutlined />}
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <Link to={`/product/${product.id}`} className="product-name">
                    {product.name}
                  </Link>
                  <div className="product-price">
                    {product.price.toLocaleString('vi-VN')} VNĐ
                  </div>
                  <div className="product-category">
                    <Tag color="blue">{product.category_name}</Tag>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageSlider;
