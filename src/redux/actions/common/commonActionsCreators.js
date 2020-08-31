import * as actionTypes from "./commonActionTypes"

export const stateClear = () => ({ type: actionTypes.STATE_CLEAR });
export const apiResponse = res => ({ type: actionTypes.API_RESPONSE, payload: res });