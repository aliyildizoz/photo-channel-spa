import * as actionTypes from "../actionTypes"
import { API_URL } from "../../actions/photo/photoEndPoints"
import axios from "axios"

export function photoCreateApi(photo, history) {
    return async dispatch => {
        const fd = new FormData();
        fd.append("file", photo.file);
        fd.append("channelId", photo.channelId);
        await axios.post(API_URL, fd, {
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