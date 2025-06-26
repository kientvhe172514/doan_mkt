import { apiSlice } from "../api/apiSlice";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${API_BASE_URL}/category/add`,
        method: "POST",
        body: data,
      }),
    }),
    getShowCategory: builder.query({
      query: () => `${API_BASE_URL}/category/show`
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `${API_BASE_URL}/category/show/${type}`
    }),
  }),
});

export const {
 useAddCategoryMutation,
 useGetProductTypeCategoryQuery,
 useGetShowCategoryQuery,
} = categoryApi;
