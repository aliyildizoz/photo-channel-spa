import * as actionTypes from "../../actions/common/commonActionTypes"
import initialState from "../initialState";

export default function isLoadingReducer(state = initialState.isLoading, action) {
    switch (action.type) {
        case actionTypes.IS_LOADING_TRUE:
            return true
        case actionTypes.IS_LOADING_FALSE:
            return false
        default:
            return state;
    }
}