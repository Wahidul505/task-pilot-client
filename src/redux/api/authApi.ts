import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: data,
      }),
    }),
    signIn: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
