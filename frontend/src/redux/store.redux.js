/**
 * Not persist
 */

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import AuthReducers from "./reducers/Auth.reducers";
import productReducer from "./reducers/product.reducer";
import locationReducer from "./reducers/location.reducer";
import orderReducer from "./reducers/order.reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
    auth: AuthReducers,
    product: productReducer,
    location: locationReducer,
    order: orderReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth", "location", "order"], // which reducer we need to persist 
};

const pReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    pReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const persistor = persistStore(store);

export { store, persistor };
