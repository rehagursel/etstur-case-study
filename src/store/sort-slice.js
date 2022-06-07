import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: { sortIsScore: false },
  reducers: {
   sort(state) {
      state.sortIsScore = true;
    },
  },
});

export const sortIsScoreActions = sortSlice.actions;

export default sortSlice;
