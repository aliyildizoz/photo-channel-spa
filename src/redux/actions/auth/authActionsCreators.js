import * as actionTypes from "./authActionTypes"

export const currentUserSuccess = user => ({ type: actionTypes.CURRENT_USER, payload: user });
export const currentUserClearSuccess = user => ({ type: actionTypes.CURRENT_USER_CLEAR });


export const isLoggedFSuccess = () => ({ type: actionTypes.IS_LOGGED_F });
export const isLoggedTSuccess = () => ({ type: actionTypes.IS_LOGGED_T });

