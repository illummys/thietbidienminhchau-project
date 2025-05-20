import React from 'react';
import { CarOutlined, SyncOutlined, PhoneOutlined } from '@ant-design/icons';
import './ServiceBar.css';

const services = [
  {
    icon: <CarOutlined style={{ fontSize: 32, color: '#3a8d23' }} />, 
    title: 'Miễn phí giao hàng',
    desc: 'Đơn hàng từ 500.000đ tại Nha Trang'
  },
  {
    icon: <SyncOutlined style={{ fontSize: 32, color: '#3a8d23' }} />,
    title: '30 ngày đổi sản phẩm',
    desc: 'Đổi trả dễ dàng, nhanh chóng'
  },
  {
    icon: <PhoneOutlined style={{ fontSize: 32, color: '#3a8d23' }} />,
    title: 'Mua hàng: 0123 456 789',
    desc: 'Tư vấn miễn phí, hỗ trợ tận nơi'
  }
];

const ServiceBar = () => (
  <div className="service-bar">
    {services.map((s, idx) => (
      <div className="service-item" key={idx}>
        <div className="service-icon">{s.icon}</div>
        <div className="service-title">{s.title}</div>
        <div className="service-desc">{s.desc}</div>
      </div>
    ))}
  </div>
);

export default ServiceBar; 