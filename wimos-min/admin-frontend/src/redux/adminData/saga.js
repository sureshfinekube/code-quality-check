import { all, call, fork, put, takeEvery } from "redux-saga/effects";
// import { LoginAdmin,LogoutAdminHandler } from 'utils/axios/requestHandler';

import {
  GET_CLIENT_ACTION,
  ERR_GET_CLIENT_ACTION,
  SUCCESS_GET_CLIENT_ACTION,
  UPDATE_CLIENT_ACTION,
  ERR_UPDATE_CLIENT_ACTION,
  SUCCESS_UPDATE_CLIENT_ACTION,
  GET_PACKAGE_ACTION,
  SUCCESS_GET_PACKAGE_ACTION,
  ERR_GET_PACKAGE_ACTION,
  UPDATE_PACKAGE_ACTION,
  ERR_UPDATE_PACKAGE_ACTION,
  SUCCESS_UPDATE_PACKAGE_ACTION,
  CREATE_PACKAGE_ACTION,
  ERR_CREATE_PACKAGE_ACTION,
  SUCCESS_CREATE_PACKAGE_ACTION,
  UPDATE_PACKAGE_STATUS_ACTION,
  GET_ADMIN_INSIGHT,
  ERR_ADMIN_INSIGHT,
  SUCCESS_ADMIN_INSIGHT,
  ADD_DOMAIN_ACTION,
  ADD_DOMAIN_SUCCESS_ACTION,
  ADD_DOMAIN_ERROR_ACTION,
  UPDATE_DOMAIN_ACTION,
  UPDATE_DOMAIN_ERROR_ACTION,
  UPDATE_DOMAIN_SUCCESS_ACTION,
  GET_DOMAIN_ACTION,
  GET_STORE_ACTION,
  UPDATE_STORE_ACTION,
  GET_DASHBOARD_DATA,
  ERR_DASHBOARD_DATA,
  SUCCESS_DASHBOARD_DATA,
  ADD_CONTRACT_FEATURE_ACTION,
  GET_CONTRACT_FEATURE_ACTION,
  UPDATE_CONTRACT_FEATURE_ACTION,
  DELETE_CONTRACT_FEATURE_ACTION,
  GET_CONTRACT_FEE_ACTION,
  UPDATE_CONTRACT_FEE_ACTION,
} from "./constant";

import {
  getClientAction,
  getClientErrorAction,
  getClientSuccessAction,
  updateClientAction,
  errupdateClientAction,
  successupdateClientAction,
  getPackageAction,
  getPackageErrorAction,
  getPackageSuccessAction,
  updatePackageAction,
  updatePackageErrAction,
  updatePackageSuccessAction,
  createPackageAction,
  createPackageErrAction,
  createPackageSuccessAction,
  updatePackageStatusSuccessAction,
  updatePackageStatusErrorAction,
  updatePackageStatusAction,
  getAdminInsightAction,
  getAdminInsightErrorAction,
  getAdminInsightSuccessAction,
  removeUpdatePackageStatusMsgAction,
  removeCreatePackageMsgAction,
  removeUpdateClientMsgAction,
  removeUpdatePackageMsgAction,
  addDomainAction,
  addDomainErrorAction,
  addDomainSuccessAction,
  addDomainDoneAction,
  updateDomainAction,
  updateDomainErrorAction,
  updateDomainSuccessAction,
  updateDomainDoneAction,
  getDomainAction,
  getDomainErrorAction,
  getDomainSuccessAction,
  getStoreAction,
  getStoreErrorAction,
  getStoreSuccessAction,
  updateStoreAction,
  errupdateStoreAction,
  successupdateStoreAction,
  removeUpdateStoreMsgAction,
  getDashboardAction,
  getDashboardErrorAction,
  getDashboardSuccessAction,
  addContractFeatureAction,
  addContractFeatureErrorAction,
  addContractFeatureSuccessAction,
  addContractFeatureDoneAction,
  getContractFeaturesAction,
  getContractFeaturesErrorAction,
  getContractFeaturesSuccessAction,
  updateContractFeatureAction,
  updateContractFeatureErrorAction,
  updateContractFeatureSuccessAction,
  updateContractFeatureDoneAction,
  deleteContractFeatureAction,
  deleteContractFeatureErrorAction,
  deleteContractFeatureSuccessAction,
  deleteContractFeatureDoneAction,
  getContractFeeAction,
  getContractFeeErrorAction,
  getContractFeeSuccessAction,
  updateContractFeeAction,
  updateContractFeeDoneAction,
  updateContractFeeErrorAction,
  updateContractFeeSuccessAction,
} from "./actions";

