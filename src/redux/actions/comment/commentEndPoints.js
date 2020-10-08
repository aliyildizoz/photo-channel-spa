import { MAIN_URL } from "../mainUrl"

export const API_URL = "/api/comments/";
export const COMMENT_PATH = MAIN_URL + API_URL;
export const getPhotoCommentsUrl = (photoId) => COMMENT_PATH + photoId + "/photo-comments"
export const getCommentPathById = (commentId) => COMMENT_PATH + commentId;
export const getUserCommentsPhotosUrl = (userId) => COMMENT_PATH + userId + "/user-comment-photos";