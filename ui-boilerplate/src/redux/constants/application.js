/** @module redux_application_constants */

/**
 * @enum {String} ApplicationActionType - Application Action Types -- Reducer State Constants
 * Used specifically within the application reducer's switch statement to determine what updates to state occur 
 */
export const APPLICATION_ACTION_TYPES = {
    SET_ACTIVE_PAGE: "SET_ACTIVE_PAGE",
    SET_DEBUG_MODE: "SET_DEBUG_MODE",
};

/**
 * @enum {String} Application Pages
 * Used specifically within the application reducer to determine what page to display 
 */
export const PAGE_NAMES = {
    CONTRACT_TEST: "CONTRACT_TEST",
    HOME: "HOME",
    PAGE_ONE: "PAGE_ONE",
    PAGE_TWO: "PAGE_TWO",
    PAGE_THREE: "PAGE_THREE"
}