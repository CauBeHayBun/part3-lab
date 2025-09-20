require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const sessionOptions = require('./config/session');
const Supplier = require('./models/Supplier');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const suppliersRouter = require('./routes/suppliers');

const app = express();

// connect DB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// static, parsers
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// session (must be before middleware that uses req.session)
app.use(session(sessionOptions));

// global locals — user & suppliers (so header can use them)
app.use((req, res, next) => {
    res.locals.user = (req.session && req.session.user) ? req.session.user : null;
    next();
});

app.use(async(req, res, next) => {
    try {
        res.locals.suppliers = await Supplier.find().sort({ name: 1 });
    } catch (err) {
        res.locals.suppliers = [];
    }
    next();
});

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);

// 404 & error
app.use((req, res) => res.status(404).render('404', { title: 'Trang không tìm thấy' }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Lỗi server' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀Server running at http://localhost:${PORT}`));