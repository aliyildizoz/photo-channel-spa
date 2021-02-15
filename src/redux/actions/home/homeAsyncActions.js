import axios from "axios"
import { bindActionCreators } from "redux"
import { redirectErrPage } from "../../helpers/historyHelper"
import { authHeaderObj } from "../../helpers/localStorageHelper"
import { getFeedSuccess, getMostChannelsSuccess, getMostCommentsSuccess, getMostPhotosSuccess } from "./homeActionCreators"
import { getFeedUrl, getMostChannelsUrl, getMostCommentsUrl, getMostPhotosUrl } from "./homeEndPoints"


export function getFeedApi(callBack) {

    return async dispatch => {
        axios.get(getFeedUrl, {
            headers: authHeaderObj()
        }).then((res) => {
            dispatch(getFeedSuccess(res.data));
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => {
            if (!err.response) {
                return;
            }
            if (err.response.status === 401) {
                var getMostPhotos = bindActionCreators(getMostPhotosApi, dispatch);
                getMostPhotos();
                return;
            }
            redirectErrPage(err, dispatch)
        })

    }
}
export function getMostPhotosApi(callBack) {

    return async dispatch => {
        axios.get(getMostPhotosUrl).then((res) => {
            dispatch(getMostPhotosSuccess(res.data));
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => redirectErrPage(err, dispatch))

    }
}

export function getMostCommentsApi(callBack) {

    return async dispatch => {
        axios.get(getMostCommentsUrl).then((res) => {
            dispatch(getMostCommentsSuccess(res.data));
           
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => redirectErrPage(err, dispatch))

    }
}

export function getMostChannelsApi(callBack) {

    return async dispatch => {
        axios.get(getMostChannelsUrl).then((res) => {
            dispatch(getMostChannelsSuccess(res.data));
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => redirectErrPage(err, dispatch))

    }
}