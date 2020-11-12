import * as actionTypes from "./categoryActionTypes"

export function getCategoriesSuccess(categories) {
    return { type: actionTypes.GET_CATEGORIES, payload: categories }
}
export function changeCategory(category) {
    return { type: actionTypes.CHANGE_CATEGORY, payload: category }
}