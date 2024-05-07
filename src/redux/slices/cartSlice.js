import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios.js";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get("/cartPizzas");
  return data;
});

export const postItem = createAsyncThunk(
  "cart/postItem",
  async (pizzaObj, { dispatch }) => {
    const { data } = await axios.post("/cartPizzas", pizzaObj);
    dispatch(addItem({ _id: data._id, ...pizzaObj }));
    dispatch(updateTotals());
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async (_id, { dispatch }) => {
    await axios.delete(`/cartPizzas/${_id}`);
    dispatch(removeItem(_id));
    dispatch(updateTotals());
  }
);

export const decrementAmount = createAsyncThunk(
  "cart/decrementAmount",
  async ({ pizzaObj, _id }, { dispatch }) => {
    await axios.patch(`/cartPizzas/${_id}`, pizzaObj);
    dispatch(decrement(_id));
    dispatch(updateTotals());
  }
);

// Нужен id для товаров в корзине чтобы удалить все товары ОПРЕДЕЛЕННОГО юзера
export const deleteAllItems = createAsyncThunk(
  "cart/deleteAllItems",
  async (userId, { dispatch }) => {
    await axios.delete(`/cartPizzas?userId=${userId}`);
    dispatch(clearCart());
    dispatch(updateTotals());
  }
);

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
    addItem(state, action) {
      const { name, type, size } = action.payload;
      const cartItem = state.items.find((obj) => {
        if (obj.name === name && obj.type === type && obj.size === size)
          return obj;
      });
      if (cartItem) cartItem.amount += 1;
      else state.items.push({ ...action.payload, amount: 1 });
    },
    removeItem(state, action) {
      state.items.find((obj, id) => {
        if (obj._id === action.payload) {
          return state.items.splice(id, 1);
        }
      });
    },
    decrement(state, action) {
      state.items.find((obj, id) => {
        if (obj._id === action.payload) {
          if (obj.amount > 1) obj.amount -= 1;
          else return state.items.splice(id, 1);
        }
      });
    },
    updateTotals(state) {
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.amount;
      }, 0);
      state.totalAmount = state.items.reduce((sum, obj) => {
        return sum + obj.amount;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: {
    // Getting cart items
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
    // adding item to cart
    [postItem.pending]: (state) => {
      state.status = "loading";
    },
    [postItem.fulfilled]: (state) => {
      state.status = "success";
    },
    [postItem.rejected]: (state) => {
      state.status = "error";
    },
    // removing item from cart
    [deleteItem.pending]: (state) => {
      state.status = "loading";
    },
    [deleteItem.fulfilled]: (state) => {
      state.status = "success";
    },
    [deleteItem.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { addItem, removeItem, decrement, updateTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
