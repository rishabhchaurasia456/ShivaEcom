// routes/rout_product.js
const express = require('express');
const router = express.Router();
const { ctrl_Product_entry } = require('../controllers/ctrl_product');
const { upload } = require('../middleware/multer');

// POST /products - Create a new product with all images in one array
router.post('/entry_products', upload, ctrl_Product_entry);

module.exports = router;
