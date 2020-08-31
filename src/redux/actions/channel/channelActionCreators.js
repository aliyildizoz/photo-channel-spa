import * as actionTypes from "../actionTypes"
export const channelCreateSuccess = res => ({ type: actionTypes.CHANNEL_CREATE_RESPONSE, payload: res })
export const channelUpdateSuccess = res => ({ type: actionTypes.CHANNEL_UPDATE_RESPONSE, payload: res })
export const getChannelPhotosSuccess = photos => ({ type: actionTypes.GET_CHANNEL_PHOTOS, payload: photos })
export const getChannelSubscribersSuccess = subs => ({ type: actionTypes.GET_CHANNEL_SUBSCRIBERS, payload: subs })
export const getChannelOwnerSuccess = owner => ({ type: actionTypes.GET_CHANNEL_OWNER, payload: owner })
export const getChannelDetailSuccess = channel => ({ type: actionTypes.GET_CHANNEL_DETAIL, payload: channel })
export const getPhotoGalerySuccess = photos => ({ type: actionTypes.GET_PHOTO_GALERY, payload: photos })
export const getChannelCategoriesSucess = categories => ({ type: actionTypes.GET_CHANNEL_CATEGORIES, payload: categories })