const express = require('express');
const router = express.Router();
const { createPaymentUrl, vnpayReturn } = require('../controller/vnpay.controller');

// Route to initiate VNPAY payment
router.post('/create_payment_url', createPaymentUrl);

// Route for VNPAY callback/IPN
router.get('/vnpay_return', vnpayReturn); // VNPAY typically sends GET requests for return_url

module.exports = router;