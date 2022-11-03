import { combineReducers } from 'redux';
import applicationReducer from './application';
import ethAdapter from 'eth-adapter';
import { classInstanceReducer } from 'redux-class-watcher';


export const [ethAdapterReducer, ethAdapterEqualize] = classInstanceReducer(ethAdapter, "ethAdapter");

export default combineReducers({
    ethAdapter: ethAdapterReducer,
    application: applicationReducer,
})