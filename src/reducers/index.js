const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  activeFilter:'all',
  filterLoadingStatus: 'idle',
  filteredHeroes:[]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'HEROES_FETCHING':
          return {
              ...state,
              heroesLoadingStatus: 'loading'
          }
      case 'HEROES_FETCHED':
          return {
              ...state,
              heroes: action.payload,
              filteredHeroes: state.activeFilter === 'all'?
              action.payload : action.payload.filter(item => item.element === state.activeFilter),
              heroesLoadingStatus: 'idle'
              
          }
      case 'HEROES_FETCHING_ERROR':
          return {
              ...state,
              heroesLoadingStatus: 'error'
          }

      case 'HERO_DELETED': 
      const newHeroList = state.heroes.filter(item =>  item.id !== action.payload);
      return {
          ...state,
          heroes: newHeroList,
          filteredHeroes: state.activeFilter === 'all' ? newHeroList : newHeroList.filter(item => item.element === state.activeFilter)
          
        } 

      case 'HERO_CREATED': 
      const newHero = [...state.heroes, action.payload]
      return {
          ...state,
          heroes: newHero,
          filteredHeroes: state.activeFilter === 'all' ? newHero : newHero.filter(item => item.element === state.activeFilter) 
        }  

      case 'FILTER_FETCHED': 
      return {
        ...state,
        filters: action.payload,
        filterLoadingStatus: 'idle'
        }

      case 'FILTER_FETCHING': 
      return {
        ...state,
        filterLoadingStatus: 'loading'
        }

      case 'FILTER_FETCHING_ERROR': 
      return {
        ...state,
        filterLoadingStatus: 'error'
        }  

      case 'ACTIVE_FILTER': 
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes: action.payload === 'all' ? 
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload),
        filterLoadingStatus: 'idle'
        }  
      default: return state
  }
}

export default reducer;