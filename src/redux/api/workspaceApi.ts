import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const WORKSPACE_URL = "/workspace";

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllWorkspacesOfAdmin: build.query({
      query: () => ({
        url: `${WORKSPACE_URL}/admin`,
        method: "GET",
      }),
      providesTags: [tagTypes.workspace, tagTypes.board, tagTypes.user],
    }),

    getSingleWorkspace: build.query({
      query: (id: string) => ({
        url: `${WORKSPACE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workspace, tagTypes.board],
    }),

    updateSingleWorkspace: build.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `${WORKSPACE_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.workspace, tagTypes.board],
    }),

    createWorkspace: build.mutation({
      query: (payload: any) => ({
        url: WORKSPACE_URL,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.workspace, tagTypes.board],
    }),

    addWorkspaceAdmins: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { admins: string[] };
      }) => ({
        url: `${WORKSPACE_URL}/${id}/admin`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.board, tagTypes.workspace, tagTypes.user],
    }),

    removeWorkspaceAdmin: build.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: { adminId: string };
      }) => ({
        url: `${WORKSPACE_URL}/${id}/admin`,
        method: "DELETE",
        data: payload,
      }),
      invalidatesTags: [tagTypes.board, tagTypes.workspace, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllWorkspacesOfAdminQuery,
  useGetSingleWorkspaceQuery,
  useUpdateSingleWorkspaceMutation,
  useCreateWorkspaceMutation,
  useAddWorkspaceAdminsMutation,
  useRemoveWorkspaceAdminMutation,
} = workspaceApi;
