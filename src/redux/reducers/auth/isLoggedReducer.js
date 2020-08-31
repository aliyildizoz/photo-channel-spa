import * as actionTypes from "../../actions/auth/authActionTypes"
import initialState from "../initialState";

export default function isLoggedReducer(state = initialState.isLogged, action) {
    switch (action.type) {
        case actionTypes.IS_LOGGED_T:
            return true;
        case actionTypes.IS_LOGGED_F:
            return false;
        default:
            return state;
    }
}