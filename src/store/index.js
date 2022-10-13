/* import { createStore, combineReducers, compose, applyMiddleware } from 'redux'; */
import ReduxThunk from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) =>{
  if (typeof action === 'string') {
    return next({
       type: action
     })
   }
   return next(action)
 }


/* const enhanser = (createStore) => (...arg) => {
  const store = createStore(...arg);
  const oldDispatch = store.dispatch;
  store.dispatch = (action) => {
    if (typeof action === 'string') {
     return oldDispatch({
        type: action
      })
    }
    return oldDispatch(action)
  }
  return store
} */
const store = configureStore({
  reducer: {heroes, filters},
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware)
})
/* const store = createStore(combineReducers({
  heroes,
  filters
}),compose( applyMiddleware(ReduxThunk, stringMiddleware),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )); */

export default store;
