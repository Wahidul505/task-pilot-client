import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
