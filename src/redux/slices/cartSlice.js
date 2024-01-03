import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios.js";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get("/cartPizzas");
  return data;
});

const initialState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
  status: "loading",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.totalPrice = action.payload.reduce((sum, obj) => {
        return sum + obj.price * obj.amount;
      }, 0);
      state.totalAmount = action.payload.reduce((sum, obj) => {
        return sum + obj.amount;
      }, 0);
      state.status = "success";
    },
    [fetchCart.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
