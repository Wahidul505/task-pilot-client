import { baseApi } from "./baseApi";

const TEMPLATE_URL = "/template";

export const templateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTemplate: build.mutation({
      query: (data) => ({
        url: TEMPLATE_URL,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const { useCreateTemplateMutation } = templateApi;
