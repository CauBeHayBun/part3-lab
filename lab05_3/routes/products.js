const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { ensureAuth } = require('../middlewares/auth');

router.get('/', productController.index);
router.get('/search', productController.search);
router.get('/new', ensureAuth, productController.newGet);
router.post('/create', ensureAuth, productController.create);
router.get('/:id/edit', ensureAuth, productController.editGet);
router.post('/:id/update', ensureAuth, productController.update);
router.post('/:id/delete', ensureAuth, productController.delete);
router.get('/supplier/:id', productController.bySupplier);
module.exports = router;