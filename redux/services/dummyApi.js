import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enhancedBaseQuery from "./helper_services/enhanceBaseQuery";

export const dummyApi = createApi({
  reducerPath: "dummyApi",
  baseQuery: enhancedBaseQuery,
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      // query: (file) => {
      //   const formData = new FormData();
      //   formData.append("file", file);
      //   return {
      //     url: "dummy-data/upload",
      //     method: "POST",
      //     body: formData,
      //     // headers: {
      //     //   "Content-Type": "multipart/form-data",
      //     // },
      //   };
      // },
      query: (formData) => ({
        url: "/dummy-data/upload",
        method: "POST",
        body: formData,
      }),
    }),
    getAllData: builder.query({
      query: () => "dummy-data/get",
    }),
  }),
});

export const { useUploadFileMutation, useGetAllDataQuery } = dummyApi;
