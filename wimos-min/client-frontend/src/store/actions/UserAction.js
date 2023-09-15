import {
  getUser,
  getUserNft,
  getUserCollection,
  formatError,
  getAllStoreNft,
  getDashboardData,
} from "../../services/UserService";

export const GET_USER_CONFIRMED_ACTION = "[get user action] confirmed get user";
export const GET_USER_FAILED_ACTION = "[get user action] failed get user";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const GET_USER_NFT_CONFIRMED_ACTION =
  "[get user NFT action] confirmed get user nft";
export const GET_USER_NFT_FAILED_ACTION =
  "[get user NFT action] failed get user nft";
export const GET_USER_COLLECTION_CONFIRMED_ACTION =
  "[get user collection action] confirmed get user collection";
export const GET_USER_COLLECTION_FAILED_ACTION =
  "[get user collection action] failed get user collection";
export const GET_ALL_STORE_NFT_CONFIRMED_ACTION =
  "[get all store nft action] confirmed get all store nft";
export const GET_ALL_STORE_NFT_FAILED_ACTION =
  "[get all store nft action] failed get all store nft";
export const GET_DASHBOARD_CONFIRMED_ACTION =
  "[get dashboard action] confirmed get dashboard";
export const GET_DASHBOARD_FAILED_ACTION =
  "[get dashboard action] failed get dashboard";

export function GetUserAction(user) {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    getUser(user)
      .then((response) => {
        // console.log("response", response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getuserConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        // console.log("err", error.response.data);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Users"
        );
        dispatch(getuserFailedAction(errorMessage));
      });
  };
}

export function getuserConfirmedAction(data) {
  return {
    type: GET_USER_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getuserFailedAction(error) {
  return {
    type: GET_USER_FAILED_ACTION,
    payload: error,
  };
}
export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function GetUserNftAction(userId, user) {
  // console.log("bsujdbs", userId);
  return (dispatch) => {
    getUserNft(userId, user)
      .then((response) => {
        //console.log("response", response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getusernftConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        //console.log("err", error.response.data);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Users"
        );
        dispatch(getusernftFailedAction(errorMessage));
      });
  };
}

export function getusernftConfirmedAction(data) {
  return {
    type: GET_USER_NFT_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getusernftFailedAction(error) {
  return {
    type: GET_USER_NFT_FAILED_ACTION,
    payload: error,
  };
}

export function GetUserCollectionAction(userId, user) {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    getUserCollection(userId, user)
      .then((response) => {
        //console.log("responsecollectionnn", response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getusercollectionConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        // console.log("errcpll", error.response.data);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Users"
        );
        dispatch(getusercollectionFailedAction(errorMessage));
      });
  };
}

export function getusercollectionConfirmedAction(data) {
  return {
    type: GET_USER_COLLECTION_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getusercollectionFailedAction(error) {
  return {
    type: GET_USER_COLLECTION_FAILED_ACTION,
    payload: error,
  };
}

export function GetAllStoreNftAction(history) {
  // console.log("bsujdbs", clientid);
  return (dispatch) => {
    getAllStoreNft()
      .then((response) => {
        //console.log("GetAllStoreNftAction", response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getallstoreConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        // console.log("err", error.response.data);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Users"
        );
        dispatch(getallstoreFailedAction(errorMessage));
      });
  };
}

export function getallstoreConfirmedAction(data) {
  return {
    type: GET_ALL_STORE_NFT_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getallstoreFailedAction(error) {
  return {
    type: GET_ALL_STORE_NFT_FAILED_ACTION,
    payload: error,
  };
}

export function GetDashboardAction(user) {
  return (dispatch) => {
    getDashboardData(user)
      .then((response) => {
        // console.log("response", response.data);
        // runLogoutTimer(dispatch, 3600 * 1000, history);
        dispatch(getDashboardConfirmedAction(response.data));
        // }
      })
      .catch((error) => {
        // console.log("err", error.response.data);
        const errorMessage = formatError(
          "Something Went Wrong When Loding Users"
        );
        dispatch(getDashboardFailedAction(errorMessage));
      });
  };
}

export function getDashboardConfirmedAction(data) {
  return {
    type: GET_DASHBOARD_CONFIRMED_ACTION,
    payload: data,
  };
}

export function getDashboardFailedAction(error) {
  return {
    type: GET_DASHBOARD_FAILED_ACTION,
    payload: error,
  };
}
