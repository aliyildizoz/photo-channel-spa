import { CATEGORIES_PATH } from "./categoryEndPoints"
import { getCategoriesSuccess, setSelectedCategoriesSuccess } from "./categoryActionCreators"
import axios from "axios"
import { redirectErrPage } from "../../helpers/historyHelper";
import { push, getLocation } from 'connected-react-router'
import { bindActionCreators } from "redux";
import { searchByMultiCategoryApi } from "../search/searchAsyncActions";

export function getCategories() {
    return async function (dispatch, getState) {
        await axios.get(CATEGORIES_PATH).then((res) => {
            dispatch(getCategoriesSuccess(res.data))
            return res.data;
        }).then((data) => {
            var path = decodeURIComponent(getState().router.location.pathname).split("/")
            if (path.length > 2 && path.includes("feed")) {
                if (path[2] !== "") {
                    var selectedCategories = path[2].split("-");
                    var selectedCategoriesDetail = data.filter(c => selectedCategories.includes(c.name.toLowerCase()));
                    dispatch(setSelectedCategoriesSuccess(selectedCategoriesDetail));
                    var searchByMultiCategory = bindActionCreators(searchByMultiCategoryApi, dispatch);
                    searchByMultiCategory(selectedCategoriesDetail.map(c => c.id));
                }
            }
        }).catch(err => redirectErrPage(err, dispatch));
    }
}