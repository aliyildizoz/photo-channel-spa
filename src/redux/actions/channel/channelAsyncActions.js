import { getChannelPathById, getChannelCategoriesPath } from "../../actions/channel/channelEndPoints"
import { getChannelDetailSuccess, getChannelCategoriesSuccess } from "../../actions/channel/channelActionCreators"
import axios from "axios"
import { bindActionCreators } from "redux"
import { authHeaderObj } from "../../helpers/localStorageHelper"
import { redirectErrPage } from "../../helpers/historyHelper"
import { getPhotoGalleryPath } from "../photo/photoEndPoints"
import { getChannelSubscribersPath } from "../subscrib/subsEndPoints"
import { getSubscribersSuccess } from "../subscrib/subsActionCreators"

export function getChannelDetailApi(channelId, history) {
    return async dispatch => {
        await axios.get(getChannelPathById(channelId)).then(res => {
            dispatch(getChannelDetailSuccess(res.data))
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err)
        })
    }
}

export function getChannelCategoriesApi(channelId, history) {
    return async dispatch => {
        await axios.get(getChannelCategoriesPath(channelId)).then(res => {
            dispatch(getChannelCategoriesSuccess(res.data))
        }).catch(err => {
            console.log(err)
            redirectErrPage(history, err)
        })
    }
}


export function getSubscribersApi(channelId, history) {
    return async dispatch => {
        axios.get(getChannelSubscribersPath(channelId)).then(res => dispatch(getSubscribersSuccess(res.data))).catch(err => {
            console.log(err)
            redirectErrPage(history, err)
        });
    }
}



// export function channelUpdateApi(channel, channelId, history) {

//     return async dispatch => {
//         const fd = new FormData();
//         console.log(channel);
//         fd.append("file", channel.file);
//         fd.append("name", channel.name);
//         await axios.put(getChannelPathById(channelId), fd, {
//             headers: authHeaderObj()
//         }).catch(err => {
//             console.log(err)
//             if (err.response.status === 400) {
//                 dispatch(channelUpdateSuccess(err.response))
//             } else {
//                 redirectErrPage(history, err)
//             }
//         })
//     }
// }
//
// export function addChannelCategoriesApi(categoryIds, channelId, history) {
//     return async dispatch => {
//         await axios.post(CHANNEL_FULL_PATH + "/addchannelcategories", {
//             categoryIds, channelId
//         }).catch(err => {
//             console.log(err)
//             // history.push({
//             //     pathname: 'errorpage',
//             // state: { message: err.response.data, status: err.response.status }
//             // })
//         })
//     }
// }

// export function channelCreateApi(channel, history) {

//     return async dispatch => {
//         const fd = new FormData();
//         fd.append("file", channel.file);
//         fd.append("name", channel.name);
//         await axios.post(CHANNEL_PATH, fd, {
//             headers: authHeaderObj()
//         }).catch(err => {
//             console.log(err)
//             if (err.response.status === 400) {
//                 dispatch(channelCreateSuccess(err.response))
//             } else {
//                 redirectErrPage(history, err)
//             }
//         })
//     }
// }