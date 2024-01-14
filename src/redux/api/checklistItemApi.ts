import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CHECKLIST_ITEM_URL = "/checklist-item";

export const checklistItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createChecklistItem: build.mutation({
      query: (payload: { title: string; listId: string }) => ({
        url: CHECKLIST_ITEM_URL,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
        tagTypes.checklist,
        tagTypes.checklistItem,
      ],
    }),
  }),
});

export const { useCreateChecklistItemMutation } = checklistItemApi;
