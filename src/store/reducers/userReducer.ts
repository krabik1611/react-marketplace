import { IUser } from "../../model/userTypes";
import { parseJwt } from "../../utils/convert";

export enum UserActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
  ADD_USERS = "ADD_USERS",
  ADD_USERS_SUCCESS = "ADD_USERS_SUCCESS",
  ADD_USERS_ERROR = "ADD_USERS_ERROR",
  DELETE_USERS = "DELETE_USERS",
  DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS",
  DELETE_USERS_ERROR = "DELETE_USERS_ERROR",
  UPDATE_USERS = "UPDATE_USERS",
  UPDATE_USERS_SUCCESS = "UPDATE_USERS_SUCCESS",
  UPDATE_USERS_ERROR = "UPDATE_USERS_ERROR",
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
  CLEAR_USERS = "CLEAR_USERS",
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
}

interface IFetchUsers {
  type: UserActionTypes.FETCH_USERS;
}

interface IFetchUsersSuccess {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: IUser[];
}

interface IFetchUsersError {
  type: UserActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

interface IAddUser {
  type: UserActionTypes.ADD_USERS;
}

interface IAddUserSuccess {
  type: UserActionTypes.ADD_USERS_SUCCESS;
  payload: IUser;
}

interface IAddUserError {
  type: UserActionTypes.ADD_USERS_ERROR;
  payload: string;
}

interface IDeleteUser {
  type: UserActionTypes.DELETE_USERS;
}

interface IDeleteUserSuccess {
  type: UserActionTypes.DELETE_USERS_SUCCESS;
  payload: number;
}

interface IDeleteUserError {
  type: UserActionTypes.DELETE_USERS_ERROR;
  payload: string;
}

interface IUpdateUser {
  type: UserActionTypes.UPDATE_USERS;
}

interface IUpdateUserSuccess {
  type: UserActionTypes.UPDATE_USERS_SUCCESS;
  payload: IUser;
}

interface IUpdateUserError {
  type: UserActionTypes.UPDATE_USERS_ERROR;
  payload: string;
}

interface IFetchUser {
  type: UserActionTypes.FETCH_USER;
}

interface IFetchUserSuccess {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: IUser;
}

interface IFetchUserError {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

interface IClearUsers {
  type: UserActionTypes.CLEAR_USERS;
}

type UserAction =
  | IFetchUsers
  | IFetchUsersSuccess
  | IFetchUsersError
  | IAddUser
  | IAddUserSuccess
  | IAddUserError
  | IDeleteUser
  | IDeleteUserSuccess
  | IDeleteUserError
  | IUpdateUser
  | IUpdateUserSuccess
  | IUpdateUserError
  | IFetchUser
  | IFetchUserSuccess
  | IFetchUserError
  | IClearUsers;

interface IUserState {
  users: IUser[];
  loading: boolean;
  error: string;
  user: IUser | undefined;
}

const initialState: IUserState = {
  users: [],
  loading: false,
  error: "",
  user: undefined,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return { ...state, loading: true };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      const token = localStorage.getItem("token");
      if (token) {
        const id = parseJwt(token).sub;
        if (id) {
          return {
            ...state,
            loading: false,
            users: action.payload,
            user: action.payload.find((user) => user.id === id),
          };
        }
      }
      return { ...state, loading: false, users: action.payload };
    case UserActionTypes.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.ADD_USERS:
      return { ...state, loading: true };
    case UserActionTypes.ADD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case UserActionTypes.ADD_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.DELETE_USERS:
      return { ...state, loading: true };
    case UserActionTypes.DELETE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case UserActionTypes.DELETE_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.UPDATE_USERS:
      return { ...state, loading: true };
    case UserActionTypes.UPDATE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case UserActionTypes.UPDATE_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.FETCH_USER:
      return { ...state, loading: true };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UserActionTypes.FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.CLEAR_USERS:
      return { ...state, users: [] };
    default:
      return state;
  }
};
