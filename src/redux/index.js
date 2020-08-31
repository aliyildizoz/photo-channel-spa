import { combineReducers } from "redux";
import categoryListReducer from "./reducers/category/categoryListReducer"
import changeCategoryReducer from "./reducers/category/changeCategoryReducer"
import channelCRUDReducer from "./reducers/channel/channelCRUDReducer"
import isSubsReducer from "./reducers/channel/isSubsReducer"
import currentUserReducer from "./reducers/auth/currentUserReducer"
import isLoggedReducer from "./reducers/auth/isLoggedReducer"
import userReducer from "./reducers/user/userReducer"
import userUpdateReducer from "./reducers/user/userUpdateReducer"
import channelReducer from "./reducers/channel/channelReducer"
import apiResponseReducer from "./reducers/common/apiResponseReducer"

const rootReducer = combineReducers({
    categoryListReducer,
    changeCategoryReducer,
    currentUserReducer,
    channelCRUDReducer,
    userReducer,
    userUpdateReducer,
    channelReducer,
    apiResponseReducer,
    isLoggedReducer,
    isSubsReducer
});

export default rootReducer;