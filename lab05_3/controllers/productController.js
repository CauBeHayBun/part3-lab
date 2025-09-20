const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    const products = await Product.find().populate('supplier');
    res.render('products/index', { title: 'Quản lý sản phẩm', products });
};

exports.newGet = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/new', { title: 'Thêm sản phẩm', suppliers });
};

exports.create = async(req, res) => {
    try {
        const { name, price, quantity, supplier } = req.body;
        await Product.create({ name, price, quantity, supplier });
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.redirect('/products');
    }
};

exports.editGet = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/edit', { title: 'Sửa sản phẩm', product, suppliers });
};

exports.update = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    res.redirect('/products');
};

exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};

// search and by-supplier
exports.search = async(req, res) => {
    const q = (req.query.q || '').trim();
    const products = q ? await Product.find({ name: new RegExp(q, 'i') }).populate('supplier') : [];
    res.render('products/index', { title: `Kết quả: ${q}`, products, query: q });
};

exports.bySupplier = async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
        return res.status(404).send('Supplier not found');
    }
    const products = await Product.find({ supplier: supplier._id }).populate('supplier');
    res.render('products/index', { title: `Sản phẩm của ${supplier.name}`, products });
};