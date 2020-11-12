import { authHeaderObj } from "../../helpers/localStorageHelper"
import { getIsSubsPath } from "../../actions/subscrib/subsEndPoints"
import { getIsSubsSuccess } from "../../actions/subscrib/subsActionCreators"
import axios from "axios";
import { redirectErrPage } from "../../helpers/historyHelper";


export function getIsSubsApi(channelId, history, callBack) {
    return async dispatch => {
        axios.get(getIsSubsPath(channelId), { headers: authHeaderObj() }).
            then(res => dispatch(getIsSubsSuccess(res.data))).then(() => {
                if (typeof callBack == "function") {
                    callBack()
                }
            }).catch(err => redirectErrPage(err, history));
    }
}