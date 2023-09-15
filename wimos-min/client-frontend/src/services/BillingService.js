import axios from "axios";
import {config} from '../config'

let BaseUrl = ''
if (process.env.REACT_APP_ENV == 'DEV') {
  BaseUrl = process.env.REACT_APP_DEV_BASE_URL || config.dev_base_url;
} else {
  BaseUrl = process.env.REACT_APP_BASE_URL || config.base_url;
}

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

export function GetBilling() {
  //axios call
  tokenSet();
  return instance.get(`/payments/billings/`);
}

export function GetCard() {
  //axios call
  tokenSet();
  return instance.get(`/payments/get-customer-card`);
}
