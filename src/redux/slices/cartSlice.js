import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const foundItem = state.items.find((obj) => obj.id === action.payload.id);

      if (foundItem) foundItem.count++;
      else state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);

      state.totalAmount += 1;
    },
    removeItem(state, action) {
      const foundItem = state.items.find((obj) => obj.id === action.payload);

      state.totalPrice -= foundItem.price * foundItem.count;
      state.totalAmount -= foundItem.count;
      state.items = state.items.filter((pizza) => pizza.id !== action.payload);
    },
    increment(state, action) {
      const foundItem = state.items.find((obj) => obj.id === action.payload);
      foundItem.count++;
      state.totalPrice += foundItem.price;
      state.totalAmount += 1;
    },
    decrement(state, action) {
      const foundItem = state.items.find((obj) => obj.id === action.payload);
      foundItem.count--;
      state.totalPrice -= foundItem.price;
      state.totalAmount -= 1;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, increment, decrement, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
