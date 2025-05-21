import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Descriptions, Card, Carousel, Tag, Spin, message, Button, Breadcrumb } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HomeOutlined, RightOutlined } from '@ant-design/icons';
import { getProduct, getProducts } from '../api/api';
import './ProductDetailPage.css';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      // 1. Lấy chi tiết sản phẩm
      const prod = await getProduct(productId);
      setProduct(prod);

      // 2. Lấy related: cùng category, giới hạn 4
      if (prod.category_id) {
        const result = await getProducts({ category_id: prod.category_id, limit: 5 });
        const items = Array.isArray(result) ? result : result.rows || [];
        setRelated(items.filter(p => p.id !== prod.id).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      message.error('Không thể tải thông tin sản phẩm');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }
  if (!product) return null;

  const images = product.images || [product.image_url || ''];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <Breadcrumb className="product-breadcrumb">
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[32, 32]}>
        {/* Images */}
        <Col xs={24} md={12}>
          <div className="product-images-container">
            <Carousel
              beforeChange={(from, to) => setActiveImageIndex(to)}
              className="product-carousel"
            >
              {images.map((img, idx) => (
                <div key={idx} className="carousel-item">
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="product-image"/>
                </div>
              ))}
            </Carousel>
            <div className="product-thumbnails">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-container ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`thumb ${idx}`}
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Info */}
        <Col xs={24} md={12}>
          <div className="product-info-container">
            <Title level={2} className="product-title">{product.name}</Title>
            
            <div className="product-tags">
              <Tag color="blue">{product.category_name || product.Category?.name}</Tag>
              {product.best_seller && <Tag color="red">Bán chạy</Tag>}
              {product.stock > 0 ? (
                <Tag color="green">Còn hàng</Tag>
              ) : (
                <Tag color="red">Hết hàng</Tag>
              )}
            </div>

            <div className="product-price">
              <Text className="price-value">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </Text>
            </div>

            <div className="product-actions">
              <Button 
                type="primary" 
                size="large"
                icon={<ShoppingCartOutlined />}
                className="add-to-cart-btn-deitail"
                disabled={product.stock === 0}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button 
                size="large"
                icon={<HeartOutlined />}
                className="add-to-wishlist-btn"
              >
                Yêu thích
              </Button>
            </div>

            <div className="product-description">
              <Title level={4}>Mô tả sản phẩm</Title>
              <Paragraph>{product.description}</Paragraph>
            </div>

            {product.features?.length > 0 && (
              <div className="product-features">
                <Title level={4}>Tính năng nổi bật</Title>
                <ul>
                  {product.features.map((f, i) => (
                    <li key={i}>
                      <RightOutlined /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="product-specifications">
                <Title level={4}>Thông số kỹ thuật</Title>
                <Descriptions bordered column={1}>
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <Descriptions.Item key={k} label={k}>{v}</Descriptions.Item>
                  ))}
                </Descriptions>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <Title level={3}>Sản phẩm cùng loại</Title>
          <Row gutter={[24, 24]}>
            {relatedProducts.map(r => (
              <Col xs={24} sm={12} md={8} lg={6} key={r.id}>
                <Card
                  hoverable
                  className="related-product-card"
                  cover={
                    <div className="related-product-image-container">
                      <img alt={r.name} src={r.image_url} className="related-product-image" />
                      {r.best_seller && <Tag color="red" className="best-seller-tag">Bán chạy</Tag>}
                    </div>
                  }
                  onClick={() => navigate(`/product/${r.id}`)}
                >
                  <Meta
                    title={r.name}
                    description={
                      <div className="related-product-info">
                        <div className="related-product-price">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(r.price)}
                        </div>
                        <div className="related-product-stock">
                          {r.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
