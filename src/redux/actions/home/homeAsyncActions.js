import axios from "axios"
import { bindActionCreators } from "redux"
import { redirectErrPage } from "../../helpers/historyHelper"
import { authHeaderObj } from "../../helpers/localStorageHelper"
import { getFeedSuccess, getMostChannelsSuccess, getMostCommentsSuccess, getMostPhotosSuccess } from "./homeActionCreators"
import { getFeedUrl, getMostChannelsUrl, getMostCommentsUrl, getMostPhotosUrl } from "./homeEndPoints"
import * as localStorageHelper from "../../helpers/localStorageHelper"
import { feedType } from '../../constants/constants'


export function getFeedApi(feedState, callBack) {

    return async (dispatch, getState) => {
        var getFeed;

        switch (feedState) {
            case feedType.Feed:
                if (localStorageHelper.isExistsToken() || Object.keys(getState().currentUserReducer.detail).length === 0) {
                    getFeed = bindActionCreators(getUserFeedApi, dispatch);
                } else {
                    getFeed = bindActionCreators(getFeedApi, dispatch);
                    await getFeed(feedType.MostPhotos,callBack);
                }
                break;
            case feedType.MostPhotos:
                getFeed = bindActionCreators(getMostPhotosApi, dispatch);
                break;
            case feedType.MostComments:
                getFeed = bindActionCreators(getMostCommentsApi, dispatch);
                break;
            default:
                getFeed = bindActionCreators(getUserFeedApi, dispatch);
                break;
        }

        await getFeed(callBack);
    }
}
export function getMostPhotosApi(callBack) {

    return async dispatch => {
        axios.get(getMostPhotosUrl).then((res) => {
            dispatch(getFeedSuccess(res.data));
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => redirectErrPage(err, dispatch))

    }
}
export function getUserFeedApi(callBack) {

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
export function getMostCommentsApi(callBack) {

    return async dispatch => {
        axios.get(getMostCommentsUrl).then((res) => {
            dispatch(getFeedSuccess(res.data));

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