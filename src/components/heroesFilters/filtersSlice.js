import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  filterLoadingStatus: 'idle',
  activeFilter:'all'
})

/* const initialState = {
  filters: [],
  activeFilter:'all',
  filterLoadingStatus: 'idle'
} */


export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () =>{
   const {request} = useHttp();
   return await request("http://localhost:3001/filters")
  }
)
const filters = createSlice({
  name: 'filters',
  initialState,
  reducers:{
   /*  filtersFetched: (state, action) => {
     state.filterLoadingStatus = 'idle'
     state.filters = action.payload
    },
    filtersFetching: state => {
      state.filterLoadingStatus = 'loading'
    },
    filtersFetchingError: state => {
      state.filterLoadingStatus = 'error'
    }, */
    filtersActiveElement: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: builder => {
   builder
  .addCase(fetchFilters.pending, state => {
    state.filterLoadingStatus = 'loading'
  })
  .addCase(fetchFilters.fulfilled, (state, action) => {
    state.filterLoadingStatus = 'idle'
    filtersAdapter.setAll(state, action.payload)/* state.filters = action.payload */
   })
  .addCase(fetchFilters.rejected, state => {
    state.filterLoadingStatus = 'error'
  })
  .addDefaultCase(() => {})
  }
})

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

const {actions, reducer} = filters;

export const {filtersActiveElement, filtersFetched, filtersFetching, filtersFetchingError} = actions;
export default reducer;