import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_ERROR,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN,
  LOGOUT_ADMIN_ERROR,
  LOGOUT_ADMIN_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_ADMIN_ERROR,
  CHANGE_ADMIN_SUCCESS,
} from "./constant";
// Login actions
export const loginAdminAction = (status) => ({
  type: LOGIN_ADMIN,
  payload: status,
});

export const ChangePasswordAction = (status) => ({
  type: CHANGE_PASSWORD,
  payload: status,
});
export const ChangeAdminErrorAction = (err) => ({
  type: CHANGE_ADMIN_ERROR,
  payload: err,
});
export const ChangeAdminSuccessAction = (payload) => ({
  type: CHANGE_ADMIN_SUCCESS,
  payload: payload,
});

export const loginAdminSuccessAction = (admin) => ({
  type: LOGIN_ADMIN_SUCCESS,
  payload: admin,
});

export const loginAdminErrorAction = (payload) => ({
  type: LOGIN_ADMIN_ERROR,
  payload,
});

// logout actions
export const logoutAdminAction = () => ({
  type: LOGOUT_ADMIN,
});

export const logoutAdminErrorAction = (payload) => ({
  type: LOGOUT_ADMIN_ERROR,
  payload,
});

export const logoutAdminSuccessAction = (auth) => ({
  type: LOGOUT_ADMIN_SUCCESS,
  payload: auth,
});
