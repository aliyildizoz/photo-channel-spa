import * as actionTypes from "../../actions/category/categoryActionTypes"
import initialState from "../initialState";


export default function selectedCategoriesReducer(state = initialState.selectedCategories, action) {

    switch (action.type) {
        case actionTypes.SELECTED_CATEGORIES:
            return action.payload
        default:
            return state;
    }

}