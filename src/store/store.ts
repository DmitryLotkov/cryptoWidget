import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app/app-reducer';
import {currenciesListReducer} from './currencyData/currencyReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const rootReducer = combineReducers({
    app: appReducer,
    currenciesData: currenciesListReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()