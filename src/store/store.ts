import rootReducer from './rootReducer'
import {applyMiddleware, compose, createStore} from "redux";
import loadState from "./initialize/loadState";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {useDispatch} from "react-redux";
import logger from 'redux-logger'

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = configureStore({
    reducer: rootReducer(),
    preloadedState: loadState(),
    middleware: [logger],
    devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type ApplicationState = ReturnType<typeof store.getState>;
export default store;