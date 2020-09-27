import * as actionTypes from "./channelActionTypes"


export const getChannelDetailSuccess = channel => ({ type: actionTypes.GET_CHANNEL_DETAIL, payload: channel })
export const getIsOwnerSuccess = isOwner => ({ type: actionTypes.GET_IS_OWNER, payload: isOwner })
export const getChannelCategoriesSuccess = categories => ({ type: actionTypes.GET_CHANNEL_CATEGORIES, payload: categories })