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
export function GetStore(clientid) {
  tokenSet();
  return instance.get(`/store/get-stores`);
}

export function SelectStore(storeid) {
  tokenSet();
  return instance.get(`/store/` + storeid);
}

export function StoreStatus(storeid, status) {
  tokenSet();
  const postData = {
    store_id: storeid,
    status: status,
  };
  return instance.put(`/store/update-status`, postData);
}

export function UpdateStore(postData) {
  tokenSet();
  return instance.put(`/store/update`, postData);
}

export function UpdateSeo(postData) {
  tokenSet();
  // console.log("formdaaaata", postData);
  return instance.put(`/store/seo`, postData);
}

export function saveStoresInLocalStorage(storeDetails) {
  //  console.log("www",tokenDetails.client)
  storeDetails.expireDate = new Date(new Date().getTime() + 3600 * 1000);
  // console.log(tokenDetails)
  localStorage.setItem("storeDetails", JSON.stringify(storeDetails));
}
export function selectedStoresInLocalStorage(storeDetails) {
  //  console.log("www",tokenDetails.client)
  storeDetails.expireDate = new Date(new Date().getTime() + 3600 * 1000);
  // console.log(tokenDetails)
  localStorage.setItem("selectedStore", JSON.stringify(storeDetails));
}
