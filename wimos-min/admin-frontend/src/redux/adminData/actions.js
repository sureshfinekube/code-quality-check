import {
  GET_ADMIN_INSIGHT,
  ERR_ADMIN_INSIGHT,
  SUCCESS_ADMIN_INSIGHT,
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
  SUCCESS_UPDATE_PACKAGE_STATUS_ACTION,
  REMOVE_MSG_CREATE_PACKAGE_ACTION,
  REMOVE_MSG_UPDATE_CLIENT_ACTION,
  REMOVE_MSG_UPDATE_PACKAGE_ACTION,
  REMOVE_MSG_UPDATE_PACKAGE_STATUS_ACTION,
  ADD_DOMAIN_ACTION,
  ADD_DOMAIN_SUCCESS_ACTION,
  ADD_DOMAIN_ERROR_ACTION,
  ADD_DOMAIN_DONE,
  UPDATE_DOMAIN_ACTION,
  UPDATE_DOMAIN_ERROR_ACTION,
  UPDATE_DOMAIN_SUCCESS_ACTION,
  UPDATE_DOMAIN_DONE,
  GET_DOMAIN_ACTION,
  GET_DOMAIN_ERROR_ACTION,
  GET_DOMAIN_SUCCESS_ACTION,
  GET_STORE_ACTION,
  GET_STORE_ERROR_ACTION,
  GET_STORE_SUCCESS_ACTION,
  UPDATE_STORE_ACTION,
  UPDATE_STORE_ERROR_ACTION,
  UPDATE_STORE_SUCCESS_ACTION,
  UPDATE_STORE_REMOVE_MSG_ACTION,
  GET_DASHBOARD_DATA,
  ERR_DASHBOARD_DATA,
  SUCCESS_DASHBOARD_DATA,
  ADD_CONTRACT_FEATURE_ACTION,
  ADD_CONTRACT_FEATURE_DONE,
  ADD_CONTRACT_FEATURE_ERROR_ACTION,
  ADD_CONTRACT_FEATURE_SUCCESS_ACTION,
  GET_CONTRACT_FEATURE_ACTION,
  GET_CONTRACT_FEATURE_ERROR_ACTION,
  GET_CONTRACT_FEATURE_SUCCESS_ACTION,
  UPDATE_CONTRACT_FEATURE_ACTION,
  UPDATE_CONTRACT_FEATURE_ERROR_ACTION,
  UPDATE_CONTRACT_FEATURE_SUCCESS_ACTION,
  UPDATE_CONTRACT_FEATURE_DONE_ACTION,
  DELETE_CONTRACT_FEATURE_ACTION,
  DELETE_CONTRACT_FEATURE_ERROR_ACTION,
  DELETE_CONTRACT_FEATURE_SUCCESS_ACTION,
  DELETE_CONTRACT_FEATURE_DONE_ACTION,
  GET_CONTRACT_FEE_ACTION,
  GET_CONTRACT_FEE_ERROR_ACTION,
  GET_CONTRACT_FEE_SUCCESS_ACTION,
  UPDATE_CONTRACT_FEE_ACTION,
  UPDATE_CONTRACT_FEE_DONE_ACTION,
  UPDATE_CONTRACT_FEE_ERROR_ACTION,
  UPDATE_CONTRACT_FEE_SUCCESS_ACTION,
} from "./constant";

// Total USER,COLLCETIONS,NFT

export const getDashboardAction = () => ({
  type: GET_DASHBOARD_DATA,
});

export const getDashboardErrorAction = (err) => ({
  type: ERR_DASHBOARD_DATA,
  payload: err,
});

export const getDashboardSuccessAction = (payload) => ({
  type: SUCCESS_DASHBOARD_DATA,
  payload: payload,
});

// Admin Insight

export const getAdminInsightAction = () => ({
  type: GET_ADMIN_INSIGHT,
});

export const getAdminInsightErrorAction = (err) => ({
  type: ERR_ADMIN_INSIGHT,
  payload: err,
});

export const getAdminInsightSuccessAction = (payload) => ({
  type: SUCCESS_ADMIN_INSIGHT,
  payload: payload,
});

// Client

export const getClientAction = () => ({
  type: GET_CLIENT_ACTION,
});

