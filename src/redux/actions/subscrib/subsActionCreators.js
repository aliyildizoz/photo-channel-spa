import * as actionTypes from "./subsActionTypes"
import { GET_SUBSCRIBERS } from "../channel/channelActionTypes"

export const getIsSubsSuccess = (isSubs) => ({ type: actionTypes.IS_SUBS, payload: isSubs })
export const getSubscribersSuccess = (isSubs) => ({ type: GET_SUBSCRIBERS, payload: isSubs })