/* eslint-disable react-refresh/only-export-components */
import { BaseApiQuery } from "../BaseApi/BaseApi"

 

const Orders = BaseApiQuery.injectEndpoints({
    endpoints: (builder) => ({
        AddOrder: builder.mutation({
            query: (OrderData: object) => ({
                url: 'Order',
                method: "POST",
                body: OrderData
            })
        })
    })
})

export const {useAddOrderMutation} = Orders;