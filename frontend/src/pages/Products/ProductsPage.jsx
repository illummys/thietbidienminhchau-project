import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Spin, message, Pagination, Button } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/api';
import './ProductsPage.css';

const { Meta } = Card;
const { Search } = Input;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  // Danh sách giả lập các category (bạn có thể fetch từ API)
  const categories = [
    { id: 1, name: 'Dây cáp điện' },
    { id: 2, name: 'Thiết bị công nghiệp' },
    { id: 3, name: 'Điện dân dụng & chiếu sáng' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Khi pagination hoặc searchParams thay đổi → fetch lại
  useEffect(() => {
    fetchProducts();
  }, [pagination.current, pagination.pageSize, searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const categoryId = searchParams.get('category_id');
      const params = {
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
      };
      if (categoryId) {
        params.category_id = categoryId;
      }

      const result = await getProducts(params);
      const items = Array.isArray(result) ? result : result.rows || [];

      setProducts(items);
      setPagination(prev => ({
        ...prev,
        total: result.count || items.length
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Khi user bấm nút tìm kiếm
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filtered);
    setPagination(prev => ({ ...prev, total: filtered.length, current: 1 }));
  };

  const handlePageChange = (page, pageSize) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize
    }));
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Khi bấm nút category, cập nhật query param ?category=
  const handleCategoryFilter = (catId) => {
    setPagination(prev => ({ ...prev, current: 1 }));
    if (catId) {
      setSearchParams({ category_id: catId });
    } else {
      setSearchParams({}); // xóa filter
    }
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

      {/* Nút lọc theo category */}
      <div className="category-filters" style={{ margin: '16px 0 8px 0' }}>
        <Button
          type={!searchParams.get('category') ? 'primary' : 'default'}
          onClick={() => handleCategoryFilter(null)}
          style={{ marginRight: 8 }}
        >
          Tất cả
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.id}
            type={String(cat.id) === searchParams.get('category') ? 'primary' : 'default'}
            onClick={() => handleCategoryFilter(cat.id)}
            style={{ marginRight: 8 , marginTop: 8}}
          >
            {cat.name}
          </Button>
        ))}
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
                  onClick={() => handleCardClick(product)}
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
