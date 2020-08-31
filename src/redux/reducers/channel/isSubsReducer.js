import * as actionTypes from "../../actions/subscrib/subsActionTypes"
import initialState from "../initialState"
export default function isSubsReducer(state = initialState.currentChannel.isSubs, action) {

    switch (action.type) {
        case actionTypes.IS_SUBS:
            return action.payload;
        default:
            return state;
    }
}