import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const BaseApiQuery = createApi({ 
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://treehub-theta.vercel.app/'
  }),
  tagTypes: ['product'],
  endpoints: ()=>({})
})

  