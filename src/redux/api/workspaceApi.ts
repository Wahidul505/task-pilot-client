import { baseApi } from "./baseApi";

const WORKSPACE_URL = "/workspace";

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllWorkspacesOfAdmin: build.query({
      query: () => ({
        url: `${WORKSPACE_URL}/admin`,
        method: "GET",
      }),
    }),

    getSingleWorkspace: build.query({
      query: (id: string) => ({
        url: `${WORKSPACE_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllWorkspacesOfAdminQuery, useGetSingleWorkspaceQuery } =
  workspaceApi;
