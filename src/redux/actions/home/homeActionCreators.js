import { GET_FEED, GET_MOST_CHANNELS, GET_MOST_COMMENTS, GET_MOST_PHOTOS } from "./homeActionTypes"
export const getMostChannelsSuccess = (channels) => ({ type: GET_MOST_CHANNELS, payload: channels })
export const getMostPhotosSuccess = (photos) => ({ type: GET_MOST_PHOTOS, payload: photos })
export const getMostCommentsSuccess = (photos) => ({ type: GET_MOST_COMMENTS, payload: photos })
export const getFeedSuccess = (photos) => ({ type: GET_FEED, payload: photos })