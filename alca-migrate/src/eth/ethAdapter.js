import "ethers";
import { ethers } from "ethers";
import { CONTRACTS, RPC } from "config";
import store from "redux/store/store";
import { APPLICATION_ACTIONS } from "redux/actions";
import { TOKEN_TYPES } from "redux/constants";

/**
 * Callback to run after establishing web3connection state pass or fail
 * @callback web3ConnectCallback
 * @param { Object } err - Will be null if no error, or else contain the error
 */
class EthAdapter {
    ////////////////////////////////////////////////////////
    /* Private Methods -- Scroll down for public methods */
    //////////////////////////////////////////////////////
    constructor() {
        this.accounts = []; // Web3 Accounts List
        this.provider = null; // Web3 Provider -- Populated on successful _connectToWeb3Wallet()
        this.signer = null; // Web3 Signer -- Populated on successful _connectToWeb3Wallet()
        this.contracts = CONTRACTS; // Contracts from config
        this._setupWeb3Listeners();
        this.timeBetweenBalancePolls = 7500;

        // Setup RPC provider
        this.provider = new ethers.providers.JsonRpcProvider(RPC.URL);

        console.debug("EthAdapter Init: ", this);
    }

    /**
     * Listen for balance updates
     */
    async _balanceLoop() {
        let accts = await this.provider.send("eth_requestAccounts", []); // Request accounts
        if (accts.length === 0) {
            console.log("balfail");
            return;
        }
        console.log("BALANCE");
        this.updateBalances();
        setTimeout(this._balanceLoop.bind(this), this.timeBetweenBalancePolls);
    }

    /**
     * Setup web3 listeners for connected web3Wallet state changes
     */
    async _setupWeb3Listeners() {
        if (window.ethereum) {
            window.ethereum.on("networkChanged", (networkId) => {
                store.dispatch(APPLICATION_ACTIONS.updateNetwork(networkId));
                this.updateBalances();
            });
            window.ethereum.on("accountsChanged", async (accounts) => {
                this.accounts = accounts;
                let address = await this._getAddressByIndex(0);
                store.dispatch(APPLICATION_ACTIONS.setConnectedAddress(address));
                this.updateBalances();
            });
        } else {
            console.warn("No web3 detected."); // TODO: Add fallback
        }
    }

    /**
     * Get address from accounts[index] or return 0 if empty.
     * @param { Number } index - Index to get from this.accounts
     */
    async _getAddressByIndex(index = 0) {
        return this.accounts.length > 0 ? this.accounts[index] : "0x0";
    }

    /**
     * Returns an ethers.js contract instance that has been instanced without a signer for read-only calls
     * @param { contractName } contractName - One of the available contract name strings from config
     */
    _getReadonlyContractInstance(contractName) {
        this._requireContractExists(contractName);
        this._requireContractAddress(contractName);
        this._requireContractAbi(contractName);
        return new ethers.Contract(
            this.contracts[contractName].address,
            this.contracts[contractName].abi,
            this.provider
        );
    }

    /**
     * Returns an ethers.js contract instance that has been instanced with a signer ( this.signer )
     * @param { contractName } contractName - One of the available contract name strings from config
     */
    _getSignerContractInstance(contractName) {
        this._requireContractExists(contractName);
        this._requireContractAddress(contractName);
        this._requireContractAbi(contractName);
        this._requireSigner(contractName);
        return new ethers.Contract(this.contracts[contractName].address, this.contracts[contractName].abi, this.signer);
    }

    /**
     * Throw exceptions
     * @param { String } msg
     */
    async _throw(msg) {
        throw new Error("eth/ethAdapter.js: " + msg);
    }

    /**
     * Internal contract settings requirement helper for contract functions
     * @param { String } contractName
     */
    _requireContractExists(contractName) {
        if (!this.contracts[contractName]) {
            this._throw(
                "Contract configuration for contract '" +
                    contractName +
                    "' nonexistent. Verify contract has been set in .env"
            );
        }
    }

    /**
     * Internal ABI requirement helper for contract functions
     * @param { String } contractName
     */
    _requireContractAbi(contractName) {
        if (!this.contracts[contractName].abi) {
            this._throw(
                "Requesting contract instance for contract '" +
                    contractName +
                    "' with nonexistent abi. Verify ABI has been set."
            );
        }
    }

    /**
     * Internal contract address requirement helper for contract functions
     * @param { String } contractName
     */
    _requireContractAddress(contractName) {
        if (!this.contracts[contractName].address) {
            this._throw(
                "Requesting contract instance for contract '" +
                    contractName +
                    "' with nonexistant address. Verify address has been set."
            );
        }
    }

