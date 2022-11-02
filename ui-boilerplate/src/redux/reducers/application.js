/** @module rdux_application_reducer */

import { APPLICATION_ACTION_TYPES } from "redux/constants";

const initialApplicationState = {
    debugMode: false,
    activePage: "HOME",
};

export default function applicationReducer(state = initialApplicationState, action) {
    switch (action.type) {

        case APPLICATION_ACTION_TYPES.SET_DEBUG_MODE:
            return Object.assign({}, state, {
                debugMode: action.payload
            });

        case APPLICATION_ACTION_TYPES.SET_ACTIVE_PAGE:
            return Object.assign({}, state, {
                activePage: action.payload
            });

        default:
            return state;

    }
};