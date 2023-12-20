/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStartup } from "../../types/globalType";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const baseURL = "https://startup-directory-backend.vercel.app/api/v1";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["startups", "postStartup", "deleteStartup", "updateStartup"],
  endpoints: (builder) => ({
    getStartups: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/startups",
        method: "GET",
        params: arg,
      }),
      providesTags: ["startups", "updateStartup"],
    }),

    postStartup: builder.mutation<IStartup, Partial<IStartup>>({
      query: (startupData: IStartup) => ({
        url: "/startups",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token!,
        },
        body: startupData,
      }),
      invalidatesTags: ["startups", "postStartup"],
    }),

    getSingleStartup: builder.query({
      query: (id: string) => `/startups/${id}`,
    }),

    updateStartup: builder.mutation({
      query: (updatedData: IStartup) => ({
        url: `/startups/${updatedData._id as string}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: token!,
        },
        body: updatedData,
      }),
      invalidatesTags: ["updateStartup"],
    }),

    getMyStartups: builder.query({
      query: () => ({
        url: `/startups/my-startups`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token!,
        },
      }),
      providesTags: ["postStartup", "deleteStartup"],
    }),

    deleteStartup: builder.mutation({
      query: (id: string) => ({
        url: `/startups/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token!,
        },
      }),
      invalidatesTags: ["startups", "deleteStartup"],
    }),
  }),
});

export const {
  useGetStartupsQuery,
  useGetSingleStartupQuery,
  usePostStartupMutation,
  useUpdateStartupMutation,
  useGetMyStartupsQuery,
  useDeleteStartupMutation,
} = api;
