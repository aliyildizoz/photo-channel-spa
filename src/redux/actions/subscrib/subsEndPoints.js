import { MAIN_URL } from "../mainUrl"

const API_URL = "/api/subs/";
export const SUBS_API_URL = MAIN_URL + API_URL;

export const getIsSubsPath = (channelId) => SUBS_API_URL + "issub/" + channelId

export const getChannelSubscribersPath = (channelId) => SUBS_API_URL + channelId + "/subscribers";
export const getSubscriptionsUrl = (userId) => SUBS_API_URL + userId + "/subscriptions";

export const deleteSubsPath = (channelId) => SUBS_API_URL + channelId;

export const deleteSubsByOwnerPath = (channelId, userId) => deleteSubsPath(channelId) + "/byowner/" + userId;