import { combineReducers } from "redux";
import categoryListReducer from "./categoryListReducer"
import changeCategoryReducer from "./changeCategoryReducer"
import channelCreateReducer from "./channelCreateReducer"
import authReducer from "./authReducer"
import userReducer from "./userReducer"

const rootReducer = combineReducers({
    categoryListReducer,
    changeCategoryReducer,
    authReducer,
    channelCreateReducer,
    userReducer
});

export default rootReducer;