import React from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";

const CheckoutBillingArea = ({ register, errors }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Thông Tin Thanh Toán</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Họ <span>*</span></label>
                <input
                  {...register("firstName", {
                    required: "Vui lòng nhập Họ",
                  })}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  defaultValue={user?.firstName}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Tên <span>*</span></label>
                <input
                  {...register("lastName", {
                    required: "Vui lòng nhập Tên",
                  })}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="tp-checkout-input">
                {/* <label>Quốc Gia <span>*</span></label> */}
                <input
                  {...register("country")} // Không required
                  name="country"
                  id="country"
                  type="hidden"
                  defaultValue="Việt Nam"
                />
                <ErrorMsg msg={errors?.country?.message} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Địa Chỉ</label>
                <input
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                  })}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Số nhà, tên đường"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Thành Phố</label>
                <input
                  {...register("city", {
                    required: "Vui lòng nhập thành phố",
                  })}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="Thành phố"
                />
                <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>

            <div className="col-md-6 ">
              <div className="tp-checkout-input">
                {/* <label>Mã Bưu Điện</label> */}
                <input
                  {...register("zipCode")} // Không required
                  name="zipCode"
                  id="zipCode"
                  type="hidden"
                  defaultValue="123456"
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Số Điện Thoại <span>*</span></label>
                <input
                  {...register("contactNo", {
                    required: "Vui lòng nhập số điện thoại",
                  })}
                  name="contactNo"
                  id="contactNo"
                  type="text"
                  placeholder="Số điện thoại"
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Email <span>*</span></label>
                <input
                  {...register("email", {
                    required: "Vui lòng nhập địa chỉ email",
                  })}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>

            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Ghi chú (tuỳ chọn)</label>
                <textarea
                  {...register("orderNote")}
                  name="orderNote"
                  id="orderNote"
                  placeholder="Ghi chú về đơn hàng của bạn..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
