import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "../axios";

type FetchPizzaArgs = {
    currentPage:number;
    categoryId:number;
    sortProperty: string;
    sortUpDown: string;
    searchValueRedux: string;
}

type ItemData = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    category: number;
    rating: number;
}

export const fetchReduxPizza = createAsyncThunk(
    'itemSlice/fetchPizzaStatus',
    async (params: FetchPizzaArgs) => {
        const {currentPage, categoryId, sortProperty, sortUpDown, searchValueRedux} = params;
        const { data } = await axios.get<ItemData[]>(`https://6374ba4e08104a9c5f87637e.mockapi.io/items?page=${currentPage}&limit=4${categoryId ? `&category=${categoryId}` : ''}${`&sortBy=${sortProperty}&order=${sortUpDown}`}&search=${searchValueRedux}`);

        return data;
    }
  );

type Items = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
}


interface Pizza {
    items: Items[];
    status: 'loading' | 'done' | 'error';
}

const initialState: Pizza = {
    items: [],
    status: 'loading', // loading, done, error;
}

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers: {
        addPizzas: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchReduxPizza.pending, (state)  => {
            state.items = [];
            state.status = 'loading';
        })
        builder.addCase(fetchReduxPizza.fulfilled, (state, action)  => {
            state.items = action.payload;
            state.status = 'done';
        })
        builder.addCase(fetchReduxPizza.rejected, (state)  => {
            state.items = [];
            state.status = 'loading';
        })
    }
})

export const { addPizzas } = itemSlice.actions

export default itemSlice.reducer