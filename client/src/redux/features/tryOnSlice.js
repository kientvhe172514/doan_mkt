// redux/features/tryOnSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
};

const tryOnSlice = createSlice({
  name: 'tryOn',
  initialState,
  reducers: {
    setTryOnProduct: (state, action) => {
      state.product = action.payload;
    },
    clearTryOnProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setTryOnProduct, clearTryOnProduct } = tryOnSlice.actions;
export default tryOnSlice.reducer;