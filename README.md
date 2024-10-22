**Dự án Xác Thực Người Dùng với JWT - Node.js và AngularJS**
**Giới thiệu**
Dự án này là hệ thống xác thực người dùng sử dụng JSON Web Tokens (JWT), bao gồm tính năng login, refresh token, và bảo vệ các route. Dự án sử dụng Node.js cho phần backend, AngularJS cho frontend, và lite-server để phục vụ ứng dụng trong quá trình phát triển.

**Yêu cầu hệ thống**
Node.js: v10.x
AngularJS: 1.x

**Cài đặt và cấu hình**
git clone https://github.com/your-username/your-project.git

**Chỉnh sửa file config.env**
  
  Cấu hình máy chủ
  PORT=8080  # Cổng mặc định cho ứng dụng
  
  Cấu hình cơ sở dữ liệu MongoDB
  DATABASE=mongodb+srv://secureauth:<MONGODB_PASSWORD>@cluster0.ehjwf.mongodb.net/secureauth
  MONGODB_PASSWORD=<đặt mật khẩu cơ sở dữ liệu tại đây>
  
  Cấu hình bảo mật JWT
  JWT_SECRET=<đặt mã bảo mật JWT dài và mạnh tại đây>  # Ví dụ: my-ultra-secure-and-ultra-long-secret
  JWT_EXPIRES_IN=15m  # Thời gian hết hạn cho JWT (15 phút)
  REFRESH_TOKEN_SECRET=<đặt mã bảo mật refresh token tại đây>  # Ví dụ: this-is-refresh-token-secret-at-auth-secure
  REFRESH_TOKEN_EXPIRES_IN=90d  # Thời gian hết hạn cho refresh token (90 ngày)
  
  Cấu hình email (Mailtrap)
  EMAIL_USERNAME=<đặt tên đăng nhập email của bạn>
  EMAIL_PASSWORD=<đặt mật khẩu email của bạn>
  EMAIL_HOST=smtp.mailtrap.io  # SMTP server của Mailtrap
  EMAIL_PORT=25  # Cổng SMTP, sử dụng cổng 25 cho Mailtrap
