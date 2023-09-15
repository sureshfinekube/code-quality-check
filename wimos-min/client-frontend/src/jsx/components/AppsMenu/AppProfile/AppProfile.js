import React, { Fragment, useState, useEffect } from "react";
import { Button, Dropdown, Modal, Col } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import failed from "../../../../images/swal-error.png";
// import Country from "../../../pages/Country.json";
import {
  UpdateProfileAction,
  loadingToggleAction,
  changePasswordAction,
} from "../../../../store/actions/AuthActions";
//** Import Image */
import profile from "../../../../images/profile/profile11.png";
import PageTitle from "../../../layouts/PageTitle";
import PhoneInput from "react-phone-input-2";
import Country from "../../../components/Forms/ReduxWizard/Country.json";

const AppProfile = (props) => {
  const [clientname, setClientname] = useState(props.name);
  const [searchCode, setSearchCode] = useState(props.nationality);
  const [countries, setCountries] = useState(Country);
  const [contactnumber, setContactNumber] = useState(
    props.userData.phone_number
  );
  const [code, setCode] = useState(props.code);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loader, SetLoader] = useState(false);
  const [btnLoader, SetBtnLoader] = useState(false);
  const [active, SetActive] = useState(false);
  const [countryCode, setCountryCode] = useState(props.userData.phone_code);
  const [countryName, setCountryName] = useState(props.userData.nationality);
  const [errMsg, setErrMsg] = useState("");
  const [conerr, setConerr] = useState(false);
  const [errCode, setErrCode] = useState(false);

  let errorsObj = {
    clientname: "",
    contactnumber: "",
    nationality: "",
    currentopassword: "",
    newpassword: "",
    confirmpassword: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  const dispatch = useDispatch();
  //   const optionslist = [
  // 	{ value: "chocolate", label: "Chocolate" },
  // 	{ value: "strawberry", label: "Strawberry" },
  // 	{ value: "vanilla", label: "Vanilla" },
  //   ];
  const searchCountry = countries.find((obj) => {
    if (obj.name === searchCode) {
      return true;
    }
    return false;
  });
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };
  // const onContact=(value)=>{
  //   if(!/\D/.test(value)){
  //     setContactNumber(value);
  //   }
  // }

  // var pattern = new RegExp(/^[0-15\b]+$/);

  // if (!pattern.test(contactnumber)) {

  //       }

  const countrycheck = (value) => {
    console.log("valueee", value);
    setCountryName(value);
    if (!countryName) {
      setConerr(false);
    }
  };

  function updateProfile(e) {
    SetLoader(true);
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (clientname === "") {
      errorObj.clientname = "Name is Required";
      error = true;
    }
    if (countryName === "") {
      // errorObj.nationality = "Nationality is Required";
      setConerr(true);
    }
    if (countryCode === "") {
      // errorObj.nationality = "Nationality is Required";
      setErrCode(true);
    } else {
      setErrCode(false);
    }
    if (contactnumber === "") {
      errorObj.contactnumber = "Phone number is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    } else {
      dispatch(loadingToggleAction(true));
      dispatch(
        UpdateProfileAction(
          clientname,
          contactnumber,
          countryCode,
          countryName,
          SetLoader
        )
      );
    }
  }

  const lastInput = (pass) => {
    setConfirmPassword(pass);
    SetActive(true);
  };

  const handleCode = (code) => {
    setCountryCode(code);
    setErrCode(false);
  };

  function changePassword(e) {
    SetBtnLoader(true);
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (currentPassword === "") {
      errorObj.currentopassword = "Current Password is required";
      error = true;
    }
    if (newPassword === "") {
      errorObj.newpassword = "New Password is required";
      error = true;
    }
    if (confirmPassword === "") {
      errorObj.confirmpassword = "Confirm Password is required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    } else {
      if (newPassword === confirmPassword) {
        finalCall();
      } else {
        SetActive(false);
        SetBtnLoader(false);
        swal("Oops", "Password Missmatch", {
          icon: failed,
          buttons: {
            cancel: "Try Again!",
          },
        });
      }
    }
  }

  const finalCall = () => {
    SetActive(true);
    SetBtnLoader(true);
    dispatch(loadingToggleAction(true));
    dispatch(changePasswordAction(currentPassword, newPassword, SetBtnLoader));
  };

  // useEffect(() => {
  //   if (props.updatestatus) {
  //     swal("Done", "Profile Updated Successfully", "success", {
  //       button: "Done",
  //     });
  //   }
  // }, [props.updatestatus]);

  // useEffect(() => {
  //   if (props.changepassstatus) {
  //     swal("Done", "Password Changed Successfully", "success", {
  //       button: "Done",
  //     });
  //   }
  // }, [props.changepassstatus]);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">
                      {props.userData.username}
                    </h4>
                    {/* <p>UX / UI Designer</p> */}
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{props.email}</h4>
                    {/* <p>Email</p> */}
                  </div>
                  {/* <Dropdown className="dropdown ms-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-user-circle text-primary me-2" />
                        View profile
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary me-2" />
                        Add to close friends
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary me-2" />
                        Add to group
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-ban text-primary me-2" />
                        Block
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Update Your Profile</h4>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={updateProfile}>
                      <div className="row">
                        <div className="form-group mb-3 col-md-12">
                          <label>Name</label>
                          <input
                            type="text"
                            value={clientname}
                            className="form-control"
                            placeholder="Enter your name"
                            onChange={(e) => setClientname(e.target.value)}
                          />
                        </div>
                        {errors.clientname && (
                          <div className="text-danger fs-12">
                            {errors.clientname}
                          </div>
                        )}

                        <div className="form-group mb-3 col-md-4">
                          <label>Nationality</label>

                          {/* <select
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            className="form-control w-full h-14 text-xl rounded-lg"
                          >
                            <option value="" hidden>
                              Select Country
                            </option>
                            {countries.map((item) => {
                              return (
                                <option key={uuidv4()} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select> */}
                          <select
                            value={countryName}
                            // value={
                            //   countryName
                            //     ? countryName
                            //     : props.contactDetail?.nationality
                            // }
                            // onChange={countrycheck}
                            onChange={(e) => countrycheck(e.target.value)}
                            label="Country"
                            //   defaultValue={values.Countries}
                            className="form-control w-full h-14 text-xl rounded-lg"
                            name="countries"
                          >
                            {/* <p>Nationality</p> */}
                            <option value="" hidden>
                              Select Country
                            </option>
                            {countries.map((item) => {
                              return (
                                <option key={uuidv4()} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {conerr && (
                          <h6 style={{ color: "red" }}>
                            Nationality is Required
                          </h6>
                        )}
                        <div className="form-group mb-3 col-md-8">
                          {/* <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                          /> */}
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-4">
                                {/* <label>Code</label> */}
                                <div className="marginBottom ">
                                  <label className="mb-2">Code</label>
                                  <PhoneInput
                                    value={countryCode}
                                    country={"in"}
                                    className="marginBottom"
                                    onChange={(phone) => handleCode(phone)}
                                  />
                                  {errCode ? (
                                    <h6 style={{ color: "red" }}>
                                      Code is required
                                    </h6>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                {/* <input
                                  as={Col}
                                  disabled
                                  value={
                                    (searchCountry &&
                                      searchCountry.dial_code) ||
                                    ""
                                  }
                                  onChange={(e) => setCode(e.target.value)}
                                  type="tel"
                                  placeholder="Code"
                                  className="form-control"
                                /> */}
                              </div>{" "}
                              <div className="col-md-8">
                                <label>Phone Number</label>
                                <input
                                  type="tel"
                                  value={contactnumber}
                                  placeholder="Phone Number"
                                  className="form-control "
                                  onChange={(e) =>
                                    setContactNumber(e.target.value)
                                  }
                                />
                              </div>
                              {errors.contactnumber && (
                                <div className="text-danger fs-12">
                                  {errors.contactnumber}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {!loader ? (
                        <button type="submit" className="btn btn-primary">
                          Update Profile
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Change Password</h4>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={changePassword}>
                      <div className="row">
                        <div className="form-group mb-3 col-md-6">
                          <label>Current Password</label>
                          <input
                            type="password"
                            value={currentPassword}
                            className="form-control"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                          />
                          {errors.currentopassword && (
                            <div className="text-danger fs-12">
                              {errors.currentopassword}
                            </div>
                          )}
                        </div>

                        <div className="form-group mb-3 col-md-6">
                          <label>New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            className="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                          />
                          {errors.newpassword && (
                            <div className="text-danger fs-12">
                              {errors.newpassword}
                            </div>
                          )}
                        </div>

                        <div className="form-group mb-3 col-md-6">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            className="form-control"
                            onChange={(e) => lastInput(e.target.value)}
                            placeholder="Re-enter new password"
                          />
                          {errors.confirmpassword && (
                            <div className="text-danger fs-12">
                              {errors.confirmpassword}
                            </div>
                          )}
                        </div>
                      </div>
                      {!active ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled
                        >
                          Update Password
                        </button>
                      ) : (
                        <>
                          {!btnLoader ? (
                            <button type="submit" className="btn btn-primary">
                              Update Password
                            </button>
                          ) : (
                            <button type="submit" className="btn btn-primary">
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "24px" }}
                              ></i>
                            </button>
                          )}
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    email: state.auth.auth.email,
    name: state.auth.auth.name,
    // username: state.auth.auth.username,
    // nationality: state.auth.auth.nationality,
    // phonenum: state.auth.auth.phone_number,
    // code: state.auth.auth.phone_code,
    userData: state.auth.auth,

    // updatestatus: state.auth.updateSuccess,
    // changepassstatus: state.auth.changePassSuccess,
  };
};
export default connect(mapStateToProps)(AppProfile);
