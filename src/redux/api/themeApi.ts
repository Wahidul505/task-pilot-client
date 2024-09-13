import { baseApi } from "./baseApi";

const THEME_URL = "/theme";

export const themeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTheme: build.mutation({
      query: (data) => ({
        url: THEME_URL,
        method: "POST",
        data: data,
      }),
    }),

    getThemes: build.query({
      query: () => ({
        url: THEME_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateThemeMutation, useGetThemesQuery } = themeApi;
