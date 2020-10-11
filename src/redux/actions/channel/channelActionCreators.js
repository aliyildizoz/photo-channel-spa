import * as actionTypes from "./channelActionTypes"


export const getChannelDetailSuccess = channel => ({ type: actionTypes.GET_CHANNEL_DETAIL, payload: channel })
export const getChannelIsOwnerSuccess = isOwner => ({ type: actionTypes.GET_CHANNEL_IS_OWNER, payload: isOwner })
export const getChannelCategoriesSuccess = categories => ({ type: actionTypes.GET_CHANNEL_CATEGORIES, payload: categories })

export const channelIsLoadingTSuccess = () => ({ type: actionTypes.CHANNEL_IS_LOADING_T })
export const channelIsLoadingFSuccess = () => ({ type: actionTypes.CHANNEL_IS_LOADING_F })