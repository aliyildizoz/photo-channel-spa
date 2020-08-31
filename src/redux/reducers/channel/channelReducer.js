import * as actionTypes from "../../actions/actionTypes"
import initialState from "../initialState"
export default function channelReducer(state = initialState.currentChannel, action) {

    switch (action.type) {
        case actionTypes.GET_CHANNEL_DETAIL:
            return { ...state, channelDetail: action.payload };
        case actionTypes.GET_CHANNEL_CATEGORIES:
            return { ...state, categories: action.payload };
        default:
            return state;
    }
}