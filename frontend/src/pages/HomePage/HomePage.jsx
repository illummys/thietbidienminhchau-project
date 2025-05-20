import React from 'react';
import Banner from '../../components/Banner/Banner';
import './HomePage.css';
import ServiceBar from '../../components/Banner/ServiceBar';
import ProductCategoryBoxes from '../../components/Banner/ProductCategoryBoxes';
import ProductImageSlider from '../../components/ProductImageSlider/ProductImageSlider';

const HomePage = () => {
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