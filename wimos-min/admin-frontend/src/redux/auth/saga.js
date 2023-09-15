import { all, call, fork, put, takeEvery } from "redux-saga/effects";
// import { LoginAdmin,LogoutAdminHandler } from 'utils/axios/requestHandler';

import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_ERROR,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN,
  CHANGE_PASSWORD,
} from "./constant";

import {
  loginAdminAction,
  loginAdminErrorAction,
  loginAdminSuccessAction,
  logoutAdminAction,
  logoutAdminErrorAction,
  logoutAdminSuccessAction,
  ChangePasswordAction,
  ChangeAdminErrorAction,
  ChangeAdminSuccessAction,
} from "./actions";

import {
  LoginAdminHandler,
  LogoutAdminHandler,
  ChangePasswordNewOne,
} from "../../utils/axios/requestHandler";

export function* watchLoginAdmin() {
  yield takeEvery(LOGIN_ADMIN, loginWithUsernamePassword);
}

export function* watchChangeAdmin() {
  yield takeEvery(CHANGE_PASSWORD, ChangePassword);
}

export function* watchLogoutAdmin() {
  yield takeEvery(LOGOUT_ADMIN, logOutUser);
}

const loginWithUsernamePasswordAsync = async (data) =>
  await LoginAdminHandler(data)
    .then((user) => {
      // console.log(user);
      return user;
    })
    .catch((error) => error);

const ChangePasswordAsync = async (data) =>
  await ChangePasswordNewOne(data)
    .then((user) => {
      // console.log(user);
      return user;
    })
    .catch((error) => error);

const logoutAsync = async () =>
  await LogoutAdminHandler()
    .then((resp) => {
      //console.log("test",resp);
      return resp;
    })
    .catch((error) => error);

function* loginWithUsernamePassword({ payload }) {
  try {
    const loginAdmin = yield call(loginWithUsernamePasswordAsync, payload);
    if (!loginAdmin.status) {
      yield put(loginAdminErrorAction("Username or Password is Incorrect"));
      yield put(loginAdminErrorAction(null));
    } else {
      yield put(
        loginAdminSuccessAction({
          username: payload.username,
          status: true,
          auth: true,
        })
      );
      // yield put(loginAdminSuccessAction(null));
    }
  } catch (err) {
    yield put(loginAdminErrorAction("Something went wrong"));
    yield put(loginAdminErrorAction(null));
  }
}

function* ChangePassword({ payload, SetLoader }) {
  try {
    const ChangeAdmin = yield call(ChangePasswordAsync, payload);
    console.log("11", ChangeAdmin);
    if (!ChangeAdmin.status) {
      // console.log(payload);
      yield put(ChangeAdminErrorAction("Username or Password is Incorrect"));
      // yield put(loginAdminErrorAction(false));
      SetLoader(false);
    } else {
      yield put(ChangeAdminSuccessAction());
      SetLoader(false);
    }
    SetLoader(false);
  } catch (err) {
    yield put(ChangeAdminErrorAction("Something went wrong"));
    SetLoader(false);
  }
}

function* logOutUser() {
  try {
    const logoutAdmin = yield call(logoutAsync);

    if (!logoutAdmin.status) {
      yield put(logoutAdminErrorAction("Error in logout"));
      yield put(logoutAdminErrorAction(null));
    } else {
      yield put(logoutAdminSuccessAction());
    }
  } catch (err) {
    yield put(logoutAdminErrorAction("Something went wrong"));
    yield put(logoutAdminErrorAction(null));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginAdmin),
    fork(watchLogoutAdmin),
    fork(watchChangeAdmin),
  ]);
}
