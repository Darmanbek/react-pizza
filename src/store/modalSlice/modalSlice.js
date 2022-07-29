import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    selectID: [],
    visible: false,
    visibleCart: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        handleVisible: (state, { payload }) => {
            state.visible = !state.visible;
            if(!state.id){
                state.id = payload;
            }else{
                state.id = null;
            }
        },

        handleVisibleCart: (state) => {
            state.visibleCart = !state.visibleCart;
        },

        handleID: (state, { payload }) => {
            state.selectID = payload
        }
    },
});

export default modalSlice.reducer;
export const { handleVisible, handleVisibleCart, handleID } = modalSlice.actions;