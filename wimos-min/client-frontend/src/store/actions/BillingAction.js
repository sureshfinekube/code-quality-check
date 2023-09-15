import { formatError } from "../../services/AuthService";
import { GetBilling, GetCard } from "../../services/BillingService";

export const BILLING_LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const BILLING_GET_CONFIRM_ACTION = "[get billing] confirm";
export const BILLING_GET_FAILED_ACTION = "[get billing] failed";
export const CARD_GET_CONFIRM_ACTION = "[card billing] confirm";
export const CARD_GET_FAILED_ACTION = "[card billing] failed";
export const CLEAR_BILLING = "[billing] clear";

export function GetBillingAction() {
  return (dispatch) => {
    GetBilling()
      .then((response) => {
        //console.log(response.data.data);
        dispatch(getbillingConfirmedAction(response.data.data));
        // }
      })
      .catch((error) => {
        console.log("err", error);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Billing Data"
        );
        dispatch(getbillingFailedAction(errorMessage));
      });
  };
}
export function loadingToggleAction(status) {
  return {
    type: BILLING_LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
export function getbillingConfirmedAction(data) {
  return {
    type: BILLING_GET_CONFIRM_ACTION,
    payload: data,
  };
}

export function getbillingFailedAction(error) {
  return {
    type: BILLING_GET_FAILED_ACTION,
    payload: error,
  };
}

export function ClearBilling() {
  return {
    type: CLEAR_BILLING,
  };
}

export function getcardConfirmedAction(data) {
  return {
    type: CARD_GET_CONFIRM_ACTION,
    payload: data,
  };
}

export function getcardFailedAction(error) {
  return {
    type: CARD_GET_FAILED_ACTION,
    payload: error,
  };
}
export function GetCardAction() {
  return (dispatch) => {
    GetCard()
      .then((response) => {
        // console.log("GetCard", response.data);
        dispatch(getcardConfirmedAction(response.data.data));
        // }
      })
      .catch((error) => {
        // console.log("errGetCardAction", error.response.data);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Card Details"
        );
        dispatch(getcardFailedAction(errorMessage));
      });
  };
}
