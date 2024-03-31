import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from 'history';
import rootReducer  from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
  } = createReduxHistoryContext({ history: createBrowserHistory() });
  
export const store = configureStore({
    reducer: rootReducer(routerReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
  });
  
export const history = createReduxHistory(store);