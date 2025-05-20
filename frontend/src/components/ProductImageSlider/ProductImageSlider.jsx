import React, { useState, useRef, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { getProducts } from '../../api/api';
import './ProductImageSlider.css';

const ProductImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const sliderRef = useRef(null);
  const itemRef   = useRef(null);
  const [itemWidth, setItemWidth]   = useState(0);
  const itemsToShow = 5; // Number of items visible at once

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (itemRef.current) {
      const width = itemRef.current.offsetWidth;
      const style = getComputedStyle(itemRef.current);
      const marginRight = parseFloat(style.marginRight);
      const marginLeft  = parseFloat(style.marginLeft);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight= parseFloat(style.paddingRight);
      setItemWidth(width + marginLeft + marginRight + paddingLeft + paddingRight);
    }
  }, [products]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      // Lấy sản phẩm nổi bật: API wrapper getProducts trả về trực tiếp mảng
      const items = await getProducts({ featured: true });
      setProducts(items);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      message.error('Không thể tải sản phẩm nổi bật');
    } finally {
      setLoading(false);
    }
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
      <button
        className="slider-nav-button prev"
        onClick={previous}
        disabled={currentIndex === 0}
      >
        <LeftOutlined />
      </button>

      <div className="product-slider" ref={sliderRef}>
        <div className="product-slider-track">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-slider-item"
              ref={itemRef}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="product-slider-image"
              />
              <div className="product-slider-info">
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString('vi-VN')} VNĐ</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="slider-nav-button next"
        onClick={next}
        disabled={currentIndex >= products.length - itemsToShow}
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default ProductImageSlider;
