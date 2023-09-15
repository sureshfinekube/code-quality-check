import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  UPDATE_PROFILE_CONFIRM_ACTION,
  UPDATE_PROFILE_FAILED_ACTION,
  UPDATE_PROFILE_COMPLETE_ACTION,
  CHANGE_PASSWORD_CONFIRM_ACTION,
  CHANGE_PASSWORD_FAILED_ACTION,
  CHANGE_PASSWORD_COMPLETE_ACTION,
  SIGNUP_COMPLETE_ACTION,
  SELECTPACKAGE_FAILED_ACTION,
  SELECTPACKAGE_CONFIRMED_ACTION,
  GETCURRENT_CLIENT_SUCCESS_CONFIRMED_ACTION,
  // STRIPE_PAYEMENT_ACTION,
  // STRIPE_PAYEMENT_FAILED,
  GET_SIORE_CONFIRMED_ACTION,
  GET_SIORE_FAILED_ACTION,
  SELECT_SIORE_CONFIRMED_ACTION,
  SELECT_SIORE_FAILED_ACTION,
  STORE_STATUS_DONE_ACTION,
  STORE_STATUS_FAILED_ACTION,
  IS_STORE_SELECTED_ACTION,
  CONTRACT_FAILED_ACTION,
  CONTRACT_CONFIRMED_ACTION,
  CONTRACT_COMPLETE_ACTION,
  CREATEOTP_FAILED_ACTION,
  CREATEOTP_CONFIRMED_ACTION,
  CREATEOTP_DONE_ACTION,
  CREATESTORE_FAILED_ACTION,
  CREATESTORE_CONFIRMED_ACTION,
  CREATESTORE_DONE_ACTION,
  STRIPE_PACKAGE_UPDATION_CONFIRMED_ACTION,
  // CHECKDOMAIN_FAILED_ACTION,
  // CHECKDOMAIN_CONFIRMED_ACTION,
  VERIFYOTP_CONFIRMED_ACTION,
  VERIFYOTP_FAILED_ACTION,
  VERIFYOTP_DONE_ACTION,
  UPDATE_STORE_COMPLETE_ACTION,
  UPDATE_STORE_CONFIRM_ACTION,
  UPDATE_STORE_FAILED_ACTION,
  STRIPE_SUCCESS_CONFIRMED_Action,
  FORGOT_PASSWORD_OTP_COMPLETE_ACTION,
  FORGOT_PASSWORD_OTP_CONFIRM_ACTION,
  FORGOT_PASSWORD_OTP_FAILED_ACTION,
  FORGOT_PASSWORD_COMPLETE_ACTION,
  FORGOT_PASSWORD_CONFIRM_ACTION,
  FORGOT_PASSWORD_FAILED_ACTION,
  CLEAR_REDUX_ACTION,
  UPDATE_SEO_COMPLETE_ACTION,
  UPDATE_SEO_FAILED_ACTION,
  UPDATE_SEO_CONFIRM_ACTION,
  CONTRACT_DATA_SAVE,
  MODE,
  SLIDER_SECTION_CREATE_CONFIRM_ACTION,
  SLIDER_SECTION_CREATE_FAILED_ACTION,
  SLIDER_SECTION_CREATE_SUCCESS_ACTION,
  SLIDER_SECTION_GET_CONFIRM_ACTION,
  SLIDER_SECTION_GET_FAILED_ACTION,
  SLIDER_SECTION_UPDATE_CONFIRM_ACTION,
  SLIDER_SECTION_UPDATE_FAILED_ACTION,
  SLIDER_SECTION_UPDATE_SUCCESS_ACTION,
  SLIDER_SECTION_DELETE_CONFIRM_ACTION,
  SLIDER_SECTION_DELETE_SUCCESS_ACTION,
  SLIDER_SECTION_DELETE_FAILED_ACTION,
  SLIDER_TITLE_UPDATE_CONFIRM_ACTION,
  SLIDER_TITLE_UPDATE_FAILED_ACTION,
  SLIDER_TITLE_UPDATE_SUCCESS_ACTION,
  SLIDER_TITLE_GET_FAILED_ACTION,
  SLIDER_TITLE_GET_CONFIRM_ACTION,
  PROFILE_SECTION_UPDATE_CONFIRM_ACTION,
  PROFILE_SECTION_UPDATE_FAILED_ACTION,
  PROFILE_SECTION_UPDATE_SUCCESS_ACTION,
  CONTRACT_COMPILE_DATA_SAVE,
  CURRENT_STORE_SELECT,
  CLEAR_STORE_ID,
  STORE_CREATION_STATUS,
  GET_REPORTS_CONFIRMED_ACTION,
  GET_REPORTS_FAILED_ACTION,
  GET_SOCAILMEDIA_FAILED_ACTION,
  GET_SOCAILMEDIA_CONFIRMED_ACTION,
  ADD_SOCAILMEDIA_FAILED_ACTION,
  ADD_SOCAILMEDIA_CONFIRMED_ACTION,
  ADD_SOCAILMEDIA_COMPLETE_ACTION,
  UPDATE_SOCAILMEDIA_CONFIRMED_ACTION,
  UPDATE_SOCAILMEDIA_FAILED_ACTION,
  UPDATE_SOCAILMEDIA_COMPLETE_ACTION,
  DELETE_SOCAILMEDIA_FAILED_ACTION,
  DELETE_SOCAILMEDIA_COMPLETE_ACTION,
  DELETE_SOCAILMEDIA_CONFIRM_ACTION,
  ADD_CONTACTUS_COMPLETE_ACTION,
  ADD_CONTACTUS_CONFIRMED_ACTION,
  ADD_CONTACTUS_FAILED_ACTION,
} from "../actions/AuthActions";

