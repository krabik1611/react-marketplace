import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../saga/rootSaga";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
