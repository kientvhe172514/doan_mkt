// src/components/cart-wishlist/cart-item.jsx (HOẶC ĐƯỜNG DẪN CỦA BẠN)
// ĐÃ SỬA HOÀN CHỈNH

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import { add_cart_product, quantityDecrement, remove_product } from "@/redux/features/cartSlice";

const CartItem = ({ product }) => {
  // FIX 1: Destructure thêm cartId, selectedColor, selectedSize để sử dụng
  const {
    _id,
    img,
    title,
    price,
    orderQuantity = 0,
    cartId, // Rất quan trọng
    selectedColor,
    selectedSize
  } = product || {};

  const dispatch = useDispatch();

  // handle add product (Tăng số lượng)
  const handleAddProduct = (prd) => {
    // FIX 2: Khi tăng số lượng trong giỏ hàng, ta chỉ tăng 1 đơn vị
    // Gửi đi payload với orderQuantity là 1
    dispatch(add_cart_product({ ...prd, orderQuantity: 1 }));
  };

  // handle decrement product (Giảm số lượng)
  const handleDecrement = (prd) => {
    // FIX 3: Gửi đi cả product object vì quantityDecrement cần cartId
    dispatch(quantityDecrement(prd));
  };

  // handle remove product (Xoá sản phẩm)
  const handleRemovePrd = (prd) => {
    // FIX 4: Gửi đi payload chứa cartId và title như reducer mong đợi
    dispatch(remove_product({
      cartId: prd.cartId,
      title: prd.title
    }));
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          {/* Sử dụng ảnh của phiên bản màu sắc đã chọn nếu có */}
          <Image src={selectedColor?.img || img} alt="product img" width={70} height={100} />
        </Link>
      </td>

      {/* title */}
      <td className="tp-cart-title">
        {/* Thêm một thẻ div bao bọc ở đây */}
        <div>
          <Link href={`/product-details/${_id}`}>{title}</Link>
          <div className="tp-cart-title" style={{ paddingLeft: '20px' }}>
            {selectedColor && <div>Màu: {selectedColor.color.name}</div>}
            {selectedSize && <div>Kích cỡ: {selectedSize}</div>}
          </div>
        </div>
      </td>

      {/* price */}
      <td className="tp-cart-price">
        <span>{(price * orderQuantity).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  currencyDisplay: 'code'
                  })}</span>
      </td>

      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={() => handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={orderQuantity} readOnly />
          <span onClick={() => handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>

      {/* action */}
      <td className="tp-cart-action">
        {/* FIX 6: Gọi handleRemovePrd với toàn bộ object 'product' */}
        <button onClick={() => handleRemovePrd(product)} className="tp-cart-action-btn">
          <Close />
          <span>{" "}Xoá</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;