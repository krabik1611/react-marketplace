import { all, fork } from "redux-saga/effects";
import { watchFetchUsers } from "./fetchUser";
import { watchLogin } from "./login";

export function* userSaga() {
  yield all([fork(watchFetchUsers), fork(watchLogin)]);
}
