import * as actionTypes from "../../actions/common/commonActionTypes"
import initialState from "../initialState";

export default function apiResponseReducer(state = initialState.apiResponse, action) {
    switch (action.type) {
        case actionTypes.API_RESPONSE:
            return action.payload;

        case actionTypes.STATE_CLEAR:
            return {};
        default:
            return state;
    }

}