import { toast } from 'react-toastify';
import { push } from "redux-first-history";


export function redirectErrPage(err, dispatch) {
    console.error("response Error --> ", err)
    if (err.response === undefined) {
        toast.error("Bir hata oluştu...");
        return;
    }

    var path = {
        pathname: "",
        state: { message: err.response.data, status: err.response.status }
    };
    switch (err.response.status) {
        case 404:
            path.pathname = "/notfound"
            break;
        case 400:
            path.pathname = "/badrequest"
            break;
        case 403:
            path.pathname = "/forbidden"
            break;
        case 500:
            // path.pathname = "/errorpage"
            // path.state.message = "Hata oluştu";
            // path.state.status = 500;
            toast.error("Bir hata oluştu...");
            break;
        default:
            break;
    }
    dispatch(push(path));
}