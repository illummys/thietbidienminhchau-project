import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Banner.css';
import capDien1 from '../../assets/images/capDien1.jpg';
import capDien2 from '../../assets/images/capDien2.jpg';

const Banner = () => {
  const bannerItems = [
    {
      id: 1,
      image: capDien1,
      title: 'Khuyến mãi lớn',
      description: 'Giảm giá lên đến 50% cho các sản phẩm thiết bị điện',
      link: '/promotions'
    },
    {
      id: 2,
      image: capDien2,
      title: 'Sản phẩm mới',
      description: 'Khám phá các thiết bị điện thông minh mới nhất',
      link: '/new-products'
    }
  ];

  const carouselRef = React.useRef();

  const next = () => {
    carouselRef.current?.next();
  };

  const previous = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="banner">
      <button className="banner-nav-button prev" onClick={previous}>
        <LeftOutlined />
      </button>
      <button className="banner-nav-button next" onClick={next}>
        <RightOutlined />
      </button>
      <Carousel autoplay ref={carouselRef}>
        {bannerItems.map((item) => (
          <div key={item.id} className="banner-item">
            <div className="banner-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="banner-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} className="banner-button">
                Xem thêm
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
