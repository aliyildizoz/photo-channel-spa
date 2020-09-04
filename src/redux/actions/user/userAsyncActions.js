import { USER_FULL_PATH } from "../../constants/endPoints"
import axios from "axios"
import { bindActionCreators } from "redux";
import { currentUserSuccess, getUserChannelsSuccess, getSharedPhotosSuccess, getLikedPhotosSuccess, getSubscriptionsSuccess } from "./userActionsCreators";



export function getUserApi(id, history) {
    return async dispatch => {
        await axios.get(USER_FULL_PATH + "/" + id).then(res => {
            dispatch(currentUserSuccess(res.data))
            var getUserChannels = bindActionCreators(getUserChannelsApi, dispatch)
            getUserChannels(id, history);
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400 || err.response.status === 404) {
                history.push("/notfound")
            } else {
                history.push({
                    pathname: 'errorpage',
                    state: { message: err.response.data, status: err.response.status }
                })
            }
        })
    }
}
export function userUpdateApi(user, userId, history, setLoggedUser) {
    return async dispatch => {
        await axios.put(USER_FULL_PATH + "/" + userId, user).then(res => {
            console.log(setLoggedUser)
            setLoggedUser();
            history.push("/profile/" + userId)

        }).catch(err => {
            console.error(err)
            // if (err.response.status === 400) {
            //     dispatch(userUpdateResSuccess(err.response))
            // } else {
            //     history.push({
            //         pathname: '/rrorpage',
            //         state: { message: err.response.data, status: err.response.status }
            //     })
            // }
        })
    }
}
function getUserChannelsApi(userId, history) {
    return async dispatch => {
        await axios.get(USER_FULL_PATH + "/" + userId + "/channels").then(res => {
            dispatch(getUserChannelsSuccess(res.data));
            var getSharedPhotos = bindActionCreators(getSharedPhotosApi, dispatch)
            getSharedPhotos(userId, history);
        }).catch(err => {
            console.error(err)
            history.push({
                pathname: '/errorpage',
                state: { message: err.response.data, status: err.response.status }
            })
        })
    }
}
function getSharedPhotosApi(userId, history) {
    return async dispatch => {
        await axios.get(USER_FULL_PATH + "/" + userId + "/photos").then(res => {
            dispatch(getSharedPhotosSuccess(res.data));
            var getLikedPhotos = bindActionCreators(getLikedPhotosApi, dispatch)
            getLikedPhotos(userId, history);
        }).catch(err => {
            console.error(err)
            history.push({
                pathname: '/errorpage',
                state: { message: err.response.data, status: err.response.status }
            })
        })
    }
}
function getLikedPhotosApi(userId, history) {
    return async dispatch => {
        await axios.get(USER_FULL_PATH + "/" + userId + "/liked-photos").then(res => {
            dispatch(getLikedPhotosSuccess(res.data));
        }).catch(err => {
            console.error(err)
            history.push({
                pathname: '/errorpage',
                state: { message: err.response.data, status: err.response.status }
            })
        })
    }
}
export function getSubscriptionsApi(userId, history) {
    return async dispatch => {
        await axios.get(USER_FULL_PATH + "/" + userId + "/subscriptions").then(res => {
            dispatch(getSubscriptionsSuccess(res.data));
        }).catch(err => {
            console.error(err)
            history.push({
                pathname: '/errorpage',
                state: { message: err.response.data, status: err.response.status }
            })
        })
    }
}