import {
  LOADING_TOGGLE_ACTION,
  PACKAGE_CONFIRMED_ACTION,
  PACKAGE_FAILED_ACTION,
  GET_PACKAGE_CONFIRM_ACTION,
  GET_PACKAGE_FAILED_ACTION,
  UPDATE_PACKAGE_CONFIRM_ACTION,
  UPDATE_PACKAGE_FAILED_ACTION,
} from "../actions/packageAction";

const initialState = {
  errorMessage: "",
  successMessage: "",
  showLoading: false,
  packages: "",
  currentpackage: "",
  updatePackages: "",
};

export function PackageReducer(state = initialState, action) {
  if (action.type === PACKAGE_CONFIRMED_ACTION) {
    return {
      ...state,
      packages: action.payload,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === UPDATE_PACKAGE_CONFIRM_ACTION) {
    return {
      ...state,
      updatePackages: action.payload,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === PACKAGE_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: "",
      showLoading: false,
    };
  }
  if (action.type === GET_PACKAGE_CONFIRM_ACTION) {
    return {
      ...state,
      currentpackage: action.payload.package,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === GET_PACKAGE_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: "",
      showLoading: false,
    };
  }
  if (action.type === LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
    };
  }
  return state;
}
