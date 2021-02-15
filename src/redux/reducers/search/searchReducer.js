import * as actionTypes from "../../actions/search/searchActionTypes"
import initialState from "../initialState";

export default function searchReducer(state = initialState.search, action) {
    switch (action.type) {
        case actionTypes.SEARCH_BY_CATEGORY:
            return { ...state, searchCategory: action.payload };
        case actionTypes.SEARCH_BY_TEXT:
            return { ...state, searchTextRes: action.payload }
        default:
            return state;
    }
}