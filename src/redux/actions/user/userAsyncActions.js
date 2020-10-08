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



export function getUserApi(userId, history) {

    return async (dispatch) => {
        await axios.get(getUserUrlById(userId)).
            then(res => {
                dispatch(getUserDetailSuccess(res.data));
            })
            .catch(err => redirectErrPage(history, err))
    }
}



// export function userUpdateApi(user, userId, history, setLoggedUser) {
//     return async dispatch => {
//         await axios.put(USER_FULL_PATH + "/" + userId, user).then(res => {
//             console.log(setLoggedUser)
//             setLoggedUser();
//             history.push("/profile/" + userId)

//         }).catch(err => {
//             console.error(err)
//             // if (err.response.status === 400) {
//             //     dispatch(userUpdateResSuccess(err.response))
//             // } else {
//             //     history.push({
//             //         pathname: '/rrorpage',
//             //         state: { message: err.response.data, status: err.response.status }
//             //     })
//             // }
//         })
//     }
// }




export function getLikedPhotosApi(userId, history) {
    return async dispatch => {
        await axios.get(getLikedPhotosUrl(userId)).
            then(res => dispatch(getLikedPhotosSuccess(res.data))).
            catch(err => redirectErrPage(err, history))
    }
}


export function getSubscriptionsApi(userId, history) {
    return async dispatch => {
        await axios.get(getSubscriptionsUrl(userId)).
            then(res => dispatch(getSubscriptionsSuccess(res.data))).
            catch(err => redirectErrPage(err, history))
    }
}

export function getUserCommentsPhotosApi(userId, history) {
    return async dispatch => {
        await axios.get(getUserCommentsPhotosUrl(userId)).
            then(res => dispatch(getUserCommentsPhotosSuccess(res.data))).
            catch(err => redirectErrPage(err, history))
    }
}