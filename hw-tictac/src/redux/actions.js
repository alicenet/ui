import { createAsyncThunk } from "@reduxjs/toolkit";
import { aliceNetAdapter } from "adapter/alicenetadapter";
import { ethers } from "ethers";
import { walletKeyByNumber } from "./reducers";

function generateWallet() {
    return new Promise((res) => {
        let wallet = ethers.Wallet.createRandom();
        console.log(wallet);
        // Force re-render on status change by allowing time for node to update
        setTimeout(() => {
            res(wallet);
        }, 100);
        return;
    });
}

export const genBaseWalletByNumber = createAsyncThunk("app/genBaseWalletByNumber", async (walletNumber, thunkAPI) => {
    let walletState = thunkAPI.getState().app.wallets[walletKeyByNumber[walletNumber]];
    if (!walletState.address) {
        console.log(`Generating Wallet: ${walletKeyByNumber[walletNumber]}`);
        let wallet = await generateWallet();
        await aliceNetAdapter.wallet.Account.addAccount(wallet.privateKey, 2);
        let pubK = await aliceNetAdapter.wallet.Account.accounts[0].signer.getPubK();
        return {
            wallet: {
                address: "0x" + aliceNetAdapter.wallet.Account.accounts[0].address,
                pKey: wallet.privateKey,
                pubK: "0x" + pubK,
            },
            walletNumber: walletNumber,
        };
    } else {
        console.warn(`${walletKeyByNumber[walletNumber]} Already Exists: `, JSON.stringify(walletState));
        console.warn(
            `An attempt to regenerate ${walletKeyByNumber[walletNumber]} was made. -- You should try to avoid this.`
        );
    }
});
