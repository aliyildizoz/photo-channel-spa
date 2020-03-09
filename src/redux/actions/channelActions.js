import * as actionTypes from "./actionTypes"
import { CHANNEL_FULL_PATH } from "../constants/endPoints"
import axios from "axios"

const channelCreateSuccess = channel => ({ type: actionTypes.CHANNEL_CREATE, payload: channel })
const getChannelPhotosSuccess = photos => ({ type: actionTypes.GET_CATEGORIES_SUCCESS, payload: photos })
const getChannelSubscribersSuccess = subs => ({ type: actionTypes.GET_CHANNEL_SUBSCRIBERS, payload: subs })

export function channelCreateApi(channel, history) {

    return async dispatch => {
        const fd = new FormData();
        fd.append("file", channel.file);
        fd.append("name", channel.name);
        await axios.post(CHANNEL_FULL_PATH + "/create", fd, {
            withCredentials: true
        }).then(res => {
            console.log(res)
            dispatch(channelCreateSuccess(res.data))
        }).catch(err => {
            console.log(err)
            // history.push({
            //     pathname: 'errorpage',
            // state: { message: err.response.data, status: err.response.status }
            // })
        })
    }
}
export function getChannelPhotosApi(channelId) {
    return async dispatch => {
        await axios.get(CHANNEL_FULL_PATH + "/" + channelId).then(res => {
            dispatch(getChannelPhotosSuccess(res.data))
        })
    }
}
export function getChannelApi(channelId) {
    return async dispatch => {
        await axios.get(CHANNEL_FULL_PATH + "/" + channelId + "/photos").then(res => {
            dispatch(getChannelPhotosSuccess(res.data))
        })
    }
}
export function getChannelSubscribers(channelId) {
    return async dispatch => {
        await axios.get(CHANNEL_FULL_PATH + "/" + channelId + "/subscribers").then(res => {
            dispatch(getChannelSubscribersSuccess(res.data))
        })
    }
}

