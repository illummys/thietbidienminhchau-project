# Backend API - Thiết Bị Điện Minh Châu

Backend API cho website Thiết Bị Điện Minh Châu, được xây dựng với Node.js, Express và MySQL.

## Yêu cầu hệ thống

- Node.js (v14 trở lên)
- MySQL (v8.0 trở lên)
- npm hoặc yarn

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd backend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` và cấu hình các biến môi trường:
```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=thietbidienminhchau

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# File upload
MAX_FILE_SIZE=5242880 # 5MB
UPLOAD_PATH=uploads
```

4. Tạo database:
```sql
CREATE DATABASE thietbidienminhchau CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. Khởi tạo database với dữ liệu mẫu:
```bash
npm run init-db
```

## Chạy ứng dụng

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin người dùng
- `PUT /api/auth/profile` - Cập nhật thông tin người dùng
- `PUT /api/auth/change-password` - Đổi mật khẩu

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (admin only)
- `PUT /api/products/:id` - Cập nhật sản phẩm (admin only)
- `DELETE /api/products/:id` - Xóa sản phẩm (admin only)

## Cấu trúc thư mục

```
backend/
├── controllers/     # Controllers xử lý logic
├── middlewares/     # Middleware functions
├── models/         # Database models
├── routes/         # Route definitions
├── scripts/        # Utility scripts
├── uploads/        # Uploaded files
├── .env           # Environment variables
├── package.json   # Project dependencies
└── server.js      # Application entry point
```

## Tài khoản mặc định

Sau khi chạy script khởi tạo database, một tài khoản admin sẽ được tạo với thông tin:

- Username: admin
- Password: admin123
- Email: admin@example.com

## Bảo mật

- Sử dụng JWT để xác thực
- Mật khẩu được mã hóa với bcrypt
- Validation đầu vào với express-validator
- Xử lý lỗi tập trung
- CORS được cấu hình để chỉ cho phép frontend truy cập

## License

MIT 