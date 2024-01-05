import { baseApi } from "./api/baseApi";
import emailSlice from "./slices/emailSlice";

export const rootReducer = {
  email: emailSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