const initialState = {
  auth: {},
  stores: "",
  authstatus: false,
  errorMessage: "",
  successMessage: "",
  updateSuccess: false,
  showLoading: false,
  getstoreSuccess: false,
  selectedStore: "",
  storeSelected: false,
  otpId: "",
  clientId: "",
  authData: "",
  storeId: "",
  storeNotCreated: false,
  otpdata: "",
  seo: "",
  // tidstatus: "",
  contractdata: "",
  dataforcompile: "",
  mode: "light",
  slidersection: "",
  sectiontitle: "",
  // currentstore: "",
  createstorestatus: false,
  reports: "",
  GetsocialMedia: "",
  PostsocialMedia: "",
  UpdatesocialMedia: "",
  contactDetails: "",
};

export function AuthReducer(state = initialState, action) {
  // console.log("action", action.payload);
  if (action.type === CLEAR_REDUX_ACTION) {
    return {
      ...state,
      auth: {},
      stores: "",
      authstatus: false,
      errorMessage: "",
      successMessage: "",
      updateSuccess: false,
      showLoading: false,
      getstoreSuccess: false,
      selectedStore: "",
      storeSelected: false,
      otpId: "",
      clientId: "",
      authData: "",
      storeId: "",
      storeNotCreated: false,
      otpdata: "",
      seo: "",
      seo: "",
      contractdata: "",
      dataforcompile: "",
      slidersection: "",
      sectiontitle: "",
      createstorestatus: false,
      reports: "",
      PostsocialMedia: "",
      GetsocialMedia: "",
      UpdatesocialMedia: "",
    };
  }
  if (action.type === CLEAR_STORE_ID) {
    return {
      ...state,
      storeId: "",
    };
  }
  if (action.type === STORE_CREATION_STATUS) {
    return {
      ...state,
      createstorestatus: action.payload,
    };
  }
  if (action.type === CURRENT_STORE_SELECT) {
    return {
      ...state,
      // currentstore: action.payload,
      storeId: action.payload,
    };
  }
  if (action.type === STRIPE_SUCCESS_CONFIRMED_Action) {
    return {
      ...state,
      authstatus: true,
      storeSelected: true,
    };
  }
  if (action.type === STRIPE_PACKAGE_UPDATION_CONFIRMED_ACTION) {
    return {
      ...state,
      authstatus: true,
      storeSelected: true,
    };
  }
  if (action.type === GETCURRENT_CLIENT_SUCCESS_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload.currentClient,
    };
  }

  if (action.type === SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,

      errorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === CREATEOTP_CONFIRMED_ACTION) {
    return {
      ...state,
      otpId: action.payload.data,

      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === SELECTPACKAGE_CONFIRMED_ACTION) {
    return {
      ...state,

      errorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === CREATEOTP_DONE_ACTION) {
    return {
      ...state,
      // auth: action.payload,
      errorMessage: "",
      showLoading: false,
      authData: "",
    };
  }

  if (action.type === VERIFYOTP_DONE_ACTION) {
    return {
      ...state,
      // auth: action.payload,
      errorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === VERIFYOTP_CONFIRMED_ACTION) {
    return {
      ...state,
      authData: action.payload,
      auth: action.payload.data,
      // tidstatus: action.payload.status,
      errorMessage: "",
      showLoading: false,
    };
  }

  // if (action.type === CHECKDOMAIN_CONFIRMED_ACTION) {
  //   return {
  //     ...state,
  //     // auth: action.payload,

  //     errorMessage: "",
  //     // successMessage: swal("Done", "Signup Successfully Completed", "sucess", {
  //     //   button: "Next",
  //     // }),
  //     // successMessage: "Otp Successfully Completed",
  //     showLoading: false,
  //   };
  // }

  if (action.type === CREATESTORE_CONFIRMED_ACTION) {
    return {
      ...state,
      // auth: action.payload,
      storeId: action.payload.data,
      errorMessage: "",
      successMessage: "",
      showLoading: false,
      selectedStore: action.payload.data,
    };
  }
  if (action.type === CREATESTORE_DONE_ACTION) {
    return {
      ...state,
      // auth: action.payload,
      errorMessage: "",
      showLoading: false,
      // storeNotCreated: false,
    };
  }

  if (action.type === CONTRACT_CONFIRMED_ACTION) {
    return {
      ...state,
      // auth: action.payload,

      errorMessage: "",
      // successMessage: swal("Done", "Signup Successfully Completed", "sucess", {
      //   button: "Next",
      // }),
      successMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: "",
      showLoading: false,
      authstatus: true,
      storeSelected: false,
    };
  }

  if (action.type === GET_SIORE_CONFIRMED_ACTION) {
    return {
      ...state,
      stores: action.payload,
      getstoreSuccess: true,
      errorMessage: "",
      showLoading: false,
      storeSelected: false,
    };
  }
  // SOCIALMEDIa start
  if (action.type === GET_SOCAILMEDIA_CONFIRMED_ACTION) {
    return {
      ...state,
      GetsocialMedia: action.payload,
      showLoading: false,
      errorMessage: "",
    };
  }

  if (action.type === ADD_SOCAILMEDIA_CONFIRMED_ACTION) {
    return {
      ...state,
      PostsocialMedia: action.payload.data,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === ADD_SOCAILMEDIA_COMPLETE_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
    };
  }
  if (action.type === ADD_CONTACTUS_CONFIRMED_ACTION) {
    return {
      ...state,
      contactDetails: action.payload.data,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === ADD_CONTACTUS_COMPLETE_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
    };
  }

  if (action.type === UPDATE_SOCAILMEDIA_CONFIRMED_ACTION) {
    return {
      ...state,
      UpdatesocialMedia: action.payload.data,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === UPDATE_SOCAILMEDIA_COMPLETE_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
    };
  }
  // SOCIALMEDIa end

  if (action === GET_SIORE_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      getstoreSuccess: false,
      successMessage: "",
    };
  }
  if (action.type === GET_REPORTS_CONFIRMED_ACTION) {
    return {
      ...state,
      reports: action.payload,
      errorMessage: "",
      showLoading: false,
    };
  }

  if (action === GET_REPORTS_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      successMessage: "",
    };
  }

  if (action.type === UPDATE_STORE_CONFIRM_ACTION) {
    return {
      ...state,
      storeId: action.payload.data,
      selectedStore: action.payload.data,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === UPDATE_STORE_COMPLETE_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
    };
  }

  if (action.type === UPDATE_SEO_CONFIRM_ACTION) {
    return {
      ...state,
      seo: action.payload.data,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === UPDATE_SEO_COMPLETE_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
    };
  }

  if (action.type === SELECT_SIORE_CONFIRMED_ACTION) {
    return {
      ...state,
      storeId: action.payload,
      selectedStore: action.payload,
      storeId: action.payload,
      storeSelected: true,
      errorMessage: "",
      showLoading: false,
    };
  }
  if (action.type === FORGOT_PASSWORD_OTP_CONFIRM_ACTION) {
    return {
      ...state,
      otpdata: action.payload,
      showLoading: false,
    };
  }
  if (action.type === FORGOT_PASSWORD_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: false,
    };
  }
  if (action.type === SELECT_SIORE_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
      showLoading: false,
      storeSelected: false,
      successMessage: "",
    };
  }
  if (action.type === IS_STORE_SELECTED_ACTION) {
    // console.log("tes", action.payload);
    return {
      ...state,
      storeSelected: action.payload,
    };
  }

  if (action.type === LOGOUT_ACTION) {
    return {
      ...state,
      auth: {},
      stores: "",
      errorMessage: "",
      successMessage: "",
      updateSuccess: false,
      showLoading: false,
      getstoreSuccess: false,
      selectedStore: "",
      storeSelected: false,
      otpId: "",
      clientId: "",
      authData: "",
      storeId: "",
      storeNotCreated: false,
      authstatus: false,
      contractdata: "",
      dataforcompile: "",
      seo: "",
      contractdata: "",
      slidersection: "",
      sectiontitle: "",
      createstorestatus: false,
      GetsocialMedia: "",
      contactDetails: "",
      // currentstore: "",
    };
  }
  // if (action.type === VERIFYOTP_FAILED_ACTION2) {
  //   return {
  //     sucess: false,
  //   };
  // }

  if (
    action.type === SIGNUP_FAILED_ACTION ||
    action.type === LOGIN_FAILED_ACTION ||
    action.type === UPDATE_PROFILE_FAILED_ACTION ||
    action.type === CHANGE_PASSWORD_FAILED_ACTION ||
    action.type === SELECT_SIORE_FAILED_ACTION ||
    action.type === STORE_STATUS_FAILED_ACTION ||
    action.type === CREATEOTP_FAILED_ACTION ||
    action.type === CONTRACT_FAILED_ACTION ||
    action.type === CREATESTORE_FAILED_ACTION ||
    action.type === VERIFYOTP_FAILED_ACTION ||
    action.type === SELECTPACKAGE_FAILED_ACTION ||
    action.type === UPDATE_STORE_FAILED_ACTION ||
    action.type === FORGOT_PASSWORD_OTP_FAILED_ACTION ||
    action.type === FORGOT_PASSWORD_FAILED_ACTION ||
    action.type === UPDATE_SEO_FAILED_ACTION ||
    action.type === SLIDER_SECTION_CREATE_FAILED_ACTION ||
    action.type === SLIDER_SECTION_GET_FAILED_ACTION ||
    action.type === SLIDER_SECTION_UPDATE_FAILED_ACTION ||
    action.type === SLIDER_SECTION_DELETE_FAILED_ACTION ||
    action.type === SLIDER_TITLE_UPDATE_FAILED_ACTION ||
    action.type === SLIDER_TITLE_GET_FAILED_ACTION ||
    action.type === PROFILE_SECTION_UPDATE_FAILED_ACTION ||
    action.type === GET_SOCAILMEDIA_FAILED_ACTION ||
    action.type === ADD_SOCAILMEDIA_FAILED_ACTION ||
    action.type === UPDATE_SOCAILMEDIA_FAILED_ACTION ||
    action.type === DELETE_SOCAILMEDIA_FAILED_ACTION ||
    action.type === ADD_CONTACTUS_FAILED_ACTION
  ) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: "",
      showLoading: false,
    };
  }

  if (
    action.type === UPDATE_PROFILE_COMPLETE_ACTION ||
    action.type === CHANGE_PASSWORD_COMPLETE_ACTION ||
    action.type === SIGNUP_COMPLETE_ACTION ||
    action.type === STORE_STATUS_DONE_ACTION ||
    action.type === CONTRACT_COMPLETE_ACTION ||
    action.type === FORGOT_PASSWORD_OTP_COMPLETE_ACTION ||
    action.type === FORGOT_PASSWORD_COMPLETE_ACTION ||
    action.type === SLIDER_SECTION_CREATE_SUCCESS_ACTION ||
    action.type === SLIDER_SECTION_UPDATE_SUCCESS_ACTION ||
    action.type === SLIDER_SECTION_DELETE_SUCCESS_ACTION ||
    action.type === SLIDER_TITLE_UPDATE_SUCCESS_ACTION ||
    action.type === PROFILE_SECTION_UPDATE_SUCCESS_ACTION
  ) {
    return {
      ...state,
      successMessage: action.payload,
      errorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
      updateSuccess: false,
    };
  }
  if (action.type === UPDATE_PROFILE_CONFIRM_ACTION) {
    return {
      ...state,
      errorMessage: "",
      showLoading: false,
      auth: action.payload.data,
    };
  }

  if (action.type === CHANGE_PASSWORD_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: false,
    };
  }
  if (action.type === CONTRACT_DATA_SAVE) {
    return {
      ...state,
      contractdata: action.payload,
    };
  }
  if (action.type === CONTRACT_COMPILE_DATA_SAVE) {
    return {
      ...state,
      dataforcompile: action.payload,
    };
  }
  if (action.type === MODE) {
    return {
      ...state,
      mode: action.payload,
    };
  }
  if (action.type === SLIDER_SECTION_CREATE_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: true,
    };
  }
  if (action.type === SLIDER_SECTION_UPDATE_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: true,
    };
  }
  if (action.type === SLIDER_SECTION_GET_CONFIRM_ACTION) {
    return {
      ...state,
      slidersection: action.payload.data,
      showLoading: false,
    };
  }
  if (action.type === SLIDER_SECTION_DELETE_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: true,
    };
  }
  if (action.type === SLIDER_TITLE_UPDATE_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: true,
    };
  }
  if (action.type === SLIDER_TITLE_GET_CONFIRM_ACTION) {
    return {
      ...state,
      sectiontitle: action.payload.data,
      showLoading: false,
    };
  }
  if (action.type === PROFILE_SECTION_UPDATE_CONFIRM_ACTION) {
    return {
      ...state,
      showLoading: false,
    };
  }
  return state;
}