import {
  CreatePackageHandler,
  getPackagesHandler,
  updatePackageStatusHandler,
  updatePackageHandler,
  GetClients,
  ChangeClientStatus,
  GetInsight,
  AddDomain,
  GetDomain,
  UpdateDomain,
  GetSores,
  ChangeStoreStatus,
  getDashboardData,
  AddContractFeature,
  getContractFeatures,
  updateContractFeatures,
  deleteContractFeature,
  getContractFee,
  updateContractFee,
} from "utils/axios/requestHandler";

/*GET ADMIN INSIGHT */
export function* watchGetInsight() {
  yield takeEvery(GET_ADMIN_INSIGHT, getAdminInsight);
}
const getAdminInsightAsync = async () =>
  await GetInsight()
    .then((resp) => {
      //console.log("test",resp);
      return resp;
    })
    .catch((error) => error);
function* getAdminInsight() {
  try {
    const getInsight = yield call(getAdminInsightAsync);
    // console.log("www", getClients);
    if (!getInsight.status) {
      yield put(getAdminInsightErrorAction("Something went wrong"));
      // yield put(loginAdminErrorAction(false));
    } else {
      yield put(getAdminInsightSuccessAction(getInsight.response));
    }
  } catch (err) {
    yield put(getAdminInsightErrorAction("Something went wrong"));
  }
}

/*GET DASHBOARD */
export function* watchGetDashboard() {
  yield takeEvery(GET_DASHBOARD_DATA, getDashboard);
}
const getAdminDashboardAsync = async () =>
  await getDashboardData()
    .then((resp) => {
      // console.log("test", resp);
      return resp;
    })
    .catch((error) => error);
function* getDashboard() {
  try {
    const getDashboardData = yield call(getAdminDashboardAsync);
    // console.log("www", getClients);
    if (!getDashboardData.status) {
      yield put(getDashboardErrorAction("Something went wrong"));
      // yield put(loginAdminErrorAction(false));
    } else {
      yield put(getDashboardSuccessAction(getDashboardData.response));
    }
  } catch (err) {
    yield put(getDashboardErrorAction("Something went wrong"));
  }
}

/* GET CLIENT SAGA */
export function* watchGetClient() {
  yield takeEvery(GET_CLIENT_ACTION, getClientData);
}
const getClientDataAsync = async () =>
  await GetClients()
    .then((resp) => {
      //console.log("test", resp);
      return resp;
    })
    .catch((error) => error);
function* getClientData() {
  try {
    const getClients = yield call(getClientDataAsync);
    //console.log("www", getClients);
    if (!getClients.status) {
      yield put(getClientErrorAction("Something went wrong"));
      // yield put(loginAdminErrorAction(false));
    } else {
      yield put(getClientSuccessAction(getClients.data));
    }
  } catch (err) {
    yield put(getClientErrorAction("Something went wrong"));
  }
}
/* UPDATE CLIENT */
export function* watchUpadteClient() {
  yield takeEvery(UPDATE_CLIENT_ACTION, updateClientData);
}
const updateClientDataAsync = async (data) =>
  await ChangeClientStatus(data)
    .then((updatestat) => {
      //console.log("test", updatestat);
      return updatestat;
    })
    .catch((error) => error);

