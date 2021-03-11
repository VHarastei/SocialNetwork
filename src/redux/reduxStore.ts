import { peopleProfileReducer } from './peopleProfileReducer';
import { applyMiddleware, combineReducers, createStore, compose, Action } from 'redux';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import appReducer from './appReducer';
import chatReducer from './chatReducer';

import thunkMiddleware, { ThunkAction } from 'redux-thunk';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  peopleProfile: peopleProfileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

//type PropertiesTypes<T> = T extends {[key: string]: infer U}  ? U : never;
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[])=> infer U }? U : never;
export type BaseThunkType<A extends Action, R = Promise<void> > = ThunkAction<R, AppStateType, unknown, A>;

const composeEnhancers =
  //@ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, enhancer);

//window.store = store;

export default store;
