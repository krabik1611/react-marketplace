import { IQuery } from "../../../model/queryTypes";
import { CartActionTypes } from "../../../store/reducers/cartReducer";
import { ICart } from "../../../model/cartTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../index";

export const fetchCarts = (params?: IQuery) => {
  return {
    type: CartActionTypes.FETCH_CARTS,
    payload: params,
  };
};

const fetchCartsSuccess = (carts: ICart[]) => {
  return {
    type: CartActionTypes.FETCH_CARTS_SUCCESS,
    payload: carts,
  };
};

const fetchCartsError = (error: string) => {
  return {
    type: CartActionTypes.FETCH_CARTS_ERROR,
    payload: error,
  };
};

function* fetchCartsAsync(action: any) {
  try {
    const data: ICart[] = yield call(() =>
      api.cart.getAllCarts(action.payload).then((res) => res.data)
    );
    yield put(fetchCartsSuccess(data));
  } catch (error) {
    yield put(fetchCartsError("Error on fetching carts"));
  }
}

export function* watchFetchCarts() {
  yield takeLatest(CartActionTypes.FETCH_CARTS, fetchCartsAsync);
}