export const getClientErrorAction = (err) => ({
  type: ERR_GET_CLIENT_ACTION,
  payload: err,
});

export const getClientSuccessAction = (payload) => ({
  type: SUCCESS_GET_CLIENT_ACTION,
  payload: payload,
});

export const updateClientAction = (status) => ({
  type: UPDATE_CLIENT_ACTION,
  payload: status,
});

export const errupdateClientAction = (err) => ({
  type: ERR_UPDATE_CLIENT_ACTION,
  payload: err,
});

export const successupdateClientAction = (payload) => ({
  type: SUCCESS_UPDATE_CLIENT_ACTION,
  payload: payload,
});

export const removeUpdateClientMsgAction = (payload) => ({
  type: REMOVE_MSG_UPDATE_CLIENT_ACTION,
});

//Store

export const getStoreAction = () => ({
  type: GET_STORE_ACTION,
});

export const getStoreErrorAction = (err) => ({
  type: GET_STORE_ERROR_ACTION,
  payload: err,
});

export const getStoreSuccessAction = (payload) => ({
  type: GET_STORE_SUCCESS_ACTION,
  payload: payload,
});

export const updateStoreAction = (status) => ({
  type: UPDATE_STORE_ACTION,
  payload: status,
});

export const errupdateStoreAction = (err) => ({
  type: UPDATE_STORE_ERROR_ACTION,
  payload: err,
});

export const successupdateStoreAction = (payload) => ({
  type: UPDATE_STORE_SUCCESS_ACTION,
  payload: payload,
});

export const removeUpdateStoreMsgAction = (payload) => ({
  type: UPDATE_STORE_REMOVE_MSG_ACTION,
});

// Packaages
export const getPackageAction = (status) => ({
  type: GET_PACKAGE_ACTION,
  payload: status,
});

export const getPackageErrorAction = (err) => ({
  type: ERR_GET_PACKAGE_ACTION,
  payload: err,
});

export const getPackageSuccessAction = (payload) => ({
  type: SUCCESS_GET_PACKAGE_ACTION,
  payload: payload,
});

export const updatePackageStatusAction = (status) => ({
  type: UPDATE_PACKAGE_STATUS_ACTION,
  payload: status,
});

export const updatePackageStatusErrorAction = (err) => ({
  type: ERR_UPDATE_PACKAGE_ACTION,
  payload: err,
});

export const updatePackageStatusSuccessAction = (payload) => ({
  type: SUCCESS_UPDATE_PACKAGE_STATUS_ACTION,
  payload: payload,
});

export const removeUpdatePackageStatusMsgAction = () => ({
  type: REMOVE_MSG_UPDATE_PACKAGE_STATUS_ACTION,
});

export const updatePackageAction = (status) => ({
  type: UPDATE_PACKAGE_ACTION,
  payload: status,
});

export const updatePackageErrAction = (err) => ({
  type: ERR_UPDATE_PACKAGE_ACTION,
  payload: err,
});

export const updatePackageSuccessAction = (payload) => ({
  type: SUCCESS_UPDATE_PACKAGE_ACTION,
  payload: payload,
});

export const removeUpdatePackageMsgAction = () => ({
  type: REMOVE_MSG_UPDATE_PACKAGE_ACTION,
});

export const createPackageAction = (payload) => ({
  type: CREATE_PACKAGE_ACTION,
  payload: payload,
});

export const createPackageErrAction = (err) => ({
  type: ERR_CREATE_PACKAGE_ACTION,
  payload: err,
});

export const createPackageSuccessAction = (payload) => ({
  type: SUCCESS_CREATE_PACKAGE_ACTION,
  payload: payload,
});

export const removeCreatePackageMsgAction = () => ({
  type: REMOVE_MSG_CREATE_PACKAGE_ACTION,
});

//Domain

export const addDomainAction = (payload) => ({
  type: ADD_DOMAIN_ACTION,
  payload: payload,
});

export const addDomainSuccessAction = () => ({
  type: ADD_DOMAIN_SUCCESS_ACTION,
});
export const addDomainDoneAction = () => ({
  type: ADD_DOMAIN_DONE,
});
export const addDomainErrorAction = (err) => ({
  type: ADD_DOMAIN_ERROR_ACTION,
  payload: err,
});

