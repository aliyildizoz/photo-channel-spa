import { combineReducers } from "redux";
import categoryListReducer from "./reducers/category/categoryListReducer"
import selectedCategoriesReducer from "./reducers/category/selectedCategoriesReducer"
import isSubsReducer from "./reducers/channel/isSubsReducer"
import currentUserReducer from "./reducers/auth/currentUserReducer"
import isLoadingReducer from "./reducers/common/isLoadingReducer"
import isLoggedReducer from "./reducers/auth/isLoggedReducer"
import userReducer from "./reducers/user/userReducer"
import channelReducer from "./reducers/channel/channelReducer"
import channelIsOwnerReducer from "./reducers/channel/channelIsOwnerReducer"
import apiResponseReducer from "./reducers/common/apiResponseReducer"
import homeReducer from "./reducers/home/homeReducer"
import searchReducer from "./reducers/search/searchReducer"


const rootReducer = (router) => combineReducers({
    router: router,
    categoryListReducer,
    currentUserReducer,
    userReducer,
    channelReducer,
    apiResponseReducer,
    isLoggedReducer,
    isSubsReducer,
    channelIsOwnerReducer,
    isLoadingReducer,
    homeReducer,
    searchReducer,
    selectedCategoriesReducer
})
export default rootReducer;