import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const COMMENT_URL = "/comment";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation({
      query: (payload: any) => ({
        url: COMMENT_URL,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
        tagTypes.comment,
      ],
    }),
  }),
});

export const { useAddCommentMutation } = commentApi;
