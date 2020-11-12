import { CATEGORIES_PATH } from "./categoryEndPoints"
import { getCategoriesSuccess } from "./categoryActionCreators"
import axios from "axios"

export function getCategories() {
    return async function (dispatch) {
        const response = await axios.get(CATEGORIES_PATH);
        return dispatch(getCategoriesSuccess(response.data));
    }
}