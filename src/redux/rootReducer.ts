import { baseApi } from "./api/baseApi";
import bgSlice from "./slices/bgSlice";
import emailSlice from "./slices/emailSlice";
import sidebarSlice from "./slices/sidebarSlice";
import themeSlice from "./slices/themeSlice";

export const rootReducer = {
  email: emailSlice,
  sidebar: sidebarSlice,
  bg: bgSlice,
  theme: themeSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
