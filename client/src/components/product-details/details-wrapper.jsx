import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const {
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
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  const dispatch = useDispatch();

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

  // Set default selected color and size on initial render
  useEffect(() => {
    if (imageURLs && imageURLs.length > 0 && !selectedColor) {
      const defaultColor = imageURLs[0];
      setSelectedColor(defaultColor);
      handleImageActive(defaultColor);
      if (defaultColor.sizes && defaultColor.sizes.length > 0) {
        setSelectedSize(defaultColor.sizes[0].size);
        //setSelectedQuantity(defaultColor.sizes[0].quantity);
      }
    }
  }, [imageURLs, handleImageActive, selectedColor]);

  const handleAddProduct = (prd) => {
    const payload = {
      ...prd,
      selectedColor,
      selectedSize,
     //selectedQuantity,
    };
    dispatch(add_cart_product(payload));
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{category?.name}</span>
      </div>
      <h3 className="tp-product-details-title">{title}</h3>

      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating
              allowFraction
              size={16}
              initialValue={ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-details-reviews">
            <span>
              ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
            </span>
          </div>
        </div>
      </div>

      <p>
        {textMore ? description : `${description?.substring(0, 100)}...`}
        <span onClick={() => setTextMore(!textMore)}>
          {textMore ? "See less" : "See more"}
        </span>
      </p>

      <div className="tp-product-details-price-wrapper mb-20">
        {discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              ${price}
            </span>
            <span className="tp-product-details-price new-price">
              ${(
                Number(price) -
                (Number(price) * Number(discount)) / 100
              ).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            ${price?.toFixed(2)}
          </span>
        )}
      </div>

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
                      //setSelectedQuantity(item.sizes[0].quantity);
                    } else {
                      setSelectedSize(null);
                      //setSelectedQuantity(1);
                    }
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
                      //setSelectedQuantity(sz.quantity);
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

      {offerDate?.endDate && (
        <ProductDetailsCountdown offerExpiryTime={offerDate.endDate} />
      )}

      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">Số Lượng</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
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
        <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">
            Mua Ngay
          </button>
        </Link>
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
