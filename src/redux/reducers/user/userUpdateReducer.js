import * as actionTypes from "../../actions/actionTypes"
import initialState from "../initialState"

export default function userUpdateReducer(state = initialState.userUpdateRes, action) {
    switch (action.type) {
        case actionTypes.USER_UPDATE_RES:
            return action.payload;
        case actionTypes.USER_UPDATE_RES_CLEAR:
            return {};
        default:
            return state;
    }
}
