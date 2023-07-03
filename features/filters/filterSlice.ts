import { RootState } from '../../store/store';
import { SearchFormData } from '../../components/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface InitialStateFilters {
    filters: SearchFormData;
    clearedFilters: boolean;
}  
const clearedFilters: SearchFormData = {
    job_title: '',
    country: { id: '', name: '' },
    industry: { id: '', name: '' },
  };
const initialState: InitialStateFilters = {
    filters: clearedFilters,
    clearedFilters: false
};
  
const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, action) => {
        state.filters = action.payload;
        },
        setClearedFilters: (state, action) => {
        state.clearedFilters = action.payload;
        }
    }
});

export const { setFilters, setClearedFilters } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filters;
export default filterSlice.reducer;

