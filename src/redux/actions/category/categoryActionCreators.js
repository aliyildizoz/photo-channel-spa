import * as actionTypes from "./categoryActionTypes"

export function getCategoriesSuccess(categories) {
    return { type: actionTypes.GET_CATEGORIES, payload: categories }
}
export function setSelectedCategoriesSuccess(categories) {
    return { type: actionTypes.SELECTED_CATEGORIES, payload: categories }
}