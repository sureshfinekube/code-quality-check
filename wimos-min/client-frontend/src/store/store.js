import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import PostsReducer from "./reducers/PostsReducer";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import { BlogReducer } from "./reducers/BlogReducer";
import { PageReducer } from "./reducers/PageReducer";
import { PackageReducer } from "./reducers/packageReducer";
import { BillingReducer } from "./reducers/BillingReducer";
import { CategoryReducer } from "./reducers/CategoryReducer";
import todoReducers from "./reducers/Reducers";
import { reducer as reduxFormReducer } from "redux-form";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./reducers/UserReducer";
const middleware = applyMiddleware(thunk);

const composeEnhancers = (process.env.REACT_APP_ENV !== "PRODUCTION" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  category: CategoryReducer,
  packages: PackageReducer,
  blog: BlogReducer,
  posts: PostsReducer,
  auth: AuthReducer,
  page: PageReducer,
  billings: BillingReducer,
  user: UserReducer,
  todoReducers,
  form: reduxFormReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(pReducer, composeEnhancers(middleware));
const persistor = persistStore(store);
//const store = createStore(rootReducers);

export { persistor, store };
