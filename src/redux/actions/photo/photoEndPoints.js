import { MAIN_URL } from "../mainUrl"

const PHOTO_URL = "/api/photos/";
export const PHOTO_API_URL = MAIN_URL + PHOTO_URL;

export const getChannelPhotosPath = (channelId) => PHOTO_API_URL + channelId + "/channel-photos"
export const getUserPhotosUrl = userId => PHOTO_API_URL + userId + "/user-photos";



export const deletePhotoPath = (photoId) => PHOTO_API_URL + photoId
