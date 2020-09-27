import { MAIN_URL } from "../mainUrl"

const API_URL = "/api/users/";
export const USER_API_URL = MAIN_URL + API_URL;

export const getUserUrlById = userId => USER_API_URL + userId;