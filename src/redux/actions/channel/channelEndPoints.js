import { MAIN_URL } from "../mainUrl"

const API_URL = "/api/channels/";

const CHANNEL_CATEGORIES_API_URL = MAIN_URL + "/api/channelcategories/";

export const CHANNEL_PATH = MAIN_URL + API_URL;

export const getChannelPathById = (channelId) => CHANNEL_PATH + channelId;
export const getChannelOwnerPath = (channelId) => CHANNEL_PATH + channelId + "/owner";
export const getChannelIsOwnerPath = (channelId) => CHANNEL_PATH + channelId + "/isowner" ;
export const getUserChannelUrl = (userId) => CHANNEL_PATH + userId + "/user-channels" ;

export const getChannelCategoriesPath = (channelId) => CHANNEL_CATEGORIES_API_URL + channelId + "/channel-categories";
export const channelCategoriesPathById = (channelId) => CHANNEL_CATEGORIES_API_URL + channelId;