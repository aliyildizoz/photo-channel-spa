import * as actionTypes from "./actionTypes"
import { USER_FULL_PATH } from "../constants/endPoints"
import axios from "axios"

const currentUserSuccess = user => ({ type: actionTypes.CURRENT_USER, payload: user });

export function getUserApi(id, history) {
    return async dispatch => {
        await axios.get(USER_FULL_PATH + "/" + id).then(res => {
            dispatch(currentUserSuccess(res.data))
        }).catch(err => {
            console.log(err)
            // if (err.response.status === 400 || err.response.status === 404) {
            //     history.push("/notfound")
            // } else {
            //     history.push({
            //         pathname: 'errorpage',
            //         state: { message: err.response.data, status: err.response.status }
            //     })
            // }
        })
    }
}
export function userUpdateApi(user) {
    console.log(user);
    return async dispatch => {
        await axios.put(USER_FULL_PATH, user).then(res => {
            // dispatch(currentUserSuccess(res.data))

        }).catch(err => {
            console.log(err)
            // if (err.response.status === 400 || err.response.status === 404) {
            //     history.push("/notfound")
            // } else {
            //     history.push({
            //         pathname: 'errorpage',
            //         state: { message: err.response.data, status: err.response.status }
            //     })
            // }
        })
    }
}