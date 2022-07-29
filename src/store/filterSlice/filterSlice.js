import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: null,
    sort: {
        name: 'популярности',
        type: 'rating',
        order: 'desc',
    }
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        handleFilter: (state, { payload }) => {
            state.filter = payload;
        },
        handleSort: (state, { payload }) => {
            state.sort = payload;
        }
    }
});

export default filterSlice.reducer
export const { handleFilter, handleSort } = filterSlice.actions;