import { authHeaderObj, isExistsToken } from "../../helpers/localStorageHelper"
import { getIsSubsPath } from "../../actions/subscrib/subsEndPoints"
import { getIsSubsSuccess } from "../../actions/subscrib/subsActionCreators"
import axios from "axios";
import { redirectErrPage } from "../../helpers/historyHelper";


export function getIsSubsApi(channelId,  callBack) {
    return async dispatch => {
        if (isExistsToken()) {
            axios.get(getIsSubsPath(channelId), { headers: authHeaderObj() }).
                then(res => dispatch(getIsSubsSuccess(res.data))).then(() => {
                    if (typeof callBack == "function") {
                        callBack()
                    }
                }).catch(err => redirectErrPage(err, dispatch));
        }else{
            if (typeof callBack == "function") {
                callBack()
            }
        }
    }
}