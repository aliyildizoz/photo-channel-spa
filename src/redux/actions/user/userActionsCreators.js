import * as actionTypes from "../user/userActionTypes"

export const getUserDetailSuccess = user => ({ type: actionTypes.GET_USER_DETAIL, payload: user });
export const getUserChannelsSuccess = channels => ({ type: actionTypes.GET_USER_CHANNELS, payload: channels });
export const getSubscriptionsSuccess = channels => ({ type: actionTypes.GET_SUBSCRIPTIONS, payload: channels });
export const getSharedPhotosSuccess = photos => ({ type: actionTypes.GET_SHARED_PHOTOS, payload: photos });
export const getLikedPhotosSuccess = photos => ({ type: actionTypes.GET_LIKED_PHOTOS, payload: photos });