import { configureStore } from "@reduxjs/toolkit";
import products from "./productsSlice/productsSlice";
import modal from "./modalSlice/modalSlice";
import cart from "./cartSlice/cartSlice";
import filter from "./filterSlice/filterSlice";
import alert from "./alertSlice/alertSlice";

const store = configureStore({
    reducer: {
        products,
        modal,
        cart,
        filter,
        alert,
    }
});

export default store;