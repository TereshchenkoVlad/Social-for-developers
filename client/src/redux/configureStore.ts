import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { AppActions } from '../types/actions/app.actions'

import alert from './reducers/alert'
import auth from './reducers/auth'
import profile from './reducers/profile'

export const rootReducer = combineReducers({
   auth,
   alert,
   profile,
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
   rootReducer,
   composeWithDevTools(
      applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
   )
)
