import { createSlice } from "@reduxjs/toolkit"
import { classInstanceReducer } from "redux-class-watcher";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { aliceNetProvider } from "config/config";
import { searchTypes } from "utils";

// Generic App Reducer State
const appSlice = createSlice({
    name: "app",
    initialState: {
        activePanel: false,
        settings: {
            aliceNetProvider: aliceNetProvider,
        },
        loading: false,
        currentSearch: { type: searchTypes.TRANSACTIONS, term: null, offset: null }
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCurrentSearch: (state, action) => {
            state.currentSearch = action.payload;
        },
        clearLoading: (state) => {
            state.loading = false;
        },
        clearCurrentSearch: (state) => {
            state.currentSearch = null;
        }
    },
})

// Export Generic App Actions
export const { setLoading, clearLoading } = appSlice.actions
// Export generic reducer for use in store.js
export const appSliceReducer = appSlice.reducer;

// Class instance reducers for adapter and wallet -- 
export const [aliceNetAdapterReducer, aliceNetAdapterEqualize] = classInstanceReducer(aliceNetAdapter, "aliceNetAdapter");
export const [aliceNetWalletReducer, aliceNetWalletEqualize] = classInstanceReducer(aliceNetAdapter.wallet, "aliceNetWallet");