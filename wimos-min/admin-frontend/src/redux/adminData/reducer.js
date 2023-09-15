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
  ERR_UPDATE_PACKAGE_STATUS_ACTION,
  SUCCESS_UPDATE_PACKAGE_STATUS_ACTION,
  REMOVE_MSG_CREATE_PACKAGE_ACTION,
  REMOVE_MSG_UPDATE_CLIENT_ACTION,
  REMOVE_MSG_UPDATE_PACKAGE_STATUS_ACTION,
  REMOVE__MSG_UPDATE_PACKAGE_ACTION,
  REMOVE_MSG_UPDATE_PACKAGE_ACTION,
  ADD_DOMAIN_ACTION,
  ADD_DOMAIN_SUCCESS_ACTION,
  ADD_DOMAIN_ERROR_ACTION,
  ADD_DOMAIN_DONE,
  UPDATE_DOMAIN_ACTION,
  UPDATE_DOMAIN_ERROR_ACTION,
  UPDATE_DOMAIN_SUCCESS_ACTION,
  UPDATE_DOMAIN_DONE,
  GET_DOMAIN_ACTION,
  GET_DOMAIN_SUCCESS_ACTION,
  GET_DOMAIN_ERROR_ACTION,
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

const INIT_STATE = {
  insight: [],
  onadminInsight: false,
  adminInsightErr: null,
  adminInsightSuccess: null,

  dashboard: [],
  onadminDashbaord: false,
  adminDashbaordErr: null,
  adminDashbaordSuccess: null,

  clients: [],
  onClientsFetch: false,
  clientsFetchErr: null,
  clientsFetchSuccess: null,

  onUpdateClient: false,
  updateClientErr: null,
  updateClientSuccess: false,
  updatedClientID: null,

  stores: [],
  onStoreFetch: false,
  storeFetchErr: null,
  storeFetchSuccess: null,

  onUpdateStore: false,
  updateStoreErr: null,
  updateStoreSuccess: false,
  updatedStoreID: null,

  packages: [],
  onPackagesFetch: false,
  packagesFetchErr: null,
  packagesFetchSuccess: null,
  onUpdatePackageStatus: false,
  updatePackageStatusErr: null,
  updatePackageStatusSuccess: null,
  updatePackageStatusId: "",
  onUpdatePackage: false,
  updatePackageErr: null,
  updatePackageSuccess: null,
  updatePackageId: "",
  updatedPackage: null,

  onCreatePackage: false,
  createPackageErr: null,
  createPackageSuccess: null,

  onAddDomain: false,
  addDomainErr: null,
  addDomainSuccess: false,

  onUpdateDomain: false,
  updateDomainErr: null,
  updateDomainSuccess: false,

  onGetDomain: false,
  getDominErr: null,
  domain: "",
  getDomainSuccess: false,

  onAddContractFeature: false,
  addContractFeatureErr: null,
  addContractFeatureSuccess: false,

  onGetContractFeatures: true,
  getContractFeaturesSuccess: false,
  getContractFeaturesErr: null,
  contractFeatures: [],

  onUpdateContractFeatures: false,
  updateContractFeaturesErr: null,
  updateContractFeaturesSuccess: false,

  onDeleteContractFeatures: false,
  deleteContractFeaturesErr: null,
  deleteContractFeaturesSuccess: false,

  onGetContractFee: true,
  getContractFeeSuccess: false,
  getContractFeeErr: null,
  contractFee: [],

  onUpdateContractFee: false,
  updateContractFeeErr: null,
  updateContractFeeSuccess: false,
};

