const express = require('express');

const { createSale, findAllSales, findSaleById } = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', findAllSales);

router.post('/', createSale);

router.get('/:id', findSaleById);

module.exports = router;
