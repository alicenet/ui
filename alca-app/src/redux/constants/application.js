/** @module redux_application_constants */

/**
 * @enum {String} ApplicationActionType - Application Action Types -- Reducer State Constants
 * Used specifically within the application reducer's switch statement to determine what updates to state occur
 */
export const APPLICATION_ACTION_TYPES = {
    SET_ACTIVE_PAGE: "SET_ACTIVE_PAGE",
    SET_DEBUG_MODE: "SET_DEBUG_MODE",
    SET_LANDER_MODAL_STATE: "SET_LANDER_MODAL_STATE",
    SET_INITIAL_LOAD_COMPLETE: "SET_INITIAL_LOAD_COMPLETE",
};
