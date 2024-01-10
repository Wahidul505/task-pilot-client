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
    saveColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
      state.img = "";
    },
    saveImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
      state.color = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveColor, saveImg } = bgSlice.actions;

export default bgSlice.reducer;
