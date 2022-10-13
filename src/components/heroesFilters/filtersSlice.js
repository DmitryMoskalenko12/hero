import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  activeFilter:'all',
  filterLoadingStatus: 'idle'
}

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers:{
    filtersFetched: (state, action) => {
     state.filterLoadingStatus = 'idle'
     state.filters = action.payload
    },
    filtersFetching: state => {
      state.filterLoadingStatus = 'loading'
    },
    filtersFetchingError: state => {
      state.filterLoadingStatus = 'error'
    },
    filtersActiveElement: (state, action) => {
      state.activeFilter = action.payload
    }
  }
})

const {actions, reducer} = filters;

export const {filtersActiveElement, filtersFetched, filtersFetching, filtersFetchingError} = actions;
export default reducer;