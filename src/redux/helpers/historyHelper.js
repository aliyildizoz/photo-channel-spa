export function redirectErrPage(history, err) {
    console.log(err)
    if (err.status === undefined) {
        history.push({
            pathname: "/errorpage",
            state: { message: "Hata oluştu", status:  500 }
        });
        return;
    }

    var pathname;
    switch (err.response.status) {
        case 404:
            pathname = "/notfound"
            break;
        case 400:
            pathname = "/badrequest"
            break;
        case 403:
            pathname = "/forbidden"
            break;
        case 500:
            pathname = "/errorpage"
            break;
        default:
            break;
    }
    history.push({
        pathname: pathname,
        state: { message: err.response.data , status: err.response.status  }
    });
}