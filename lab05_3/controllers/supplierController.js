// controllers/supplierController.js
const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.render('suppliers/index', { title: 'Quản lý nhà cung cấp', suppliers });
    } catch (err) {
        console.error('supplierController.index error:', err);
        res.status(500).render('500', { title: 'Lỗi server' });
    }
};

exports.newGet = (req, res) => {
    res.render('suppliers/new', { title: 'Thêm nhà cung cấp', supplier: null, error: null });
};

exports.create = async(req, res) => {
    try {
        const { name, address, phone } = req.body;
        if (!name) {
            return res.render('suppliers/new', { title: 'Thêm nhà cung cấp', error: 'Tên nhà cung cấp là bắt buộc', supplier: { name, address, phone } });
        }
        await Supplier.create({ name, address, phone });
        res.redirect('/suppliers');
    } catch (err) {
        console.error('supplierController.create error:', err);
        res.render('suppliers/new', { title: 'Thêm nhà cung cấp', error: 'Lỗi server', supplier: req.body });
    }
};

exports.editGet = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).render('404', { title: 'Không tìm thấy nhà cung cấp' });
        }
        res.render('suppliers/edit', { title: 'Sửa nhà cung cấp', supplier, error: null });
    } catch (err) {
        console.error('supplierController.editGet error:', err);
        res.status(500).render('500', { title: 'Lỗi server' });
    }
};

exports.update = async(req, res) => {
    try {
        const { name, address, phone } = req.body;
        if (!name) {
            const supplier = await Supplier.findById(req.params.id);
            return res.render('suppliers/edit', { title: 'Sửa nhà cung cấp', supplier: { _id: req.params.id, name, address, phone }, error: 'Tên nhà cung cấp là bắt buộc' });
        }
        await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
        res.redirect('/suppliers');
    } catch (err) {
        console.error('supplierController.update error:', err);
        res.status(500).render('500', { title: 'Lỗi server' });
    }
};

exports.delete = async(req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.redirect('/suppliers');
    } catch (err) {
        console.error('supplierController.delete error:', err);
        res.status(500).render('500', { title: 'Lỗi server' });
    }
};