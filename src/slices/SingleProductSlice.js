import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product: {},
  loading: true,
  error: false,
};

export const fetchSingleProduct = createAsyncThunk("singleProduct/product", (id) => {
  return axios(`http://localhost:5000/api/products/${id}`)
    .then((res) => res.data)
    .catch((err) =>{
      throw new Error(err.response.data.message);
    });
});

export const productSlice = createSlice({
  name: "single_product",
  initialState,
  extraReducers: {
    [fetchSingleProduct.pending]: (state) => {
      state.loading = true;
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [fetchSingleProduct.rejected]: (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;
