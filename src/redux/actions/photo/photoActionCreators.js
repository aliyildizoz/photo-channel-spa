
import { GET_CHANNEL_PHOTOS, GET_CHANNEL_PHOTO_GALLERY } from "../channel/channelActionTypes"
export const getChannelPhotosSuccess = photos => ({ type: GET_CHANNEL_PHOTOS, payload: photos })
export const getChannelGallerySuccess = photos => ({ type: GET_CHANNEL_PHOTO_GALLERY, payload: photos })