function* updateClientData({ payload }) {
  try {
    const updatedClients = yield call(updateClientDataAsync, payload);
    // console.log("updatedClients", updatedClients);
    if (!updatedClients.status) {
      yield put(errupdateClientAction("Something went wrong"));
      yield put(errupdateClientAction(null));
    } else {
      yield put(successupdateClientAction(payload.clientId));
      yield put(successupdateClientAction(null));
    }
  } catch (err) {
    yield put(errupdateClientAction("Something went wrong"));
  }
}

/* GET PACKAGES SAGA */
export function* watchGetPackages() {
  yield takeEvery(GET_PACKAGE_ACTION, getPackages);
}

const getPackagesAsync = async () =>
  await getPackagesHandler()
    .then((response) => response)
    .catch((err) => err);

function* getPackages() {
  try {
    getPackageAction(true);

    const response = yield call(getPackagesAsync);
    if (response.status) {
      yield put(getPackageSuccessAction(response.packageList));
    } else {
      if (response.errMsg) {
        yield put(getPackageErrorAction(response.errMsg.message));
      } else {
        yield put(getPackageErrorAction("Something went wrong"));
      }
    }
  } catch (err) {
    yield put(getPackageErrorAction("Something went wrong"));
  }
}

/* UPDATE PACKAGE STATUS SAGA */
export function* watchUpdatePackageStatus() {
  yield takeEvery(UPDATE_PACKAGE_STATUS_ACTION, updatePackageStatus);
}

const updatePackageStatusAsync = async (data) =>
  updatePackageStatusHandler(data)
    .then((response) => response)
    .catch((err) => err);

function* updatePackageStatus({ payload }) {
  try {
    updatePackageStatusAction({ packageId: payload.packageId });
    let response = yield call(updatePackageStatusAsync, payload);
    if (response.status) {
      yield put(
        updatePackageStatusSuccessAction({
          message: "Updated Package Status Successfully",
          packageId: payload.packageId,
        })
      );
      yield put(removeUpdatePackageStatusMsgAction());
    } else {
      if (response.errMsg) {
        yield put(
          updatePackageStatusErrorAction({
            err: response.errMsg.message,
            packageId: payload.packageId,
          })
        );
        yield put(removeUpdatePackageStatusMsgAction());
      } else {
        yield put(
          updatePackageStatusErrorAction({
            err: "Something went wrong",
            packageId: payload.packageId,
          })
        );
        yield put(removeUpdatePackageStatusMsgAction());
      }
    }
  } catch (err) {
    yield put(
      updatePackageStatusErrorAction({
        err: "Something went wrong",
        packageId: payload.packageId,
      })
    );
    yield put(removeUpdatePackageStatusMsgAction());
  }
}

/* UPDATE PACKAGE SAGAS */
export function* watchUpdatePackage() {
  yield takeEvery(UPDATE_PACKAGE_ACTION, updatePackage);
}

const updatePackageAsync = async (data) =>
  updatePackageHandler(data)
    .then((response) => response)
    .catch((err) => err);

function* updatePackage({ payload }) {
  try {
    updatePackageAction({ packageId: payload.packageId });
    let response = yield call(updatePackageAsync, payload);

    if (response.status) {
      yield put(
        updatePackageSuccessAction({
          message: "Successfully updated",
          packageId: payload.packageId,
          updatedPackage: response.package,
        })
      );
      yield put(removeUpdatePackageMsgAction());
    } else {
      if (response.errMsg) {
        yield put(
          updatePackageErrAction({
            packageId: payload.packageId,
            err: response.errMsg.message,
          })
        );
        yield put(removeUpdatePackageMsgAction());
      } else {
        yield put(
          updatePackageErrAction({
            packageId: payload.packageId,
            err: "Something went wrong",
          })
        );
        yield put(removeUpdatePackageMsgAction());
      }
    }
  } catch (err) {
    // console.log(err);
    yield put(
      updatePackageErrAction({
        packageId: payload.packageId,
        err: "Something went wrong",
      })
    );
    yield put(removeUpdatePackageMsgAction());
  }
}

