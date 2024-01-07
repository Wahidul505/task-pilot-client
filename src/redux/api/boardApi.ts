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
  }),
});

export const { useCreateBoardMutation, useGetBoardsQuery } = boardApi;
