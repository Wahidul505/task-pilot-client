import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const LIST_URL = "/list";

export const listApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createList: build.mutation({
      query: (payload: any) => ({
        url: LIST_URL,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
      ],
    }),
  }),
});

export const { useCreateListMutation } = listApi;
