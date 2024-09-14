import { tagTypes } from "../tagTypes";
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
      invalidatesTags: [tagTypes.template],
    }),

    getAllTemplatesOfSingleUser: build.query({
      query: () => ({
        url: TEMPLATE_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.template],
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetAllTemplatesOfSingleUserQuery,
} = templateApi;