/* CREATE PACKAGE SAGA */

export function* watchCreatePackage() {
  yield takeEvery(CREATE_PACKAGE_ACTION, createPackage);
}

const createPackageAsync = async (data) =>
  await CreatePackageHandler(data)
    .then((response) => response)
    .catch((err) => err);

function* createPackage({ payload }) {
  try {
    createPackageAction(true);

    let response = yield call(createPackageAsync, payload);

    if (response.status) {
      yield put(createPackageSuccessAction("Created Package Successfully"));
      yield put(removeCreatePackageMsgAction());
    } else {
      yield put(createPackageErrAction(response.errMsg.message));
      yield put(removeCreatePackageMsgAction());
    }
  } catch (err) {
    yield put(createPackageErrAction("Something went wrong"));
    yield put(removeCreatePackageMsgAction());
  }
}

/* ADD Domain */
export function* watchAddDomain() {
  yield takeEvery(ADD_DOMAIN_ACTION, addNewDomain);
}

const addDoaminAsync = async (data) =>
  AddDomain(data)
    .then((response) => {
      return response;
    })
    .catch((error) => error);

function* addNewDomain({ payload }) {
  try {
    // console.log("payload", payload);
    // addDomainAction(true)
    const adddomain = yield call(addDoaminAsync, payload);

    if (!adddomain.status) {
      yield put(addDomainErrorAction("Something went wrong"));
      yield put(addDomainErrorAction(null));
    } else {
      yield put(addDomainSuccessAction());
      yield put(addDomainDoneAction());
    }
  } catch (err) {
    yield put(addDomainErrorAction("Something went wrong"));
  }
}

/* Update Domain */
export function* watchUpdateDomain() {
  yield takeEvery(UPDATE_DOMAIN_ACTION, updateNewDomain);
}

const updateDoaminAsync = async (data) =>
  await UpdateDomain(data)
    .then((response) => {
      // console.log("EEE", response);
      return response;
    })
    .catch((error) => error);

function* updateNewDomain({ payload }) {
  try {
    // console.log("payload", payload);
    // addDomainAction(true)
    //console.log("payload", payload);
    const adddomain = yield call(updateDoaminAsync, payload);
    //console.log("EEE", adddomain);
    if (!adddomain.status) {
      yield put(updateDomainErrorAction("Something went wrong"));
      yield put(updateDomainErrorAction(null));
    } else {
      yield put(updateDomainSuccessAction());
      yield put(updateDomainDoneAction());
    }
  } catch (err) {
    yield put(updateDomainErrorAction("Something went wrong"));
  }
}

/* Get Domain */
export function* watchGetDomain() {
  yield takeEvery(GET_DOMAIN_ACTION, getDomain);
}

const getDoaminAsync = async () =>
  GetDomain()
    .then((response) => {
      //console.log("res", response);
      return response;
    })
    .catch((error) => error);

function* getDomain() {
  try {
    // console.log("payload", payload);
    // addDomainAction(true)
    const getdomain = yield call(getDoaminAsync);
    // console.log(getdomain);
    if (getdomain == "") {
      yield put(getDomainErrorAction("Something went wrong"));
      yield put(getDomainErrorAction(null));
    } else {
      yield put(getDomainSuccessAction(getdomain.data));
    }
  } catch (err) {
    yield put(getDomainErrorAction("Something went wrong"));
  }
}

/* GET STORES SAGA */
export function* watchGetStores() {
  yield takeEvery(GET_STORE_ACTION, getStores);
}

const getStoreAsync = async () =>
  await GetSores()
    .then((response) => response)
    .catch((err) => err);

