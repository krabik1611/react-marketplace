import { UserActionTypes } from "../../../store/reducers/userReducer";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../index";

export const login = (payload: { username: string; password: string }) => ({
  type: UserActionTypes.LOGIN,
  payload,
});

export const loginError = (error: string) => ({
  type: UserActionTypes.LOGIN_ERROR,
  payload: error,
});

export const loginSuccess = (token: string) => {
  localStorage.setItem("token", token);
  window.location.reload();
  return {
    type: UserActionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};

function* loginAsync(action: any) {
  try {
    const data: string = yield call(() =>
      api.login(action.payload).then((res) => res.data.token)
    );
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginError("Error on login"));
  }
}

export function* watchLogin() {
  yield takeLatest(UserActionTypes.LOGIN, loginAsync);
}
