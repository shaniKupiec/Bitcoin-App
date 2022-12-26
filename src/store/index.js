import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { contactReducer } from "./reducers/contactReducer";
import { userReducer } from "./reducers/userReducer";
import { dataReducer } from "./reducers/dataReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    contactModule: contactReducer,
    userModule: userReducer,
    dataModule: dataReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// window.myStore = store