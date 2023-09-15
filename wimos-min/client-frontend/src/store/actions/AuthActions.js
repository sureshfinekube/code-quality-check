import {
  formatError,
  login,
  saveTokenInLocalStorage,
  UpdateProfile,
  ChangePassword,
  formatSuccess,
  contract,
  createOtp,
  createStore,
  SelectPackage,
  GetCurrentClient,
  verifyOtp,
  OtpPassword,
  ForgotPassWord,
  formatErrorMessages,
  UpdateStep,
  UpdateStoreStep,
  silderSection,
  getSlider,
  updateSlider,
  deleteSlider,
  sectionTitle,
  getsectionTitle,
  updateDummy,
  ContarctStand,
  StoreContractPayload,
  AddAnalytics,
  AddSocialMediaData,
  UpdateSocialMediaData,
  DeleteSocialMediaData,
  GetSocialMediaData,
  AddContactData,
} from "../../services/AuthService";

import {
  GetStore,
  SelectStore,
  StoreStatus,
  UpdateStore,
  UpdateSeo,
} from "../../services/StoreService";
import { getReportsData } from "../../services/UserService";
export const SELECTPACKAGE_CONFIRMED_ACTION =
  "[selectpackage action] confirmed selectpackage";
export const SELECTPACKAGE_FAILED_ACTION =
  "[selectpackage action] failed selectpackage";

export const CONTRACT_CONFIRMED_ACTION = "[contract action] confirmed contract";
export const CONTRACT_FAILED_ACTION = "[contract action] failed contract";
export const CONTRACT_COMPLETE_ACTION = "[contract action] complete";

export const CREATEOTP_FAILED_ACTION = "[createotp action] failed createotp";
export const CREATEOTP_CONFIRMED_ACTION = "[createotp action] id complete";
export const CREATEOTP_DONE_ACTION = "[createotp action] complete";

export const CHECKDOMAIN_FAILED_ACTION =
  "[checkDomain action] failed checkDomain";
export const CHECKDOMAIN_CONFIRMED_ACTION = "[checkDomain action] complete";

export const CREATESTORE_FAILED_ACTION =
  "[createstore action] failed createstore";
export const CREATESTORE_CONFIRMED_ACTION = "[createstore action] complete";
export const CREATESTORE_DONE_ACTION = "[createstore action] done createstore";

export const CONTRACTSTANDARD_CONFIRMED_ACTION =
  "[contract standard action] confirmed signup";
export const CONTRACTSTANDARD_FAILED_ACTION =
  "[contract standard action] failed signup";
export const CONTRACTSTANDARD_COMPLETE_ACTION =
  "[contract standard action] complete";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const SIGNUP_COMPLETE_ACTION = "[signup action] complete";

export const VERIFYOTP_CONFIRMED_ACTION = "[otp action] confirmed otp";
export const VERIFYOTP_FAILED_ACTION = "[otp action] failed otp";
export const VERIFYOTP_DONE_ACTION = "[otp action] Id otp";
export const VERIFYOTP_FAILED_ACTION2 = "[otp action] failed otp";

export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";

export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
// export const STRIPE_PAYEMENT_ACTION = "[stripe action] confirmed loading";
// export const STRIPE_PAYEMENT_FAILED = "[stripe action] failed action";

export const UPDATE_PROFILE_CONFIRM_ACTION = "[Update Profile action] confirm";
export const UPDATE_PROFILE_FAILED_ACTION = "[Update Profile action] failed";
export const UPDATE_PROFILE_COMPLETE_ACTION =
  "[Update profile action] complete";

export const CHANGE_PASSWORD_CONFIRM_ACTION =
  "[Change Password action] confirm";
export const CHANGE_PASSWORD_FAILED_ACTION = "[Change Password action] failed";
export const CHANGE_PASSWORD_COMPLETE_ACTION =
  "[Change Password action] complete";
// forgotpassword
export const FORGOT_PASSWORD_OTP_CONFIRM_ACTION =
  "[Forgot Password otp action] confirm";
export const FORGOT_PASSWORD_OTP_FAILED_ACTION =
  "[Forgot Password otp action] failed";
export const FORGOT_PASSWORD_OTP_COMPLETE_ACTION =
  "[Forgot Password otp action] complete";
export const FORGOT_PASSWORD_CONFIRM_ACTION =
  "[Forgot Password  action] confirm";
export const FORGOT_PASSWORD_FAILED_ACTION = "[Forgot Password action] failed";
export const FORGOT_PASSWORD_COMPLETE_ACTION =
  "[Forgot Password action] complete";
///Store
export const GET_SIORE_CONFIRMED_ACTION = "[get store action] confirmed ";
export const GET_SIORE_FAILED_ACTION = "[get store action] failed ";
export const SELECT_SIORE_CONFIRMED_ACTION = "[select store action] confirmed ";
export const SELECT_SIORE_FAILED_ACTION = "[select store action] failed ";
export const STORE_STATUS_DONE_ACTION = "[store status change action] done";
export const STORE_STATUS_FAILED_ACTION = "[store status change action] failed";
export const IS_STORE_SELECTED_ACTION = "[store empty action] Empty";
export const UPDATE_STORE_CONFIRM_ACTION = "[store update] confirm";
export const UPDATE_STORE_COMPLETE_ACTION = "[store update] complete";
export const UPDATE_STORE_FAILED_ACTION = "[store update] failed";
export const UPDATE_SEO_CONFIRM_ACTION = "[seo update] confirm";
export const UPDATE_SEO_COMPLETE_ACTION = "[seo update] complete";
export const UPDATE_SEO_FAILED_ACTION = "[seo update] failed";
export const STRIPE_PACKAGE_UPDATION_CONFIRMED_ACTION =
  "[package update] confirm";
export const STRIPE_SUCCESS_CONFIRMED_Action =
  "[stripe success action] confirmed ";

export const GETCURRENT_CLIENT_SUCCESS_CONFIRMED_ACTION =
  "[get client success action] confirmed ";
export const GETCURRENT_CLIENT_FAILED_ACTION =
  "[get client failed action] failed ";
