import { all, fork } from "redux-saga/effects";
import { productSaga } from "./actions/product/productSaga";
import { cartSaga } from "./actions/cart/cartSaga";
import { userSaga } from "./actions/user/userSaga";

export function* rootSaga() {
  yield all([fork(productSaga), fork(cartSaga), fork(userSaga)]);
}
