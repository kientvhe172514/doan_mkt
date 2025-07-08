const { secret } = require("../config/secret");
const stripe = require("stripe")(secret.stripe_key);
const Order = require("../model/Order");
const Products = require("../model/Products");
const Coupon = require("../model/Coupon")
// create-payment-intent
exports.paymentIntent = async (req, res, next) => {
  try {
    const product = req.body;
    const price = Number(product.price);
    const amount = price * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};
// addOrder
exports.addOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);

    /*
    // ===================================================================
    // TẠM THỜI VÔ HIỆU HÓA TÍNH NĂNG TRỪ SỐ LƯỢG SẢN PHẨM
    // ===================================================================
    for (const item of newOrder.cart) {
        const product = await Products.findById(item._id);

        if (product) {
            const colorVariant = product.imageURLs.find(
                (imgUrl) => imgUrl.color.clrCode === item.selectedColor.color.clrCode
            );

            if (colorVariant) {
                const sizeVariant = colorVariant.sizes.find(
                    (s) => s.size === item.selectedSize
                );

                if (sizeVariant && sizeVariant.quantity >= item.orderQuantity) {
                    sizeVariant.quantity -= item.orderQuantity;
                    await product.save();
                    console.log(`✅ SUCCESS: Quantity updated correctly for ${product.title}`);
                } else {
                    console.log(`❌ FAILED: Size ${item.selectedSize} not found or not enough stock for ${item.title}`);
                }
            } else {
                console.log(`❌ FAILED: Color not found for ${item.title}`);
            }
        } else {
            console.log(`❌ FAILED: Product with ID ${item._id} not found.`);
        }
    }
    */

    // Logic xóa coupon vẫn được giữ lại và hoạt động bình thường
    const usedCouponId = newOrder.cart.find(item => item.couponId)?.couponId;
    if (usedCouponId) {
      await Coupon.findByIdAndDelete(usedCouponId);
      console.log(`✅ Coupon with ID: ${usedCouponId} has been deleted.`);
    }

    res.status(200).json({
      success: true,
      message: "Order added successfully, coupon handled.",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error in addOrder:", error);
    next(error);
  }
};
// get Orders
exports.getOrders = async (req, res, next) => {
  try {
    const orderItems = await Order.find({}).populate('user');
    res.status(200).json({
      success: true,
      data: orderItems,
    });
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};
// get Orders
exports.getSingleOrder = async (req, res, next) => {
  try {
    const orderItem = await Order.findById(req.params.id).populate('user');
    res.status(200).json(orderItem);
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};

exports.updateOrderStatus = async (req, res) => {
  const newStatus = req.body.status;
  try {
    await Order.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: newStatus,
        },
      }, { new: true })
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};
