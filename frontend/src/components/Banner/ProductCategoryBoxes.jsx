import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import { getCategories, getProducts } from '../../api/api';
import './ProductCategoryBoxes.css';

const ProductCategoryBoxes = () => {
  const [data, setData] = useState([]);       // [{ category, products: [] }, …]
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategoriesWithProducts();
  }, []);

  const loadCategoriesWithProducts = async () => {
    setLoading(true);
    try {
      // 1. Lấy danh mục
      const categories = await getCategories();

      // 2. Với mỗi category: lấy tối đa 4 product
      const promises = categories.map(async (cat) => {
        const products = await getProducts({
          category_id: cat.id,
          limit: 4
        });
        return { category: cat, products: products.rows || products };
      });

      const results = await Promise.all(promises);
      setData(results);

    } catch (err) {
      console.error('Error loading categories or products:', err);
      message.error('Không thể tải danh mục và sản phẩm mẫu');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (loading) {
    return (
      <div className="category-boxes-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="category-boxes">
      {data.map(({ category, products }) => (
        <div 
          className="category-box" 
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="category-title">{category.name}</div>
          <div className="category-items">
            {products.map((product) => (
              <div className="category-item" key={product.id}>
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="category-item-image" 
                />
                <div className="category-item-name">{product.name}</div>
              </div>
            ))}
            {/* Nếu muốn hiển thị placeholder khi ít hơn 4 */}
            {[...Array(4 - products.length)].map((_, i) => (
              <div className="category-item placeholder" key={`ph-${i}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategoryBoxes;
