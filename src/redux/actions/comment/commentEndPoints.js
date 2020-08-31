import { MAIN_URL } from "../mainUrl"

export const API_URL = "/api/comments/";

export const getPhotoCommentsUrl = (photoId) => MAIN_URL + API_URL + photoId + "/photo-comments"