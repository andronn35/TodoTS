import { combineReducers } from 'redux';
import { listReducer } from './listReducer';

const rootReducer = combineReducers({
  listReducer: listReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export default rootReducer;