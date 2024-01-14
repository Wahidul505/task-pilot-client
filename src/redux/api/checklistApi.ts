import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CHECKLIST_URL = "/checklist";

export const checklistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createChecklist: build.mutation({
      query: (payload: { title: string; listId: string }) => ({
        url: CHECKLIST_URL,
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
      ],
    }),

    updateChecklistTitle: build.mutation({
      query: ({ id, payload }: { id: string; payload: { title: string } }) => ({
        url: `${CHECKLIST_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
        tagTypes.checklist,
      ],
    }),

    getAllChecklists: build.query({
      query: (cardId: string) => ({
        url: `${CHECKLIST_URL}/${cardId}/card`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.list,
        tagTypes.board,
        tagTypes.workspace,
        tagTypes.user,
        tagTypes.card,
        tagTypes.checklist,
      ],
    }),
  }),
});

export const {
  useCreateChecklistMutation,
  useUpdateChecklistTitleMutation,
  useGetAllChecklistsQuery,
} = checklistApi;
