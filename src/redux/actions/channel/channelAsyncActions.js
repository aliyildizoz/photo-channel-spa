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
import { push } from 'connected-react-router'

export function getChannelDetailApi(channelId, callBack) {
    return async dispatch => {
        await axios.get(getChannelPathById(channelId)).then(res => {
            dispatch(getChannelDetailSuccess(res.data))
        }).then(()=>{
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch(err => {
            console.log("cas")
            redirectErrPage(err,dispatch)
        })
    }
}

export function getChannelCategoriesApi(channelId, callBack) {
    return async dispatch => {
        await axios.get(getChannelCategoriesPath(channelId)).then(res => {
            dispatch(getChannelCategoriesSuccess(res.data))
        }).then(()=>{
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch(err => {
            console.log(err)
            redirectErrPage(err,dispatch)
        })
    }
}

export function getSubscribersApi(channelId, callBack) {
    return async dispatch => {
        axios.get(getChannelSubscribersPath(channelId)).then(res => dispatch(getSubscribersSuccess(res.data))).then(()=>{
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch(err => {
            console.log(err)
            redirectErrPage(err,dispatch)
        });
    }
}

export function channelUpdateApi(channel, channelId) {

    return async dispatch => {
        const fd = new FormData();
        fd.append("file", channel.file);
        fd.append("name", channel.name);
        await axios.put(getChannelPathById(channelId), fd, {
            headers: authHeaderObj()
        }).then(res => dispatch(getChannelDetailSuccess(res.data))).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                dispatch(apiResponse({ message: err.response.data, status: err.response.status }))
            } else {
                redirectErrPage(err,dispatch)
            }
        })
    }
}

export function addChannelCategoriesApi(categories, channelId) {
    return async dispatch => {
        await axios.put(channelCategoriesPathById(channelId), { categoryIds: categories.map(c => c.id) }).
            then(() => {
                dispatch(getChannelCategoriesSuccess(categories));
                dispatch(push("/channel/" + channelId));
            }).catch(err => {
                redirectErrPage(err,dispatch);
            })
    }
}

export function getChannelIsOwnerApi(channelId) {
    return async dispatch => {
        dispatch(channelIsLoadingTSuccess())
        if (isExistsToken()) {
            await axios.get(getChannelIsOwnerPath(channelId), {
                headers: authHeaderObj()
            }).then(res => {
                dispatch(getChannelIsOwnerSuccess(res.data))
                dispatch(channelIsLoadingFSuccess())
            }).then(() => dispatch(isLoadingFSuccess())).catch(err => {
                redirectErrPage(err,dispatch);
            })
        }else{
            dispatch(channelIsLoadingFSuccess())
            dispatch(getChannelIsOwnerSuccess(false))
        }
    }
}

export function getUserChannelsApi(userId) {
    return async dispatch => {
        await axios.get(getUserChannelUrl(userId)).
            then(res => dispatch(getUserChannelsSuccess(res.data)))
            .catch(err => redirectErrPage(err, dispatch))
    }
}