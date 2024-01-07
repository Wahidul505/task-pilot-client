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
      providesTags: [tagTypes.workspace],
    }),

    getSingleWorkspace: build.query({
      query: (id: string) => ({
        url: `${WORKSPACE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workspace],
    }),

    updateSingleWorkspace: build.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `${WORKSPACE_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.workspace],
    }),
  }),
});

export const {
  useGetAllWorkspacesOfAdminQuery,
  useGetSingleWorkspaceQuery,
  useUpdateSingleWorkspaceMutation,
} = workspaceApi;
