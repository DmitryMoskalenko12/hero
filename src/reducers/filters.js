const initialState = {
  filters: [],
  activeFilter:'all',
  filterLoadingStatus: 'idle'
}

const filters = (state = initialState, action) => {
  switch (action.type) {
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
        activeFilter: action.payload
        }  
      default: return state
  }
}

export default filters;