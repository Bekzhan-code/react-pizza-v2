import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizza",
  async ({ activeCategoryInd, sortBy }) => {
    const { data } = await axios.get(
      `/pizzas?category=${
        activeCategoryInd > 0 ? activeCategoryInd : ""
      }&sortBy=${sortBy}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export default pizzaSlice.reducer;
