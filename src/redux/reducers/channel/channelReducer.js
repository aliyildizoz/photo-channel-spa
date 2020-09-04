import * as actionTypes from "../../actions/channel/channelActionTypes"
import initialState from "../initialState"
export default function channelReducer(state = initialState.currentChannel, action) {

    switch (action.type) {
        case actionTypes.GET_CHANNEL_DETAIL:
            return { ...state, channelDetail: action.payload };
        case actionTypes.GET_CHANNEL_CATEGORIES:
            return { ...state, categories: action.payload };
        case actionTypes.GET_CHANNEL_PHOTOS:
            return { ...state, channelPhotos: action.payload };
        case actionTypes.GET_CHANNEL_PHOTO_GALLERY:
            return { ...state, photoGallery: action.payload };
        case actionTypes.GET_SUBSCRIBERS:
            return { ...state, subscribers: action.payload };
        default:
            return state;
    }
}