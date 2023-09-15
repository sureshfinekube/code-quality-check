import {
  formatError,
  formatSuccess,
  formatErrorMessages,
} from "../../services/AuthService";
import {
  CategoryPost,
  CategoryEdit,
  CategoryDelete,
} from "../../services/CategoryServices";
import { SelectStoreAction } from "./AuthActions";

export const CATEGORY_LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const CATEGORY_POST_CONFIRM_ACTION = "[category post action] confirm";
export const CATEGORY_POST_FAILED_ACTION = "[category post action] failed";
export const CATEGORY_POST_COMPLETE_ACTION = "[category post action] complete";

export const CATEGORY_EDIT_CONFIRM_ACTION = "[category edit action] confirm";
export const CATEGORY_EDIT_FAILED_ACTION = "[category edit action] failed";
export const CATEGORY_EDIT_COMPLETE_ACTION = "[category edit action] complete";

export const CATEGORY_DELETE_CONFIRM_ACTION =
  "[category delete action] confirm";
export const CATEGORY_DELETE_FAILED_ACTION = "[category delete action] failed";
export const CATEGORY_DELETE_COMPLETE_ACTION =
  "[category delete action] complete";

export function CategoryPostAction(Data, storeid, SetLoader) {
  return (dispatch) => {
    CategoryPost(Data)
      .then((response) => {
        // console.log("response15", response.data);
        // saveTokenInLocalStorage(response.data);
        dispatch(SelectStoreAction(storeid));
        dispatch(categorypostConfirmAction(response.data));
        const successMessage = formatSuccess("Category Posted Successfully");
        dispatch(categorypostCompleteAction(successMessage));
        SetLoader(false);
      })
      .catch((error) => {
        //console.log("err", error.response.data.errors);
        const errorMessage = formatErrorMessages(error?.response?.data?.errors);
        dispatch(categorypostFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}
export function categorypostConfirmAction(data) {
  return {
    type: CATEGORY_POST_CONFIRM_ACTION,
    payload: data,
  };
}
export function categorypostCompleteAction(message) {
  return {
    type: CATEGORY_POST_COMPLETE_ACTION,
    payload: message,
  };
}
export function categorypostFailedAction(error) {
  return {
    type: CATEGORY_POST_FAILED_ACTION,
    payload: error,
  };
}
export function loadingToggleAction(status) {
  return {
    type: CATEGORY_LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function CategoryEditAction(Data, storeid) {
  return (dispatch) => {
    CategoryEdit(Data)
      .then((response) => {
        // console.log("response15", response.data);
        // saveTokenInLocalStorage(response.data);
        dispatch(SelectStoreAction(storeid));
        dispatch(categoryeditConfirmAction(response.data));
        const successMessage = formatSuccess("Category updated Successfully");
        dispatch(categoryeditCompleteAction(successMessage));
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatErrorMessages(error?.response?.data?.errors);
        dispatch(categoryeditFailedAction(errorMessage));
      });
  };
}
export function categoryeditConfirmAction(data) {
  return {
    type: CATEGORY_POST_CONFIRM_ACTION,
    payload: data,
  };
}
export function categoryeditCompleteAction(message) {
  return {
    type: CATEGORY_POST_COMPLETE_ACTION,
    payload: message,
  };
}
export function categoryeditFailedAction(error) {
  return {
    type: CATEGORY_POST_FAILED_ACTION,
    payload: error,
  };
}

export function CategoryDeleteAction(cateid, storeid, setmodalDelete) {
  return (dispatch) => {
    CategoryDelete(cateid)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        dispatch(SelectStoreAction(storeid));
        dispatch(categorydeleteConfirmAction(response.data));
        const successMessage = formatSuccess("category Removed Successfully");
        dispatch(categorydeleteCompleteAction(successMessage));
        setmodalDelete(false);
      })
      .catch((error) => {
        // console.log("err", error.response);
        const errorMessage = formatErrorMessages(error?.response?.data?.errors);
        dispatch(categorydeleteFailedAction(errorMessage));
      });
  };
}

export function categorydeleteConfirmAction(data) {
  return {
    type: CATEGORY_DELETE_CONFIRM_ACTION,
    payload: data,
  };
}

export function categorydeleteCompleteAction(message) {
  return {
    type: CATEGORY_DELETE_COMPLETE_ACTION,
    payload: message,
  };
}

export function categorydeleteFailedAction(error) {
  return {
    type: CATEGORY_DELETE_FAILED_ACTION,
    payload: error,
  };
}
