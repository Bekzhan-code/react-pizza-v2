import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategoryInd: 0,
  sort: {
    activeSortInd: 0,
    sortBy: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryInd: (state, action) => {
      state.activeCategoryInd = action.payload;
    },
    setActiveSortInd: (state, action) => {
      const value = action.payload;
      state.sort.activeSortInd = value;
      if (value === 0) state.sort.sortBy = "rating";
      else if (value === 1) state.sort.sortBy = "price";
      else state.sort.sortBy = "name";
    },
  },
});

export const { setActiveCategoryInd, setActiveSortInd } = filterSlice.actions;

export default filterSlice.reducer;
