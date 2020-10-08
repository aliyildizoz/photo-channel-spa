import { combineReducers } from "redux";
import categoryListReducer from "./reducers/category/categoryListReducer"
import changeCategoryReducer from "./reducers/category/changeCategoryReducer"
import isSubsReducer from "./reducers/channel/isSubsReducer"
import currentUserReducer from "./reducers/auth/currentUserReducer"
import isLoadingReducer from "./reducers/common/isLoadingReducer"
import isLoggedReducer from "./reducers/auth/isLoggedReducer"
import userReducer from "./reducers/user/userReducer"
import channelReducer from "./reducers/channel/channelReducer"
import channelIsOwnerReducer from "./reducers/channel/channelIsOwnerReducer"
import apiResponseReducer from "./reducers/common/apiResponseReducer"

const rootReducer = combineReducers({
    categoryListReducer,
    changeCategoryReducer,
    currentUserReducer,
    userReducer,
    channelReducer,
    apiResponseReducer,
    isLoggedReducer,
    isSubsReducer,
    channelIsOwnerReducer,
    isLoadingReducer
});

export default rootReducer;