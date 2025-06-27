// src/redux/features/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";

const initialState = {
  cart_products: [],
  orderQuantity: 1,
  cartMiniOpen: false,
};

// Hàm này vẫn hữu ích để kiểm tra số lượng tồn kho
const getAvailableQuantity = (productVariant) => {
  const sizeItem = productVariant.selectedColor?.sizes?.find(
    (sz) => sz.size === productVariant.selectedSize
  );
  // Nếu không có size, giả sử tồn kho là một số lớn hoặc dựa trên logic khác
  if (!productVariant.selectedSize) return 999; 
  return sizeItem?.quantity || 0;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, { payload }) => {
      // THAY ĐỔI 1: Lấy cartId từ payload
      const { cartId, orderQuantity = 1 } = payload;
      
      // THAY ĐỔI 2: Tìm sản phẩm bằng cartId duy nhất
      const existingIndex = state.cart_products.findIndex(
        (item) => item.cartId === cartId
      );

      const maxQuantity = getAvailableQuantity(payload);

      if (existingIndex !== -1) {
        const existingItem = state.cart_products[existingIndex];
        // Kiểm tra xem tổng số lượng có vượt quá tồn kho không
        if (existingItem.orderQuantity + orderQuantity <= maxQuantity) {
          existingItem.orderQuantity += orderQuantity;
          notifySuccess(`${orderQuantity} ${payload.title} đã được thêm vào giỏ hàng`);
        } else {
          notifyError(
            `Chỉ có thể thêm tối đa ${maxQuantity - existingItem.orderQuantity} sản phẩm nữa!`
          );
        }
      } else {
        // Kiểm tra số lượng thêm mới có hợp lệ không
        if (orderQuantity <= maxQuantity) {
          const newItem = {
            ...payload,
            orderQuantity: orderQuantity,
          };
          state.cart_products.push(newItem);
          notifySuccess(`${orderQuantity} ${payload.title} đã được thêm vào giỏ hàng`);
        } else {
          notifyError(`Không thể thêm quá số lượng có sẵn (${maxQuantity})!`);
        }
      }

      setLocalStorage("cart_products", state.cart_products);
    },

    increment: (state, { payload }) => {
      state.orderQuantity = state.orderQuantity + 1;
    },
    decrement: (state, { payload }) => {
      state.orderQuantity =
        state.orderQuantity > 1 ? state.orderQuantity - 1 : 1;
    },
    
    // THAY ĐỔI 3: Cập nhật hàm này để dùng cartId
    quantityDecrement: (state, { payload }) => {
      const itemIndex = state.cart_products.findIndex(item => item.cartId === payload.cartId);
      if (itemIndex !== -1) {
        if (state.cart_products[itemIndex].orderQuantity > 1) {
          state.cart_products[itemIndex].orderQuantity -= 1;
        }
      }
      setLocalStorage("cart_products", state.cart_products);
    },
    
    // THAY ĐỔI 4: Cập nhật hàm xóa sản phẩm để dùng cartId
    remove_product: (state, { payload }) => {
      // payload bây giờ nên là { cartId: '...', title: '...' }
      state.cart_products = state.cart_products.filter(
        (item) => item.cartId !== payload.cartId
      );
      setLocalStorage("cart_products", state.cart_products);
      notifyError(`${payload.title} đã được xóa khỏi giỏ hàng`);
    },
    
    get_cart_products: (state, action) => {
      state.cart_products = getLocalStorage("cart_products") || [];
    },
    initialOrderQuantity: (state, { payload }) => {
      state.orderQuantity = 1;
    },
    clearCart: (state) => {
      const isClearCart = window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm?');
      if (isClearCart) {
        state.cart_products = [];
      }
      setLocalStorage("cart_products", state.cart_products);
    },
    openCartMini: (state, { payload }) => {
      state.cartMiniOpen = true;
    },
    closeCartMini: (state, { payload }) => {
      state.cartMiniOpen = false;
    },
  },
});

export const {
  add_cart_product,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  closeCartMini,
  openCartMini,
} = cartSlice.actions;

export default cartSlice.reducer;