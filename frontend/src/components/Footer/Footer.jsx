import React from 'react';
import { FacebookOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột Giới thiệu */}
        <div className="footer-column">
          <h3>Giới thiệu</h3>
          <div className="company-info">
            <h4>Công ty TNHH Thiết Bị Điện Minh Châu</h4>
            <p>
              Chuyên cung cấp các sản phẩm thiết bị điện chất lượng cao, 
              đảm bảo an toàn và hiệu quả cho mọi công trình. Với hơn 10 năm 
              kinh nghiệm trong ngành, chúng tôi cam kết mang đến những giải 
              pháp điện tốt nhất cho khách hàng.
            </p>
            <div className="contact-info">
              <p><PhoneOutlined /> Hotline: 0123 456 789</p>
              <p><MailOutlined /> Email: info@minhchau.com</p>
            </div>
          </div>
        </div>

        {/* Cột Địa chỉ và Bản đồ */}
        <div className="footer-column">
          <h3>Địa chỉ</h3>
          <div className="address-info">
            <p><EnvironmentOutlined /> 12A Phạm Hồng Thái, Phường Vạn Thạnh, 
               Thành Phố Nha Trang, Tỉnh Khánh Hoà, Việt Nam</p>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.965789!2d109.1967!3d12.2477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE0JzUxLjciTiAxMDnCsDExJzQ4LjEiRQ!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Cột Fanpage */}
        <div className="footer-column">
          <h3>Kết nối với chúng tôi</h3>
          <div className="social-info">
            <div className="fanpage-container">
              <iframe
                src=""
                width="100%"
                height="200"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Fanpage"
              ></iframe>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined /> Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Thiết Bị Điện Minh Châu. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 