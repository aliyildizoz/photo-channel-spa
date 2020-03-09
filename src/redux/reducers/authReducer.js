import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";


export default function authReducer(state = initialState.authState, action) {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN_RESPONSE:
            return { ...state, loginResult: action.payload }
        case actionTypes.AUTH_REGISTER_RESPONSE:
            return { ...state, registerResult: action.payload }
        case actionTypes.AUTH_STATE_CLEAR:
            return { loginResult: {}, registerResult: {}, logoutResult: {}, loggedUser: {} }
        case actionTypes.LOGGED_USER:
            return { ...state, loggedUser: action.payload }
        default:
            return state;
    }

}