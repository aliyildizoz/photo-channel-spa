import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./index";
import thunk from "redux-thunk"
import logger from "redux-logger"

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger)
);
export default function configureStore() {
    return createStore(rootReducer, enhancer);
}