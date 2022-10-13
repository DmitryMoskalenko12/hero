import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}
const heroes = createSlice({
  name: 'heroes',
  initialState,
  reducers:{
    heroesFetching: state => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
     state.heroesLoadingStatus = 'idle';
     state.heroes = action.payload;
    },
    heroesFetchingError: state => {
      state.heroesLoadingStatus = 'error';
    },
    heroesCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroesDeleted: (state, action) => {
      state.heroes = state.heroes.filter(item =>  item.id !== action.payload);  
    }
  }
})

const {actions, reducer} = heroes;
export const {heroesFetching, heroesFetched, heroesFetchingError, heroesCreated, heroesDeleted} = actions;
export default reducer;