    /**
     * Internal signer requirement helper for contract functions
     * @param { String } contractName
     */
    _requireSigner(contractName) {
        if (!this.signer) {
            this._throw(
                "Requesting contract instance for contract '" +
                    contractName +
                    "' but EthAdapter has not been provided a signer. Verify a signer has been set."
            );
        }
    }

    /**
     * Try a function, if it fails return the error with message nested as "error" in a plain object
     * @param { Function } func
     * @returns { Promise } - Function result or error
     */
    async _try(func) {
        try {
            return await func();
        } catch (ex) {
            console.error(ex);
            return { error: ex.message };
        }
    }

    /**
     * Attempt a call on a contract method
     * @param { ContractName } contractName - One of the available contract name strings from config
     * @param { String } methodName - Exact smart contract method name as a string
     * @param { Array } params - Contract method parameters as an array
     */
    async _tryCall(contractName, methodName, params = []) {
        let contract = this._getReadonlyContractInstance(contractName);
        let result = await contract[methodName](...params);
        // If return is a BN parse and return the value string, else just return
        if (ethers.BigNumber.isBigNumber(result)) {
            return result.toString();
        }
        return result;
    }

    /**
     * Attempt a send on a contract method
     * @param { ContractName } contractName - One of the available contract name strings from config
     * @param { String } methodName - Exact smart contract method name as a string
     * @param { Array } params - Contract method parameters as an array
     */
    async _trySend(contractName, methodName, params = []) {
        return await this._getSignerContractInstance(contractName)[methodName](...params);
    }

    async _lookupContractName(cName) {
        return this._try(async () => {
            let contractAddress = await this._tryCall("Factory", "lookup", [ethers.utils.formatBytes32String(cName)]);
            return contractAddress;
        });
    }

    async _getContractAddresses() {
        for (let contract in this.contracts) {
            if (contract === "Factory" || contract === "MadToken") {
                continue;
            } // Don't overwrite factory address or legacy MadToken address
            let address = await this._lookupContractName(contract);
            this.contracts[contract].address = address;
            console.log(contract, address);
        }
        console.log("Contract addresses populated from lookup()", this.contracts);
    }

    /////////////////////
    /* Public Methods  */

    ////////////////////

    /**
     * Attempt to connect to a Web3 Wallet from window.ethereum
     * @param { web3ConnectCallback } cb - Callback to run after a connection contains err if error
     * @returns { String } - Connected Address
     */
    async connectToWeb3Wallet(cb) {
        try {
            this.provider = new ethers.providers.Web3Provider(window.ethereum, "any"); // Establish connection to injected wallet
            this.accounts = await this.provider.send("eth_requestAccounts", []); // Request accounts
            this.signer = this.provider.getSigner(); // Get the signer
            let connectedAddress = await this._getAddressByIndex(0);
            store.dispatch(APPLICATION_ACTIONS.updateNetwork(String(parseInt(window.ethereum.chainId, 16))));
            store.dispatch(APPLICATION_ACTIONS.setWeb3Connected(true));
            store.dispatch(APPLICATION_ACTIONS.setConnectedAddress(connectedAddress));

            // Get contract addresses from FACTORY lookup()
            await this._getContractAddresses();

            cb(null, connectedAddress);
            // Setup balance listener
            this._balanceLoop();
            // this._lookupContractName();
        } catch (ex) {
            console.error(ex);
            store.dispatch(APPLICATION_ACTIONS.setWeb3Connected(false));
            cb({ error: ex.message });
        }
    }

    /**
     * Disconnect Web3 Wallet from window.ethereum
     * @param { web3ConnectCallback } cb - Callback to run after a connection contains err if error
     * @returns { String } - Connected Address
     */
    async disconnectWeb3Wallet(cb) {
        try {
            store.dispatch(APPLICATION_ACTIONS.setWeb3Connected(false));
            store.dispatch(APPLICATION_ACTIONS.setConnectedAddress(""));
            cb(null);
        } catch (ex) {
            console.error(ex);
            cb({ error: ex.message });
        }
    }

    /**
     * Get Ether balance
     * @param { Number } accountIndex - Account index of this.accounts[i] to check balance for
     * @returns { Promise<String> } - Ethereum balance of this.accounts[accountIndex] as formatted string
     */
    async getEthereumBalance(accountIndex = 0) {
        return this._try(async () => {
            let balance = await this.provider.getBalance(this._getAddressByIndex(accountIndex));
            return ethers.utils.formatEther(balance);
        });
    }

