Shop MVC Session

Ứng dụng Node.js + Express + MongoDB dùng cho quản lý sản phẩm, nhà cung cấp và người dùng, với xác thực bằng session và cookie.

Tính năng chính:
- Quản lý nhà cung cấp (Supplier): tên, địa chỉ, số điện thoại.
- Quản lý sản phẩm (Product): tên, giá, số lượng, tham chiếu tới nhà cung cấp.
- Đăng ký, đăng nhập, đăng xuất, quên mật khẩu cho người dùng.
- Tìm kiếm sản phẩm theo tên.
- Xem sản phẩm theo nhà cung cấp thông qua menu.
- Các chức năng CRUD cho sản phẩm và nhà cung cấp; chỉ người dùng đã đăng nhập mới được thao tác.

Các công nghệ sử dụng:
Node.js, Express, MongoDB, Mongoose, EJS, express-ejs-layouts, express-session, connect-mongo, bcrypt, dotenv.

Cấu trúc thư mục:
- app.js : điểm bắt đầu ứng dụng.
- seed.js : file khởi tạo dữ liệu mẫu.
- config/session.js : cấu hình session.
- models/ : chứa model User, Product, Supplier.
- controllers/ : logic xử lý cho sản phẩm, nhà cung cấp, xác thực.
- routes/ : định nghĩa các endpoint cho sản phẩm, nhà cung cấp, auth.
- middlewares/auth.js : kiểm tra nếu user đã đăng nhập hay chưa.
- views/ : các file EJS, gồm layout, trang chủ, auth (login/register/forgot), products (list, tạo, sửa), suppliers (list, tạo, sửa), partials (header, footer).
- public/css/style.css : styles nếu có.

Cài đặt và chạy:
1. Cài các package bằng npm install
2. Tạo file môi trường .env với các biến: PORT, DB_URI (MongoDB connection), SESSION_SECRET.
3. Dùng npm run seed để tạo dữ liệu mẫu.
4. Dùng npm start để chạy server.
5. Mở trình duyệt tới http://localhost:PORT

Sử dụng:
- Trang chủ hiển thị sản phẩm, có menu nhà cung cấp và thanh tìm kiếm.
- /auth/register để đăng ký tài khoản.
- /auth/login để đăng nhập.
- /auth/logout để đăng xuất.
- /auth/forgot để xử lý quên mật khẩu.
- /products để xem, thêm, sửa, xoá sản phẩm (yêu cầu đăng nhập).
- /suppliers để xem, thêm, sửa, xoá nhà cung cấp (yêu cầu đăng nhập).

Quyền truy cập bảo vệ:
- Các route CRUD được bảo vệ bằng middleware ensureAuth: nếu chưa đăng nhập, sẽ chuyển về trang login.
- Các trang như đăng nhập, đăng ký, quên mật khẩu được bảo vệ bởi ensureGuest để người đã đăng nhập không truy cập được.

Cách mở rộng:
- Thêm chức năng phân quyền người dùng (admin vs user).
- Validate dữ liệu đầu vào (username, email, giá, số lượng…)
