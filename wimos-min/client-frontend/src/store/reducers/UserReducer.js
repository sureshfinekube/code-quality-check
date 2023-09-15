import {
  GET_USER_CONFIRMED_ACTION,
  GET_USER_FAILED_ACTION,
  GET_USER_NFT_CONFIRMED_ACTION,
  GET_USER_NFT_FAILED_ACTION,
  GET_USER_COLLECTION_CONFIRMED_ACTION,
  GET_USER_COLLECTION_FAILED_ACTION,
  LOADING_TOGGLE_ACTION,
  GET_ALL_STORE_NFT_CONFIRMED_ACTION,
  GET_ALL_STORE_NFT_FAILED_ACTION,
  GET_DASHBOARD_CONFIRMED_ACTION,
  GET_DASHBOARD_FAILED_ACTION,
} from "../actions/UserAction";

const initialState = {
  auth: {},
  errorMessage: "",
  successMessage: "",
  updateSuccess: false,
  showLoading: false,
  getUser: "",
  getUserNft: "",
  getUserCollections: "",
  getUserId: "",
  getAllStoreNft: "",
  getDashboard: "",
};

export function UserReducer(state = initialState, action) {
  if (action.type === GET_USER_CONFIRMED_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      getUser: action.payload.data,
      getUserId: action.payload.data.id,
      showLoading: false,
    };
  }
  if (action === GET_USER_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      successMessage: "",
    };
  }

  if (action.type === GET_USER_NFT_CONFIRMED_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      getUserNft: action.payload.data,
      showLoading: false,
    };
  }
  if (action === GET_USER_NFT_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      successMessage: "",
    };
  }

  if (action.type === GET_USER_COLLECTION_CONFIRMED_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      getUserCollections: action.payload.data,
      showLoading: false,
    };
  }
  if (action === GET_USER_COLLECTION_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      successMessage: "",
    };
  }
  if (action.type === GET_ALL_STORE_NFT_CONFIRMED_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      getAllStoreNft: action.payload.data,
      showLoading: false,
    };
  }
  if (action === GET_ALL_STORE_NFT_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      successMessage: "",
    };
  }
  if (action.type === LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
      updateSuccess: false,
      getUserCollections: "",
    };
  }
  if (action.type === GET_DASHBOARD_CONFIRMED_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      getDashboard: action.payload.data,
      showLoading: false,
    };
  }
  if (action === GET_DASHBOARD_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      successMessage: "",
    };
  }
  return state;
}
