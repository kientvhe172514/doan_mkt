const moment = require('moment');
const crypto = require('crypto');
require('dotenv').config();
// VNPAY Configuration (ensure these are loaded via dotenv in your main server file)
const vnp_TmnCode = process.env.VNP_TMNCODE;
const vnp_HashSecret = process.env.VNP_HASHSECRET;
const vnp_Url = process.env.VNP_URL;
const vnp_ReturnUrl = process.env.VNP_RETURNURL;

// Helper function to sort object keys alphabetically
function sortObject(obj) {
    let sorted = {};
    let str = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(key);
        }
    }
    str.sort();
    for (let i = 0; i < str.length; i++) {
        sorted[str[i]] = obj[str[i]];
    }
    return sorted;
}

// @desc    Create VNPAY Payment URL
// @route   POST /api/vnpay/create_payment_url
// @access  Public (or Protected if users must be logged in to initiate payment)
exports.createPaymentUrl = async (req, res, next) => {
    console.log("Creating VNPAY Payment URL with body:", req.body);
    try {
        const { amount, orderId, orderInfo, returnUrl } = req.body;

        let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ipAddr.includes('::ffff:')) {
            ipAddr = ipAddr.split(':').pop();
        }

        if (!vnp_TmnCode || !vnp_HashSecret || !vnp_Url || !vnp_ReturnUrl) {
            return res.status(500).json({ message: "VNPAY configuration is missing. Check your environment variables." });
        }

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const vnpTxnRef = orderId || moment(date).format('DDHHmmss'); // Use provided orderId or generate new

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = vnpTxnRef;
        vnp_Params['vnp_OrderInfo'] = orderInfo || `Thanh toan don hang ${vnpTxnRef}`;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100; // VNPAY expects amount in dong units (e.g., 100,000 VND -> 10000000)
        vnp_Params['vnp_ReturnUrl'] = returnUrl || vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;

        vnp_Params = sortObject(vnp_Params);

        let signData = new URLSearchParams(vnp_Params).toString();
        let hmac = crypto.createHmac("sha512", vnp_HashSecret);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        const finalVnpUrl = vnp_Url + '?' + new URLSearchParams(vnp_Params).toString();

        res.json({ vnpUrl: finalVnpUrl });

    } catch (error) {
        console.error("Error in createPaymentUrl:", error);
        next(error); // Pass to global error handler
    }
};

// @desc    Handle VNPAY Return (IPN/Callback)
// @route   GET /api/vnpay/vnpay_return
// @access  Public (VNPAY calls this)
exports.vnpayReturn = async (req, res, next) => {
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        if (!vnp_HashSecret) {
            return res.status(500).json({ RspCode: '99', Message: "VNPAY Hash Secret is missing." });
        }

        let signData = new URLSearchParams(vnp_Params).toString();
        let hmac = crypto.createHmac("sha512", vnp_HashSecret);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        const orderId = vnp_Params['vnp_TxnRef'];
        const amount = vnp_Params['vnp_Amount'] / 100; // Convert back
        const responseCode = vnp_Params['vnp_ResponseCode'];
        const transactionStatus = vnp_Params['vnp_TransactionStatus']; // '00' success, '01' pending, '02' failed

        let responseMessage = "Giao dịch không thành công.";
        let RspCode = '99'; // Default VNPAY error code for internal errors

        if (secureHash === signed) {
            // Hash is valid, now check response code and transaction status
            if (responseCode === '00' && transactionStatus === '00') {
                RspCode = '00'; // Success code for VNPAY
                responseMessage = "Giao dịch thành công.";

                // --- IMPORTANT ---
                // TODO: Update your order in the database to 'Paid' or 'Processing'.
                // 1. Find the order by 'orderId' (vnp_TxnRef).
                // 2. Verify 'amount' (vnp_Amount) matches the stored order total to prevent manipulation.
                // 3. Implement idempotency: Check if the order status is already 'Paid' to avoid double processing.
                // Example (pseudo-code):
                /*
                const order = await Order.findById(orderId); // Assuming orderId maps to your internal order ID
                if (!order) {
                    console.error('Order not found for VNPAY callback:', orderId);
                    // RspCode='01' (order not found) or '99'
                } else if (order.totalAmount !== amount) { // Always compare actual value
                    console.error('Amount mismatch for order:', orderId, 'Expected:', order.totalAmount, 'Received:', amount);
                    // RspCode='04' (invalid amount) or '99'
                } else if (order.status === 'Paid') {
                    console.log('Order already processed:', orderId);
                    // RspCode='02' (order already confirmed)
                } else {
                    order.status = 'Paid';
                    order.paymentDetails = {
                        method: 'VNPAY',
                        vnpayTxnRef: vnp_Params['vnp_TxnRef'],
                        vnpayAmount: vnp_Params['vnp_Amount'],
                        vnpayResponseCode: responseCode,
                        vnpayTransactionStatus: transactionStatus,
                        bankCode: vnp_Params['vnp_BankCode'],
                        cardType: vnp_Params['vnp_CardType'],
                        payDate: vnp_Params['vnp_PayDate']
                    };
                    await order.save();
                    console.log(`VNPAY Payment Success and Order Updated: ${orderId}`);
                    // RspCode='00' (transaction successful and order updated)
                }
                */
            } else {
                // Transaction failed or pending, based on responseCode and transactionStatus
                console.log(`VNPAY Payment Failed for Order ID: ${orderId}, Response Code: ${responseCode}, Transaction Status: ${transactionStatus}`);
                responseMessage = `Giao dịch thất bại. Mã lỗi VNPAY: ${responseCode}. Trạng thái giao dịch: ${transactionStatus}`;
                RspCode = '01'; // Default VNPAY code for transaction failed/pending
                // TODO: Update order status to 'Failed' or 'Canceled' in your database.
            }
        } else {
            console.warn("VNPAY Return: Invalid signature. Data might be tampered!");
            responseMessage = "Chữ ký không hợp lệ, dữ liệu có thể đã bị thay đổi.";
            RspCode = '97'; // VNPAY code for invalid signature
            // TODO: Log this security alert. Do NOT process the order as paid.
        }

        // VNPAY expects a specific JSON response format on the return URL
        res.json({ RspCode: RspCode, Message: responseMessage });

    } catch (error) {
        console.error("Error in vnpayReturn handler:", error);
        res.status(500).json({ RspCode: '99', Message: "Lỗi nội bộ máy chủ khi xử lý callback VNPAY." });
        // next(error); // Don't use next(error) here as VNPAY expects a specific JSON response.
    }
};