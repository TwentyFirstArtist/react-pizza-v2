import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortType = {
    name: string;
    property: string;
    upOrDown: string;
}

interface filterInitial {
    searchValueRedux: string;
    categoryId: number;
    currentPage: number;
    sort: {
        name: string;
        property: string;
        upOrDown: string;
    };
}

const initialState: filterInitial = {
    searchValueRedux: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'до популярних',
        property: 'rating',
        upOrDown: 'asc',
    }
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValueRedux(state, action: PayloadAction<string>) {
            state.searchValueRedux = action.payload;
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFister(state, action: PayloadAction<filterInitial>) {
            if(Object.keys(action.payload).length) {
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
            } else {
                state.categoryId = 0;
                state.currentPage = 1;
                state.sort = {
                    name: 'до популярних',
                    property: 'rating',
                    upOrDown: 'asc',
                };
            }
        },
        clearURL(state) {
            state.categoryId = 0;
            state.currentPage = 1;
            state.sort = {
                name: 'до популярних',
                property: 'rating',
                upOrDown: 'asc',
            }
        }

        
    }
});

export const { setCategoryId, setSort, setCurrentPage, setFister, setSearchValueRedux, clearURL } = filterSlice.actions;

export default filterSlice.reducer;