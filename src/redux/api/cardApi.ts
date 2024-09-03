import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CARD_URL = "/card";

export const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCard: build.mutation({
      query: (payload: { title: string; listId: string; status: string }) => ({
        url: CARD_URL,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.list,
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
      ],
    }),

    getAllCards: build.query({
      query: (listId: string) => ({
        url: `${CARD_URL}/${listId}`,
        method: "GET",
      }),
      providesTags: [
        // tagTypes.list,
        // tagTypes.board,
        // tagTypes.workspace,
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
        url: `${CARD_URL}/${id}/list`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.list,
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
      ],
    }),

    addCardMember: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { memberId: string };
      }) => ({
        url: `${CARD_URL}/${id}/member`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.list,
        tagTypes.card,
      ],
    }),

    removeCardMember: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { memberId: string };
      }) => ({
        url: `${CARD_URL}/${id}/member`,
        method: "DELETE",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.list,
        tagTypes.card,
      ],
    }),

    updateSingleCard: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: {
          title?: string;
          description?: string;
          dueDate?: Date;
          status?: "pending" | "done";
        };
      }) => ({
        url: `${CARD_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.list,
        tagTypes.card,
      ],
    }),

    removeSingleCard: build.mutation({
      query: (id: string) => ({
        url: `${CARD_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.list,
        tagTypes.card,
      ],
    }),
  }),
});

export const {
  useCreateCardMutation,
  useGetAllCardsQuery,
  useUpdateListIdMutation,
  useAddCardMemberMutation,
  useRemoveCardMemberMutation,
  useUpdateSingleCardMutation,
  useRemoveSingleCardMutation,
} = cardApi;
