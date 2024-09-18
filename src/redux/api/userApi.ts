import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USER_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: USER_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateUser: build.mutation({
      query: (data: {
        name?: string;
        dp?: string;
        cover?: string;
        id: string;
      }) => ({
        url: `${USER_URL}/${data?.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
