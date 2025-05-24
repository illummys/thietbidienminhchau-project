-- Tạo database
CREATE DATABASE IF NOT EXISTS thietbidienminhchau;
USE thietbidienminhchau;

-- Tạo bảng admins
CREATE TABLE IF NOT EXISTS admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng danh mục sản phẩm
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng thương hiệu
CREATE TABLE IF NOT EXISTS brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    logo_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE, -- Mã sản phẩm
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category_id INT,
    brand_id INT,
    image_url VARCHAR(255),
    detail TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Bảng đơn hàng (không cần user đăng nhập)
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    note TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_method ENUM('cod', 'banking') DEFAULT 'cod',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tạo index
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Insert danh mục sản phẩm
INSERT INTO categories (name, slug, description) VALUES
('Dây cáp điện', 'day-cap-dien', 'Các loại dây điện dân dụng và công nghiệp'),
('Thiết bị đóng cắt công nghiệp', 'thiet-bi-dong-cat-cong-nghiep', 'CB, MCB, MCCB...'),
('Điện dân dụng và chiếu sáng', 'dien-dan-dung-chieu-sang', 'Đèn LED, công tắc, ổ cắm,...');

-- Insert một vài thương hiệu mẫu
INSERT INTO brands (name, slug, description, status) VALUES
('Panasonic', 'panasonic', 'Thương hiệu điện tử hàng đầu Nhật Bản', 'active'),
('Schneider Electric', 'schneider-electric', 'Thương hiệu thiết bị điện công nghiệp hàng đầu', 'active'),
('Cadivi', 'cadivi', 'Thương hiệu dây cáp điện uy tín tại Việt Nam', 'active');

-- Insert sản phẩm mẫu
INSERT INTO products (name, code, slug, description, price, stock, category_id, brand_id, image_url, detail, status) VALUES
('Dây điện Cadivi CV 2.5', 'CV25CADIVI', 'day-dien-cadivi-cv-25', 'Dây đơn 2.5mm, lõi đồng, cách điện PVC', 350000.00, 100, 1, 3, 'https://example.com/day-cadivi.jpg', 'Cuộn 100m, tiêu chuẩn Việt Nam', 'active'),
('MCB Schneider 20A', 'MCBSCH20A', 'mcb-schneider-20a', 'MCB 1P 20A dùng trong công nghiệp', 220000.00, 50, 2, 2, 'https://example.com/mcb20a.jpg', 'Dòng cắt 6kA, điện áp 220V', 'active'),
('Đèn LED Panasonic 9W', 'LEDPN9W', 'den-led-panasonic-9w', 'Đèn LED tiết kiệm điện 9W', 80000.00, 200, 3, 1, 'https://example.com/led9w.jpg', 'Ánh sáng trắng, tuổi thọ 25.000h', 'active');
