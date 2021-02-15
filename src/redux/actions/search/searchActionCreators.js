import { SEARCH_BY_CATEGORY, SEARCH_BY_TEXT } from "./searchActionTypes"

export const searchByTextSuccess = (searchRes) => ({ type: SEARCH_BY_TEXT, payload: searchRes })
export const searchByCategorySuccess = (categories) => ({ type: SEARCH_BY_CATEGORY, payload: categories })