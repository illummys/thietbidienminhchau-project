import React from 'react';
import { PhoneOutlined, CommentOutlined } from '@ant-design/icons'; // CommentOutlined có thể dùng tạm cho chat/Zalo
import './FixedContactButtons.css';

const FixedContactButtons = () => {
  const phoneNumber = '0123456789'; // Thay bằng số điện thoại thật
  const zaloLink = 'https://zalo.me/yourzaloID'; // Thay bằng link Zalo của bạn

  return (
    <div className="fixed-contact-buttons">
      {/* Nút Zalo */}
      <a href={zaloLink} className="contact-button zalo" target="_blank" rel="noopener noreferrer">
        <CommentOutlined /> {/* Icon Zalo, cần thay thế */} 
        {/* <img src="/path/to/zalo-icon.svg" alt="Zalo" className="contact-icon" /> */}
      </a>

      {/* Nút Hotline */}
      <a href={`tel:${phoneNumber}`} className="contact-button phone">
        <PhoneOutlined />
      </a>
    </div>
  );
};

export default FixedContactButtons; 