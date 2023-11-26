import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer'
import { cryptoMainApi, CurrencyItem, MinExchangeAmountStateType } from '../../services/api'


//types
export type CurrencyStateType = {
    currencyList: CurrencyItem[];
    minAmount: number;
    estimatedAmount: string;
}

const initialState: CurrencyStateType = {} as CurrencyStateType;
//thunks
export const getListOfAvailableCurrenciesTC = createAsyncThunk("getListOfAvailableCurrencies",
    async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ isLoading: true }));

    try {
        const res = await cryptoMainApi.getListOfAvailableCurrencies()
        thunkAPI.dispatch(setAppStatusAC({ isLoading: false }));
        return res.data;

    } catch (error: unknown) {
        thunkAPI.dispatch(setAppStatusAC({ isLoading: false }));
        return thunkAPI.rejectWithValue(null);
    }

})

export const getMinimalExchangeAmountTC = createAsyncThunk("getMinimalExchangeAmount",
    async (params: {firstTicker: string, secondTicker: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({ isLoading: true }));

        try {
            const res = await cryptoMainApi.getMinimalExchangeAmount(params)
            thunkAPI.dispatch(setAppStatusAC({ isLoading: false }));
            thunkAPI.dispatch(setAppErrorAC({ error: null }));
            if(!res) {
                thunkAPI.dispatch(setAppErrorAC({ error: "this pair is disabled now" }));
            }
            return res.data

        } catch (error: any) {
            console.log(error.response.data.error)
            thunkAPI.dispatch(setAppStatusAC({ isLoading: false }));
            thunkAPI.dispatch(setAppErrorAC({ error: error.response.data.error }));
            return thunkAPI.rejectWithValue(null);
        }

    })

export const getEstimatedExchangeAmountTC = createAsyncThunk("getEstimatedExchangeAmount",
    async (params: { minAmount: number, firstTicker: string, secondTicker: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({ isLoading: true }));

        try {
            const res = await cryptoMainApi.getEstimatedExchangeAmount(params)
            thunkAPI.dispatch(setAppStatusAC({ isLoading: false }));
            thunkAPI.dispatch(setAppErrorAC({ error: null }));

            if(!res) {
                thunkAPI.dispatch(setAppErrorAC({ error: "this pair is disabled now" }));
            }

            return res.data;

        } catch (error: any) {
            thunkAPI.dispatch(setAppErrorAC({ error: error.response.data.error }));
            thunkAPI.dispatch(setAppStatusAC({ isLoading: false }));
            return thunkAPI.rejectWithValue(null);
        }

    })

const slice = createSlice({
    name: "currenciesData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListOfAvailableCurrenciesTC.fulfilled, (state, action) => {
            state.currencyList = action.payload;
        });
        builder.addCase(getMinimalExchangeAmountTC.fulfilled, (state, action) => {
            const payload = action.payload as MinExchangeAmountStateType;
            state.minAmount = payload.minAmount;
        });
        builder.addCase(getEstimatedExchangeAmountTC.fulfilled, (state, action) => {
            state.estimatedAmount = String(action.payload.estimatedAmount);
        });
        builder.addCase(getEstimatedExchangeAmountTC.rejected, (state) => {
            state.estimatedAmount = "-";
        });
    }

})


export const currenciesListReducer = slice.reducer;


