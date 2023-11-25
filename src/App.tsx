import React, {useEffect} from 'react';
import './App.css';
import {getListOfAvailableCurrenciesTC} from "./store/currencyReducer";
import {useAppDispatch, useAppSelector} from "./store/store";
import {CurrencyItem} from "./services/api";

function App() {
    const dispatch = useAppDispatch();
    const currencyList = useAppSelector<CurrencyItem[]>(state => state.currenciesData.currencyList)
    useEffect(() => {
        dispatch(getListOfAvailableCurrenciesTC())
    }, [dispatch])
    return (
        <div className="App">

        </div>
    );
}

export default App;
