import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux"; // THAY ĐỔI 1: Import useSelector
import Link from "next/link";
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
// THAY ĐỔI 2: Import thêm initialOrderQuantity
import { add_cart_product, initialOrderQuantity } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import { setTryOnProduct } from '@/redux/features/tryOnSlice';
import { useRouter } from 'next/router';
const DetailsWrapper = ({
  productItem,
  handleImageActive,
  imageURLSend,
  activeImg,
  detailsBottom = false,
}) => {
  const {
    _id, // Lấy _id để tạo cartId
    sku,
    img,
    title,
    imageURLs,
    category,
    description,
    discount,
    price,
    status,
    reviews,
    tags,
    offerDate,
  } = productItem || {};

  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // const [selectedQuantity, setSelectedQuantity] = useState(1); // THAY ĐỔI 3: Xóa state này

  const dispatch = useDispatch();
  const router = useRouter();
  // THAY ĐỔI 4: Lấy orderQuantity từ Redux store
  const { orderQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  useEffect(() => {
    if (imageURLs && imageURLs.length > 0 && !selectedColor) {
      const defaultColor = imageURLs[0];
      setSelectedColor(defaultColor);
      handleImageActive(defaultColor);
      if (defaultColor.sizes && defaultColor.sizes.length > 0) {
        setSelectedSize(defaultColor.sizes[0].size);
      }
      // Reset quantity khi sản phẩm thay đổi
      dispatch(initialOrderQuantity());
    }
  }, [imageURLs, handleImageActive, selectedColor, dispatch]);

  const handleTryOn = (product) => {
    // Lưu thông tin sản phẩm vào Redux
    dispatch(setTryOnProduct(product));
    // Chuyển hướng đến trang phòng thử đồ
    router.push('/editor'); 
    dispatch(handleModalClose());
  };

  const handleAddProduct = (prd) => {
    // TẠO RA cartId DUY NHẤT CHO MỖI PHIÊN BẢN SẢN PHẨM
    const cartId = `${prd._id}-${selectedColor?.color?.name || 'default'}-${selectedSize || 'default'}`;
    const payload = {
      ...prd,
      cartId, // Thêm cartId vào payload
      selectedColor,
      selectedSize,
      orderQuantity: orderQuantity, // THAY ĐỔI 5: Sử dụng orderQuantity từ Redux
    };
    dispatch(add_cart_product(payload));
    // Reset bộ đếm số lượng về 1 sau khi thêm vào giỏ hàng
    dispatch(initialOrderQuantity()); 
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };
  const handleBuyNow = (productItem) => {
    // Hành động 1: Thêm sản phẩm vào giỏ hàng
    handleAddProduct(productItem);
    // Hành động 2: Đóng modal
    dispatch(handleModalClose());
  };

  return (
    <div className="tp-product-details-wrapper">
      {/* ... Phần JSX còn lại giữ nguyên ... */}

      {/* color variation */}
      {imageURLs?.some((item) => item?.color?.name) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Màu:</h4>
            <div className="tp-product-details-variation-list">
              {imageURLs.map((item, i) => (
                <button
                  onClick={() => {
                    handleImageActive(item);
                    setSelectedColor(item);
                    if (item.sizes && item.sizes.length > 0) {
                      setSelectedSize(item.sizes[0].size);
                    } else {
                      setSelectedSize(null);
                    }
                    // THAY ĐỔI 6: Reset số lượng về 1 khi chọn màu khác
                    dispatch(initialOrderQuantity());
                  }}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={item.color.clrCode}
                    style={{ backgroundColor: item.color.clrCode }}
                  ></span>
                  <span className="tp-color-variation-tootltip">
                    {item.color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {selectedColor?.sizes?.length > 0 && (
            <div className="tp-product-details-variation-item">
              <h4 className="tp-product-details-variation-title">Kích cỡ:</h4>
              <div className="tp-product-details-variation-list">
                {selectedColor.sizes.map((sz, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSelectedSize(sz.size);
                      // THAY ĐỔI 7: Reset số lượng về 1 khi chọn size khác
                      dispatch(initialOrderQuantity());
                    }}
                    className={`tp-size-variation-btn ${
                      selectedSize === sz.size ? "active" : ""
                    }`}
                  >
                    {sz.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ... Phần JSX còn lại giữ nguyên ... */}

      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Số Lượng</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {/* Component này giờ sẽ hoạt động đúng */}
          <ProductQuantity /> 
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => handleAddProduct(productItem)}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 w-100">
          <Link href="/checkout" onClick={() => handleBuyNow(productItem)} className="w-100">
            <button className="tp-product-details-buy-now-btn w-100">
              Mua Ngay
            </button>
          </Link>

            <button
              className="tp-product-details-buy-now-btn w-100" 
              onClick={() => handleTryOn(productItem)}  
            >
              Thử Đồ Ngay
            </button>
        
        </div>
      </div>

      <div className="tp-product-details-action-sm">
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleCompareProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <CompareTwo /> So Sánh
        </button>
        <button
          disabled={status === "out-of-stock"}
          onClick={() => handleWishlistProduct(productItem)}
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo /> Thêm vào yêu thích
        </button>
      </div>

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tag={tags?.[0]} />
      )}
    </div>
  );
};

export default DetailsWrapper;
