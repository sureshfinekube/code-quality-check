import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_ERROR,
  LOGIN_ADMIN_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_ADMIN_ERROR,
  CHANGE_ADMIN_SUCCESS,
  LOGOUT_ADMIN,
  LOGOUT_ADMIN_ERROR,
  LOGOUT_ADMIN_SUCCESS,
 
} from './constant';


const INIT_STATE = {
  adminData: {},
  loginStat: false,
  onLogin: false,
  loginErr: null,
  onLogout: false,
  logoutErr: null,
  logoutStat:false,
  onChangePass:false,
  changePassErr:null,
  changePassSuccess:null,
};


const authUser = (state = INIT_STATE, action) => {
  // console.log("err",action.payload)
  switch (action.type) {
    case LOGIN_ADMIN:
      return { ...state, onLogin: true };
    case LOGIN_ADMIN_ERROR:
      return { ...state, onLogin: false, loginErr: action.payload };
    case LOGIN_ADMIN_SUCCESS:
      return {  onLogin: false, loginErr: null, loginStat: true, adminData: action.payload };
    case LOGOUT_ADMIN:
      return { ...state, onLogout:true };
    case LOGOUT_ADMIN_ERROR:
      return { ...state,logoutErr: action.payload };
    case LOGOUT_ADMIN_SUCCESS:
      return {...state,  onLogin: false, logoutErr:null, loginStat: false, logoutStat:true, adminData: {} };

    case CHANGE_PASSWORD:
      return { ...state, onChangePass: true, changePassErr:null,changePassSuccess:false };
    case CHANGE_ADMIN_ERROR:
      return { ...state, onChangePass: false, changePassErr: action.payload };
    case CHANGE_ADMIN_SUCCESS:
      return {  ...state,onChangePass: false, changePassErr: null,changePassSuccess:true };

    default:
      return {...state}
  }
};

export default authUser;



