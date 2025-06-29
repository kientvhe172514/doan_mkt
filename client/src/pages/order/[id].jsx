import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import logo from "@assets/img/logo/logo.svg";
import ErrorMsg from "@/components/common/error-msg";
import { useGetUserOrderByIdQuery } from "@/redux/features/order/orderApi";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SingleOrder = ({ params }) => {
    const router = useRouter(); 
    const orderId = params.id;
    const printRef = useRef();
    const { data: order, isError, isLoading, refetch } = useGetUserOrderByIdQuery(orderId);
    // State để lưu trữ thông báo về trạng thái thanh toán VNPAY
    const [vnpayStatusMessage, setVnpayStatusMessage] = useState('');
    // State để đảm bảo logic VNPAY callback chỉ chạy một lần
    const [hasProcessedVnpayCallback, setHasProcessedVnpayCallback] = useState(false);

    useEffect(() => {
        if (router.isReady && router.query.vnp_ResponseCode && !hasProcessedVnpayCallback) {
            const verifyVnpayPayment = async () => {
                console.log("Detecting VNPAY callback in frontend for order:", orderId);
                try {
                    const queryString = router.asPath.split('?')[1];
                    const requestUrl = `${API_BASE_URL}/vnpay/vnpay_return${queryString ? '?' + queryString : ''}`;
                    console.log("Calling backend VNPAY verification API:", requestUrl);
                    const response = await axios.get(requestUrl);               
                    const { RspCode, Message, orderId: verifiedOrderId } = response.data; 

                    if (RspCode === '00') {
                        setVnpayStatusMessage('Thanh toán VNPAY thành công! Đơn hàng của bạn đã được cập nhật.');
                    } else if (RspCode === '02') {
                        setVnpayStatusMessage('Đơn hàng đã được xử lý trước đó. ' + Message);
                    } else {
                        // VNPAY báo lỗi hoặc hủy, cập nhật thông báo và trạng thái
                        setVnpayStatusMessage(`Thanh toán VNPAY thất bại: ${Message}. Vui lòng thử lại hoặc liên hệ hỗ trợ.`);
                    }
                    
                    refetch(); // Refetch dữ liệu đơn hàng để hiển thị trạng thái mới nhất từ DB
                    setHasProcessedVnpayCallback(true); 

                } catch (error) {
                    console.error('Lỗi khi gọi API xác minh VNPAY từ frontend:', error);
                    setVnpayStatusMessage('Lỗi hệ thống khi xác minh thanh toán VNPAY. Vui lòng liên hệ hỗ trợ.');
                    setHasProcessedVnpayCallback(true); 
                }
            };

            verifyVnpayPayment();
        }
    }, [router.isReady, router.query, router.asPath, orderId, refetch, hasProcessedVnpayCallback]); 

    let content = null;
    if (isLoading) {
        content = <PrdDetailsLoader loading={isLoading}/>
    }
    if (isError) {
        content = <ErrorMsg msg="There was an error" />;
    }
    // Đảm bảo order và order.order có dữ liệu trước khi destructure
    if (!isLoading && !isError && order && order.order) { 
        // Destructure 'status' cùng với các thuộc tính khác
        const { name, country, city, contact, invoice, createdAt, cart, shippingCost, discount, totalAmount, paymentMethod, status } = order.order;

        // Xác định class cho alert dựa trên trạng thái thanh toán VNPAY hoặc trạng thái đơn hàng
        const alertClass = vnpayStatusMessage.includes('thành công') || status === 'delivered' ? 'alert-success' : 
                           (vnpayStatusMessage || status === 'cancel' || status === 'payment pending') ? 'alert-warning' : 
                           'alert-info';

        // Xác định thông điệp hiển thị
        const displayMessage = vnpayStatusMessage || `Đơn hàng của bạn đã được gửi và hiện đang ở trạng thái: ${status}`;

        content = (
            <>
                <section className="invoice__area pt-120 pb-120">
                    <div className="container">
                        <div className="invoice__msg-wrapper">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="invoice_msg mb-40">
                                        {/* Thông báo VNPAY hoặc trạng thái đơn hàng */}
                                        <p className={`text-black alert ${alertClass}`}>
                                            Cảm ơn <strong>{name}</strong>! {displayMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chỉ hiển thị hóa đơn và nút in nếu trạng thái KHÔNG phải là 'cancel' */}
                        {status !== 'cancel' && (
                            <>
                                <div ref={printRef} className="invoice__wrapper grey-bg-2 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper">
                                    <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="invoice__header pb-20">
                                                    <div className="row align-items-end">
                                                        <div className="col-md-4 col-sm-6">
                                                            <div className="invoice__left">
                                                                <p>LMUSE SHOP<br />  </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8 col-sm-6">
                                                            <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                                                                <h3 className="text-uppercase font-70 mb-20">Hoá Đơn</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invoice__customer mb-30">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-8">
                                                <div className="invoice__customer-details">
                                                    <h4 className="mb-10 text-uppercase">{name}</h4>
                                                    <p className="mb-0 text-uppercase">{country}</p>
                                                    <p className="mb-0 text-uppercase">{city}</p>
                                                    <p className="mb-0">{contact}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-4">
                                                <div className="invoice__details mt-md-0 mt-20 text-md-end">
                                                    <p className="mb-0">
                                                        <strong>Hoá Đơn ID:</strong> #{invoice}
                                                    </p>
                                                    <p className="mb-0">
                                                        <strong>Ngày:</strong> {dayjs(createdAt).format("MMMM D, YYYY")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white mb-30">
                                        <table className="table">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">SL</th>
                                                    <th scope="col">Tên Sản Phẩm</th>
                                                    <th scope="col">Size</th> {/* Thêm cột Size */}
                                                    <th scope="col">Màu Sắc</th> {/* Thêm cột Màu Sắc */}
                                                    <th scope="col">Số Lượng</th>
                                                    <th scope="col">Giá</th>
                                                    <th scope="col">Tổng</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {cart.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.selectedSize || 'N/A'}</td> {/* Hiển thị size, nếu không có thì N/A */}
                                                        <td>{item.selectedColor.color.name || 'N/A'}</td> {/* Hiển thị color, nếu không có thì N/A */}
                                                        <td>{item.orderQuantity}</td>
                                                        <td>${item.price}</td>
                                                        <td>${item.price * item.orderQuantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4">
                                                <div className="invoice__payment-method mb-30">
                                                    <h5 className="mb-0">Phương thức thanh toán</h5>
                                                    <p className="tp-font-medium text-uppercase">{paymentMethod}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4">
                                                <div className="invoice__shippint-cost mb-30">
                                                    <h5 className="mb-0">Chi phí vận chuyển</h5>
                                                    <p className="tp-font-medium">{shippingCost}đ</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4">
                                                <div className="invoice__discount-cost mb-30">
                                                    <h5 className="mb-0">Giảm giá</h5>
                                                    <p className="tp-font-medium">{discount.toFixed(2)}đ</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-4">
                                                <div className="invoice__total-ammount mb-30">
                                                    <h5 className="mb-0">Thành Tiền</h5>
                                                    <p className="tp-font-medium text-danger">
                                                        <strong>{parseInt(totalAmount).toFixed(2)}đ</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice__print text-end mt-3">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <ReactToPrint
                                                trigger={() => (
                                                    <button
                                                        type="button"
                                                        className="tp-invoice-print tp-btn tp-btn-black"
                                                    >
                                                        <span className="mr-5">
                                                            <i className="fa-regular fa-print"></i>
                                                        </span>{" "}
                                                        In
                                                    </button>
                                                )}
                                                content={() => printRef.current}
                                                documentTitle="Invoice"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </>
        );
    }
    return (
        <>
            <Wrapper>
                <SEO pageTitle={"Order Details"} />
                <HeaderTwo style_2={true} />
                {/* content */}
                {content}
                {/* content */}
                <Footer primary_style={true} />
            </Wrapper>
        </>
    );
};

export const getServerSideProps = async ({ params }) => {
    return {
        props: { params },
    };
};

export default SingleOrder;