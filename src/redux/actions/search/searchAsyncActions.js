import axios from "axios"
import _ from "lodash"
import { redirectErrPage } from "../../helpers/historyHelper"
import { searchByCategorySuccess, searchByTextSuccess } from "./searchActionCreators"
import { searchByCategoryUrl, searchByMultiCategoryUrl, searchByTextUrl } from "./searchEndPoints"

export function searchByTextApi(text, callBack) {

    return async dispatch => {
        await axios.get(searchByTextUrl(text)).then((res) => {
            dispatch(searchByTextSuccess(res.data))
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => {
            if (err.response.status === 404) {
                return;
            }
            redirectErrPage(err, dispatch)
        })

    }
}
export function searchByCategoryApi(categoryId, callBack) {

    return async dispatch => {

        await axios.get(searchByCategoryUrl(categoryId)).then((res) => {
            dispatch(searchByCategorySuccess(res.data))
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) =>
            redirectErrPage(err, dispatch))
    }
}
export function searchByMultiCategoryApi(categoryIds, callBack) {

    return async dispatch => {

        await axios.get(searchByMultiCategoryUrl, { params: { categoryIds: categoryIds } }).then((res) => {
            dispatch(searchByCategorySuccess(_.cloneDeep(res.data)))
        }).then(() => {
            if (typeof callBack == "function") {
                callBack()
            }
        }).catch((err) => {
            if (err.response.status === 404) {
                dispatch(searchByCategorySuccess([]))
                return;
            }
            redirectErrPage(err, dispatch);
        })


    }
}