function* getStores() {
  try {
    getStoreAction(true);

    const response = yield call(getStoreAsync);
    if (response.status) {
      yield put(getStoreSuccessAction(response.data));
    } else {
      if (response.errMsg) {
        yield put(getStoreErrorAction(response.errMsg.message));
      } else {
        yield put(getStoreErrorAction("Something went wrong"));
      }
    }
  } catch (err) {
    yield put(getStoreErrorAction("Something went wrong"));
  }
}
/* UPDATE STORE */
export function* watchUpadteStore() {
  yield takeEvery(UPDATE_STORE_ACTION, updateStoreData);
}
const updateStoreDataAsync = async (data) =>
  await ChangeStoreStatus(data)
    .then((updatestat) => {
      console.log("test", updatestat);
      return updatestat;
    })
    .catch((error) => error);

function* updateStoreData({ payload }) {
  try {
    const updateStore = yield call(updateStoreDataAsync, payload);
    console.log("payload", payload);
    console.log("updateStore", updateStore);

    if (!updateStore.status) {
      yield put(errupdateStoreAction("Something went wrong"));
      yield put(errupdateStoreAction(null));
    } else {
      yield put(successupdateStoreAction(payload.store_id));
      console.log("tijo", payload.status);
      console.log("tijjjjjjjjjjjjjj", updateStore.data.id);

      yield put(removeUpdateStoreMsgAction());
      //yield put(successupdateStoreAction(null));
    }
  } catch (err) {
    yield put(errupdateStoreAction("Something went wrong"));
  }
}

/* ADD ContractFeature */
export function* watchAddContractFeature() {
  yield takeEvery(ADD_CONTRACT_FEATURE_ACTION, addContractFeature);
}

const addContractFeatureAsync = async (data) =>
  AddContractFeature(data)
    .then((response) => {
      return response;
    })
    .catch((error) => error);

function* addContractFeature({ payload }) {
  try {
    // console.log("payload", payload);
    addContractFeatureAction(true);
    const addcfeature = yield call(addContractFeatureAsync, payload);

    if (!addcfeature.status) {
      yield put(addContractFeatureErrorAction("Something went wrong"));
      yield put(addContractFeatureErrorAction(null));
    } else {
      yield put(addContractFeatureSuccessAction());
      yield put(addContractFeatureDoneAction());
    }
  } catch (err) {
    yield put(addContractFeatureErrorAction("Something went wrong"));
  }
}

// get ContractFeature

export function* watchGetContractFeatures() {
  yield takeEvery(GET_CONTRACT_FEATURE_ACTION, GetContractFeatures);
}

const getContractFeaturesAsync = async () =>
  await getContractFeatures()
    .then((response) => response)
    .catch((err) => err);

function* GetContractFeatures() {
  try {
    getContractFeaturesAction(true);

    const response = yield call(getContractFeaturesAsync);
    //console.log("response", response);
    if (response.status) {
      yield put(getContractFeaturesSuccessAction(response.data));
    } else {
      if (response.errMsg) {
        yield put(getContractFeaturesErrorAction(response.errMsg.message));
      } else {
        yield put(getContractFeaturesErrorAction("Something went wrong"));
      }
    }
  } catch (err) {
    yield put(getContractFeaturesErrorAction("Something went wrong"));
  }
}

/* UPDATE CONTRCT FEATURE */
export function* watchUpadteContractFeature() {
  yield takeEvery(UPDATE_CONTRACT_FEATURE_ACTION, updateContractFeatureData);
}
const updateContractFeatureAsync = async (data) =>
  await updateContractFeatures(data)
    .then((updatestat) => {
      //console.log("test", updatestat);
      return updatestat;
    })
    .catch((error) => error);

function* updateContractFeatureData({ payload }) {
  try {
    const updateContractFeature = yield call(
      updateContractFeatureAsync,
      payload
    );
    // console.log("payload", payload);
    if (!updateContractFeature.status) {
      yield put(updateContractFeatureErrorAction("Something went wrong"));
      yield put(updateContractFeatureErrorAction(null));
    } else {
      yield put(updateContractFeatureSuccessAction(payload.data));
      yield put(updateContractFeatureDoneAction());
      //yield put(successupdateStoreAction(null));
    }
  } catch (err) {
    yield put(updateContractFeatureErrorAction("Something went wrong"));
  }
}

