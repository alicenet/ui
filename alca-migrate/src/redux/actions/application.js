import { METAMASK_NETWORKS } from "config";
import ethAdapter from "eth/ethAdapter";
import { APPLICATION_ACTION_TYPES, TOKEN_TYPES } from "redux/constants";
import { toast } from "react-toastify";

/**
 * Set UI state for if a web3Wallet is connected
 * @param {Boolean} isConnected - Is the web3 wallet connected?
 * @returns
 */
export const setWeb3Connected = (isConnected) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_WEB3_CONNECTED, payload: isConnected });
    };
};

/**
 * Set the state for if a web3Wallet connection is pending
 * @param {Boolean} busyState - Boolean if web3 is currently attempting to connect
 * @returns
 */
export const setWeb3Connecting = (busyState) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_WEB3_CONNECTING, payload: busyState });
    };
};

/**
 * Set the currently connected address to redux state
 * @param { String } address - Address to set to state
 * @returns
 */
export const setConnectedAddress = (address) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_CONNECTED_ADDRESS, payload: address });
    };
};

/**
 * Updates current network state by ID -- Will determine name relative to ID
 * @param { String } networkId - Network ID to set to state
 * @returns
 */
export const updateNetwork = (networkId) => {
    // Get network name from network key -- Shouldn't fail but try/catch in case it does
    let networkName;
    try {
        networkName = Object.keys(METAMASK_NETWORKS).map((key) => {
            if (METAMASK_NETWORKS[key].id === networkId) {
                return METAMASK_NETWORKS[key].name;
            }
            throw new Error("Cannot determine network name");
        })[0];
    } catch (ex) {
        console.warn("Unable to determine network name:", ex);
    }
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.UPDATE_NETWORK, payload: { name: networkName, id: networkId } });
    };
};

/**
 * Set balance by accepted tokenType
 * @param {String} balance - String of current balance for tokenType
 * @param {TokenType} tokenType - Token type to set balance for
 * @returns
 */
export const setBalance = (balance, tokenType) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_BALANCES, payload: { balance: balance, token: tokenType } });
    };
};

/**
 * Toggle the tx pending status for application actions
 * @param {ActionType} action - Action to toggle the tx status for
 * @returns
 */
export const toggleTxPendingStatus = (action) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.TOGGLE_TX_PENDING_STATUS, payload: action });
    };
};

/**
 * Request and update balance state for requested token type
 * @param {TokenType} tokenType
 * @returns
 */
export const updateBalances = (tokenType) => {
    return async function (dispatch, getState) {
        let state = getState();
        let ethBalance = state.application.balances.ethereum;
        let madBal = state.application.balances.mad;
        let madAllowance = state.application.allowances.mad;
        let alcaBal = state.application.balances.alca;

        if (tokenType === TOKEN_TYPES.ETHEREUM || tokenType === TOKEN_TYPES.ALL) {
            ethBalance = await ethAdapter.getEthereumBalance(0);
        }
        if (tokenType === TOKEN_TYPES.MADTOKEN || tokenType === TOKEN_TYPES.ALL) {
            madBal = await ethAdapter.getMadTokenBalance(0);
            madAllowance = await ethAdapter.getMadTokenAllowance(0);
        }
        if (tokenType === TOKEN_TYPES.ALCA || tokenType === TOKEN_TYPES.ALL) {
            alcaBal = await ethAdapter.getAlcaBalance(0);
        }

        if (ethBalance.error) {
            toast("Error fetching ETH balance.", { type: "error", position: "bottom-center", autoClose: 1000 });
        }

        if (madBal.error || madAllowance.error) {
            console.log(madBal.error, madAllowance.error);
            toast("Error fetching MAD balance.", { type: "error", position: "bottom-center", autoClose: 1000 });
        }

        if (alcaBal.error) {
            toast("Error fetching ALCA balance.", { type: "error", position: "bottom-center", autoClose: 1000 });
        }

        if (ethBalance.error || madBal.error || madAllowance.error || alcaBal.error) {
            console.error("Contract error, check if you are on the correct network or your Factory Address is valid.");
            return;
        }

        dispatch({
            type: APPLICATION_ACTION_TYPES.SET_BALANCES,
            payload: {
                ethereum: ethBalance,
                mad: madBal || 0, // Fallback to 0 if token doesn't exist on network
                alca: alcaBal || 0, // Fallback to 0 if token doesn't exist on network
            },
        });
        dispatch({
            type: APPLICATION_ACTION_TYPES.SET_ALLOWANCES,
            payload: {
                mad: madAllowance ? madAllowance : "0", // Fallback to 0 if token doesn't exist on network
                alcaStakeAllowance: "0",
            },
        });
    };
};

export const updateExchangeRate = (madTokenAmt) => {
    return async function (dispatch) {
        let exchangeRate = await ethAdapter.getMadTokenToALCAExchangeRate(madTokenAmt);
        if (exchangeRate.error) {
            toast("Error fetching ALCA exchange rate.", { type: "error", position: "bottom-center", autoClose: 1000 });
            return;
        }
        dispatch({
            type: APPLICATION_ACTION_TYPES.UPDATE_EXCHANGE_RATE,
            payload: exchangeRate,
        });
    };
};

export const checkAgreeCookieState = (agreeCookie) => {
    return async function (dispatch) {
        if (agreeCookie.agreed === "true") {
            dispatch({
                type: APPLICATION_ACTION_TYPES.UPDATE_HAS_READ_TERMS,
                payload: true,
            });
        } else {
            dispatch({
                type: APPLICATION_ACTION_TYPES.UPDATE_HAS_READ_TERMS,
                payload: false,
            });
        }
    };
};

export const setAgreeStateTrue = () => {
    return async function (dispatch) {
        dispatch({ type: APPLICATION_ACTION_TYPES.UPDATE_HAS_READ_TERMS, payload: true });
    };
};

export const updateApprovalHash = (txHash) => {
    return async function (dispatch) {
        dispatch({
            type: APPLICATION_ACTION_TYPES.SET_APPROVAL_HASH,
            payload: txHash,
        });
    };
};

export const updateMigrationHash = (txHash) => {
    return async function (dispatch) {
        dispatch({
            type: APPLICATION_ACTION_TYPES.SET_MIGRATION_HASH,
            payload: txHash,
        });
    };
};

export const updateStartingBalances = (sMad, sAlca) => {
    return async function (dispatch, getState) {
        let state = getState();
        let startingMad = state.application.startingBalances.mad;
        let startingAlca = state.application.startingBalances.alca;
        dispatch({
            type: APPLICATION_ACTION_TYPES.UPDATE_STARTING_BALANCES,
            payload: {
                mad: sMad || startingMad,
                alca: sAlca || startingAlca,
            },
        });
    };
};

export const updateMigrationAmount = (migrationAmount) => {
    return async function (dispatch) {
        dispatch({ type: APPLICATION_ACTION_TYPES.UPDATE_MIGRATION_AMOUNT, payload: migrationAmount });
    };
};
