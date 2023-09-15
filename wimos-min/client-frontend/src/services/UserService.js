import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import success from "../images/swal-success.png";
import failed from "../images/swal-error.png";
import {config} from '../config'

let BaseUrl = ''
if (process.env.REACT_APP_ENV == 'DEV') {
  BaseUrl = process.env.REACT_APP_DEV_USER_BASE_URL || 'https://devendapi.wimos.io/v1';
} else {
  BaseUrl = process.env.REACT_APP_PROD_USER_BASE_URL || 'https://endapi.wimos.io/v1';
}
// let BaseUrl = "http://localhost:8080/v1";


let instance = axios.create({
  // .. where we make our configurations
  baseURL: BaseUrl,
  withCredentials: true,
  // headers: {
  //   Authorization: "Bearer " + localStorage.getItem("c_wimos"),
  // },
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

export function getUser(user) {
  //axios call
  tokenSet();
  return instance.get(`/e2c-c2e/get-users?domain=` + user);
}
export function getUserNft(userId, user) {
  //axios call
  tokenSet();
  return instance.get(`/e2c-c2e/get-user-nfts/` + userId + "?domain=" + user);
}
export function getUserCollection(userId, user) {
  //axios call
  tokenSet();
  return instance.get(
    `/e2c-c2e/get-user-collections/` + userId + "?domain=" + user
  );
}
export function getDashboardData(user) {
  //axios call
  tokenSet();
  return instance.get(`/dashboard/get-data?domain=` + user);
}

export function formatError(errorResponse) {
  swal("Oops", errorResponse, "error", {
    icon: failed,
    buttons: {
      cancel: "Try Again!",
    },
  });
}

export function formatSuccess(successResponse) {
  swal("Success!", successResponse, "success", {
    icon: success,
    buttons: {
      confirm: "Continue",
    },
    timer: 3000,
  });
}

export function getAllStoreNft() {
  //axios call
  return instance.get(`/nft/get?domain=user`);
}

export function getReportsData(user) {
  //axios call
  tokenSet();
  return instance.get(`/e2c-c2e/reports?domain=` + user);
}