const adminData = (state = INIT_STATE, action) => {
  //console.log("t656", action.payload);
  switch (action.type) {
    //Get admin insight actions
    case GET_ADMIN_INSIGHT:
      return { ...state, onadminInsight: true };
    case ERR_ADMIN_INSIGHT:
      return { ...state, adminInsightErr: action.payload };
    case SUCCESS_ADMIN_INSIGHT:
      return {
        ...state,
        onadminInsight: false,
        adminInsightErr: null,
        adminInsightSuccess: true,
        insight: action.payload,
      };

    // Dashboard user,collections,nft
    case GET_DASHBOARD_DATA:
      return { ...state, onadminDashbaord: true };
    case ERR_DASHBOARD_DATA:
      return { ...state, adminDashbaordErr: action.payload };
    case SUCCESS_DASHBOARD_DATA:
      return {
        ...state,
        onadminDashbaord: false,
        adminDashbaordErr: null,
        adminDashbaordSuccess: true,
        dashboard: action.payload,
      };

    //Get client actions
    case GET_CLIENT_ACTION:
      return { ...state, onClientsFetch: true };
    case ERR_GET_CLIENT_ACTION:
      return {
        ...state,
        onClientsFetch: false,
        clientsFetchErr: action.payload,
      };
    case SUCCESS_GET_CLIENT_ACTION:
      return {
        ...state,
        onClientsFetch: false,
        clientsFetchErr: null,
        clientsFetchSuccess: true,
        clients: action.payload,
      };

    //Update client actions
    case UPDATE_CLIENT_ACTION:
      return {
        ...state,
        onUpdateClient: true,
        updateClientSuccess: false,
        updatedClientID: null,
      };

    case ERR_UPDATE_CLIENT_ACTION:
      return {
        ...state,
        onUpdateClient: false,
        updateClientErr: action.payload,
      };
    case SUCCESS_UPDATE_CLIENT_ACTION:
      return {
        ...state,
        onUpdateClient: false,
        updateClientErr: null,
        updateClientSuccess: true,
        updatedClientID: action.payload,
      };
    case REMOVE_MSG_UPDATE_CLIENT_ACTION:
      return {
        ...state,
      };

    //Get Store actions
    case GET_STORE_ACTION:
      return { ...state, onStoreFetch: true };
    case GET_STORE_ERROR_ACTION:
      return {
        ...state,
        onStoreFetch: false,
        storeFetchErr: action.payload,
      };
    case GET_STORE_SUCCESS_ACTION:
      return {
        ...state,
        onStoreFetch: false,
        storeFetchErr: null,
        storeFetchSuccess: true,
        stores: action.payload,
      };

    //Update Store actions
    case UPDATE_STORE_ACTION:
      return {
        ...state,
        onUpdateStore: true,
        updateStoreSuccess: false,
        updatedStoreID: null,
        UpdatedStores: action.payload,
      };

    case UPDATE_STORE_ERROR_ACTION:
      return {
        ...state,
        onUpdateStore: false,
        updateStoreErr: action.payload,
      };
    case UPDATE_STORE_SUCCESS_ACTION:
      return {
        ...state,
        onUpdateStore: false,
        updateStoreErr: null,
        updateStoreSuccess: true,
        updatedStoreID: action.payload,
      };
    case UPDATE_STORE_REMOVE_MSG_ACTION:
      return {
        ...state,
      };

    //Get package actions
    case GET_PACKAGE_ACTION:
      return {
        ...state,
        onPackagesFetch: true,
        packagesFetchErr: null,
        packagesFetchSuccess: null,
      };
    case ERR_GET_PACKAGE_ACTION:
      return {
        ...state,
        onPackagesFetch: false,
        packagesFetchErr: action.payload,
        packagesFetchSuccess: null,
      };
    case SUCCESS_GET_PACKAGE_ACTION:
      return {
        ...state,
        onPackagesFetch: false,
        packages: action.payload,
        packagesFetchErr: null,
        packagesFetchSuccess: "Packages Fetched Successfully",
      };

    //Update Package status actions
    case UPDATE_PACKAGE_STATUS_ACTION:
      return {
        ...state,
        onUpdatePackageStatus: true,
        updatePackageStatusErr: null,
        updatePackageStatusSuccess: null,
        updatePackageStatusId: action.payload.packageId,
      };
    case ERR_UPDATE_PACKAGE_STATUS_ACTION:
      return {
        ...state,
        onUpdatePackageStatus: false,
        updatePackageStatusErr: action.payload.err,
        updatePackageStatusSuccess: null,
        updatePackageStatusId: action.payload.packageId,
      };
    case SUCCESS_UPDATE_PACKAGE_STATUS_ACTION:
      return {
        ...state,
        onUpdatePackageStatus: false,
        updatePackageStatusErr: null,
        updatePackageStatusSuccess: action.payload.message,
        updatePackageStatusId: action.payload.packageId,
      };
    case REMOVE_MSG_UPDATE_PACKAGE_STATUS_ACTION:
      return {
        ...state,
        updatePackageStatusSuccess: null,
        updatePackageStatusErr: null,
      };

    //Update Package action
    case UPDATE_PACKAGE_ACTION:
      return {
        ...state,
        onUpdatePackage: true,
        updatePackageErr: null,
        updatedPackage: null,
        updatePackageSuccess: null,
        updatePackageId: action.payload.packageId,
      };
    case ERR_UPDATE_PACKAGE_ACTION:
      return {
        ...state,
        onUpdatePackage: false,
        updatedPackage: null,
        updatePackageErr: action.payload.err,
        updatePackageId: null,
        updatePackageSuccess: null,
      };
    case SUCCESS_UPDATE_PACKAGE_ACTION:
      return {
        ...state,
        onUpdatePackage: false,
        updatePackageErr: null,
        updatePackageId: action.payload.updatedPackage._id,
        updatedPackage: action.payload.updatedPackage,
        updatePackageSuccess: "Updated Package Successfully",
      };
    case REMOVE_MSG_UPDATE_PACKAGE_ACTION:
      return { ...state, updatePackageErr: null, updatePackageSuccess: null };

    //Create Package Action
    case CREATE_PACKAGE_ACTION:
      return {
        ...state,
        onCreatePackage: true,
        createPackageErr: null,
        createPackageSuccess: null,
      };
    case ERR_CREATE_PACKAGE_ACTION:
      return {
        ...state,
        onCreatePackage: false,
        createPackageErr: action.payload,
        createPackageSuccess: null,
      };
    case SUCCESS_CREATE_PACKAGE_ACTION:
      return {
        ...state,
        onCreatePackage: false,
        createPackageErr: null,
        createPackageSuccess: action.payload,
      };
    case REMOVE_MSG_CREATE_PACKAGE_ACTION: {
      return { ...state, createPackageErr: null, createPackageSuccess: null };
    }

    case ADD_DOMAIN_ACTION:
      return {
        ...state,
        updateDomainSuccess: false,
        onAddDomain: true,
        addDomainErr: null,
        addDomainSuccess: false,
      };
    case ADD_DOMAIN_ERROR_ACTION:
      return {
        ...state,
        onAddDomain: false,
        addDomainErr: action.payload,
        addDomainSuccess: false,
      };
    case ADD_DOMAIN_SUCCESS_ACTION:
      return {
        ...state,
        onAddDomain: false,
        addDomainErr: null,
        addDomainSuccess: true,
      };

    case ADD_DOMAIN_DONE:
      return {
        ...state,
        onAddDomain: false,
        addDomainErr: null,
        addDomainSuccess: false,
      };

    case UPDATE_DOMAIN_ACTION:
      return {
        ...state,
        addDomainSuccess: false,
        onUpdateDomain: true,
        updateDomainErr: null,
        updateDomainSuccess: false,
      };
    case UPDATE_DOMAIN_ERROR_ACTION:
      return {
        ...state,
        onUpdateDomain: false,
        updateDomainErr: action.payload,
        updateDomainSuccess: false,
      };
    case UPDATE_DOMAIN_SUCCESS_ACTION:
      return {
        ...state,
        onUpdateDomain: false,
        updateDomainErr: null,
        updateDomainSuccess: true,
      };
    case UPDATE_DOMAIN_DONE:
      return {
        ...state,
        onUpdateDomain: false,
        updateDomainErr: null,
        updateDomainSuccess: false,
      };

    case GET_DOMAIN_ACTION:
      return {
        ...state,
        onGetDomain: true,
        getDomainSuccess: false,
        getDominErr: null,
      };
    case GET_DOMAIN_SUCCESS_ACTION:
      return {
        ...state,
        onGetDomain: false,
        getDomainSuccess: true,
        getDominErr: null,
        domain: action.payload,
      };

    case GET_DOMAIN_ERROR_ACTION:
      return {
        ...state,
        onGetDomain: false,
        getDomainSuccess: false,
        getDominErr: action.payload,
      };
    case ADD_CONTRACT_FEATURE_ACTION:
      return {
        ...state,
        onAddContractFeature: true,
        addContractFeatureErr: null,
        addContractFeatureSuccess: false,
      };
    case ADD_CONTRACT_FEATURE_ERROR_ACTION:
      return {
        ...state,
        onAddContractFeature: false,
        addContractFeatureErr: action.payload,
        addContractFeatureSuccess: false,
      };
    case ADD_CONTRACT_FEATURE_SUCCESS_ACTION:
      return {
        ...state,
        onAddContractFeature: false,
        addContractFeatureErr: null,
        addContractFeatureSuccess: true,
      };

    case ADD_CONTRACT_FEATURE_DONE:
      return {
        ...state,
        onAddContractFeature: false,
        addContractFeatureErr: null,
        addContractFeatureSuccess: false,
      };

    case GET_CONTRACT_FEATURE_ACTION:
      return {
        ...state,
        onGetContractFeatures: true,
        getContractFeaturesSuccess: false,
        getContractFeaturesErr: null,
      };
    case GET_CONTRACT_FEATURE_SUCCESS_ACTION:
      return {
        ...state,
        onGetContractFeatures: false,
        getContractFeaturesSuccess: true,
        getContractFeaturesErr: null,
        contractFeatures: action.payload.contractFeatures,
      };
    case GET_CONTRACT_FEATURE_ERROR_ACTION:
      return {
        ...state,
        onGetContractFeatures: false,
        getContractFeaturesSuccess: false,
        getContractFeaturesErr: action.payload,
      };
    case UPDATE_CONTRACT_FEATURE_ACTION:
      return {
        ...state,
        onUpdateContractFeatures: true,
        updateContractFeaturesErr: null,
        updateContractFeaturesSuccess: false,
      };
    case UPDATE_CONTRACT_FEATURE_ERROR_ACTION:
      return {
        ...state,
        onUpdateContractFeatures: false,
        updateContractFeaturesErr: action.payload,
        updateContractFeaturesSuccess: false,
      };
    case UPDATE_CONTRACT_FEATURE_SUCCESS_ACTION:
      return {
        ...state,
        onUpdateContractFeatures: false,
        updateContractFeaturesErr: null,
        updateContractFeaturesSuccess: true,
      };
    case UPDATE_CONTRACT_FEATURE_DONE_ACTION:
      return {
        ...state,
        onUpdateContractFeatures: false,
        updateContractFeaturesErr: null,
        updateContractFeaturesSuccess: false,
      };
    case DELETE_CONTRACT_FEATURE_ACTION:
      return {
        ...state,
        onDeleteContractFeatures: true,
        deleteContractFeaturesErr: null,
        deleteContractFeaturesSuccess: false,
      };
    case DELETE_CONTRACT_FEATURE_ERROR_ACTION:
      return {
        ...state,
        onDeleteContractFeatures: false,
        deleteContractFeaturesErr: action.payload,
        deleteContractFeaturesSuccess: false,
      };
    case DELETE_CONTRACT_FEATURE_SUCCESS_ACTION:
      return {
        ...state,
        onDeleteContractFeatures: false,
        deleteContractFeaturesErr: null,
        deleteContractFeaturesSuccess: true,
      };
    case DELETE_CONTRACT_FEATURE_DONE_ACTION:
      return {
        ...state,
        onDeleteContractFeatures: false,
        deleteContractFeaturesErr: null,
        deleteContractFeaturesSuccess: false,
      };
    case GET_CONTRACT_FEE_ACTION:
      return {
        ...state,
        onGetContractFee: true,
        getContractFeeSuccess: false,
        getContractFeesErr: null,
      };
    case GET_CONTRACT_FEE_SUCCESS_ACTION:
      return {
        ...state,
        onGetContractFee: false,
        getContractFeeSuccess: true,
        getContractFeesErr: null,
        contractFeeData: action.payload.basicFee,
      };
    case GET_CONTRACT_FEE_ERROR_ACTION:
      return {
        ...state,
        onGetContractFee: false,
        getContractFeeSuccess: false,
        getContractFeeErr: action.payload,
      };
    case UPDATE_CONTRACT_FEE_ACTION:
      return {
        ...state,
        onUpdateContractFee: true,
        updateContractFeeErr: null,
        updateContractFeeSuccess: false,
      };
    case UPDATE_CONTRACT_FEE_ERROR_ACTION:
      return {
        ...state,
        onUpdateContractFee: false,
        updateContractFeeErr: action.payload,
        updateContractFeeSuccess: false,
      };
    case UPDATE_CONTRACT_FEE_SUCCESS_ACTION:
      return {
        ...state,
        onUpdateContractFee: false,
        updateContractFeeErr: null,
        updateContractFeeSuccess: true,
      };
    case UPDATE_CONTRACT_FEE_DONE_ACTION:
      return {
        ...state,
        onUpdateContractFee: false,
        updateContractFeeErr: null,
        updateContractFeeSuccess: false,
      };
    default:
      return { ...state };
  }
};

export default adminData;
