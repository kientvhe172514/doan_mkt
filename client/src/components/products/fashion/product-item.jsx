import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
const ProductItem = ({ product, style_2 = false }) => {
  const {
    _id,
    img,
    category,
    title,
    reviews = [],
    price = 0,
    discount = 0,
    tags = [],
    status,
  } = product || {};

  const [ratingVal, setRatingVal] = useState(0);
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  const formatPrice = (val) => Number(val || 0).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
        });
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className={`tp-product-item-2 ${style_2 ? "" : "mb-40"}`}>
      <div className="tp-product-thumb-2 p-relative z-index-1 fix">
        <Link href={`/product-details/${_id}`}>
          <Image src={img} alt="product img" width={284} height={302} />
        </Link>
        {status === "out-of-stock" && (
          <div className="tp-product-badge">
            <span className="product-hot">out-stock</span>
          </div>
        )}

        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Xem nhanh
              </span>
            </button>
            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-2 ${
                isAddedToWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}
            >
              <Wishlist />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Thêm vào yêu thích
              </span>
            </button>
            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleCompareProduct(product)}
              className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
            >
              <CompareThree />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Thêm vào so sánh
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="tp-product-content-2 pt-15">
        <div className="tp-product-tag-2">
          {tags.map((t, i) => (
            <a key={i} href="#">
              {t}
              {i < tags.length - 1 && ","}
            </a>
          ))}
        </div>

        <h3 className="tp-product-title-2">
          <Link href={`/product-details/${_id}`}>{title}</Link>
        </h3>

        <div className="tp-product-rating-icon tp-product-rating-icon-2">
          <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
        </div>

        <div className="tp-product-price-wrapper-2">
          {discount > 0 ? (
            <>
              <span className="tp-product-price-2 new-price">
                {formatPrice(discountedPrice)}
              </span>
              <span className="tp-product-price-2 old-price">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="tp-product-price-2 new-price">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
