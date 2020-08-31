import { MAIN_URL } from "../mainUrl"

const PHOTO_URL = "/api/photos/";
export const API_URL = MAIN_URL + PHOTO_URL;

export const getChannelPhotosPath = (channelId) => API_URL + channelId + "/channel-photos"


export const getPhotoGalleryPath = (channelId) => API_URL + channelId + "/photo-gallery"