export const CLEAR_REDUX_ACTION = "[clear redux action] clear";
export const CONTRACT_DATA_SAVE = "[save contact data] done";
export const MODE = "[mode]";
export const SLIDER_SECTION_CREATE_CONFIRM_ACTION =
  "[slider section create confirm]";
export const SLIDER_SECTION_CREATE_FAILED_ACTION =
  "[slider section create failed]";
export const SLIDER_SECTION_CREATE_SUCCESS_ACTION =
  "[slider section create success]";

export const SLIDER_SECTION_GET_CONFIRM_ACTION = "[slider section get confirm]";
export const SLIDER_SECTION_GET_FAILED_ACTION = "[slider section get failed]";

export const SLIDER_SECTION_UPDATE_CONFIRM_ACTION =
  "[slider section update confirm]";
export const SLIDER_SECTION_UPDATE_FAILED_ACTION =
  "[slider section update failed]";
export const SLIDER_SECTION_UPDATE_SUCCESS_ACTION =
  "[slider section update success]";

export const SLIDER_SECTION_DELETE_CONFIRM_ACTION =
  "[slider section delete confirm]";
export const SLIDER_SECTION_DELETE_FAILED_ACTION =
  "[slider section delete failed]";
export const SLIDER_SECTION_DELETE_SUCCESS_ACTION =
  "[slider section delete success]";

export const SLIDER_TITLE_UPDATE_CONFIRM_ACTION =
  "[slider title update confirm]";
export const SLIDER_TITLE_UPDATE_FAILED_ACTION = "[slider title update failed]";
export const SLIDER_TITLE_UPDATE_SUCCESS_ACTION =
  "[slider title update success]";

export const SLIDER_TITLE_GET_FAILED_ACTION = "[slider title get failed]";
export const SLIDER_TITLE_GET_CONFIRM_ACTION = "[slider title get success]";

export const PROFILE_SECTION_UPDATE_CONFIRM_ACTION =
  "[profile section update confirm]";
export const PROFILE_SECTION_UPDATE_FAILED_ACTION =
  "[profile section update failed]";
export const PROFILE_SECTION_UPDATE_SUCCESS_ACTION =
  "[profile section update success]";
export const CONTRACT_COMPILE_DATA_SAVE = "[save compile data]";

export const CURRENT_STORE_SELECT = "[current store]";
export const CLEAR_STORE_ID = "[Clear store id]";
export const STORE_CREATION_STATUS = "[store creation status]";

export const GET_REPORTS_CONFIRMED_ACTION = "[get reports action] confirmed ";
export const GET_REPORTS_FAILED_ACTION = "[get reports action] failed ";
// social media
export const GET_SOCAILMEDIA_CONFIRMED_ACTION =
  "[get socialmedia action] confirmed ";
export const GET_SOCAILMEDIA_FAILED_ACTION = "[get socialmedia action] failed ";
export const ADD_SOCAILMEDIA_CONFIRMED_ACTION = "[socialmedia add] confirm";
export const ADD_SOCAILMEDIA_COMPLETE_ACTION = "[socialmedia add] complete";
export const ADD_SOCAILMEDIA_FAILED_ACTION = "[socialmedia add] failed";
export const UPDATE_SOCAILMEDIA_CONFIRMED_ACTION = "[socialmedia add] confirm";
export const UPDATE_SOCAILMEDIA_FAILED_ACTION = "[socialmedia add] failed";
export const UPDATE_SOCAILMEDIA_COMPLETE_ACTION = "[socialmedia add] complete";
export const DELETE_SOCAILMEDIA_CONFIRM_ACTION =
  "[socialmedia delete action] confirm";
export const DELETE_SOCAILMEDIA_FAILED_ACTION =
  "[socialmedia  delete action] failed";
export const DELETE_SOCAILMEDIA_COMPLETE_ACTION =
  "[socialmedia*  delete action] complete";
export const ADD_CONTACTUS_COMPLETE_ACTION = "[contact us add] complete";
export const ADD_CONTACTUS_CONFIRMED_ACTION = "[contact us add] confirm";
export const ADD_CONTACTUS_FAILED_ACTION = "[contact us add] failed";

// export const stripePaymentMethodHandler = async (props, history) => {
// const { amount, result } = data;
// if (result.error) {
//   // show error in payment form
//   cb(result);
// } else {
//   const paymentResponse = await stripePayment({
//     payment_method_id: result.paymentMethod.id,
//     name: result.paymentMethod.billing_details.name,
//     email: result.paymentMethod.billing_details.email,
//     amount: amount,
//   });
//   console.log(paymentResponse);
//   cb(paymentResponse);
// }
//   return (dispatch) => {
//     stripe(props.name, props.payment_method_id, props.email, props.amount)
//       .then((response) => {
//         console.log("response", response.data);

//         saveTokenInLocalStorage(response.data);
//         // runLogoutTimer(dispatch, 3600 * 1000, history);

//         dispatch(confirmedStripeAction(response.data));

//         history.push("/login");
//       })
//       .catch((error) => {
//         // console.log("error", error.response.data);

//         const errorMessage = formatError(error?.response?.data?.err?.message);
//         dispatch(stripeFailedAction(errorMessage));
//       });
//   };
// };

export function modeChange(mode) {
  return {
    type: MODE,
    payload: mode,
  };
}

export function clearReduxAction() {
  return {
    type: CLEAR_REDUX_ACTION,
  };
}
export function ClearStoreID() {
  return {
    type: CLEAR_STORE_ID,
  };
}

export function StoreCreationStatus(value) {
  return {
    type: STORE_CREATION_STATUS,
    payload: value,
  };
}

