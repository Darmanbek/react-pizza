import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getCart = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
    try {
        const responce = await api.get("cartProducts");
        if (responce.status === 200) {
            return responce.data;
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const postCart = createAsyncThunk("cart/postCart", async (cartProduct, { rejectWithValue, dispatch }) => {
    try {
        const responce = await api.post("cartProducts", cartProduct);
        if (responce.status === 201) {
            dispatch(addCartProduct(responce.data));
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const putCart = createAsyncThunk("cart/putCart", async (cartProduct, { rejectWithValue, dispatch }) => {
    const { id } = cartProduct;
    try {
        const responce = await api.put(`cartProducts/${id}`, cartProduct);
        if (responce.status === 200) {
            dispatch(editCartProduct(responce.data));
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    cart: [],
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartProduct: (state, { payload }) => {
            state.cart = [...state.cart, payload];
        },

        editCartProduct: (state, { payload }) => {
            const index = state.cart.findIndex(el => el.id === payload.id);
            state.cart[index] = {...payload}
        },

        deleteCartProduct: (state, { payload }) => {
            const newCart = state.cart.filter(el => el.id !== payload);
            state.cart = newCart;
        },

        deleteAllCartProduct: (state) => {
            state.cart = [];
        }
    },
    extraReducers: {
        [getCart.pending]: (state) => {
            state.loading = "pending";
            state.error = null;
        },
        [getCart.fulfilled]: (state, { payload }) => {
            state.cart = payload;
            state.loading = "fulfilled";
            state.error = null;
        },
        [getCart.rejected]: (state, { payload }) => {
            state.loading = "rejected";
            state.error = payload;
        },

        [postCart.pending]: (state) => {
            state.loading = "pending";
            state.error = null;
        },
        [postCart.fulfilled]: (state) => {
            state.loading = "fulfilled";
            state.error = null;
        },
        [postCart.rejected]: (state, { payload }) => {
            state.loading = "rejected";
            state.error = payload;
        },

        [putCart.pending]: (state) => {
            state.loading = "pending";
            state.error = null;
        },
        [putCart.fulfilled]: (state) => {
            state.loading = "fulfilled";
            state.error = null;
        },
        [putCart.rejected]: (state, { payload }) => {
            state.loading = "rejected";
            state.error = payload;
        }
    }
})

export default cartSlice.reducer;
export const { addCartProduct, editCartProduct, deleteCartProduct, deleteAllCartProduct, deleteSelectCartProduct } = cartSlice.actions;