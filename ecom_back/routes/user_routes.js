// routes/rout_product.js
const express = require('express');
const router = express.Router();
const { ctrl_Product_get, ctrl_Product_details } = require('../controllers/ctrl_product');

router.post('/get_products', ctrl_Product_get);
router.post('/get_products_details/:id', ctrl_Product_details);

module.exports = router;
