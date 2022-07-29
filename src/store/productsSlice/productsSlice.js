import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getProducts = createAsyncThunk("products/getProducts", async (data, { rejectWithValue }) => {
    const { filter, sort } = data;
    const { type, order } = sort
    try {
        const responce = await api.get(`products?${filter ? `category=${filter}` : null}&sortBy=${type}&orderBy=${order}`);
        if (responce.status === 200) {
            return responce.data;
        }
    } catch (error) {
        rejectWithValue(error.message);
    }
})

const initialState = {
    products: [],
    loading: null,
    error: null,
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = "pending";
            state.error = null;
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.loading = "fulfilled";
            state.error = null;
            state.products = payload;
        },
        [getProducts.rejected]: (state, { payload }) => {
            state.loading = "rejected";
            state.error = payload
        },
    }
});

export default productsSlice.reducer;