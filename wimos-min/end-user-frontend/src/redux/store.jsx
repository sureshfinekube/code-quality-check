import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];

// const composeEnhancers =
//     process.env.NEXT_PUBLIC_ENV !== "PRODUCTION" && typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const mainReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      main: action.payload.main,
    };
    // console.log("yiyi");

    return nextState;
  } else {
    // console.log("yoyo");
    return rootReducer(state, action);
  }
};
const makeStore = () => createStore(mainReducer, enhancer);

export const wrapper = createWrapper(makeStore);
