// routes/rout_product.js
const express = require('express');
const router = express.Router();
const { ctrl_user_reg, ctrl_user_login, ctrl_user_request_reset, ctrl_user_forget_password, ctrl_verify_otp } = require("../controllers/ctrl_login");
const { ctrl_Product_get, ctrl_Product_details } = require('../controllers/ctrl_product');
const { ctrl_cart_item_delete, ctrl_cart_item_add, ctrl_cart_item_remove, ctrl_user_cart } = require('../controllers/ctrl_cart');
const { ctrl_user_address, ctrl_get_user_details } = require('../controllers/ctrl_address');

router.post('/get_products', ctrl_Product_get);
router.post('/get_products_details/:id', ctrl_Product_details);
router.post('/get_user_reg', ctrl_user_reg);
router.post('/get_user_login', ctrl_user_login);
router.post('/verify_otp', ctrl_verify_otp);
router.post('/request_reset', ctrl_user_request_reset);
router.post('/forget_password', ctrl_user_forget_password);
router.post('/user_cart/:userId', ctrl_user_cart);
router.post('/cart_item_add', ctrl_cart_item_add);
router.post('/cart_item_remove', ctrl_cart_item_remove);
router.post('/cart_item_delete', ctrl_cart_item_delete);
router.post('/add_user_address', ctrl_user_address);
router.post('/get_user_details/:userId', ctrl_get_user_details);

module.exports = router;
