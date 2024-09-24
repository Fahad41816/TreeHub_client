/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState: object[] = [];

// eslint-disable-next-line react-refresh/only-export-components
const AddCartSlice = createSlice({
  name: "AddCart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const productExists : any = state.find(
        (item : any) => item._id === action.payload._id
      ); // Check if the product exists
      if (productExists) {
        if (productExists.quantity < action.payload.TotalQuantity) {
          // Option 1: Update the quantity of the product if it exists
          productExists.quantity += 1;
        }
      } else {
        // Option 2: Add the new product if it's not a duplicate
        state.push(action.payload);
      }
    },
    DeleteCart: (state, action) => {
        return state.filter((item :any) => item._id !== action.payload);
    },
    incrementQnty: (state, action) => {
      const productExists : any = state.find((item : any) => item._id === action.payload);
      if (productExists) {
        if (productExists.quantity < productExists.TotalQuantity) {
          // Option 1: Update the quantity of the product if it exists
          productExists.quantity += 1;
        }
      } else {
        // Option 2: Add the new product if it's not a duplicate
        state.push(action.payload);
      }
    },
    decrementQnty: (state, action) => {
      const productExists : any = state.find((item : any) => item._id === action.payload);
      if (productExists ) {
        if(productExists.quantity > 1){
            // Option 1: Update the quantity of the product if it exists
            productExists.quantity -= 1;
        }
      } else {
        // Option 2: Add the new product if it's not a duplicate
        state.push(action.payload);
      }
    },
    RemoveCart: (_state, _action) => {
        return []
    }
  },
});

export const { AddToCart, incrementQnty, decrementQnty,  DeleteCart, RemoveCart } = AddCartSlice.actions;
export default AddCartSlice.reducer;
