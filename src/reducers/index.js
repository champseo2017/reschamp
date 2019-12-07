import { combineReducers } from "redux";
import lanthReducers from './lanthReducers'
import lanenReducers from './lanenReducers'

export default combineReducers({
    lanthReducers,
    lanenReducers
});
