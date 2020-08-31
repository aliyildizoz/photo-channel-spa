import { LOGIN_PATH, REGISTER_PATH, LOGOUT_PATH, CURRENT_USER_PATH, REFRESH_TOKEN } from "./authEndPoints"
import axios from "axios"
import * as localStorageHelper from "../../helpers/localStorageHelper"
import * as commonActionsCreators from "../common/commonActionsCreators"
import * as authActionsCreators from "../auth/authActionsCreators"
import { bindActionCreators } from "redux";


export function loginApi(user, history) {
    return async dispatch => {
        await axios.post(LOGIN_PATH, user).then(async res => {
            localStorageHelper.setToken(res.data)
            dispatch(authActionsCreators.isLoggedTSuccess())
            history.push("/")

        }).catch(err => {
            console.log(err.response)
            if (err.response.status === 400) {
                dispatch(commonActionsCreators.apiResponse({ message: err.response.data, status: err.response.data }))
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
        await axios.get(LOGOUT_PATH, {
            headers: {
                authorization: localStorageHelper.getJwtToken()
            }
        }).then(res => {
            localStorageHelper.removeToken()
            dispatch(authActionsCreators.isLoggedFSuccess())
            dispatch(authActionsCreators.currentUserClearSuccess())
        }).catch(err => {
            history.push({
                pathname: '/errorpage',
                state: { message: err.response.data, status: err.response.status }
            })
        })
    }
}

// export function registerApi(user, history) {
//     return async dispatch => {
//         await axios.post(REGISTER_PATH, user, {
//             withCredentials: true
//         }).then(res => {
//             localStorageHelper.setToken(res.data)
//             history.push("/")
//         }).catch(err => {
//             if (err.response.status === 400) {
//                 dispatch(authActions.registerSuccess(err.response))
//             } else {
//                 history.push({
//                     pathname: 'errorpage',
//                     state: { message: err.response.data, status: err.response.status }
//                 })
//             }
//         })
//     }
// }

export function getCurrentUserApi() {
    return async dispatch => {
        await axios.get(CURRENT_USER_PATH, {
            headers: {
                authorization: localStorageHelper.getJwtToken(),
                refreshToken: localStorageHelper.getRefreshToken()
            }
        }).then(res => {
            dispatch(authActionsCreators.currentUserSuccess(res.data))
            dispatch(authActionsCreators.isLoggedTSuccess())
        }).catch(err => {
            if (err.response.status === 401) {
                var refreshToken = bindActionCreators(refreshTokenApi, dispatch)
                refreshToken();
            }
        })
    }
}

function refreshTokenApi() {

    return async dispatch => {
        await axios.get(REFRESH_TOKEN, {
            headers: {
                refreshToken: localStorageHelper.getRefreshToken()
            }
        }).then(async res => {
            localStorageHelper.setToken(res.data)
            dispatch(authActionsCreators.isLoggedTSuccess())
        });
    }
}