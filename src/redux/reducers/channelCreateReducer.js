import * as actionTypes from "../actions/actionTypes"
import initialState from "../reducers/initialState"
export default function channelCreateReducer(state = initialState.channels, action) {

    switch (action.type) {
        case actionTypes.CHANNEL_CREATE:
            state.push(action.payload)
            return state;
        default:
            return state;
    }
}