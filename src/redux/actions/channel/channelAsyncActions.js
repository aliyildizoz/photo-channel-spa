import { getChannelPathById, getChannelCategoriesPath, channelCategoriesPathById, getChannelIsOwnerPath, getUserChannelUrl } from "../../actions/channel/channelEndPoints"
import { getChannelDetailSuccess, getChannelCategoriesSuccess, getChannelIsOwnerSuccess ,channelIsLoadingFSuccess,channelIsLoadingTSuccess} from "../../actions/channel/channelActionCreators"
import axios from "axios"
import { bindActionCreators } from "redux"
import { authHeaderObj, isExistsToken } from "../../helpers/localStorageHelper"
import { redirectErrPage } from "../../helpers/historyHelper"
import { getPhotoGalleryPath } from "../photo/photoEndPoints"
import { getChannelSubscribersPath } from "../subscrib/subsEndPoints"
import { getSubscribersSuccess } from "../subscrib/subsActionCreators"
import { apiResponse, isLoadingFSuccess, isLoadingTSuccess } from "../common/commonActionsCreators"
import { getUserChannelsSuccess } from "../user/userActionsCreators"
import { isLoggedFSuccess, isLoggedTSuccess } from "../auth/authActionsCreators"

export function getChannelDetailApi(channelId, history,callBack) {
    return async dispatch => {
        await axios.get(getChannelPathById(channelId)).then(res => {
            dispatch(getChannelDetailSuccess(res.data))
        }).then(()=>{
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err)
        })
    }
}

export function getChannelCategoriesApi(channelId, history,callBack) {
    return async dispatch => {
        await axios.get(getChannelCategoriesPath(channelId)).then(res => {
            dispatch(getChannelCategoriesSuccess(res.data))
        }).then(()=>{
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err)
        })
    }
}

export function getSubscribersApi(channelId, history,callBack) {
    return async dispatch => {
        axios.get(getChannelSubscribersPath(channelId)).then(res => dispatch(getSubscribersSuccess(res.data))).then(()=>{
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err)
        });
    }
}

export function channelUpdateApi(channel, channelId, history) {

    return async dispatch => {
        const fd = new FormData();
        console.log(channel);
        fd.append("file", channel.file);
        fd.append("name", channel.name);
        await axios.put(getChannelPathById(channelId), fd, {
            headers: authHeaderObj()
        }).then(res => dispatch(getChannelDetailSuccess(res.data))).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                dispatch(apiResponse({ message: err.response.data, status: err.response.status }))
            } else {
                redirectErrPage(history, err)
            }
        })
    }
}

export function addChannelCategoriesApi(categories, channelId, history) {
    return async dispatch => {
        await axios.put(channelCategoriesPathById(channelId), { categoryIds: categories.map(c => c.id) }).
            then(() => {
                dispatch(getChannelCategoriesSuccess(categories));
                history.push("/channel/" + channelId);
            }).catch(err => {
                redirectErrPage(history, err);
            })
    }
}

export function getChannelIsOwnerApi(channelId, history) {
    return async dispatch => {
        dispatch(channelIsLoadingTSuccess())
        if (isExistsToken()) {
            await axios.get(getChannelIsOwnerPath(channelId), {
                headers: authHeaderObj()
            }).then(res => {
                dispatch(getChannelIsOwnerSuccess(res.data))
            }).then(() => dispatch(isLoadingFSuccess())).catch(err => {
                redirectErrPage(history, err);
            })
        }else{
            dispatch(channelIsLoadingFSuccess())
        }
    }
}

export function getUserChannelsApi(userId, history) {
    return async dispatch => {
        await axios.get(getUserChannelUrl(userId)).
            then(res => dispatch(getUserChannelsSuccess(res.data)))
            .catch(err => redirectErrPage(err, history))
    }
}