import * as actionTypes from "./categoryActionTypes"
import axios from "axios"

export function getCategoriesSuccess(categories) {
    return { type: actionTypes.GET_CATEGORIES, payload: categories }
}
export function changeCategory(category) {
    return { type: actionTypes.CHANGE_CATEGORY, payload: category }
}
export function getCategories() {
    return async function (dispatch) {
        let url = "https://localhost:44367/api/categories"
        const response = await axios.get(url);
        return dispatch(getCategoriesSuccess(response.data));
    }
}