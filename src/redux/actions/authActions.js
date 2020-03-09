import * as actionTypes from "./actionTypes"
import { LOGIN_FULL_PATH, REGISTER_FULL_PATH, LOGOUT_FULL_PATH ,LOGGED_USER_FULL_PATH} from "../constants/endPoints"
import axios from "axios"
import * as localStorageHelper from "../helpers/localStorageHelper"

const loginRes = res => ({ type: actionTypes.AUTH_LOGIN_RESPONSE, payload: res });
const registerRes = res => ({ type: actionTypes.AUTH_REGISTER_RESPONSE, payload: res });
export const authStateClearSuccess = () => ({ type: actionTypes.AUTH_STATE_CLEAR });
const loggedUserSuccess = user => ({ type: actionTypes.LOGGED_USER, payload: user });

export function loginApi(user, history) {
    return async dispatch => {
        await axios.post(LOGIN_FULL_PATH, user, {
            withCredentials: true
        }).then(async res => {
            localStorageHelper.setToken(res.data)
            history.push("/")
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                dispatch(loginRes(err.response))
            } else {
                history.push({
                    pathname: 'errorpage',
                    state: { message: err.response.data, status: err.response.status }
                })
            }
        })
    }
}

export function logoutApi(history) {
    return async dispatch => {
        await axios.get(LOGOUT_FULL_PATH, {
            withCredentials: true
        }).then(res => {
            localStorageHelper.removeToken()
            dispatch(authStateClearSuccess())
        }).catch(err => {
            history.push({
                pathname: '/errorpage',
                state: { message: err.response.data, status: err.response.status }
            })
        })
    }
}

export function registerApi(user, history) {
    return async dispatch => {
        await axios.post(REGISTER_FULL_PATH, user, {
            withCredentials: true
        }).then(res => {
            localStorageHelper.setToken(res.data)
            history.push("/")
        }).catch(err => {
            if (err.response.status === 400) {
                dispatch(registerRes(err.response))
            } else {
                history.push({
                    pathname: 'errorpage',
                    state: { message: err.response.data, status: err.response.status }
                })
            }
        })
    }
}

export function getLoggedUserApi() {
    return async dispatch => {
        await axios.get(LOGGED_USER_FULL_PATH, {
            withCredentials: true
        }).then(res => {
            dispatch(loggedUserSuccess(res.data))
        })
    }
}