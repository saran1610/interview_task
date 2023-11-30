// src/beerSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const beerSlice = createSlice({
  name: "beers",
  initialState: {
    data: [],
    page: 1,
    brewedBefore: null,
    brewedAfter: null,
  },
  reducers: {
    setBeers: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setBrewedBefore: (state, action) => {
      state.brewedBefore = action.payload;
    },
    setBrewedAfter: (state, action) => {
      state.brewedAfter = action.payload;
    },
  },
});

export const { setBeers, setPage, setBrewedBefore, setBrewedAfter } =
  beerSlice.actions;
export default beerSlice.reducer;
