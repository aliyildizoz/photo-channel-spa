import { authHeaderObj } from "../../helpers/localStorageHelper"
import { getIsSubsPath } from "../../actions/subscrib/subsEndPoints"
import { getIsSubsSuccess } from "../../actions/subscrib/subsActionCreators"
import axios from "axios";


export function getIsSubsApi(channelId) {
    return async dispatch => {
        axios.get(getIsSubsPath(channelId), { headers: authHeaderObj() }).
            then(res => dispatch(getIsSubsSuccess(res.data))).
            catch(err => console.warn(err.response));
    }
}