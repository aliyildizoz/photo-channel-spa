import * as actionTypes from "../../actions/user/userActionTypes"
import initialState from "../initialState"

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case actionTypes.GET_USER_DETAIL:
            return { ...state, userDetail: action.payload };
        case actionTypes.GET_USER_CHANNELS:
            return { ...state, userChannels: action.payload };
        case actionTypes.GET_SUBSCRIPTIONS:
            return { ...state, subscriptions: action.payload };
        case actionTypes.GET_USER_PHOTOS:
            return { ...state, userPhotos: action.payload };
        case actionTypes.GET_LIKED_PHOTOS:
            return { ...state, likedPhotos: action.payload };
        case actionTypes.GET_USER_COMMENTS_PHOTOS:
            return { ...state, commentsPhotos: action.payload };
        case actionTypes.GET_USER_IS_OWNER:
            return { ...state, isOwner: action.payload };
            default:
            return state;
    }
}
