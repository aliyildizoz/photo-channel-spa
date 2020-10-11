import * as actionTypes from "../../actions/auth/authActionTypes"
import initialState from "../initialState";

export default function currentUserReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case actionTypes.CURRENT_USER:
            return { ...state, ...action.payload }
        case actionTypes.CURRENT_USER_F_LOADING:
            return { ...state, currentUserIsLoading: false }
        case actionTypes.CURRENT_USER_T_LOADING:
            return { ...state, currentUserIsLoading: true }
        case actionTypes.CURRENT_USER_CLEAR:
            return {}
        default:
            return state;
    }
}