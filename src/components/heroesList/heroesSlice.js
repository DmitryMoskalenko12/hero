import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle'
})

/* const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
} */

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  () => {
  const {request} = useHttp();
  return request("http://localhost:3001/heroes")
  }
)

const heroes = createSlice({
  name: 'heroes',
  initialState,
  reducers:{
   /*  heroesFetching: state => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
     state.heroesLoadingStatus = 'idle';
     state.heroes = action.payload;
    },
    heroesFetchingError: state => {
      state.heroesLoadingStatus = 'error';
    }, */
    heroesCreated: (state, action) => {
      heroesAdapter.addOne(state, action.payload) /* state.heroes.push(action.payload); */
    },
    heroesDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload)/* state.heroes = state.heroes.filter(item =>  item.id !== action.payload); */  
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchHeroes.pending, state => {
      state.heroesLoadingStatus = 'loading';
    })
    .addCase(fetchHeroes.fulfilled, (state, action) => {
      state.heroesLoadingStatus = 'idle';
      heroesAdapter.setAll(state, action.payload)/* state.heroes = action.payload; */
     })
    .addCase(fetchHeroes.rejected, state => {
      state.heroesLoadingStatus = 'error';
    })
    .addDefaultCase(() => {})
  }
})

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
  /* state => state.heroes.heroes, */ selectAll,
state => state.filters.activeFilter,
  (heroes, filter) => {
    if (filter === 'all') {
      return heroes
    }else{
     return heroes.filter(item => item.element === filter)
    }
  }
)
const {actions, reducer} = heroes;
export const {heroesFetching, heroesFetched, heroesFetchingError, heroesCreated, heroesDeleted} = actions;
export default reducer;