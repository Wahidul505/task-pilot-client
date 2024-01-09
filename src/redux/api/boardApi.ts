import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOARD_URL = "/board";

export const boardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBoard: build.mutation({
      query: (data) => ({
        url: BOARD_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.board, tagTypes.workspace],
    }),

    getBoards: build.query({
      query: () => ({
        url: BOARD_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.board, tagTypes.workspace],
    }),

    getSingleBoard: build.query({
      query: (id: string) => ({
        url: `${BOARD_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.board, tagTypes.workspace],
    }),

    updateBoardTitle: build.mutation({
      query: ({ id, payload }: { id: string; payload: { title: string } }) => ({
        url: `${BOARD_URL}/${id}/title`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.board, tagTypes.workspace, tagTypes.user],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useGetBoardsQuery,
  useGetSingleBoardQuery,
  useUpdateBoardTitleMutation,
} = boardApi;