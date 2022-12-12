/** @module application_actions */

import { APPLICATION_ACTION_TYPES } from "redux/constants";

/**
 * Set the current state for debugMode
 * @param { Boolean } debugMode - State to set for debugMode
 * @returns { Function } - Redux-Thunk function to call within dispatch
 */
export const setDebugMode = (debugMode) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_DEBUG_MODE, payload: debugMode });
    };
};

/**
 *
 * @param { String } page - Page Name from const/PAGE_NAMES to set as active display page
 * @returns
 */
export const setActivePage = (page) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_ACTIVE_PAGE, payload: page });
    };
};

/**
 * Set the help modal state
 * @param { Boolean } state - Should the modal be open
 * @returns
 */
export const setLanderModalOpenState = (state) => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_LANDER_MODAL_STATE, payload: state });
    };
};

export const setInitialLoadCompleted = () => {
    return (dispatch) => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_INITIAL_LOAD_COMPLETE });
    };
};
