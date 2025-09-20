const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { ensureAuth } = require('../middlewares/auth');

// List nhà cung cấp
router.get('/', ensureAuth, supplierController.index);

// Thêm mới
router.get('/new', ensureAuth, supplierController.newGet);
router.post('/create', ensureAuth, supplierController.create);

// Sửa
router.get('/:id/edit', ensureAuth, supplierController.editGet);
router.post('/:id/update', ensureAuth, supplierController.update);

// Xoá
router.post('/:id/delete', ensureAuth, supplierController.delete);

module.exports = router;