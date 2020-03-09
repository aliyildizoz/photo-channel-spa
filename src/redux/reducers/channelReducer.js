import * as actionTypes from "../actions/actionTypes"
import initialState from "../reducers/initialState"
export default function channelCreateReducer(state = initialState.currentChannel, action) {

    switch (action.type) {
        case actionTypes.GET_CHANNEL_SUBSCRIBERS:
            return { ...state,  };
        case actionTypes.GET_CHANNEL_PHOTOS:
            return state;
        case actionTypes.GET_CHANNEL:
            return state;
        default:
            return state;
    }
}