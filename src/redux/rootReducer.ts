import { baseApi } from "./api/baseApi";
import bgSlice from "./slices/bgSlice";
import emailSlice from "./slices/emailSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const rootReducer = {
  email: emailSlice,
  sidebar: sidebarSlice,
  bg: bgSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
