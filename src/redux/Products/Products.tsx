/* eslint-disable react-refresh/only-export-components */
import { BaseApiQuery } from "../BaseApi/BaseApi";

const ProductsApi = BaseApiQuery.injectEndpoints({
  endpoints: (builder) => ({
    GetProduct: builder.query({
      query: ({search = "", category = "", page, Limit}) => {
        let url = "Product";
        const queryParams = [];
      
        if (search) queryParams.push(`search=${search}`);
        if (category) queryParams.push(`category=${category}`);
        if (page) queryParams.push(`page=${page}&Limit=${Limit}`);
        
        console.log(category)
        // Append query parameters to the URL if they exist
        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }
        console.log(url)
        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ['product']
    }),
    GetSingleProduct: builder.query({
      query: (id) => ({
        url: `/Product/${id}`,
        method: "GET",
      }),
    }),
    DeleteProduct : builder.mutation({
      query: (id) => ({
        url: `/Product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['product']
    }),
    AddNewProduct: builder.mutation({
      query: (TreeData) => ({
        url: `/Product`,
        method: "POST",
        body: TreeData
      }),
      invalidatesTags: ['product']
    }),
    UpdateProduct: builder.mutation({
      query: (UpdateData) => ({ 
        url: `/Product/${UpdateData._id}`,
        method: "PATCH",
        body: UpdateData 
      }),
      invalidatesTags: ['product']
    })
  }),
});

export const { useGetProductQuery, useGetSingleProductQuery, useDeleteProductMutation, useAddNewProductMutation, useUpdateProductMutation } = ProductsApi;
