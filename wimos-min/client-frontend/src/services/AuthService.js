import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import success from "../images/swal-success.png";
import failed from "../images/swal-error.png";
import {
  loginConfirmedAction,
  logout,
  isStoreSelected,
  getstoreConfirmedAction,
  selectstoreConfirmedAction,
} from "../store/actions/AuthActions";
import { config } from "../config";
// import { store } from "../store/store";
// const state = store.getState();
// console.log("state", state);

// Live API url
let BaseUrl = ''
if (process.env.REACT_APP_ENV == 'DEV') {
  BaseUrl = process.env.REACT_APP_DEV_BASE_URL || config.dev_base_url;
} else {
  BaseUrl = process.env.REACT_APP_BASE_URL || config.base_url;
}

// let BaseUrl = "http://localhost:4000/api";

let instance = axios.create({
  // .. where we make our configurations
  baseURL: BaseUrl,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("c_wimos"),
  },
});

function tokenSet() {
  instance = axios.create({
    // .. where we make our configurations
    baseURL: BaseUrl,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("c_wimos"),
    },
  });
}

// export function packageData() {
//   //axios call
//   return instance.get(`/c2b-b2c/registration-data`);
// }
export function GetCurrentClient() {
  tokenSet();
  return instance.get(`/auth/currentclient`);
}

export function SelectPackage(Data) {
  tokenSet();
  //axios call
  // const postData = { Data };
  // return instance.post(`/auth/api/register`, postData);
  return instance.put(`/store/select-package`, Data);
}

export function contract(Data) {
  tokenSet();
  //axios call
  // const postData = { Data };
  // return instance.post(`/auth/api/register`, postData);
  return instance.post(`/contracts/create`, Data);
}

export function silderSection(Data) {
  tokenSet();
  return instance.post(`/store/creation-step`, Data);
}

export function getSlider(storeid) {
  tokenSet();
  return instance.get(`/store/creation-step/` + storeid);
}

export function updateSlider(Data) {
  tokenSet();
  return instance.put(`/store/creation-step`, Data);
}

export function deleteSlider(storeid, sectionid) {
  tokenSet();

  return instance.delete(
    `/store/creation-step?id=` + sectionid + `&storeid=` + storeid
  );
}

export function sectionTitle(Data) {
  tokenSet();
  return instance.post(`/store/theme-title`, Data);
}

export function getsectionTitle(storeid) {
  tokenSet();
  return instance.get(
    `/store/theme-title?storeid=` + storeid + `&type=firstSlider`
  );
}
export function updateDummy(Data) {
  tokenSet();
  return instance.post(`/store/user-profile-picture`, Data);
}

export function createOtp(Data) {
  //axios call
  // const postData = { Data };
  // console.log("123456789", Data);
  // return instance.post(`/auth/api/register`, postData);
  return instance.post(`/auth/otp-verification/create`, Data);
}

export function ContarctStand(Data) {
  tokenSet();
  return instance.post(`/store/save-contract-standard`, Data);
}

export function verifyOtp(Data) {
  //axios call
  // console.log("verifyOtp", Data);
  // const postData = { Data };
  // return instance.post(`/auth/api/register`, postData);
  return instance.post(`/auth/otp-verification/verify`, Data);
}

export function createStore(Data) {
  //axios call
  // const postData = { Data };
  // return instance.post(`/auth/api/register`, postData);
  tokenSet();
  return instance.post(`/store/create`, Data);
}

export function OtpPassword(Data) {
  return instance.post(`/auth/forgot-password`, Data);
}

export function ForgotPassWord(Data) {
  return instance.post(`/auth/verify-forgot-password`, Data);
}

export function login(email, password) {
  const postData = {
    email,
    password,
  };
  return instance.post(`/auth/signin`, postData);
}

export function UpdateProfile(name, phone_number, phone_code, nationality) {
  tokenSet();
  const postData = {
    name,
    phone_number,
    phone_code,
    nationality,
  };
  return instance.put(`/auth/update`, postData);
}

export function ChangePassword(old_password, new_password) {
  tokenSet();
  const postData = {
    old_password,
    new_password,
  };
  return instance.put(`/auth/change-password`, postData);
}
export function UpdateStep(step) {
  tokenSet();
  const postData = {
    step,
  };
  return instance.put(`/auth/update-step`, postData);
}

export function UpdateStoreStep(step) {
  tokenSet();
  const postData = {
    storeId: localStorage.getItem("c_storeid"),
    step,
  };
  return instance.put(`/store/update-step`, postData);
}

export function StoreContractPayload(data) {
  tokenSet();
  const payloadData = {
    contractData: data,
    storeId: data.storeId,
  };
  // console.log("payloadData", payloadData);
  return instance.post(`/store/contract-payload`, payloadData);
}

export function formatError(errorResponse) {
  swal("Oops", errorResponse, {
    // button: "Try Again!",
    icon: failed,
    buttons: {
      cancel: "Try Again!",
    },
  });
}

export function formatErrorMessages(errorResponse) {
  let errorMessage = "";
  if (Array.isArray(errorResponse)) {
    for (const [key, value] of Object.entries(errorResponse)) {
      errorMessage += value.message + "\n";
    }
  } else {
    errorMessage = "Something went wrong";
  }

  swal("Oops", errorMessage, {
    // button: "Try Again!",
    icon: failed,
    buttons: {
      cancel: "Try Again!",
    },
  });
}

export function formatSuccess(successResponse) {
  // swal("Done", successResponse, "success", { button: "Done", timer: 1000 });

  swal("Success!", successResponse, {
    // button: "Done",
    // showCancelButton: true,
    icon: success,
    buttons: {
      confirm: "Continue",
    },
    timer: 1000,
  });

  // console.log("hnjk", successResponse);
  // const notifyTopRight = () => {
  //   toast.success("✔️ " + successResponse, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // };

  // notifyTopRight();
}

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(new Date().getTime() + 3600 * 1000);
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

// export function runLogoutTimer(dispatch, timer, history) {
//   setTimeout(() => {
//     dispatch(logout(history));
//   }, timer);
// }

export function runLogoutTimer(dispatch, history) {
  let expirytime = localStorage.getItem("c_expirytime");
  const today = Date.parse(new Date());
  const expirydate = parseInt(expirytime);

  // console.log("today", expirydate, today);
  if (today >= expirydate) {
    dispatch(logout(history));
  }
}

export function AddAnalytics(postData) {
  tokenSet();

  // console.log("formdaaaata", postData);
  return instance.post(`/store/ga-id`, postData);
}

// social media
export function AddSocialMediaData(postData) {
  tokenSet();
  return instance.post(`/store/social-media`, postData);
}
export function UpdateSocialMediaData(postData) {
  tokenSet();
  return instance.put(`/store/social-media`, postData);
}
export function DeleteSocialMediaData(Data) {
  tokenSet();
  return axios({
    method: "delete",
    url: `${BaseUrl}/store/social-media`,
    headers: { Authorization: "Bearer " + localStorage.getItem("c_wimos") },
    data: Data,
  });
}
export function GetSocialMediaData(storeid) {
  tokenSet();
  return instance.get(`/store/social-media/` + storeid);
}

export function AddContactData(postData) {
  tokenSet();
  return instance.put(`/store/contact-details`, postData);
}
