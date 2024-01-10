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

    getAllLists: build.query({
      query: (boardId: string) => ({
        url: `${LIST_URL}/${boardId}/board`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
      ],
    }),

    getSingleList: build.query({
      query: (id: string) => ({
        url: `${LIST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
      ],
    }),

    updateListTitle: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { title: string; boardId: string };
      }) => ({
        url: `${LIST_URL}/${id}/title`,
        method: "PATCH",
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

export const {
  useCreateListMutation,
  useGetAllListsQuery,
  useGetSingleListQuery,
  useUpdateListTitleMutation,
} = listApi;
