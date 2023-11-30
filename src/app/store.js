import { configureStore } from "@reduxjs/toolkit";
import beerSlice from "./slices/beerSlice";

const store = configureStore({
  reducer: {
    beers: beerSlice,
  },
});

export default store;