export function logout(history) {
  localStorage.removeItem("c_storeid");
  localStorage.removeItem("c_wimos");
  localStorage.removeItem("AuthStatus");
  localStorage.removeItem("c_expirytime");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function StoreChange(history) {
  // localStorage.removeItem("selectedStore");
  // console.log("gfghj");
  return (dispatch) => {
    dispatch(isStoreSelected(false));
    // history.push("/dashboard");
  };
}
export function StripeSuccessAction(sid, history) {
  return (dispatch) => {
    dispatch(SelectStoreAction(sid));

    dispatch(stripesuccessConfirmedAction());
    history.push("/dashboard");
  };
}

export function StripePackageUpdationAction(history) {
  return (dispatch) => {
    dispatch(stripePackageUpdationConfirmedAction());
    history.push("/dashboard");
  };
}

export function saveContractDataAction(Data) {
  return {
    type: CONTRACT_DATA_SAVE,
    payload: Data,
  };
}
export function saveContractPayloadForCompaile(Data) {
  return {
    type: CONTRACT_COMPILE_DATA_SAVE,
    payload: Data,
  };
}

export function saveDataForCompaile(Data) {
  return (dispatch) => {
    StoreContractPayload(Data)
      .then((response) => {
        dispatch(saveContractPayloadForCompaile(Data));
      })
      .catch((error) => {
        const errorMessage = formatError("Something Went Wrong");
      });
  };
}

export function selectPackageAction(Data, Continue) {
  // console.log("value", Data);
  return (dispatch) => {
    SelectPackage(Data)
      .then((response) => {
        //  console.log("response15", response.data);
        // saveTokenInLocalStorage(response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);

        const successMessage = formatSuccess("Package selected Successfully ");
        dispatch(selectpackageConfirmedAction(successMessage));
        Continue();
        //.push("/dashboard");
      })
      .catch((error) => {
        // console.log("errorsss", error.response);
        const errorMessage = formatError("Something Went Wrong");
        dispatch(selectpackageFailedAction(errorMessage));
      });
  };
}

export function otpAction(Data, setStep, step, setNextbutton) {
  // console.log("value", Data);
  return (dispatch) => {
    // console.log("1235", Data);
    createOtp(Data)
      .then((response) => {
        // saveTokenInLocalStorage(response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(createotpConfirmedAction(response.data));
        // const successMessage = formatSuccess(
        //   "create Otp Successfully & check your mail"
        // );
        // dispatch(createotpDoneAction(successMessage));
        // setInstrumodal(false);
        setStep(step + 1);
        //history.push("/dashboard");
        setNextbutton(false);
      })
      .catch((error) => {
        //  console.log("err", error.response.data.errors);
        const errorMessage = formatErrorMessages(error.response?.data?.errors);
        dispatch(createotpFailedAction(errorMessage));
        setNextbutton(false);
      });
  };
}

export function ContarctStandard(
  Data,
  setStep,
  step,
  contractType,
  isnewstore
) {
  // console.log("value", Data);
  return (dispatch) => {
    // console.log("1235", Data);
    ContarctStand(Data)
      .then((response) => {
        dispatch(contactstandardConfirmedAction(response.data));
        if (contractType === "marketplace") {
          if (isnewstore) {
            UpdateStoreStep(4);
          } else {
            UpdateStep(7);
          }
          setStep(step + 1);
        } else {
          if (isnewstore) {
            UpdateStoreStep(7);
            setStep(7);
          } else {
            UpdateStep(10);
            setStep(10);
          }
        }
      })
      .catch((error) => {
        //  console.log("err", error.response.data.errors);
        const errorMessage = formatErrorMessages(error?.response?.data?.errors);
        dispatch(contactstandardFailedAction(errorMessage));
      });
  };
}

export function verifyotpAction(Data, setStep, step, setOtpData, otpData) {
  return (dispatch) => {
    verifyOtp(Data)
      .then((response) => {
        // console.log("responseverify", response.data);
        //saveTokenInLocalStorage(response.data.data);
        //console.log("responseid", response.data);
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        const expirytime = Date.parse(tomorrow);
        if (response.data.status) {
          localStorage.setItem("c_wimos", response?.data?.token);
          localStorage.setItem("c_expirytime", expirytime);
        }
        dispatch(verifyotpConfirmedAction(response.data));
        const successMessage = formatSuccess(" OTP verified Successfully");
        dispatch(verifyotpDoneAction(successMessage));
        setStep(step + 1);
        UpdateStep(4);
      })
      .catch((error) => {
        console.log("err=res========:", error?.response);
        console.log("err=dat========:", error?.data);
        console.log("err=type========:", typeof error);

        const errorMessage = formatError(
          error?.response?.data?.errors?.length
            ? error?.response?.data?.errors[0]?.message
            : "OTP verification error"
        );
        dispatch(verifyotpFailedAction(errorMessage));
        // dispatch(verifyotpFailedAction2());
        setOtpData("");
        otpData = "";
      });
  };
}

export function storeAction({
  Data,
  setStep,
  step,
  isnewstore,
  setNextbutton,
  contractType,
}) {
  // localStorage.getItem("c_wimos");
  return (dispatch) => {
    createStore(Data)
      .then((response) => {
        dispatch(createstoreConfirmedAction(response?.data));
        if (isnewstore) {
        } else {
          dispatch(selectstoreConfirmedAction(response?.data?.data));
        }
        localStorage.setItem("c_storeid", response?.data?.data?.id);
        // const successMessage = formatSuccess("store created Successfully ");
        // dispatch(createstoreDoneAction(successMessage));

        // console.log("apiiii isnewstore", isnewstore);
        if (isnewstore) {
          UpdateStoreStep(3);
          if (contractType === "single_store") {
            setStep(7);
          } else {
            setStep(step + 1);
          }
        } else {
          if (contractType === "single_store") {
            UpdateStep(10);
            setStep(10);
          } else {
            console.log("in marketplace--->");
            UpdateStep(6);
            setStep(step + 1);
            setNextbutton(false);
          }
        }
        //setNextbutton(false);
      })
      .catch((error) => {
        //  console.log("errorsss", error.response);
        // const errorMessage = formatError("error");
        //console.log("err", error.response.data.errors);
        const errorMessage = formatErrorMessages(error?.response?.data?.errors);
        dispatch(createstoreFailedAction(errorMessage));
        setNextbutton(false);
      });
  };
}

export function contractAction(Data, Continue) {
  //
  return (dispatch) => {
    contract(Data)
      .then((response) => {
        //const successMessage = formatSuccess("Contract Updated Successfully");
        // dispatch(contractCompleteAction(successMessage));
        //.push("/dashboard");
        //console.log(response.data);
      })

      .catch((error) => {
        // console.log("err12356", error.response.data.errors[0].message);
        const errorMessage = formatError("Error While Creating Contract");
        dispatch(contractFailedAction(errorMessage));
      });
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        // console.log("res", response.data);
        // saveTokenInLocalStorage(response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        // console.log("responseid", response.data);

        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        const expirytime = Date.parse(tomorrow);

        if (response.data.loginSuccess) {
          localStorage.setItem("c_wimos", response.data.token);
          localStorage.setItem("c_expirytime", expirytime);
        }

        if (response.data.currentStep === 15) {
          //  console.log("JNF", response.data.currentStep);
          localStorage.setItem("AuthStatus", true);
          dispatch(loginConfirmedAction(response.data));
          history.push("/dashboard");
        } else {
          if (response.data.currentStep > 5) {
            dispatch(GetStoreAction(response.data._id));
          }
          if (response.data.currentStep >= 8) {
            dispatch(
              saveContractPayloadForCompaile(
                response.data.createContractPayload
              )
            );
          }
          dispatch(verifyotpConfirmedAction(response));
          history.push("/page-register");
        }

        //dispatch(GetStoreAction(response.data._id, history));

        //console.log("test");
        // if (response.data.currentStep === 9) {
        //   console.log("JNF", response.data.currentStep);
        //   history.push("/dashboard");
        // } else {
        //   history.push("/page-register");
        // }
      })
      .catch((error) => {
        // mconsole.log("err",error.response.data.err.message);

        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Sign in Error");
        }
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

// Store

export function GetStoreAction(clientid, history) {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    GetStore(clientid)
      .then((response) => {
        // if (response.data.length === 0) {
        //   console.log("res", history);

        //   // history.push("/page-register");
        // } else {
        // saveStoresInLocalStorage(response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getstoreConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        // console.log("err",error.response.data.err.message);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Stores"
        );
        dispatch(getstoreFailedAction(errorMessage));
      });
  };
}

