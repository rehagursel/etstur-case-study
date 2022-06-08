import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    hotelsList: [],
    deleteHotelName: [],
  },
  reducers: {
    addHotelToList(state, action) {
      const newHotel = action.payload;
      const existingHotel = state.hotelsList.find(
        (hotel) => hotel.name === newHotel.name
      );
      if (!existingHotel) {
        state.hotelsList.push({
          id: newHotel.name,
          score: +newHotel.score,
          name: newHotel.name,
          src: "https://www.etstur.com/resources_t/img/hotel/default_image.png",
          editTime: newHotel.editTime,
          logTime: newHotel.logTime,
        });
      }
      state.hotelsList?.sort((a, b) =>
        a.logTime < b.logTime ? 1 : b.logTime < a.logTime ? -1 : 0
      );
    },
    editHotelAtTheList(state, action) {
      const newHotel = action.payload;
      const existingHotel = state.hotelsList.find(
        (hotel) => hotel.name === newHotel.name
      );
      existingHotel.score = +newHotel.score;
      existingHotel.editTime = newHotel.editTime;
    },
    removeHotelFromList(state, action) {
      const name = action.payload;
      state.hotelsList = state.hotelsList.filter(
        (hotel) => hotel.name !== name
      );
    },
    saveHotelName(state, action) {
      const name = action.payload;
      state.deleteHotelName = name;
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice;
