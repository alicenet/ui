import { createSlice } from "@reduxjs/toolkit";
import { classInstanceReducer } from "redux-class-watcher";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { aliceNetProvider } from "config/config";
import {
    createGameStateTransaction,
    fundWallet,
    genBaseWalletByNumber,
    loadGameStateFromIndex,
    oSignsGameStateTransaction,
    sendGameStateTransaction,
    updateMultiSigAccountBalance,
    xSignsGameStateTransaction,
} from "./actions";
import { initialTttGameState } from "./gameState";

export const walletKeyByNumber = {
    1: "baseWallet1",
    2: "baseWallet2",
    3: "multiSigWallet",
};

export const globalStatus = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    TX_CREATE: "TX_CREATE",
    TX_SEND: "TX_SEND",
    X_SIGNING: "X_SIGNING",
    O_SIGNING: "O_SIGNING",
    FUNDING: "FUNDING",
    ERROR: "ERROR",
    LOADING_GAME: "LOADING_GAME",
    GENERATING_X: "GENERATING_X",
    GENERATING_O: "GENERATING_O",
    GENERATING_GROUP: "GENERATING_GROUP",
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
        gameState: {
            ...initialTttGameState,
        },
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
        multiSigBalance: 0,
        gameIndex: "aba1d992f0ed5e9a375797e43c2efc64fe51edcfabfb025614f83f64b6957720",
        lastHash: "",
        xSigned: false,
        oSigned: false,
        txCreated: false,
    },
    reducers: {
        setGameState: (state, action) => {
            state.gameState = {
                ...state.gameState,
                turn: action.payload.turn,
                winner: action.payload.winner,
                board: action.payload.board,
            };
        },
        setGameIndex: (state, action) => {
            state.gameIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Gen Base Wallet
        builder.addCase(genBaseWalletByNumber.pending, (state, action) => {
            state.status = state.wallets.baseWallet2.address
                ? globalStatus.GENERATING_GROUP
                : state.wallets.baseWallet1.address
                ? globalStatus.GENERATING_O
                : globalStatus.GENERATING_X;
        });
        builder.addCase(genBaseWalletByNumber.fulfilled, (state, action) => {
            state.wallets[walletKeyByNumber[action.payload.walletNumber]] = action.payload.wallet;
            state.status = globalStatus.IDLE;
        });
        // Update Account Balance
        builder.addCase(updateMultiSigAccountBalance.pending, (state, action) => {});
        builder.addCase(updateMultiSigAccountBalance.fulfilled, (state, action) => {
            state.multiSigBalance = action.payload;
        });
        // Fund Wallet
        builder.addCase(fundWallet.pending, (state, action) => {
            state.status = globalStatus.LOADING;
        });
        builder.addCase(fundWallet.fulfilled, (state, action) => {
            state.status = globalStatus.IDLE;
        });
        // Load Game State from Index
        builder.addCase(loadGameStateFromIndex.pending, (state, action) => {
            state.status = globalStatus.LOADING_GAME;
        });
        builder.addCase(loadGameStateFromIndex.fulfilled, (state, action) => {
            state.status = globalStatus.IDLE;
        });
        // Create TX
        builder.addCase(createGameStateTransaction.pending, (state, action) => {
            state.status = globalStatus.TX_CREATE;
        });
        builder.addCase(createGameStateTransaction.fulfilled, (state, action) => {
            state.status = globalStatus.IDLE;
            state.txCreated = true;
            state.xSigned = false;
            state.oSigned = false;
        });
        // X Sign
        builder.addCase(xSignsGameStateTransaction.pending, (state, action) => {
            state.status = globalStatus.X_SIGNING;
        });
        builder.addCase(xSignsGameStateTransaction.fulfilled, (state, action) => {
            state.status = globalStatus.IDLE;
            state.xSigned = true;
        });
        // O Sign
        builder.addCase(oSignsGameStateTransaction.pending, (state, action) => {
            state.status = globalStatus.O_SIGNING;
        });
        builder.addCase(oSignsGameStateTransaction.fulfilled, (state, action) => {
            state.status = globalStatus.IDLE;
            state.oSigned = true;
        });
        // Send TX
        builder.addCase(sendGameStateTransaction.pending, (state, action) => {
            state.status = globalStatus.TX_SEND;
        });
        builder.addCase(sendGameStateTransaction.fulfilled, (state, action) => {
            state.status = globalStatus.IDLE;
            state.lastHash = action.payload.hash;
            state.multiSigBalance = action.payload.balance;
            state.txCreated = false;
        });
    },
});

// Export Generic App Actions
export const { setGameState, setGameIndex } = appSlice.actions;
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
