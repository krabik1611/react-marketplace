import {all,fork} from "redux-saga/effects";
import {watchFetchProducts} from "./fetchProducts";

export  function* productSaga(){
  yield all([
    fork(watchFetchProducts),])
}