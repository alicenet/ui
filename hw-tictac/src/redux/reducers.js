import { createSlice, current } from "@reduxjs/toolkit";
import { classInstanceReducer } from "redux-class-watcher";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { aliceNetProvider } from "config/config";
import { genBaseWalletByNumber } from "./actions";

export const walletKeyByNumber = {
    1: "baseWallet1",
    2: "baseWallet2",
    3: "multiSigWallet",
};

export const globalStatus = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    ERROR: "ERROR",
};

// Generic App Reducer State
const appSlice = createSlice({
    name: "app",
    initialState: {
        activePanel: false,
        settings: {
            aliceNetProvider: aliceNetProvider,
        },
        status: globalStatus.IDLE,
        statusMsg: "",
        gameState: {},
        count: 0,
        wallets: {
            baseWallet1: {
                address: "",
                pKey: "",
                pubK: "",
            },
            baseWallet2: {
                address: "",
                pKey: "",
                pubK: "",
            },
            multiSigWallet: {
                address: "",
                pKey: "",
                pubK: "",
            },
        },
    },
    reducers: {
        // setLoading: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(genBaseWalletByNumber.pending, (state, action) => {
            state.status = globalStatus.LOADING;
        });
        builder.addCase(genBaseWalletByNumber.fulfilled, (state, action) => {
            state.wallets[walletKeyByNumber[action.payload.walletNumber]] = action.payload.wallet;
            state.status = globalStatus.IDLE;
        });
    },
});

// Export Generic App Actions
export const { setWallet } = appSlice.actions;
// Export generic reducer for use in store.js
export const appSliceReducer = appSlice.reducer;

// Class instance reducers for adapter and wallet --
export const [aliceNetAdapterReducer, aliceNetAdapterEqualize] = classInstanceReducer(
    aliceNetAdapter,
    "aliceNetAdapter"
);
export const [aliceNetWalletReducer, aliceNetWalletEqualize] = classInstanceReducer(
    aliceNetAdapter.wallet,
    "aliceNetWallet"
);
