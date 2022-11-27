/** @module rdux_application_reducer */

import { APPLICATION_ACTION_TYPES } from "redux/constants";

const initialApplicationState = {
    debugMode: false,
    landerModalOpen: false,
    initialLoadCompleted: false,
};

export default function applicationReducer(state = initialApplicationState, action) {
    switch (action.type) {
        case APPLICATION_ACTION_TYPES.SET_DEBUG_MODE:
            return Object.assign({}, state, {
                debugMode: action.payload,
            });

        case APPLICATION_ACTION_TYPES.SET_LANDER_MODAL_STATE:
            return Object.assign({}, state, {
                landerModalOpen: action.payload,
            });

        case APPLICATION_ACTION_TYPES.SET_INITIAL_LOAD_COMPLETE:
            return Object.assign({}, state, {
                initialLoadCompleted: true,
            });

        default:
            return state;
    }
}
