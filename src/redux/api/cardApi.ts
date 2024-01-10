import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CARD_API = "/card";

export const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCard: build.mutation({
      query: (payload: { title: string; listId: string }) => ({
        url: CARD_API,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
      ],
    }),

    getAllCards: build.query({
      query: (listId: string) => ({
        url: `${CARD_API}/${listId}`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
      ],
    }),

    updateListId: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { listId: string };
      }) => ({
        url: `${CARD_API}/${id}/list`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
      ],
    }),
  }),
});

export const {
  useCreateCardMutation,
  useGetAllCardsQuery,
  useUpdateListIdMutation,
} = cardApi;
