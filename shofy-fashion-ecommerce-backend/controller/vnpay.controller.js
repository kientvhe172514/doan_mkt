const moment = require('moment');
const crypto = require('crypto');
const querystring = require('qs'); // <-- ĐẢM BẢO BẠN ĐÃ CÀI ĐẶT THƯ VIỆN 'qs': npm install qs
const Order = require('../model/Order'); // Đảm bảo đường dẫn đúng đến Order Model của bạn
require('dotenv').config();

// VNPAY Configuration (ensure these are loaded via dotenv in your main server file)
const vnp_TmnCode = process.env.VNP_TMNCODE;
const vnp_HashSecret = process.env.VNP_HASHSECRET;
const vnp_Url = process.env.VNP_URL;
const vnp_ReturnUrl = process.env.VNP_RETURNURL; // Sử dụng biến này nếu returnUrl từ req.body không được cung cấp

// Helper function to sort object keys alphabetically and URL-encode values for VNPAY signature
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
        const k = str[i];
        // RẤT QUAN TRỌNG: Mã hóa giá trị và thay thế %20 bằng dấu +
        // Đây là bước đảm bảo giá trị trong chuỗi ký đúng định dạng VNPAY mong muốn.
        sorted[k] = encodeURIComponent(obj[k]).replace(/%20/g, "+");
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
        // Xử lý IPv6 loopback address
        if (ipAddr && ipAddr.includes('::ffff:')) {
            ipAddr = ipAddr.split(':').pop();
        } else if (ipAddr === '::1') { // Xử lý trường hợp IPv6 loopback đơn giản
            ipAddr = '127.0.0.1';
        }
        
        if (!vnp_TmnCode || !vnp_HashSecret || !vnp_Url || !vnp_ReturnUrl) {
            console.error("VNPAY configuration is missing. Check your environment variables.");
            return res.status(500).json({ message: "VNPAY configuration is missing. Check your environment variables." });
        }

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        // Sử dụng orderId được cung cấp (từ DB) hoặc tạo mới nếu không có
        const vnpTxnRef = orderId || moment(date).format('DDHHmmss'); 

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = 'vn'; // hoặc 'en'
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = vnpTxnRef;
        vnp_Params['vnp_OrderInfo'] = orderInfo || `Thanh toan don hang ${vnpTxnRef}`;
        vnp_Params['vnp_OrderType'] = 'other'; // Có thể là 'billpayment', 'fashion', 'sport', v.v.
        vnp_Params['vnp_Amount'] = amount * 100; // VNPAY expects amount in dong (e.g., 100,000 VND -> 10000000)
        vnp_Params['vnp_ReturnUrl'] = returnUrl || vnp_ReturnUrl; // Ưu tiên returnUrl từ body request
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_ExpireDate'] = moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss'); // Thêm thời gian hết hạn cho giao dịch (15 phút)

        // Sắp xếp các tham số và mã hóa giá trị bằng hàm sortObject đã sửa
        vnp_Params = sortObject(vnp_Params);

        // Tạo chuỗi ký (signData)
        // Dùng querystring.stringify với encode: false vì các giá trị đã được encode đúng bởi sortObject
        let signData = querystring.stringify(vnp_Params, { encode: false });

        let hmac = crypto.createHmac("sha512", vnp_HashSecret);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        // Tạo URL cuối cùng
        // Lại dùng querystring.stringify với encode: false vì các giá trị đã được encode
        const finalVnpUrl = vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });

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

        console.log("VNPAY Return Params (before delete hash):", vnp_Params);

        // Xóa các tham số hash trước khi sắp xếp và tạo chuỗi ký
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sắp xếp và MÃ HÓA các tham số nhận được từ VNPAY bằng hàm sortObject đã sửa
        vnp_Params = sortObject(vnp_Params);

        if (!vnp_HashSecret) {
            console.error("VNPAY Hash Secret is missing.");
            // VNPAY mong đợi RspCode 99 cho lỗi hệ thống
            return res.status(500).json({ RspCode: '99', Message: "VNPAY Hash Secret is missing." });
        }

        // Tạo chuỗi ký để kiểm tra. 
        // Dùng querystring.stringify với encode: false vì các giá trị đã được encode bởi sortObject
        let signData = querystring.stringify(vnp_Params, { encode: false });

        let hmac = crypto.createHmac("sha512", vnp_HashSecret);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        const orderId = vnp_Params['vnp_TxnRef']; // _id của đơn hàng từ DB
        const amount = parseFloat(vnp_Params['vnp_Amount']) / 100; // Đảm bảo parse thành số float
        const responseCode = vnp_Params['vnp_ResponseCode'];
        const transactionStatus = vnp_Params['vnp_TransactionStatus'];

        let responseMessage = "Giao dịch không thành công.";
        let RspCode = '99'; // Mặc định là lỗi hệ thống

        if (secureHash === signed) {
            // Hash là hợp lệ
            if (responseCode === '00' && transactionStatus === '00') {
                // Giao dịch thành công
                RspCode = '00';
                responseMessage = "Giao dịch thành công.";

                try {
                    const order = await Order.findById(orderId);

                    if (!order) {
                        console.error('Order not found for VNPAY callback:', orderId);
                        RspCode = '01'; // Order not found (Theo mã quy định của VNPAY cho trường hợp này)
                        responseMessage = "Không tìm thấy đơn hàng.";
                    }
                    // Kiểm tra số tiền
                    // So sánh với số thập phân, sử dụng toFixed(2) để đảm bảo độ chính xác
                    else if (order.totalAmount.toFixed(2) !== amount.toFixed(2)) {
                        console.error('Amount mismatch for order:', orderId, 'Expected:', order.totalAmount, 'Received:', amount);
                        RspCode = '04'; // Invalid amount (Theo mã quy định của VNPAY)
                        responseMessage = "Số tiền không khớp.";
                    }
                    // Kiểm tra trạng thái trùng lặp (Idempotency)
                    // Nếu order.status không phải là 'payment pending', tức là đơn hàng đã được xử lý rồi
                    else if (order.status !== 'payment pending') {
                        console.log('Order already processed or not in "payment pending" state:', orderId);
                        RspCode = '02'; // Order already confirmed (Theo mã quy định của VNPAY)
                        responseMessage = "Đơn hàng đã được xác nhận hoặc đã xử lý trước đó.";
                    } else {
                        // Cập nhật trạng thái đơn hàng và chi tiết thanh toán
                        // Quan trọng: Đổi từ 'payment pending' sang 'pending' sau khi thanh toán thành công
                        order.status = 'pending'; 

                        order.paymentDetails = {
                            method: 'VNPAY',
                            vnpayTxnRef: vnp_Params['vnp_TxnRef'],
                            vnpayAmount: vnp_Params['vnp_Amount'],
                            vnpayResponseCode: responseCode,
                            vnpayTransactionStatus: transactionStatus,
                            bankCode: vnp_Params['vnp_BankCode'],
                            cardType: vnp_Params['vnp_CardType'],
                            payDate: vnp_Params['vnp_PayDate'],
                            transactionNo: vnp_Params['vnp_TransactionNo'],
                            cardAmount: vnp_Params['vnp_CardAmount'] // Có thể không có trường này tùy thuộc vào VNPAY
                        };

                        await order.save();
                        console.log(`VNPAY Payment Success and Order Updated: ${orderId}, new status: '${order.status}'`);
                    }
                } catch (dbError) {
                    console.error("Database error during VNPAY return (success path):", dbError);
                    RspCode = '99'; // Internal error
                    responseMessage = "Lỗi hệ thống khi cập nhật đơn hàng.";
                }

            } else {
                // Giao dịch thất bại hoặc đang chờ xử lý
                console.log(`VNPAY Payment Failed/Pending for Order ID: ${orderId}, Response Code: ${responseCode}, Transaction Status: ${transactionStatus}`);
                responseMessage = `Giao dịch thất bại. Mã lỗi VNPAY: ${responseCode}. Trạng thái giao dịch: ${transactionStatus}`;
                RspCode = '01'; // Default VNPAY code for transaction failed/pending

                try {
                    const order = await Order.findById(orderId);
                    // Chỉ cập nhật nếu đơn hàng tồn tại và chưa được thanh toán thành công hoặc đã xử lý
                    if (order && !['pending', 'processing', 'delivered'].includes(order.status)) {
                        order.status = 'cancel'; // Đổi sang 'cancel' khi giao dịch thất bại

                        order.paymentDetails = {
                            method: 'VNPAY',
                            vnpayTxnRef: vnp_Params['vnp_TxnRef'],
                            vnpayAmount: vnp_Params['vnp_Amount'],
                            vnpayResponseCode: responseCode,
                            vnpayTransactionStatus: transactionStatus,
                            message: responseMessage // Lưu thông báo lỗi vào paymentDetails
                        };
                        await order.save();
                        console.log(`VNPAY Payment Failed and Order Status Updated: ${orderId}, new status: '${order.status}'`);
                    } else if (order && ['pending', 'processing', 'delivered'].includes(order.status)) {
                        // Trường hợp rất hiếm: đã xử lý thành công trước đó nhưng VNPAY báo fail lần nữa
                        console.warn(`Order ${orderId} already processed (status: '${order.status}'), but VNPAY callback indicated failure/pending. Review manually.`);
                        RspCode = '02'; // Trả về '02' cho VNPAY nếu đã xử lý rồi (Idempotency)
                        responseMessage = "Đơn hàng đã được xác nhận và xử lý trước đó.";
                    }
                } catch (dbError) {
                    console.error("Database error during VNPAY failed/pending return:", dbError);
                    // RspCode vẫn là '01' hoặc '02' tùy theo logic đã chạy
                }
            }
        } else {
            console.warn("VNPAY Return: Invalid signature. Data might be tampered!");
            responseMessage = "Chữ ký không hợp lệ, dữ liệu có thể đã bị thay đổi.";
            RspCode = '97'; // Invalid signature (Theo mã quy định của VNPAY)
        }

        // VNPAY mong đợi phản hồi JSON với RspCode và Message
        res.json({ RspCode: RspCode, Message: responseMessage });

    } catch (error) {
        console.error("Error in vnpayReturn handler:", error);
        // Đây là lỗi xảy ra trong chính handler, không phải từ VNPAY callback
        res.status(500).json({ RspCode: '99', Message: "Lỗi nội bộ máy chủ khi xử lý callback VNPAY." });
    }
};