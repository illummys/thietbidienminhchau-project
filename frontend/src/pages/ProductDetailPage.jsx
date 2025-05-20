import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Descriptions, Card, Carousel, Tag, Spin, message } from 'antd';
import { getProduct, getProducts } from '../api/api';
import './ProductDetailPage.css';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate      = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct]       = useState(null);
  const [relatedProducts, setRelated] = useState([]);
  const [loading, setLoading]       = useState(true);

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
        // Giả sử API trả về { rows, count }
        const items = Array.isArray(result)
          ? result
          : result.rows || [];
        // Lọc ra chính nó và lấy tối đa 4
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
      <Row gutter={[32, 32]}>
        {/* Images */}
        <Col xs={24} md={12}>
          <Carousel
            beforeChange={(from, to) => setActiveImageIndex(to)}
            className="product-carousel"
          >
            {images.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt={`${product.name} ${idx + 1}`} className="product-image"/>
              </div>
            ))}
          </Carousel>
          <div className="product-thumbnails">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb ${idx}`}
                className={`thumbnail ${activeImageIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              />
            ))}
          </div>
        </Col>

        {/* Info */}
        <Col xs={24} md={12}>
          <Title level={2}>{product.name}</Title>
          <Tag color="blue">{product.category_name || product.Category?.name}</Tag>
          <div className="product-price">
            <Text strong>Giá: </Text>
            <Text className="price-value">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </Text>
          </div>

          <div className="product-description">
            <Title level={4}>Mô tả sản phẩm</Title>
            <Paragraph>{product.description}</Paragraph>
          </div>

          {product.features?.length > 0 && (
            <div className="product-features">
              <Title level={4}>Tính năng nổi bật</Title>
              <ul>
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
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
        </Col>
      </Row>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <Title level={3}>Sản phẩm cùng loại</Title>
          <Row gutter={[24, 24]}>
            {relatedProducts.map(r => (
              <Col xs={24} sm={12} md={8} lg={6} key={r.id}>
                <Card
                  hoverable
                  cover={<img alt={r.name} src={r.image_url} className="related-product-image" />}
                  onClick={() => navigate(`/products/${r.id}`)}
                >
                  <Meta
                    title={r.name}
                    description={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(r.price)}
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
