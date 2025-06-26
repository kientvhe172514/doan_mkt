import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import { useEffect } from "react";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    clientSecret,
    register,
    errors,
    showCard,
    setShowCard,
    shippingCost,
    discountAmount
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  // 👉 Tự động tính phí ship theo tổng đơn hàng khi component mount
  useEffect(() => {
    if (total >= 1000000) {
      handleShippingCost(0); // Free shipping
    } else {
      handleShippingCost(30000); // 30,000 VNĐ
    }
  }, [total, handleShippingCost]);

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Đơn Hàng Của Bạn</h3>

      <div className="tp-order-info-list">
        <ul>
          {/* header */}
          <li className="tp-order-info-list-header">
            <h4>Sản Phẩm</h4>
            <h4>Thành Tiền</h4>
          </li>

          {/* product list */}
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>{item.price.toLocaleString()}đ</span>
            </li>
          ))}

          {/* shipping info */}
          <li className="tp-order-info-list-shipping">
            <span>Shipping</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                  defaultChecked
                />
                <label htmlFor="flat_rate">
                  Giao hàng tiêu chuẩn:{" "}
                  <span>
                    {total >= 1000000 ? "Miễn phí" : "+30,000đ"}
                  </span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li>

          {/* subtotal */}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>{total.toLocaleString()}đ</span>
          </li>

          {/* shipping cost */}
          <li className="tp-order-info-list-subtotal">
            <span>Phí vận chuyển</span>
            <span>{shippingCost.toLocaleString()}đ</span>
          </li>

          {/* discount */}
          <li className="tp-order-info-list-subtotal">
            <span>Giảm giá</span>
            <span>{discountAmount.toLocaleString()}đ</span>
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Tổng thanh toán</span>
            <span>{parseFloat(cartTotal).toLocaleString()}đ</span>
          </li>
        </ul>
      </div>

      {/* payment method */}
      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
            onClick={() => setShowCard(true)}
          />
          <label htmlFor="back_transfer">Thanh toán online</label>
          {showCard && (
            <div className="direct-bank-transfer">
              <div className="payment_card">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>

        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
            onClick={() => setShowCard(false)}
          />
          <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
