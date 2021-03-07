import { LOGIN_PATH, REGISTER_PATH, LOGOUT_PATH, CURRENT_USER_PATH, REFRESH_TOKEN } from "./authEndPoints"
import axios from "axios"
import * as localStorageHelper from "../../helpers/localStorageHelper"
import * as commonActionsCreators from "../common/commonActionsCreators"
import * as authActionsCreators from "../auth/authActionsCreators"
import { isLoadingTSuccess, isLoadingFSuccess } from "../common/commonActionsCreators"
import { bindActionCreators } from "redux";
import { redirectErrPage } from "../../helpers/historyHelper"
import { push } from 'connected-react-router'
import { feedType } from "../../constants/constants"
import { getFeedApi } from "../../actions/home/homeAsyncActions"


export function loginApi(user) {
    return async dispatch => {
        await axios.post(LOGIN_PATH, user).then(res => {
            localStorageHelper.setToken(res.data)
            var getCurrentUser = bindActionCreators(getCurrentUserApi, dispatch)
            getCurrentUser()
            dispatch(push("/"))
        }).catch(err => {
            console.log(err.response)
            if (err.response === undefined) {
                redirectErrPage(err, dispatch);
                return;
            }
            if (err.response.status === 400) {
                dispatch(commonActionsCreators.apiResponse({ message: err.response.data, status: err.response.data }))
            } else {
                redirectErrPage(err, dispatch)
            }
        })
    }
}

export function logoutApi() {
    return async dispatch => {
        await axios.get(LOGOUT_PATH, {
            headers: {
                authorization: localStorageHelper.getJwtToken()
            }
        }).then(() => {
            localStorageHelper.removeToken();
            dispatch(authActionsCreators.isLoggedFSuccess());
            var getFeed = bindActionCreators(getFeedApi, dispatch);
            getFeed(feedType.MostPhotos);
        }).then(() => dispatch(authActionsCreators.currentUserClearSuccess())).catch(err => redirectErrPage(err, dispatch))

    }
}

export function registerApi(user) {
    return async dispatch => {
        await axios.post(REGISTER_PATH, user).then(res => {
            localStorageHelper.setToken(res.data)
            dispatch(authActionsCreators.isLoggedTSuccess())
            dispatch(push("/"))
        }).catch(err => {
            console.log(err.response)
            if (err.response === undefined) {
                redirectErrPage(err, dispatch);
                return;
            }
            if (err.response.status === 400) {
                dispatch(commonActionsCreators.apiResponse({ message: err.response.data, status: err.response.data }))
            } else {
                redirectErrPage(err, dispatch)
            }
        })
    }
}

export function getCurrentUserApi() {
    return async (dispatch, getState) => {
        dispatch(authActionsCreators.currentUserIsLoadingTSuccess());
        if (localStorageHelper.isExistsToken()) {
            console.log("object");

            if (Object.keys(getState().currentUserReducer.detail).length === 0) {
                await axios.get(CURRENT_USER_PATH, {
                    headers: localStorageHelper.authHeaderObj()
                }).then(res => {
                    dispatch(authActionsCreators.currentUserSuccess(res.data))
                }).then(() => {
                    dispatch(authActionsCreators.isLoggedTSuccess())
                }).then(() => {
                    dispatch(authActionsCreators.currentUserIsLoadingFSuccess());
                }).catch(err => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            var refreshToken = bindActionCreators(refreshTokenApi, dispatch)
                            refreshToken();
                        }
                    }
                })
            }
        }
        dispatch(authActionsCreators.currentUserIsLoadingFSuccess());
    }
}

function refreshTokenApi() {

    return async dispatch => {
        await axios.get(REFRESH_TOKEN, {
            headers: {
                refreshToken: localStorageHelper.getRefreshToken()
            }
        }).then(res => {
            localStorageHelper.setToken(res.data)
            var getCurrentUser = bindActionCreators(getCurrentUserApi, dispatch)
            getCurrentUser();
        }).catch(err => {
            if (err?.response?.status === 400) {
                localStorageHelper.removeToken();
                dispatch(authActionsCreators.isLoggedFSuccess())
                return;
            }
            redirectErrPage(err, dispatch)
        });
    }
}