var mainUrl="http://localhost:500"
if (process.env.NODE_ENV==='production') {
    mainUrl=`http://${process.env.REACT_APP_MAIN_URL}`;
}
export const  MAIN_URL = mainUrl;
console.log(MAIN_URL);