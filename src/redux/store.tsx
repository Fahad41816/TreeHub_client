import { configureStore } from "@reduxjs/toolkit";
import {BaseApiQuery} from "./BaseApi/BaseApi";
import AddCartReducer from './Features/AddcartSlice/AddCartSlice'

const store = configureStore({
    reducer:{
        [BaseApiQuery.reducerPath] : BaseApiQuery.reducer,
        Cart: AddCartReducer
    }, 
    middleware: (getDefaultmiddleware) => getDefaultmiddleware().concat(BaseApiQuery.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store