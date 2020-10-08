import { PHOTO_API_URL, deletePhotoPath, getChannelPhotosPath, getUserPhotosUrl } from "../../actions/photo/photoEndPoints"
import { getChannelPhotosSuccess, getChannelGallerySuccess } from "../../actions/photo/photoActionCreators"
import axios from "axios"
import { redirectErrPage } from "../../helpers/historyHelper";
import { authHeaderObj } from "../../helpers/localStorageHelper";
import { getUserPhotosSuccess } from "../user/userActionsCreators";

export function photoCreateApi(photo, history) {
    return async dispatch => {
        console.log(photo)
        const fd = new FormData();
        fd.append("file", photo.file);
        fd.append("channelId", photo.channelId);
        await axios.post(PHOTO_API_URL, fd, {
            headers: authHeaderObj()
        }).then(() => {
            axios.get(getChannelPhotosPath(photo.channelId)).then(res => {
                dispatch(getChannelPhotosSuccess(res.data))
                var photos = []
                res.data.forEach(element => {
                    let width = randomIntFromInterval(3, 4)
                    let height = randomIntFromInterval(3, 4)
                    photos = [...photos, {
                        userid: element.userId,
                        sharedate: element.shareDate,
                        likecount: element.likeCount,
                        username: element.userName,
                        src: element.photoUrl,
                        width: width,
                        height: height
                    }]
                });
                dispatch(getChannelGallerySuccess(photos))
            }).catch(err => {
                console.log(err)
                redirectErrPage(history, err);
            })
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err);
        })
    }
}

export function photoDeleteApi(photoId, history) {
    return async dispatch => {
        await axios.delete(deletePhotoPath(photoId), {
            headers: authHeaderObj()
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err);
        })
    }
}

export function channelPhotosApi(channelId, history) {
    return async dispatch => {
        await axios.get(getChannelPhotosPath(channelId)).
            then(res => {

                dispatch(getChannelPhotosSuccess(res.data))
                var photos = []
                res.data.forEach(element => {
                    let width = randomIntFromInterval(3, 4)
                    let height = randomIntFromInterval(3, 4)
                    photos = [...photos, {
                        userid: element.userId,
                        sharedate: element.shareDate,
                        likecount: element.likeCount,
                        username: element.userName,
                        src: element.photoUrl,
                        width: width,
                        height: height
                    }]
                });
                dispatch(getChannelGallerySuccess(photos))
            }).catch(err => redirectErrPage(history, err))
    }
}
export function getUserPhotosApi(userId, history) {
    return async dispatch => {
        await axios.get(getUserPhotosUrl(userId)).
            then(res => dispatch(getUserPhotosSuccess(res.data))).
            catch(err => redirectErrPage(err, history))
    }
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}