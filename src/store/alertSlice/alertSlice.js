import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: null,
    visible: false,
    method: "",
    duration: 1500
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        addNewProduct: (state, { payload }) => {
            const { product, method } = payload;
            if(product){
                state.product = product;
            }
            if(method){
                state.method = method;
            }
        },
        alertVisible: (state, { payload }) => {
            state.visible = payload;
        }
    }
});

export default alertSlice.reducer
export const { addNewProduct, alertVisible } = alertSlice.actions;