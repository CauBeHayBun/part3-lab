const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// home: show latest products
router.get('/', async(req, res) => {
    const products = await Product.find().populate('supplier').limit(20);
    res.render('index', { title: 'Trang chủ', products });
});

module.exports = router;