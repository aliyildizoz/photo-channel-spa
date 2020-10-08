import * as actionTypes from "./commonActionTypes"

export const stateClear = () => ({ type: actionTypes.STATE_CLEAR });
export const apiResponse = res => ({ type: actionTypes.API_RESPONSE, payload: res });

export const isLoadingTSuccess = () => ({ type: actionTypes.IS_LOADING_TRUE });
export const isLoadingFSuccess = () => ({ type: actionTypes.IS_LOADING_FALSE });