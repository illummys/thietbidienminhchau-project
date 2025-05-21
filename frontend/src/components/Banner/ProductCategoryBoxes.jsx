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
      // Lọc ra các category có sản phẩm
      const categoriesWithProducts = results.filter(item => 
        item.products && item.products.length > 0
      );
      setData(categoriesWithProducts);

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

  const handleProductClick = (productId, e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra category
    navigate(`/product/${productId}`);
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
          key={category.id} 
          className="category-box"
          onClick={() => handleCategoryClick(category.id)}
        >
          <h2 className="category-title">{category.name}</h2>
          <div className="category-items">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="category-item"
                onClick={(e) => handleProductClick(product.id, e)}
              >
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="category-item-image"
                />
                <div className="category-item-name">{product.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategoryBoxes;
