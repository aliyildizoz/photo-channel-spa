import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function userReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case actionTypes.CURRENT_USER:
            return { ...state, userDetail: action.payload };
        default:
            return state;
    }
}
