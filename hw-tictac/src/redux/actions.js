import { createAsyncThunk } from "@reduxjs/toolkit";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { ethers } from "ethers";
import { walletKeyByNumber } from "./reducers";
import axios from "axios";

// For debugging etc.. Hopefully it is clear, but don't use these keys elsewhere.
const staticWallets = true;
const staticTestKeys = {
    1: "0x6efa5e24b5e70456acac871cd35c52e362bb3faa5bcc2f012576a6763d01a776",
    2: "0x9e3830447f93e5b3bc855585260c1b1b35eebe42f6c5b990cb86912292dbc64b",
};

function generateWallet(pKey) {
    return new Promise((res) => {
        let wallet = pKey ? new ethers.Wallet(pKey) : ethers.Wallet.createRandom();
        console.log(wallet);
        // Force re-render on status change by allowing time for node to update
        setTimeout(() => {
            res(wallet);
        }, 100);
        return;
    });
}

function genMultisig([pubKeys]) {
    return new Promise((res) => {
        aliceNetAdapter.wallet.Account.addMultiSig([pubKeys]).then((multiSig) => {
            setTimeout(() => {
                res(multiSig);
            }, 100);
        });
    });
}

export const updateAccountBalance = createAsyncThunk(
    "app/updateAccountBalance",
    async ({ address, curve = 2 }, thunkAPI) => {
        const [utxoids, aBalance] = await aliceNetAdapter.wallet.Rpc.getValueStoreUTXOIDs(address, curve);
        console.log("BalancePoll", { utxoids, aBalance });
        let balance = String(parseInt(aBalance, 16));
        return balance;
    }
);

// const wait = (amt) => new Promise((res) => setTimeout(res, amt));

export const fundWallet = createAsyncThunk("app/fundWallet", async ({ address, curve }, thunkAPI) => {
    console.log("FUND", address, curve);
    await axios.post("http://34.28.51.52:7850/faucet/", {
        address: address,
        curve: curve,
    });
    return;
});

export const genBaseWalletByNumber = createAsyncThunk("app/genBaseWalletByNumber", async (walletNumber, thunkAPI) => {
    let walletState = thunkAPI.getState().app.wallets[walletKeyByNumber[walletNumber]];
    try {
        if (!walletState.address) {
            if (walletNumber === 3) {
                const appState = thunkAPI.getState().app;
                let w1Pubk = appState.wallets[walletKeyByNumber[1]].pubK;
                let w2Pubk = appState.wallets[walletKeyByNumber[2]].pubK;
                w1Pubk = w1Pubk.slice(2, w1Pubk.length); // Remove 0x
                w2Pubk = w2Pubk.slice(2, w2Pubk.length); // Remove 0x
                console.log("Generating Group Wallet From PubKeys: ", { w1Pubk, w2Pubk });
                const multiSigWallet = await genMultisig([w1Pubk, w2Pubk]);
                console.log(multiSigWallet);
                // Get Balance For MultiSig
                await thunkAPI.dispatch(
                    updateAccountBalance({
                        address: aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].address,
                        curve: 2,
                    })
                );
                return {
                    wallet: {
                        address: "0x" + aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].address,
                        pKey: multiSigWallet.privateKey,
                        pubK: "0x" + (await multiSigWallet.signer.getPubK()),
                    },
                    walletNumber: walletNumber,
                };
            } else {
                console.log(`Generating Wallet: ${walletKeyByNumber[walletNumber]}`);
                let wallet = await generateWallet(staticWallets ? staticTestKeys[walletNumber] : false);
                await aliceNetAdapter.wallet.Account.addAccount(wallet.privateKey, 2);
                let pubK = await aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].signer.getPubK();
                return {
                    wallet: {
                        address: "0x" + aliceNetAdapter.wallet.Account.accounts[walletNumber - 1].address,
                        pKey: wallet.privateKey,
                        pubK: "0x" + pubK,
                    },
                    walletNumber: walletNumber,
                };
            }
        } else {
            console.warn(`${walletKeyByNumber[walletNumber]} Already Exists: `, JSON.stringify(walletState));
            console.warn(
                `An attempt to regenerate ${walletKeyByNumber[walletNumber]} was made. -- You should try to avoid this.`
            );
        }
    } catch (ex) {
        console.error(ex);
    }
});

export const signForAndCommitState = createAsyncThunk("app/signForAndCommitState", async () => {});
