import { MAIN_URL } from "../mainUrl"

const SEARCH_URL = "/api/search/";
export const SEARCH_API_URL = MAIN_URL + SEARCH_URL;

export const searchByMultiCategoryUrl = SEARCH_API_URL + "searchbymulticategory";
export const searchByTextUrl = (text) => SEARCH_API_URL + "searchbytext/" + text;
export const searchByCategoryUrl = (categoryId) => SEARCH_API_URL + "searchbycategory/" + categoryId;
