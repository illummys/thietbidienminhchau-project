import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Spin, message, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/api';
import './ProductsPage.css';

const { Meta } = Card;
const { Search } = Input;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [pagination.current, pagination.pageSize]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Gọi API lấy products với params
      const result = await getProducts({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchTerm
      });
      // API trả về { rows: [...], count: N }
      const { rows, count } = result;
      setProducts(rows);
      setPagination(prev => ({ ...prev, total: count }));
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    // fetchProducts sẽ tự chạy do searchTerm change
  };

  const handlePageChange = (page, pageSize) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize
    }));
  };

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Danh sách sản phẩm</h1>
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {products.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.image_url || '/placeholder.png'}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  }
                  onClick={() => handleCardClick(product.id)}
                >
                  <Meta
                    title={product.name}
                    description={
                      <>
                        <p className="product-price">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(product.price)}
                        </p>
                        <p className="product-category">
                          Danh mục: {product.Category?.name || '—'}
                        </p>
                        <p className="product-brand">
                          Thương hiệu: {product.Brand?.name || '—'}
                        </p>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <div className="pagination-container">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={total => `Tổng số ${total} sản phẩm`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
