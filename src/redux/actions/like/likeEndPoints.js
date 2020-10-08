import { MAIN_URL } from "../mainUrl"

const API_URL = "/api/likes/";

export const LIKE_API_URL = MAIN_URL + API_URL;

export const getPhotoLikesUrl = (photoId) => LIKE_API_URL + photoId + "/photo-likes"
export const getLikedPhotosUrl = (userId) => LIKE_API_URL + userId + "/like-photos"

export const getIsLikePath = (photoId) => LIKE_API_URL + "islike/" + photoId;

export const deleteLikePath = (photoId) => LIKE_API_URL + photoId;

