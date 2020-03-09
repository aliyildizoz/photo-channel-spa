import * as actionTypes from "./actionTypes"
import { PHOTO_FULL_PATH } from "../constants/endPoints"
import axios from "axios"

export function photoCreateApi(photo, history) {
    return async dispatch => {
        const fd = new FormData();
        fd.append("file", photo.file);
        fd.append("channelId", photo.channelId);
        await axios.post(PHOTO_FULL_PATH, fd, {
            withCredentials: true
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            // history.push({
            //     pathname: 'errorpage',
            // state: { message: err.response.data, status: err.response.status }
            // })
        })
    }
}