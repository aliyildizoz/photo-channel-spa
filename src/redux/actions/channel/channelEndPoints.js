import { MAIN_URL } from "../mainUrl"

const API_URL = "/api/channels/";

const CHANNEL_CATEGORIES_API_URL = MAIN_URL + "/api/channelcategories/";

export const CHANNEL_PATH = MAIN_URL + API_URL;

export const getChannelPathById = (channelId) => CHANNEL_PATH + channelId;
export const getChannelOwnerPath = (channelId) => CHANNEL_PATH + channelId + "/owner";

export const getChannelCategoriesPath = (channelId) => CHANNEL_CATEGORIES_API_URL + channelId + "/channel-categories";