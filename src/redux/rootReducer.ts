import { baseApi } from "./api/baseApi";
import emailSlice from "./slices/emailSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const rootReducer = {
  email: emailSlice,
  sidebar: sidebarSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
