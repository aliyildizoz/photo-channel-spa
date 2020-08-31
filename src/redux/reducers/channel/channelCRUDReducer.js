import * as actionTypes from "../../actions/actionTypes"
import initialState from "../initialState"
export default function channelCRUDReducer(state = initialState.channelCRUDState, action) {

    switch (action.type) {
        case actionTypes.CHANNEL_CREATE_RESPONSE:
            return { ...state, channelCreateResult: action.payload };
        case actionTypes.CHANNEL_UPDATE_RESPONSE:
            return { ...state, channelUpdateResult: action.payload };
        default:
            return state;
    }
}