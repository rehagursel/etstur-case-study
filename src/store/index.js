import { configureStore } from "@reduxjs/toolkit";

import sortSlice from "./sort-slice";
import listSlice from "./list-slice";

const store = configureStore({
  reducer: { sort: sortSlice.reducer, list: listSlice.reducer },
});

export default store;