    /**
     * Get ALCA balance
     * @param {Number} accountIndex - Account index to get ALCA for
     * @returns {String} - Balance of ALCA for given account index
     */
    async getAlcaBalance(accountIndex = 0) {
        return this._try(async () => {
            let balance = await this._tryCall("AToken", "balanceOf", [await this._getAddressByIndex(accountIndex)]);
            return ethers.utils.formatEther(balance);
        });
    }

    /**
     * Get mad token balance for an address
     * @param {String} address - Ethereum address to which the balance should be fetched for
     * @returns {String} - Balance of mad tokens held by the address
     */
    async getMadTokenBalance(accountIndex = 0) {
        return this._try(async () => {
            let balance = await this._tryCall("MadToken", "balanceOf", [await this._getAddressByIndex(accountIndex)]);
            return ethers.utils.formatEther(balance); // MadToken is an 18 Decimal balance like ETH, format it
        });
    }

    /**
     * Get mad token allowance for an address
     * @param {String} address - Ethereum address to which the balance should be fetched for
     * @returns {String} - Allowance of mad tokens in non-decimal (wei) value held by the address
     */
    async getMadTokenAllowance(accountIndex = 0) {
        return this._try(async () => {
            let allowance = await this._tryCall("MadToken", "allowance", [
                await this._getAddressByIndex(accountIndex),
                this.contracts["AToken"].address,
            ]);
            return allowance;
        });
    }

    async getMadTokenToALCAExchangeRate(madAmt) {
        return this._try(async () => {
            let exchangeRate = await this._tryCall("AToken", "convert", [madAmt]);
            return ethers.utils.formatEther(exchangeRate).toString();
        });
    }

    /**
     * Request a network change to the active web wallet in window.ethereum
     * @param { String } networkId - Network ID as a string -- Not Hexadecimal
     */
    async requestNetworkChange(networkId) {
        let hexChainId = "0x" + parseInt(networkId).toString(16);
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: hexChainId }],
        });
        this.updateBalances();
    }

    /**
     * Send an allowance request for a specified index and amount
     * @param {String|Number} unformattedAmount - Non wei formatted amount
     * @returns {ethers.Transaction} - Ethers Tx -- can call wait() for mining
     */
    async sendAllowanceRequest(unformattedAmount) {
        return await this._try(async () => {
            let tx = await this._trySend("MadToken", "approve", [
                this.contracts["AToken"].address,
                ethers.utils.parseEther(unformattedAmount),
            ]);
            return tx;
        });
    }

    async sendStakingAllowanceRequest() {
        return await this._try(async () => {
            let tx = await this._trySend("AToken", "approve", [
                this.contracts["AToken"].address,
                ethers.BigNumber.from("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"),
            ]);
            return tx;
        });
    }

    async openStakingPosition(amount) {
        return await this._try(async () => {
            let tx = await this._trySend("PublicStaking", "mint", [ethers.utils.parseEther(amount)]);
            return tx;
        });
    }

    /**
     * Send a migration request transaction to the alca contract for the specified amount
     * @param {String|Number} unformattedAmount - Non wei formatted amount of mad token to migrate
     * @returns {ethers.Transaction} - Ethers Tx -- can call wait() for mining
     */
    async sendMigrateRequest(unformattedAmount) {
        return await this._try(async () => {
            let tx = await this._trySend("AToken", "migrate", [ethers.utils.parseEther(unformattedAmount)]);
            return tx;
        });
    }

    /**
     * Sign a simple string with this.signer
     * @param { String } message - The string to sign
     * @returns { String } -- Signed message
     */
    async signSimpleStringMessage(message) {
        this._requireSigner();
        return await this.signer.signMessage(message);
    }

    /**
     * Signs the bytes of message with this.signer -- Useful for signing hashes
     * @param { String } message - The string to sign
     * @returns { String } -- Signed message
     */
    async signBytes(message) {
        this._requireSigner();
        const msgBytes = ethers.utils.arrayify(message);
        return await this.signer.signMessage(msgBytes);
    }

    /**
     * Sends dispatch to update the connected addresses ethereum balance
     */
    async updateBalances() {
        store.dispatch(APPLICATION_ACTIONS.updateBalances(TOKEN_TYPES.ALL));
    }
}

let ethAdapter = new EthAdapter();
export default ethAdapter;
