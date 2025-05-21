import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import './HomePage.css';
import ServiceBar from '../../components/Banner/ServiceBar';
import ProductCategoryBoxes from '../../components/Banner/ProductCategoryBoxes';
import ProductImageSlider from '../../components/ProductImageSlider/ProductImageSlider';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-page">
      <main className="main-content">
        <Banner />
        <ProductImageSlider />
        <ServiceBar />
        <ProductCategoryBoxes />
      </main>
    </div>
  );
};

export default HomePage; 