/* DELETE CONTRCT FEATURE */
export function* watchDeleteContractFeature() {
  yield takeEvery(DELETE_CONTRACT_FEATURE_ACTION, deleteContactFeatureData);
}
const deleteContractFeatureAsync = async (data) =>
  await deleteContractFeature(data)
    .then((deletestat) => {
      //console.log("test", updatestat);
      return deletestat;
    })
    .catch((error) => error);

function* deleteContactFeatureData({ payload }) {
  try {
    const deleteContractFeature = yield call(
      deleteContractFeatureAsync,
      payload
    );
    // console.log("payload", payload);
    if (!deleteContractFeature.status) {
      yield put(deleteContractFeatureErrorAction("Something went wrong"));
      yield put(deleteContractFeatureErrorAction(null));
    } else {
      yield put(deleteContractFeatureSuccessAction(payload.data));
      yield put(deleteContractFeatureDoneAction());
      //yield put(successupdateStoreAction(null));
    }
  } catch (err) {
    yield put(deleteContractFeatureErrorAction("Something went wrong"));
  }
}

// GET CONTRACT FEE

export function* watchGetContractFee() {
  yield takeEvery(GET_CONTRACT_FEE_ACTION, GetContractFee);
}

const getContractFeeAsync = async () =>
  await getContractFee()
    .then((response) => response)
    .catch((err) => err);

function* GetContractFee() {
  try {
    getContractFeeAction(true);

    const response = yield call(getContractFeeAsync);
    //console.log("response", response);
    if (response.status) {
      yield put(getContractFeeSuccessAction(response.data));
    } else {
      if (response.errMsg) {
        yield put(getContractFeeErrorAction(response.errMsg.message));
      } else {
        yield put(getContractFeeErrorAction("Something went wrong"));
      }
    }
  } catch (err) {
    yield put(getContractFeeErrorAction("Something went wrong"));
  }
}

/* UPDATE CONTRCT FEE */
export function* watchUpadteContractFee() {
  yield takeEvery(UPDATE_CONTRACT_FEE_ACTION, updateContractFeeData);
}
const updateContractFeeAsync = async (data) =>
  await updateContractFee(data)
    .then((updatestat) => {
      //console.log("test", updatestat);
      return updatestat;
    })
    .catch((error) => error);

function* updateContractFeeData({ payload }) {
  try {
    const updateContractFee = yield call(updateContractFeeAsync, payload);
    // console.log("payload", payload);
    if (!updateContractFee.status) {
      yield put(updateContractFeeErrorAction("Something went wrong"));
      yield put(updateContractFeeErrorAction(null));
    } else {
      yield put(updateContractFeeSuccessAction(payload.data));
      yield put(updateContractFeeDoneAction());
      //yield put(successupdateStoreAction(null));
    }
  } catch (err) {
    yield put(updateContractFeeErrorAction("Something went wrong"));
  }
}

/* EXPORT ALL SAGAS */

export default function* rootSaga() {
  yield all([
    fork(watchGetPackages),
    fork(watchUpdatePackage),
    fork(watchCreatePackage),
    fork(watchUpdatePackageStatus),
    fork(watchGetInsight),
    fork(watchGetClient),
    fork(watchUpadteClient),
    fork(watchAddDomain),
    fork(watchUpdateDomain),
    fork(watchGetDomain),
    fork(watchGetStores),
    fork(watchUpadteStore),
    fork(watchGetDashboard),
    fork(watchAddContractFeature),
    fork(watchGetContractFeatures),
    fork(watchUpadteContractFeature),
    fork(watchDeleteContractFeature),
    fork(watchGetContractFee),
    fork(watchUpadteContractFee),
  ]);
}
