import * as actionTypes from "../../actions/actionTypes"
import initialState from "../initialState"

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case actionTypes.CURRENT_USER:
            return { ...state, userDetail: action.payload };
        case actionTypes.GET_USER_CHANNELS:
            return { ...state, channels: action.payload };
        case actionTypes.GET_SUBSCRIPTIONS:
            return { ...state, subscriptions: action.payload };
        case actionTypes.GET_SHARED_PHOTOS:
            return { ...state, sharedPhotos: action.payload };
        case actionTypes.GET_LIKED_PHOTOS:
            return { ...state, likedPhotos: action.payload };
        default:
            return state;
    }
}
