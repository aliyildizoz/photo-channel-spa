import * as actionTypes from "../../actions/auth/authActionTypes"
import initialState from "../initialState";

export default function currentUserReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case actionTypes.CURRENT_USER:
            return action.payload
        case actionTypes.CURRENT_USER_CLEAR:
            return {}
        default:
            return state;
    }
}