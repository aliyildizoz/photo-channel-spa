export function getJwtToken() {
    return "bearer " + localStorage.getItem("token");
}
export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}
export function isExistsToken() {
    return localStorage.getItem("token") != null;
}
export function setToken(token) {
    removeToken()
    console.log("setToken ", token)
    localStorage.setItem("token", String(token.token).toString());
    localStorage.setItem("tokenExpiration", String(token.expiration).toString());
    localStorage.setItem("refreshToken", String(token.refreshToken).toString());
}
export function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("refreshToken");
}
export function authHeaderObj() {
    return {
        authorization: getJwtToken(),
        refreshToken: getRefreshToken()
    }
}