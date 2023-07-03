import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filters/filterSlice';

const store = configureStore({
    reducer: {
      filters:  filterReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType <typeof store.getState>;
export default store;