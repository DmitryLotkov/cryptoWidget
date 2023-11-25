import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatusAC} from "./app-reducer";
import {cryptoMainApi, CurrencyItem} from "../services/api";


//types
export type CurrencyStateType = {
    currencyList: CurrencyItem[]
}

const initialState: CurrencyStateType = {} as CurrencyStateType;
//thunks
export const getListOfAvailableCurrenciesTC = createAsyncThunk("getListOfAvailableCurrencies",
    async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}));

    try {
        const res = await cryptoMainApi.getListOfAvailableCurrencies()
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}));
        return res.data
    } catch (error: any) {
        thunkAPI.dispatch(setAppStatusAC({status: "failed"}));
        return thunkAPI.rejectWithValue(null)
    }

})


const slice = createSlice({
    name: "currenciesList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListOfAvailableCurrenciesTC.fulfilled, (state, action) => {
            state.currencyList = action.payload;
        })

    }
})


export const currenciesListReducer = slice.reducer;


