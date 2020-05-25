import { combineReducers } from "redux";
import lanthReducers from './lanthReducers'
import lanenReducers from './lanenReducers'
import latlnggetReducers from './latlnggetReducers'

export default combineReducers({
    lanthReducers,
    lanenReducers,
    latlnggetReducers
});