export const updateDomainAction = (payload) => ({
  type: UPDATE_DOMAIN_ACTION,
  payload: payload,
});

export const updateDomainSuccessAction = () => ({
  type: UPDATE_DOMAIN_SUCCESS_ACTION,
});

export const updateDomainDoneAction = () => ({
  type: UPDATE_DOMAIN_DONE,
});

export const updateDomainErrorAction = (err) => ({
  type: UPDATE_DOMAIN_ERROR_ACTION,
  payload: err,
});

export const getDomainAction = (payload) => ({
  type: GET_DOMAIN_ACTION,
  payload: payload,
});

export const getDomainSuccessAction = (payload) => ({
  type: GET_DOMAIN_SUCCESS_ACTION,
  payload: payload,
});

export const getDomainErrorAction = (err) => ({
  type: GET_DOMAIN_ERROR_ACTION,
  payload: err,
});

//contract feature

export const addContractFeatureAction = (payload) => ({
  type: ADD_CONTRACT_FEATURE_ACTION,
  payload: payload,
});

export const addContractFeatureSuccessAction = () => ({
  type: ADD_CONTRACT_FEATURE_SUCCESS_ACTION,
});
export const addContractFeatureDoneAction = () => ({
  type: ADD_CONTRACT_FEATURE_DONE,
});
export const addContractFeatureErrorAction = (err) => ({
  type: ADD_CONTRACT_FEATURE_ERROR_ACTION,
  payload: err,
});

export const getContractFeaturesAction = (status) => ({
  type: GET_CONTRACT_FEATURE_ACTION,
  payload: status,
});

export const getContractFeaturesErrorAction = (err) => ({
  type: GET_CONTRACT_FEATURE_ERROR_ACTION,
  payload: err,
});

export const getContractFeaturesSuccessAction = (payload) => ({
  type: GET_CONTRACT_FEATURE_SUCCESS_ACTION,
  payload: payload,
});

export const updateContractFeatureAction = (payload) => ({
  type: UPDATE_CONTRACT_FEATURE_ACTION,
  payload: payload,
});
export const updateContractFeatureSuccessAction = () => ({
  type: UPDATE_CONTRACT_FEATURE_SUCCESS_ACTION,
});
export const updateContractFeatureDoneAction = () => ({
  type: UPDATE_CONTRACT_FEATURE_DONE_ACTION,
});
export const updateContractFeatureErrorAction = (err) => ({
  type: UPDATE_CONTRACT_FEATURE_ERROR_ACTION,
  payload: err,
});

export const deleteContractFeatureAction = (payload) => ({
  type: DELETE_CONTRACT_FEATURE_ACTION,
  payload: payload,
});
export const deleteContractFeatureSuccessAction = () => ({
  type: DELETE_CONTRACT_FEATURE_SUCCESS_ACTION,
});
export const deleteContractFeatureDoneAction = () => ({
  type: DELETE_CONTRACT_FEATURE_DONE_ACTION,
});
export const deleteContractFeatureErrorAction = (err) => ({
  type: DELETE_CONTRACT_FEATURE_ERROR_ACTION,
  payload: err,
});

export const getContractFeeAction = (status) => ({
  type: GET_CONTRACT_FEE_ACTION,
  payload: status,
});

export const getContractFeeErrorAction = (err) => ({
  type: GET_CONTRACT_FEE_ERROR_ACTION,
  payload: err,
});

export const getContractFeeSuccessAction = (payload) => ({
  type: GET_CONTRACT_FEE_SUCCESS_ACTION,
  payload: payload,
});

export const updateContractFeeAction = (payload) => ({
  type: UPDATE_CONTRACT_FEE_ACTION,
  payload: payload,
});
export const updateContractFeeSuccessAction = () => ({
  type: UPDATE_CONTRACT_FEE_SUCCESS_ACTION,
});
export const updateContractFeeDoneAction = () => ({
  type: UPDATE_CONTRACT_FEE_DONE_ACTION,
});
export const updateContractFeeErrorAction = (err) => ({
  type: UPDATE_CONTRACT_FEE_ERROR_ACTION,
  payload: err,
});
