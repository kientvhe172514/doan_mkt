import React, { useState } from "react"; // Thêm useState
import { useSelector } from "react-redux";
import Link from "next/link";
// internal
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import QRCodeModal from "./QRCodeModal"; 

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    cartTotal, // Lấy cartTotal từ hook
  } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);

  // 👉 2. Thêm state để quản lý modal và dữ liệu form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  // 👉 3. Tạo hàm xử lý submit form trung gian
  const handleFormSubmit = (data) => {
    // Kiểm tra nếu phương thức thanh toán là VNPAY
    if (data.payment === "VNPAY") {
      setFormData(data); // Lưu dữ liệu form lại
      setIsModalOpen(true); // Mở modal lên
    } else {
      // Nếu là COD hoặc phương thức khác, submit như bình thường
      submitHandler(data);
    }
  };

  // 👉 4. Tạo hàm xác nhận đã thanh toán từ modal
  const handleConfirmPayment = () => {
    setIsModalOpen(false); // Đóng modal
    if (formData) {
      // Tiến hành submit form với dữ liệu đã lưu
      // Bạn có thể thêm một trường vào formData để backend biết đây là thanh toán đã xác nhận
      const finalData = { ...formData, payment_status: 'confirmed_by_user' };
      submitHandler(finalData);
    }
  };

  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">Không có sản phẩm nào</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Quay Lại Mua Sắm
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  <CheckoutLogin />
                  <CheckoutCoupon
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                  />
                </div>
              </div>
              {/* 👉 5. Sửa onSubmit của form */}
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CheckoutBillingArea register={register} errors={errors} />
                  </div>
                  <div className="col-lg-5">
                    {/* Component này không cần thay đổi */}
                    <CheckoutOrderArea checkoutData={checkoutData} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      {/* 👉 6. Render Modal ở đây */}
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPayment}
        totalAmount={cartTotal}
      />
    </>
  );
};

export default CheckoutArea;