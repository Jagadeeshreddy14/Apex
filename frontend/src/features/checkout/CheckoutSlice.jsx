// frontend/src/features/checkout/CheckoutSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const validateCouponAsync = createAsyncThunk(
  'checkout/validateCoupon',
  async ({ code, cartTotal }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/coupons/validate`, {
        code,
        cartTotal
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to validate coupon');
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    discount: null,
    couponError: null,
    discountAmount: 0,
    totalAmount: 0,
    loading: 'idle'
  },
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    clearCoupon: (state) => {
      state.discount = null;
      state.couponError = null;
      state.discountAmount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCouponAsync.pending, (state) => {
        state.loading = 'loading';
        state.couponError = null;
      })
      .addCase(validateCouponAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.discount = action.payload.coupon.discountValue;
        state.discountAmount = action.payload.discountAmount;
        state.couponError = null;
      })
      .addCase(validateCouponAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.couponError = action.payload;
        state.discount = null;
        state.discountAmount = 0;
      });
  }
});

export const { setTotalAmount, clearCoupon } = checkoutSlice.actions;
export const selectCouponDiscount = (state) => state.checkout?.discount;
export const selectCouponError = (state) => state.checkout?.couponError;
export const selectDiscountAmount = (state) => state.checkout?.discountAmount;
export const selectTotalAmount = (state) => state.checkout?.totalAmount;

export default checkoutSlice.reducer;