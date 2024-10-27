// routes/rout_product.js
const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');
const { ctrl_Product_entry } = require('../controllers/ctrl_product');
const { ctrl_admin_login } = require("../controllers/ctrl_login");
const { ctrl_Product_get, ctrl_Product_details, ctrl_edit_Product } = require('../controllers/ctrl_product');

router.post('/admin_login', ctrl_admin_login);
router.post('/entry_products', upload, ctrl_Product_entry);
router.post('/get_products', ctrl_Product_get);
router.post('/get_products_details/:id', ctrl_Product_details);
router.put('/update_product/:id', upload, ctrl_edit_Product);


module.exports = router;
