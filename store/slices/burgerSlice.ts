import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  state: false,
};

export const burgerSlice = createSlice({
  name: "burgerMenu",
  initialState,
  reducers: {
    change: (state) => {
      state.state = !state.state;
    },
    setFalse: (state) => {
      state.state = false;
    },
    setTrue: (state) => {
      state.state = true;
    },
  },
});

export const { change, setFalse, setTrue } = burgerSlice.actions;
export default burgerSlice.reducer;
