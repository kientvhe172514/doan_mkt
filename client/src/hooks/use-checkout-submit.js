import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CardElement, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
//internal import
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { set_coupon } from "@/redux/features/coupon/couponSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import {useCreatePaymentIntentMutation,useSaveOrderMutation} from "@/redux/features/order/orderApi";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";
import { apply_coupon,remove_coupon } from '@/redux/features/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
const useCheckoutSubmit = () => {
  // offerCoupons
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  // addOrder
  const [saveOrder, {}] = useSaveOrderMutation();
  // createPaymentIntent
  const [createPaymentIntent, {}] = useCreatePaymentIntentMutation();
  // cart_products
  const { cart_products } = useSelector((state) => state.cart);
  // user
  const { user } = useSelector((state) => state.auth);
  // shipping_info
  const { shipping_info } = useSelector((state) => state.order);
  // total amount
  const { total, setTotal } = useCartInfo();
  // couponInfo
  const [couponInfo, setCouponInfo] = useState({});
  //cartTotal
  const [cartTotal, setCartTotal] = useState("");
  // minimumAmount
  const [minimumAmount, setMinimumAmount] = useState(0);
  // shippingCost
  const [shippingCost, setShippingCost] = useState(0);
  // discountAmount
  const [discountAmount, setDiscountAmount] = useState(0);
  // discountPercentage
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // discountProductType
  const [discountProductType, setDiscountProductType] = useState("");
  // isCheckoutSubmit
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  // cardError
  const [cardError, setCardError] = useState("");
  // clientSecret
  const [clientSecret, setClientSecret] = useState("");
  // showCard
  const [showCard, setShowCard] = useState(false);
  // coupon apply message
  const [couponApplyMsg,setCouponApplyMsg] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  // const elements = useElements();

  const {register,handleSubmit,setValue,formState: { errors }} = useForm();

  let couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    const result = cart_products?.filter(
      (p) => p.productType === discountProductType
    );
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) =>
        preValue + currentValue.price * currentValue.orderQuantity,
      0
    );
    let totalValue = "";
    let subTotal = Number((total + shippingCost).toFixed(2));
    let discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    totalValue = Number(subTotal - discountTotal);
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
    discountAmount,
    cartTotal,
  ]);

  // // create payment intent
  // useEffect(() => {
  //   if (cartTotal) {
  //     createPaymentIntent({
  //       price: parseInt(cartTotal),
  //     })
  //       .then((data) => {
  //         setClientSecret(data?.data?.clientSecret);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [createPaymentIntent, cartTotal]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();
    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      // notifySuccess(
      //   `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      // );
      setCouponApplyMsg(`Mã giảm giá của bạn ${result[0].title} đã được áp dụng thành công!`)
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch(set_coupon(result[0]));
      dispatch(
        apply_coupon({
          couponId: result[0]._id,
        })
      );
      setTimeout(() => {
        if (couponRef.current) {
          couponRef.current.value = "";
        }
        setCouponApplyMsg("")
      }, 5000);
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("country", shipping_info.country);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("zipCode", shipping_info.zipCode);
    setValue("contactNo", shipping_info.contactNo);
    setValue("email", shipping_info.email);
    setValue("orderNote", shipping_info.orderNote);
  }, [user, setValue, shipping_info, router]);

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);
    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contactNo,
      email: data.email,
      city: data.city,
      country: "Việt Nam",
      zipCode: "123456",
      shippingOption: data.shippingOption,
      status: "pending",
      cart: cart_products,
      paymentMethod: data.payment,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      orderNote:data.orderNote,
      user: user?._id || null,
    };
    if (data.payment === 'VNPAY') {
//       try {
//           // BƯỚC 1: LƯU ĐƠN HÀNG VỚI TRẠNG THÁI CHỜ THANH TOÁN TRƯỚC
//          const initialOrderResponse = await saveOrder({
//               ...orderInfo,
//               status: 'payment pending', // <--- SỬA THÀNH CHỮ THƯỜNG HOÀN TOÀN Ở ĐÂY
//           }).unwrap();
//           if (initialOrderResponse?.order?._id) {
//               const orderIdForVnpay = initialOrderResponse.order._id; // Dùng _id của đơn hàng vừa tạo làm orderId cho VNPAY

//               // BƯỚC 2: TẠO URL THANH TOÁN VỚI VNPAY
//               const response = await createPaymentIntent({
//                   amount: cartTotal,
//                   orderId: orderIdForVnpay, // Gửi ID đơn hàng từ DB cho VNPAY
//                   orderInfo: "Thanh toán đơn hàng " + orderIdForVnpay,
//                   returnUrl: `${window.location.origin}/order/${orderIdForVnpay}`, // Trang để chuyển hướng người dùng về
//               }).unwrap();
//               console.log("Initial Order Response:", initialOrderResponse); 
//               if (response?.vnpUrl) {
//                   // BƯỚC 3: CHUYỂN HƯỚNG NGƯỜI DÙNG ĐẾN VNPAY
//                   window.location.href = response.vnpUrl;
//               } else {
//                   toast.error("Không thể tạo liên kết thanh toán VNPAY.");
//                   setIsCheckoutSubmit(false);
//                   // Có thể cập nhật lại trạng thái đơn hàng vừa tạo thành 'Failed' hoặc 'Cancelled'
//               }
//           } else {
//               toast.error("Không thể lưu đơn hàng ban đầu.");
//               setIsCheckoutSubmit(false);
//           }
//       } catch (error) {
//           console.error("Lỗi khi tạo liên kết thanh toán VNPAY:", error);
//           toast.error("Đã xảy ra lỗi trong quá trình thanh toán VNPAY.");
//           setIsCheckoutSubmit(false);
//           // Có thể cập nhật lại trạng thái đơn hàng vừa tạo thành 'Failed' hoặc 'Cancelled'
//       }
          saveOrder({
            ...orderInfo
          }).then(res => {
            if(res?.error){
            }
            else {
              localStorage.removeItem("cart_products")
              localStorage.removeItem("couponInfo");
              setIsCheckoutSubmit(false)
              notifySuccess("Your Order Confirmed!");
              router.push(`/order/${res.data?.order?._id}`);
            }
          }) 
  }
    if (data.payment === 'COD') {
      saveOrder({
        ...orderInfo
      }).then(res => {
        if(res?.error){
        }
        else {
          localStorage.removeItem("cart_products")
          localStorage.removeItem("couponInfo");
          setIsCheckoutSubmit(false)
          notifySuccess("Your Order Confirmed!");
          router.push(`/order/${res.data?.order?._id}`);
        }
      })  
    }
  };

  // handlePaymentWithStripe
  // const handlePaymentWithStripe = async (order) => {
  //   try {
  //     const {paymentIntent, error:intentErr} = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //           billing_details: {
  //             name: user?.firstName,
  //             email: user?.email,
  //           },
  //         },
  //       },
  //     );
  //     if (intentErr) {
  //       notifyError(intentErr.message);
  //     } else {
  //       // notifySuccess("Your payment processed successfully");
  //     }

  //     const orderData = {
  //       ...order,
  //       paymentIntent,
  //     };

  //     saveOrder({
  //       ...orderData
  //     })
  //     .then((result) => {
  //         if(result?.error){
  //         }
  //         else {
  //           localStorage.removeItem("couponInfo");
  //           notifySuccess("Your Order Confirmed!");
  //           router.push(`/order/${result.data?.order?._id}`);
  //         }
  //       })
  //      } 
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    cardError,
    submitHandler,
    handleSubmit,
    clientSecret,
    setClientSecret,
    cartTotal,
    isCheckoutSubmit,
    couponApplyMsg,
    showCard,
    setShowCard,
  };
};

export default useCheckoutSubmit;
