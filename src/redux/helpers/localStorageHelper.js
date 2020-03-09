export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token", String(token.token).toString());
    localStorage.setItem("tokenExpiration", String(token.expiration).toString());
}
export function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
}