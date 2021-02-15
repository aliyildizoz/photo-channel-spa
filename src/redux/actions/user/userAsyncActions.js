import { getUserUrlById } from "./userEndPoints"
import axios from "axios"
import { bindActionCreators } from "redux";
import { getLikedPhotosSuccess, getSubscriptionsSuccess, getUserDetailSuccess, getUserCommentsPhotosSuccess } from "./userActionsCreators";
import { redirectErrPage } from "../../helpers/historyHelper";
import { getUserPhotosUrl } from "../photo/photoEndPoints";
import { getSubscriptionsUrl } from "../subscrib/subsEndPoints";
import { getUserCommentsPhotosUrl } from "../comment/commentEndPoints";
import { getLikedPhotosUrl } from "../like/likeEndPoints";
import { isLoadingTSuccess } from "../common/commonActionsCreators";



export function getUserApi(userId, callBack) {

    return async (dispatch) => {
        await axios.get(getUserUrlById(userId)).
            then(res => {
                dispatch(getUserDetailSuccess(res.data));
            }).then(()=>{
                if (typeof callBack == "function") {
                    callBack()
                }
            })
            .catch(err => redirectErrPage(err,dispatch))
    }
}


export function getLikedPhotosApi(userId,  callBack) {
    return async dispatch => {
        await axios.get(getLikedPhotosUrl(userId)).
            then(res => dispatch(getLikedPhotosSuccess(res.data))).then(() => {
                if (typeof callBack == "function") {
                    callBack()
                }
            }).catch(err => redirectErrPage(err, dispatch))
    }
}


export function getSubscriptionsApi(userId,  callBack) {
    return async dispatch => {
        await axios.get(getSubscriptionsUrl(userId)).
            then(res => dispatch(getSubscriptionsSuccess(res.data))).then(() => {
                if (typeof callBack == "function") {
                    callBack()
                }
            }).catch (err => redirectErrPage(err, dispatch))
    }
}

export function getUserCommentsPhotosApi(userId,  callBack) {
    return async dispatch => {
        await axios.get(getUserCommentsPhotosUrl(userId)).
            then(res => dispatch(getUserCommentsPhotosSuccess(res.data))).then(() => {
                if (typeof callBack == "function") {
                    callBack()
                }
            }).catch(err => redirectErrPage(err, dispatch))
    }
}