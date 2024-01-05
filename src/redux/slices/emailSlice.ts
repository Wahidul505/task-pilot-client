import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EmailState {
  email: string;
}

const initialState: EmailState = {
  email: "",
};

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    storeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeEmail } = emailSlice.actions;

export default emailSlice.reducer;
