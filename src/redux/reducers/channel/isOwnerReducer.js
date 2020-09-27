import * as actionTypes from "../../actions/channel/channelActionTypes"
import initialState from "../initialState"
export default function isOwnerReducer(state = initialState.currentChannel.isOwner, action) {

    switch (action.type) {
        case actionTypes.GET_IS_OWNER:
            return action.payload;
        default:
            return state;
    }
}