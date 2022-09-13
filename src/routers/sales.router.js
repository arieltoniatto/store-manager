const express = require('express');

const {
  createSale, findAllSales, findSaleById, deleteSale,
} = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', findAllSales);

router.post('/', createSale);

router.get('/:id', findSaleById);

router.delete('/:id', deleteSale);

module.exports = router;
