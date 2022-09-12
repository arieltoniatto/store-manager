const express = require('express');

const { createSale } = require('../controllers/sales.controller');

const router = express.Router();

// router.get('/');

router.post('/', createSale);

module.exports = router;
