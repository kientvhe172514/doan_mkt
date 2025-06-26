import { apiSlice } from "../api/apiSlice";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const brandApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      query: () => `${API_BASE_URL}/brand/active`
    }),
  }),
});

export const {
 useGetActiveBrandsQuery
} = brandApi;