// export function ToRegister(history) {
//   // console.log(history);
//   localStorage.removeItem("userDetails");
//   localStorage.removeItem("storeDetails");

//   history.push("/page-register");
//   return {
//     type: LOGOUT_ACTION,
//   };
// }

export function SelectStoreAction(storeid, regcompleted, history) {
  // console.log("bsujdbs", history);
  // console.log("hai", storeid);
  return (dispatch) => {
    SelectStore(storeid)
      .then((response) => {
        //console.log("res", response.data);

        // selectedStoresInLocalStorage(response.data);
        //  runLogoutTimer(dispatch, 3600 * 1000, history);
        if (regcompleted) {
          if (response.data.currentStep < 12) {
            //console.log("fdghjkl");
            if (response.data.currentStep >= 5) {
              dispatch(
                saveContractPayloadForCompaile(
                  response.data.createContractPayload
                )
              );
            }
            //console.log("hj", history);
            history.push("/addnewstore");
            dispatch(selectCurrentstoreAction(response.data));
          } else {
            dispatch(selectstoreConfirmedAction(response.data));
          }
        } else {
          dispatch(selectstoreConfirmedAction(response.data));
        }
        localStorage.setItem("c_storeid", response.data.id);
      })
      .catch((error) => {
        // console.log("err",error.response.data.err.message);
        const errorMessage = formatError(
          "Something Went Wrong Selecting Stores"
        );
        dispatch(selectstoreFailedAction(errorMessage));
      });
  };
}

export function GetCurrentClientAction() {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    GetCurrentClient()
      .then((response) => {
        //console.log("res", response.data);
        // selectedStoresInLocalStorage(response.data);
        //  runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getcurrentclientsuccessConfirmedAction(response.data));
      })
      .catch((error) => {
        // console.log("err",error.response.data.err.message);
        const errorMessage = formatError(
          "Something Went Wrong geting current client"
        );
        dispatch(getcurrentclientFailedAction(errorMessage));
      });
  };
}

export function storeStatusAction(storeid, status, setmodalCreate, SetLoader) {
  console.log("status", status);
  return (dispatch) => {
    StoreStatus(storeid, status)
      .then((response) => {
        //console.log("res", response.data);
        // selectedStoresInLocalStorage(response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(SelectStoreAction(storeid));
        const successMessage = formatSuccess(
          "Store Status Change Successfully"
        );
        dispatch(storeStatusDoneAction(successMessage));
        SetLoader(false);
        setmodalCreate(false);
      })
      .catch((error) => {
        // console.log("err",error.response.data.err.message);
        const errorMessage = formatError("Something Went Wrong ");
        dispatch(storeStatusFailedAction(errorMessage));
        SetLoader(false);
        setmodalCreate(false);
      });
  };
}

export function stripesuccessConfirmedAction(data) {
  localStorage.setItem("AuthStatus", true);
  return {
    type: STRIPE_SUCCESS_CONFIRMED_Action,
    payload: data,
  };
}

export function getcurrentclientsuccessConfirmedAction(data) {
  return {
    type: GETCURRENT_CLIENT_SUCCESS_CONFIRMED_ACTION,
    payload: data,
  };
}
export function getcurrentclientFailedAction(error) {
  return {
    type: GETCURRENT_CLIENT_FAILED_ACTION,
    payload: error,
  };
}

