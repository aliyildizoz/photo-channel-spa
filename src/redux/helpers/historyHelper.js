export function redirectErrPage(history, err) {
    console.log(err)
    history.push({
        pathname: '/errorpage',
        state: { message: err.response.data ? err.response.data : "Internal Server", status: err.response.status ? err.response.status : 500 }
    });
}