import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const COLLAB_URL = "/collab";

export const collabApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserReceivedCollabRequests: build.query({
      query: () => ({
        url: COLLAB_URL,
        method: "GET",
      }),
      providesTags: [
        tagTypes.board,
        //  tagTypes.workspace,
        tagTypes.user,
        tagTypes.collab,
      ],
    }),

    collabRequest: build.mutation({
      query: (data: { board1Id: string; board2Id: string }) => ({
        url: COLLAB_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.board, tagTypes.workspace],
    }),

    collabAction: build.mutation({
      query: ({
        requestId,
        board2Id,
        status,
      }: {
        requestId: string;
        board2Id: string;
        status: "accept" | "decline";
      }) => ({
        url: `${COLLAB_URL}/${requestId}`,
        method: "PATCH",
        data: { board2Id, status },
      }),
      invalidatesTags: [tagTypes.board, tagTypes.workspace],
    }),
  }),
});

export const {
  useGetUserReceivedCollabRequestsQuery,
  useCollabRequestMutation,
  useCollabActionMutation,
} = collabApi;
