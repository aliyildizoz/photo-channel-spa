import * as actionTypes from "../../actions/channel/channelActionTypes"
import initialState from "../initialState"
export default function channelIsOwnerReducer(state = initialState.currentChannel.isOwner, action) {

    switch (action.type) {
        case actionTypes.GET_CHANNEL_IS_OWNER:
            return action.payload;
        default:
            return state;
    }
}