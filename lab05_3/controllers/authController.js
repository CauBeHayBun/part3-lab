// controllers/authController.js
const User = require('../models/User');

exports.registerGet = (req, res) => {
    res.render('auth/register', { title: 'Đăng ký', error: null });
};

exports.registerPost = async(req, res) => {
    try {
        const { username, password, email, phone } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!username || !password || !email) {
            return res.render('auth/register', { title: 'Đăng ký', error: 'Tên đăng nhập, email và mật khẩu là bắt buộc' });
        }

        // Kiểm tra user đã tồn tại
        const existing = await User.findOne({ username });
        if (existing) {
            return res.render('auth/register', { title: 'Đăng ký', error: 'Tên đăng nhập đã tồn tại' });
        }

        // Tạo user mới
        const user = new User({ username, password, email, phone });
        await user.save();

        // Lưu session
        req.session.user = { id: user._id, username: user.username, email: user.email };

        res.redirect('/');
    } catch (err) {
        console.error('Register error:', err);
        res.render('auth/register', { title: 'Đăng ký', error: 'Lỗi server' });
    }
};

exports.loginGet = (req, res) => {
    res.render('auth/login', { title: 'Đăng nhập', error: null });
};

exports.loginPost = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('auth/login', { title: 'Đăng nhập', error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.render('auth/login', { title: 'Đăng nhập', error: 'Không tìm thấy người dùng' });
        }

        const ok = await user.comparePassword(password);
        if (!ok) {
            return res.render('auth/login', { title: 'Đăng nhập', error: 'Sai mật khẩu' });
        }

        // Đăng nhập thành công
        req.session.user = { id: user._id, username: user.username, email: user.email };
        res.redirect('/');
    } catch (err) {
        console.error('Login error:', err);
        res.render('auth/login', { title: 'Đăng nhập', error: 'Lỗi server' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            // mặc định redirect vẫn
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};

exports.forgotGet = (req, res) => {
    res.render('auth/forgot', { title: 'Quên mật khẩu', error: null });
};

// Nếu muốn xử lý form forgot POST
exports.forgotPost = async(req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.render('auth/forgot', { title: 'Quên mật khẩu', error: 'Nhập email để tiếp tục' });
        }
        // Ở đây bạn có thể logic tìm user, gửi mail, etc.
        // Giả sử chỉ render thông báo
        res.render('auth/forgot', { title: 'Quên mật khẩu', error: `Một email đã được gửi đến ${email}` });
    } catch (err) {
        console.error('Forgot error:', err);
        res.render('auth/forgot', { title: 'Quên mật khẩu', error: 'Lỗi server' });
    }
};