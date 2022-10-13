import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";
export const fetchHeroes = (request) => (dispatch) =>{
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) =>{
  dispatch(filterFetching())
  request('http://localhost:3001/filters')
        .then((data) => dispatch(filterFetched(data)))
        .catch(() => dispatch(filterFetchingError()))
}

/* export const heroesFetching = () => {
  return {
      type: 'HEROES_FETCHING'
  }
} */

/* export const heroesFetched = (heroes) => {
  return {
      type: 'HEROES_FETCHED',
      payload: heroes
  }
} */

/* export const heroesFetchingError = () => {
  return {
      type: 'HEROES_FETCHING_ERROR'
  }
} */


/* export const heroCreated = (hero) => {
  return {
      type: 'HERO_CREATED',
      payload: hero
  }
}

export const heroDeleted = (id) => {
  return {
      type: 'HERO_DELETED',
      payload: id
  }
} */

export const filterFetched = (filter) => {
  return {
      type: 'FILTER_FETCHED',
      payload: filter
  } 
}

export const filterFetching = () => {
  return {
      type: 'FILTER_FETCHING'  
  } 
}

export const filterFetchingError = () => {
  return {
      type: 'FILTER_FETCHING_ERROR'   
  } 

}

export const activeFilterElement = (active) => {
  return {
      type: 'ACTIVE_FILTER',
      payload: active 
  } 

}