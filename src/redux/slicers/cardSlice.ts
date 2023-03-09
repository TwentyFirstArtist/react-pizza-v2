import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CardItem = {
    id: string;
    title: string;
    price: number;
    count: number;
    imageUrl: string;
    size: number;
    cardId: string;
};

interface ItemType {
    totalPrice: number;
    item: CardItem[];
};

const initialState: ItemType = {
    totalPrice: 0,
    item: [],
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CardItem>) => {
            const finder = state.item.find((obj) => obj.cardId === action.payload.cardId);

            if(finder) {
                finder.count++;
            } else {
                state.item.push({
                    ...action.payload,
                    count: 1,
                });
            };

            state.totalPrice += action.payload.price;
        },
        decrement: (state, action: PayloadAction<{cardId: string; price: number}>) => {
            const finder = state.item.find((obj) => obj.cardId === action.payload.cardId);
            
            if(finder) {
                finder.count--;

                if(finder.count === 0) state.item = state.item.filter((obj) => obj.cardId !== action.payload.cardId);
                
                state.totalPrice -= action.payload.price;
            }
        },
        removeItem: (state, action: PayloadAction<{cardId: string; price: number; count: number}>) => {
            state.item = state.item.filter((obj) => obj.cardId !== action.payload.cardId);
            state.totalPrice -= action.payload.price * action.payload.count;
        },
        clearCard: (state) => {
            state.item = [];
            state.totalPrice = 0;
        },
    },
});

export const cardSelector = (state: RootState) => state.card;

export const { addItem, removeItem, clearCard, decrement, } = cardSlice.actions;

export default cardSlice.reducer;