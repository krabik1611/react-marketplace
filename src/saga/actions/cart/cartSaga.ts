import { all, fork } from "redux-saga/effects";
import { watchFetchCarts } from "./fetchCarts";

export function* cartSaga() {
  yield all([fork(watchFetchCarts)]);
}
