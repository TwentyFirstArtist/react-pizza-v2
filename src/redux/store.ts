import { configureStore } from '@reduxjs/toolkit'
import filter from './slicers/filterSlice'
import card from './slicers/cardSlice'
import itemSlice from './slicers/itemSlice'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    card,
    itemSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch