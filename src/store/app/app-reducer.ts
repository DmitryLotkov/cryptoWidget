import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    error: null as NullableType<string>
};

export type NullableType<T> = null | T;


const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{isLoading: boolean}>){
            state.isLoading = action.payload.isLoading;
        },
        setAppErrorAC(state, action: PayloadAction<{error: NullableType<string>}>){
            state.error = action.payload.error;
        }
    }
})
export const appReducer = slice.reducer;


export const {setAppErrorAC, setAppStatusAC} = slice.actions;