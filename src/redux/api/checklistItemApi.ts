import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CHECKLIST_ITEM_URL = "/checklist-item";

export const checklistItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createItem: build.mutation({
      query: (payload: { title: string; listId: string }) => ({
        url: CHECKLIST_ITEM_URL,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.list,
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.card,
        // tagTypes.checklist,
        tagTypes.checklistItem,
      ],
    }),

    updateSingleItem: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { title?: string; status?: "pending" | "done" };
      }) => ({
        url: `${CHECKLIST_ITEM_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [
        // tagTypes.list,
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.card,
        // tagTypes.checklist,
        tagTypes.checklistItem,
      ],
    }),

    removeSingleItem: build.mutation({
      query: (id: string) => ({
        url: `${CHECKLIST_ITEM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        // tagTypes.list,
        // tagTypes.board,
        // tagTypes.workspace,
        tagTypes.user,
        // tagTypes.card,
        // tagTypes.checklist,
        tagTypes.checklistItem,
      ],
    }),
  }),
});

export const {
  useCreateItemMutation,
  useUpdateSingleItemMutation,
  useRemoveSingleItemMutation,
} = checklistItemApi;
