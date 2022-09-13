const express = require('express');

const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.findAll);

router.post('/', productController.createProduct);

router.get('/:id', productController.findById);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
