import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: { sortIsScore: false },
  reducers: {
   sort(state, action) {
     const sortType = action.payload;
      state.sortIsScore = sortType;
    },
  },
});

export const sortIsScoreActions = sortSlice.actions;

export default sortSlice;
