import * as actionTypes from "../../actions/auth/authActionTypes"
import initialState from "../initialState";

export default function currentUserReducer(state = initialState.currentUser, action) {
    switch (action.type) {
        case actionTypes.CURRENT_USER:
            return { ...state, detail: action.payload }
        case actionTypes.CURRENT_USER_F_LOADING:
            return { ...state, isLoading: false }
        case actionTypes.CURRENT_USER_T_LOADING:
            return { ...state, isLoading: true }
        case actionTypes.CURRENT_USER_CLEAR:
            return { isLoading: false, detail: {} }
        default:
            return state;
    }
}