export function stripePackageUpdationConfirmedAction(data) {
  localStorage.setItem("AuthStatus", true);
  return {
    type: STRIPE_PACKAGE_UPDATION_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getstoreConfirmedAction(data) {
  return {
    type: GET_SIORE_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getstoreFailedAction(error) {
  return {
    type: GET_SIORE_FAILED_ACTION,
    payload: error,
  };
}

export function selectstoreConfirmedAction(data) {
  return {
    type: SELECT_SIORE_CONFIRMED_ACTION,
    payload: data,
  };
}

export function selectCurrentstoreAction(data) {
  return {
    type: CURRENT_STORE_SELECT,
    payload: data,
  };
}

export function selectstoreFailedAction(error) {
  return {
    type: SELECT_SIORE_FAILED_ACTION,
    payload: error,
  };
}

export function storeStatusDoneAction(message) {
  return {
    type: STORE_STATUS_DONE_ACTION,
    payload: message,
  };
}

export function storeStatusFailedAction(error) {
  return {
    type: STORE_STATUS_FAILED_ACTION,
    payload: error,
  };
}

export function isStoreSelected(status) {
  // console.log("reach");
  return {
    type: IS_STORE_SELECTED_ACTION,
    payload: status,
  };
}

export function UpdateProfileAction(
  name,
  phone_number,
  phone_code,
  nationality,
  SetLoader
) {
  return (dispatch) => {
    UpdateProfile(name, phone_number, phone_code, nationality)
      .then((response) => {
        // saveTokenInLocalStorage(response.data.data);
        dispatch(updateProfileConfirmAction(response.data));
        const successMessage = formatSuccess("Profile Updated Successfully");
        dispatch(updateCompleteAction(successMessage));
        SetLoader(false);
      })
      .catch((error) => {
        // console.log("err", error);
        const errorMessage = formatError("Something went wrong");
        dispatch(updateFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function changePasswordAction(old_password, new_password, SetBtnLoader) {
  return (dispatch) => {
    ChangePassword(old_password, new_password)
      .then((response) => {
        //  saveTokenInLocalStorage(response.data);
        dispatch(changePasswordConfirmAction(response.data));
        const successMessage = formatSuccess("Change Password Successfully");
        dispatch(changePasswordCompleteAction(successMessage));
        SetBtnLoader(false);
      })
      .catch((error) => {
        // console.log("err", error);
        const errorMessage = formatError("Change Password Error");
        dispatch(changePasswordFailedAction(errorMessage));
        SetBtnLoader(false);
      });
  };
}

export function changePasswordConfirmAction(data) {
  return {
    type: CHANGE_PASSWORD_CONFIRM_ACTION,
  };
}

export function selectpackageFailedAction(data) {
  return {
    type: SELECTPACKAGE_FAILED_ACTION,
    payload: data,
  };
}

export function changePasswordFailedAction(message) {
  return {
    type: UPDATE_PROFILE_FAILED_ACTION,
    payload: message,
  };
}
export function changePasswordCompleteAction(message) {
  return {
    type: UPDATE_PROFILE_COMPLETE_ACTION,
    payload: message,
  };
}

export function selectpackageConfirmedAction(data) {
  return {
    type: SELECTPACKAGE_CONFIRMED_ACTION,
    payload: data,
  };
}

export function checkdomainFailedAction(data) {
  return {
    type: CHECKDOMAIN_FAILED_ACTION,
    payload: data,
  };
}

export function checkdomainConfirmedAction(data) {
  return {
    type: CHECKDOMAIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function contactstandardFailedAction(data) {
  return {
    type: CONTRACTSTANDARD_FAILED_ACTION,
    payload: data,
  };
}
export function contactstandardConfirmedAction(data) {
  return {
    type: CONTRACTSTANDARD_CONFIRMED_ACTION,
    payload: data,
  };
}
export function contactstandardCompleteAction(data) {
  return {
    type: CONTRACTSTANDARD_COMPLETE_ACTION,
    payload: data,
  };
}

export function createotpFailedAction(data) {
  return {
    type: CREATEOTP_FAILED_ACTION,
    payload: data,
  };
}
export function createotpConfirmedAction(data) {
  return {
    type: CREATEOTP_CONFIRMED_ACTION,
    payload: data,
  };
}
export function createotpDoneAction(data) {
  return {
    type: CREATEOTP_DONE_ACTION,
    payload: data,
  };
}

export function verifyotpFailedAction(data) {
  return {
    type: VERIFYOTP_FAILED_ACTION,
    payload: data,
  };
}
export function verifyotpFailedAction2(data) {
  return {
    type: VERIFYOTP_FAILED_ACTION2,
    payload: data,
  };
}
export function verifyotpDoneAction(data) {
  return {
    type: VERIFYOTP_DONE_ACTION,
    payload: data,
  };
}

export function verifyotpConfirmedAction(data) {
  return {
    type: VERIFYOTP_CONFIRMED_ACTION,
    payload: data,
  };
}

export function createstoreFailedAction(data) {
  return {
    type: CREATESTORE_FAILED_ACTION,
    payload: data,
  };
}

export function createstoreDoneAction(data) {
  return {
    type: CREATESTORE_DONE_ACTION,
    payload: data,
  };
}
export function createstoreConfirmedAction(data) {
  return {
    type: CREATESTORE_CONFIRMED_ACTION,
    payload: data,
  };
}
export function contractFailedAction(data) {
  return {
    type: CREATESTORE_FAILED_ACTION,
    payload: data,
  };
}

export function contractConfirmedAction(data) {
  return {
    type: CONTRACT_CONFIRMED_ACTION,
    payload: data,
  };
}
export function contractCompleteAction(message) {
  return {
    type: CONTRACT_COMPLETE_ACTION,
    payload: message,
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

// export function confirmedOtpAction(payload) {
//   return {
//     type: OTP_CONFIRMED_ACTION,
//     payload,
//   };
// }
// export function confirmedStripeAction(payload) {
//   return {
//     type: STRIPE_PAYEMENT_ACTION,
//     payload,
//   };
// }
// export function stripeFailedAction(payload) {
//   return {
//     type: STRIPE_PAYEMENT_FAILED,
//     payload,
//   };
// }
// export function otpFailedAction(message) {
//   return {
//     type: OTP_FAILED_ACTION,
//     payload: message,
//   };
// }

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function updateProfileConfirmAction(data) {
  return {
    type: UPDATE_PROFILE_CONFIRM_ACTION,
    payload: data,
  };
}

export function updateFailedAction(message) {
  return {
    type: UPDATE_PROFILE_FAILED_ACTION,
    payload: message,
  };
}

export function updateCompleteAction(message) {
  return {
    type: UPDATE_PROFILE_COMPLETE_ACTION,
    payload: message,
  };
}

export function UpdateStoreAction(Data, storeid, SetLoader, setModalCentered) {
  return (dispatch) => {
    UpdateStore(Data)
      .then((response) => {
        // console.log("response.data", response.data);
        dispatch(updateStoreConfirmAction(response.data));
        const successMessage = formatSuccess("Store Updated Successfully");
        dispatch(updateStoreCompleteAction(successMessage));
        // SetLoader(false);
        dispatch(SelectStoreAction(storeid));
        SetLoader(false);
        setModalCentered(false);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error?.response?.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        }
        dispatch(updateStoreFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function UpdateSEOAction(Data, storeid, SetLoader) {
  return (dispatch) => {
    UpdateSeo(Data)
      .then((response) => {
        //  console.log("SEOSCC", response.data);
        dispatch(updateSeoConfirmAction(response.data));
        const successMessage = formatSuccess("SEO Updated Successfully");
        dispatch(updateSeoCompleteAction(successMessage));
        dispatch(SelectStoreAction(storeid));
        SetLoader(false);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("SEO Updated Error");
        }
        dispatch(updateSeoFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function updateStoreConfirmAction(data) {
  return {
    type: UPDATE_STORE_CONFIRM_ACTION,
    payload: data,
  };
}

export function updateStoreFailedAction(message) {
  return {
    type: UPDATE_STORE_FAILED_ACTION,
    payload: message,
  };
}

export function updateStoreCompleteAction(message) {
  return {
    type: UPDATE_STORE_COMPLETE_ACTION,
    payload: message,
  };
}
export function updateSeoConfirmAction(data) {
  return {
    type: UPDATE_SEO_CONFIRM_ACTION,
    payload: data,
  };
}

export function updateSeoFailedAction(message) {
  return {
    type: UPDATE_SEO_FAILED_ACTION,
    payload: message,
  };
}

export function updateSeoCompleteAction(message) {
  return {
    type: UPDATE_SEO_COMPLETE_ACTION,
    payload: message,
  };
}

export function forgotpasswordotpAction(Data, nextStep) {
  return (dispatch) => {
    OtpPassword(Data)
      .then((response) => {
        // console.log("response", response.data);
        dispatch(forgotPasswordotpConfirmAction(response.data));
        const successMessage = formatSuccess("OTP Send Successfully");
        dispatch(forgotpasswordotpCompleteAction(successMessage));
        nextStep();
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("OTP Generate Error");
        }
        dispatch(forgotpasswordotpFailedAction(errorMessage));
      });
  };
}

export function forgotPasswordotpConfirmAction(data) {
  return {
    type: FORGOT_PASSWORD_OTP_CONFIRM_ACTION,
    payload: data,
  };
}

export function forgotpasswordotpFailedAction(message) {
  return {
    type: FORGOT_PASSWORD_OTP_FAILED_ACTION,
    payload: message,
  };
}

export function forgotpasswordotpCompleteAction(message) {
  return {
    type: FORGOT_PASSWORD_OTP_COMPLETE_ACTION,
    payload: message,
  };
}

export function forgotpasswordAction(Data, history, setState) {
  // console.log("SetBtnLoadersssss", setState);
  return (dispatch) => {
    ForgotPassWord()
      .then((response) => {
        //console.log("response", response.data);
        dispatch(forgotPasswordConfirmAction(response.data));
        const successMessage = formatSuccess("Password changed successfully");
        dispatch(forgotpasswordCompleteAction(successMessage));
        history.push("/login");
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Error while resetting password");
        }
        // SetBtnLoader(false);
        setState({
          SetBtnLoader: false,
        });

        dispatch(forgotpasswordFailedAction(errorMessage));
      });
  };
}

export function forgotPasswordConfirmAction(data) {
  return {
    type: FORGOT_PASSWORD_CONFIRM_ACTION,
    payload: data,
  };
}

export function forgotpasswordFailedAction(message) {
  return {
    type: FORGOT_PASSWORD_FAILED_ACTION,
    payload: message,
  };
}

export function forgotpasswordCompleteAction(message) {
  return {
    type: FORGOT_PASSWORD_COMPLETE_ACTION,
    payload: message,
  };
}

export function createSliderSection(Data, storeid, SetLoader, history) {
  return (dispatch) => {
    silderSection(Data)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(createSliderSectionConfirmAction(response.data));
        const successMessage = formatSuccess("Section Updated sucessfully");
        dispatch(createSliderSectionCompleteAction(successMessage));
        SetLoader(false);
        history.push("/customize-section");
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        }
        //  else {
        //   errorMessage = formatError("Error while add new section");
        // }

        dispatch(createSliderSectionFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function createSliderSectionConfirmAction(data) {
  return {
    type: SLIDER_SECTION_CREATE_CONFIRM_ACTION,
    payload: data,
  };
}

export function createSliderSectionFailedAction(message) {
  return {
    type: SLIDER_SECTION_CREATE_FAILED_ACTION,
    payload: message,
  };
}

export function createSliderSectionCompleteAction(message) {
  return {
    type: SLIDER_SECTION_CREATE_SUCCESS_ACTION,
    payload: message,
  };
}

export function getSliderSection(storeid) {
  return (dispatch) => {
    getSlider(storeid)
      .then((response) => {
        //   console.log("response", response.data);
        dispatch(getSliderSectionConfirmAction(response.data));
        // const successMessage = formatSuccess("Section Updated sucessfully");
        // dispatch(createSliderSectionCompleteAction(successMessage));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        }
        // else {
        //   errorMessage = formatError("Somethig went wrong");
        // }

        dispatch(getSliderSectionFailedAction(errorMessage));
      });
  };
}

export function getSliderSectionFailedAction(message) {
  return {
    type: SLIDER_SECTION_GET_FAILED_ACTION,
    payload: message,
  };
}

export function getSliderSectionConfirmAction(payload) {
  return {
    type: SLIDER_SECTION_GET_CONFIRM_ACTION,
    payload: payload,
  };
}

export function updateSliderSection(Data, storeid, SetLoader, history) {
  return (dispatch) => {
    updateSlider(Data)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(updateSliderSectionConfirmAction(response.data));
        const successMessage = formatSuccess("Section updated sucessfully");
        dispatch(updateSliderSectionCompleteAction(successMessage));
        SetLoader(false);
        history.push("/customize-section");
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        }
        // else {
        //   errorMessage = formatError("Error while update new section");
        // }

        dispatch(updateSliderSectionFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function updateSliderSectionConfirmAction(data) {
  return {
    type: SLIDER_SECTION_UPDATE_CONFIRM_ACTION,
    payload: data,
  };
}

export function updateSliderSectionFailedAction(message) {
  return {
    type: SLIDER_SECTION_UPDATE_FAILED_ACTION,
    payload: message,
  };
}

export function updateSliderSectionCompleteAction(message) {
  return {
    type: SLIDER_SECTION_UPDATE_SUCCESS_ACTION,
    payload: message,
  };
}

export function deteteSliderSection(sectionid, storeid) {
  // console.log("sectionid", sectionid);
  return (dispatch) => {
    deleteSlider(storeid, sectionid)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(deleteSliderSectionConfirmAction(response.data));
        const successMessage = formatSuccess("Section deleted sucessfully");
        dispatch(deleteSliderSectionCompleteAction(successMessage));
        dispatch(getSliderSection(storeid));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Error while update new section");
        }

        dispatch(deleteSliderSectionFailedAction(errorMessage));
      });
  };
}

export function deleteSliderSectionConfirmAction(data) {
  return {
    type: SLIDER_SECTION_DELETE_CONFIRM_ACTION,
    payload: data,
  };
}

export function deleteSliderSectionFailedAction(message) {
  return {
    type: SLIDER_SECTION_DELETE_FAILED_ACTION,
    payload: message,
  };
}

export function deleteSliderSectionCompleteAction(message) {
  return {
    type: SLIDER_SECTION_DELETE_SUCCESS_ACTION,
    payload: message,
  };
}

export function updateSliderTitle(Data, storeid, SetLoader) {
  return (dispatch) => {
    sectionTitle(Data)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(updateSliderTitleConfirmAction(response.data));
        const successMessage = formatSuccess(
          "Section heading updated sucessfully"
        );
        dispatch(updateSliderTitleCompleteAction(successMessage));
        SetLoader(false);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Error while update new section");
        }

        dispatch(updateSliderTitleFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function updateSliderTitleConfirmAction(data) {
  return {
    type: SLIDER_TITLE_UPDATE_CONFIRM_ACTION,
    payload: data,
  };
}

export function updateSliderTitleFailedAction(message) {
  return {
    type: SLIDER_TITLE_UPDATE_FAILED_ACTION,
    payload: message,
  };
}

export function updateSliderTitleCompleteAction(message) {
  return {
    type: SLIDER_TITLE_UPDATE_SUCCESS_ACTION,
    payload: message,
  };
}

export function getSliderTitle(storeid) {
  return (dispatch) => {
    getsectionTitle(storeid)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(getSliderTitleConfirmAction(response.data));
        // const successMessage = formatSuccess("Section Updated sucessfully");
        // dispatch(createSliderSectionCompleteAction(successMessage));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Somethig went wrong");
        }

        dispatch(getSliderTitleFailedAction(errorMessage));
      });
  };
}

export function getSliderTitleFailedAction(message) {
  return {
    type: SLIDER_TITLE_GET_FAILED_ACTION,
    payload: message,
  };
}

export function getSliderTitleConfirmAction(payload) {
  return {
    type: SLIDER_TITLE_GET_CONFIRM_ACTION,
    payload: payload,
  };
}

export function updateProfileSection(Data, storeid, SetLoader) {
  return (dispatch) => {
    updateDummy(Data)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(updateProfileSectionConfirmAction(response.data));
        dispatch(SelectStoreAction(storeid));
        const successMessage = formatSuccess(
          "Profile sectiion updated sucessfully"
        );
        dispatch(updateProfileSectionCompleteAction(successMessage));

        SetLoader(false);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Error while update new section");
        }

        dispatch(updateProfileSectionFailedAction(errorMessage));
        SetLoader(false);
      });
  };
}

export function updateProfileSectionConfirmAction(data) {
  return {
    type: PROFILE_SECTION_UPDATE_CONFIRM_ACTION,
    payload: data,
  };
}

export function updateProfileSectionFailedAction(message) {
  return {
    type: PROFILE_SECTION_UPDATE_FAILED_ACTION,
    payload: message,
  };
}

export function updateProfileSectionCompleteAction(message) {
  return {
    type: PROFILE_SECTION_UPDATE_SUCCESS_ACTION,
    payload: message,
  };
}

export function AddAnalyticsData(Data, SetLoader) {
  // console.log("dataaa,Dat++", Data);
  return (dispatch) => {
    AddAnalytics(Data)
      .then((response) => {
        //  console.log("SEOSCC", response.data);
        dispatch(updateSeoConfirmAction(response.data));
        const successMessage = formatSuccess(
          "Google Analytics Added Successfully"
        );

        dispatch(updateSeoCompleteAction(successMessage));
        SetLoader(false);
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response?.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Google Analytics added Error");
        }

        dispatch(updateSeoFailedAction(errorMessage));
        SetLoader(false);
      });
    // SetLoader(false);
  };
}

export function GetReports(user) {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    getReportsData(user)
      .then((response) => {
        // if (response.data.length === 0) {
        //   console.log("res", history);

        //   // history.push("/page-register");
        // } else {
        // saveStoresInLocalStorage(response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getreportsConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        // console.log("err",error.response.data.err.message);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Report"
        );
        dispatch(getreportsFailedAction(errorMessage));
      });
  };
}
export function getreportsConfirmedAction(data) {
  return {
    type: GET_REPORTS_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getreportsFailedAction(error) {
  return {
    type: GET_REPORTS_FAILED_ACTION,
    payload: error,
  };
}

// get social media

export function GetSocialMedia(storeid) {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    GetSocialMediaData(storeid)
      .then((response) => {
        dispatch(getsocialmediaConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        const errorMessage = formatError(
          "Something Went Wrong When Loding Stores"
        );
        dispatch(getsocialmediaFailedAction(errorMessage));
      });
  };
}

export function getsocialmediaConfirmedAction(data) {
  return {
    type: GET_SOCAILMEDIA_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getsocialmediaFailedAction(error) {
  return {
    type: GET_SOCAILMEDIA_FAILED_ACTION,
    payload: error,
  };
}

// add socialmedia

export function AddSocialMedia(
  postData,
  storeid,
  SetBtnLoadeAdd,
  SetAddSocialModal,
  SetAddName,
  SetAddLink,
  setFavImage
) {
  console.log("AddSocialMedia --------------", postData);
  return (dispatch) => {
    AddSocialMediaData(postData)
      .then((response) => {
        // console.log("AddSocialMedia ++++++++++ ", response.data);
        dispatch(AddsocialmediaConfirmedAction(response.data));
        const successMessage = formatSuccess("Social Media Added Successfully");
        SetBtnLoadeAdd(false);
        SetAddSocialModal(false);
        SetAddName("")
        SetAddLink("")
        setFavImage({
          preview: "",
          raw: "",
          currentPreview: "",
        })

        dispatch(GetSocialMedia(storeid));

        dispatch(addsocialmediaCompleteAction(successMessage));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response?.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Social Media added Error");
        }
        SetBtnLoadeAdd(false);
        dispatch(AddsocialmediaFailedAction(errorMessage));
      });
  };
}
export function AddsocialmediaConfirmedAction(data) {
  return {
    type: ADD_SOCAILMEDIA_CONFIRMED_ACTION,
    payload: data,
  };
}

export function AddsocialmediaFailedAction(error) {
  return {
    type: ADD_SOCAILMEDIA_FAILED_ACTION,
    payload: error,
  };
}
export function addsocialmediaCompleteAction(message) {
  return {
    type: ADD_SOCAILMEDIA_COMPLETE_ACTION,
    payload: message,
  };
}

// update socailmedia

export function UpdateSocialMedia(
  Data,
  storeid,
  SetBtnLoadeEdit,
  SetEditSocialModal
) {
  // console.log("dataaa,Dat++", Data);
  return (dispatch) => {
    UpdateSocialMediaData(Data)
      .then((response) => {
        dispatch(updatesocialmediaConfirmAction(response.data));
        const successMessage = formatSuccess(
          "Social Media Updated Successfully"
        );

        dispatch(updatesocialmediaCompleteAction(successMessage));
        SetEditSocialModal(false);
        SetBtnLoadeEdit(false);
        dispatch(GetSocialMedia(storeid));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response?.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Social Media updated Error");
        }

        dispatch(updatesocialmediaFailedAction(errorMessage));
        SetBtnLoadeEdit(false);
      });
    // SetLoader(false);
  };
}
export function updatesocialmediaConfirmAction(data) {
  return {
    type: UPDATE_SOCAILMEDIA_CONFIRMED_ACTION,
    payload: data,
  };
}

export function updatesocialmediaFailedAction(message) {
  return {
    type: UPDATE_SOCAILMEDIA_FAILED_ACTION,
    payload: message,
  };
}

export function updatesocialmediaCompleteAction(message) {
  return {
    type: UPDATE_SOCAILMEDIA_COMPLETE_ACTION,
    payload: message,
  };
}

export function DeleteSocialMedia(
  Data,
  storeid,
  SetBtnLoadeDelete,
  SetDeleteSocialModal
) {
  // console.log("DataData=====", Data);
  return (dispatch) => {
    DeleteSocialMediaData(Data)
      .then((response) => {
        //console.log("response", response.data);
        dispatch(deletesocialmediaConfirmAction(response.data));
        const successMessage = formatSuccess(
          "Social media deleted sucessfully"
        );
        SetBtnLoadeDelete(false);
        SetDeleteSocialModal(false);
        dispatch(GetSocialMedia(storeid));
        dispatch(deletesocialmediaCompleteAction(successMessage));
      })
      .catch((error) => {
        SetBtnLoadeDelete(false);
        let errorMessage = "";
        if (error.response.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Error while delete social media");
        }

        dispatch(deletesocialmediaFailedAction(errorMessage));
      });
  };
}

export function deletesocialmediaConfirmAction(data) {
  return {
    type: DELETE_SOCAILMEDIA_CONFIRM_ACTION,
    payload: data,
  };
}

export function deletesocialmediaFailedAction(message) {
  return {
    type: DELETE_SOCAILMEDIA_FAILED_ACTION,
    payload: message,
  };
}

export function deletesocialmediaCompleteAction(message) {
  return {
    type: DELETE_SOCAILMEDIA_COMPLETE_ACTION,
    payload: message,
  };
}

// add contact

export function AddContact(postData, setLoader, storeid) {
  return (dispatch) => {
    AddContactData(postData)
      .then((response) => {
        // console.log("AddSocialMedia ++++++++++ ", response.data);
        dispatch(AddContactConfirmedAction(response.data));
        const successMessage = formatSuccess("Contact updated Successfully");
        setLoader(false);

        dispatch(addContactCompleteAction(successMessage));

        console.log("before selecct store", storeid);

        // call current store api
        dispatch(SelectStoreAction(storeid));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error.response?.status === 400) {
          let errMsg = error.response?.data?.errors.map((e) => {
            return e.message;
          });

          errorMessage = formatError(errMsg.join(","));
        } else {
          errorMessage = formatError("Contact Error");
        }
        setLoader(false);
        dispatch(AddContactFailedAction(errorMessage));
      });
  };
}
export function AddContactConfirmedAction(data) {
  return {
    type: ADD_CONTACTUS_CONFIRMED_ACTION,
    payload: data,
  };
}

export function AddContactFailedAction(error) {
  return {
    type: ADD_CONTACTUS_FAILED_ACTION,
    payload: error,
  };
}
export function addContactCompleteAction(message) {
  return {
    type: ADD_CONTACTUS_COMPLETE_ACTION,
    payload: message,
  };
}
