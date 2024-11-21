const express = require('express');
const router = express.Router();

const {ctrl_user_payment} = require ('../controllers/ctrl_payment')

router.post('/order_payment', ctrl_user_payment);

module.exports = router;
