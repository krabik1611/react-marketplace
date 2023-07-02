import { IQuery } from "../../../model/queryTypes";
import { UserActionTypes } from "../../../store/reducers/userReducer";
import { IUser } from "../../../model/userTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../index";

export const fetchUser = (params?: IQuery) => {
  return {
    type: UserActionTypes.FETCH_USERS,
    payload: params,
  };
};

const fetchUsersSuccess = (users: IUser[]) => {
  return {
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersError = (error: string) => {
  return {
    type: UserActionTypes.FETCH_USERS_ERROR,
    payload: error,
  };
};

function* fetchUsersAsync(action: any) {
  try {
    const data: IUser[] = yield call(() =>
      api.user.getAllUsers(action.payload).then((res) => res.data)
    );
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersError("Error on fetching users"));
  }
}

export function* watchFetchUsers() {
  yield takeLatest(UserActionTypes.FETCH_USERS, fetchUsersAsync);
}
