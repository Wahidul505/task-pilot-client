import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BgState {
  color: string;
  img: string;
}

const initialState: BgState = {
  color: "",
  img: "",
};

export const bgSlice = createSlice({
  name: "bg",
  initialState,
  reducers: {
    saveBg: (state, action: PayloadAction<{ color: string; img: string }>) => {
      state.color = action?.payload?.color;
      state.img = action?.payload?.img;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveBg } = bgSlice.actions;

export default bgSlice.reducer;
