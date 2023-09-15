import React, { Component, useState } from "react";
import Country from "../../ReduxWizard/Country.json";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { otpAction } from "../../../../../store/actions/AuthActions";
import { connect, useDispatch } from "react-redux";
import { login } from "../../../../../services/AuthService";

function UserDetails({
  nextStep,
  prevStep,
  setCountryName,
  countryName,
  setCountryCode,
  countryCode,
  setEmail,
  email,
  setPhoneNumber,
  phoneNumber,
  setPassword,
  password,
  setConfrmPassword,
  confrmpassword,
  errMsg,
  setConerr,
  conerr,
  setErrMsg,
  passed,
  setPassed,
  setEmailVal,
  emailVal,
  setPhoneVal,
  phoneVal,
  errAddress,
  setAddress,
  address,
  setErrAddress,
}) {
  //   constructor(props) {
  //   console.log("data", data);
  //     super(props);
  //     this.state = { countries: Country, searchCode: "", pherror: false };
  //   }

  // const [pherror, setPherror] = useState(false);

  const [countries, setCountries] = useState(Country);
  const [perrMsg, setperrMsg] = useState("");
  // const [searchCode, setSearchCode] = useState();
  // const [email, setEmail] = useState();
  // const [CountryName, setCountryName] = useState();
  // const [CountryCode, setCountryCode] = useState();
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [testpassword, setTestPassword] = useState();
  // const [confrmpassword, setConfrmPassword] = useState("");
  //const [phone, setPhone] = useState();
  // console.log("phone", phone);
  //   const Validatation = (values) => {
  //     if (!this.state.values.phoneNumber) {
  //       this.state.errors.phoneNumber = (
  //         <h6 style={{ color: "red" }}>Mobile Number Required</h6>
  //       );
  //     }
  //     if (!this.state.values.password) {
  //       this.state.errors.password = (
  //         <h6 style={{ color: "red" }}>Password Required</h6>
  //       );
  //     }
  //     if (!this.state.values.email) {
  //       this.state.errors.email = (
  //         <h6 style={{ color: "red" }}>Email Required</h6>
  //       );
  //     } else if (
  //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //     ) {
  //       this.state.errors.email = (
  //         <h6 style={{ color: "red" }}>Invalid email address</h6>
  //       );
  //     }
  //   };

  //   const onChangePhone = (value) => {
  //     const { handleChange } = this.props;

  //     var reg = /^\d+$/;
  //     //console.log(reg.test(value));
  //     if (reg.test(value)) {
  //       handleChange(value, "phoneNumber");
  //       this.setState({ pherror: false });
  //     } else {
  //       this.setState({ pherror: true });
  //     }
  //   };

  // const handleClick = () => {
  //   this.setState({ active: !this.state.active });
  // };
  const dispatch = useDispatch();

  const basicDetails = async (e) => {
    // const { values, handleChange } = this.props;
    // e.preventDefault();
    // const Data = {
    //   name: FirstName,
    //   email: email,
    //   username: UserName,
    //   password: password,
    //   phone_number: phoneNumber,
    //   phone_code: phone,
    //   nationality: CountryName,
    // };
    // dispatch(otpAction(Data, continues));
    // continues();
  };
  const [erremail, setErrEmail] = useState(false);

  const emailCheck = (e) => {
    const mail = e.target.value;
    if (/\S+@\S+\.\S+/.test(mail) || mail === "") {
      setErrEmail(false);
      setEmail(e.target.value);
    } else {
      setErrEmail(true);
    }
  };
  const countrycheck = (e) => {
    setCountryName(e.target.value);
    if (!countryName) {
      setConerr(false);
    }
  };

  const [addprice, setAddPrice] = useState();
  const mobileNumber = (e) => {
    // console.log("in functionoooo", e);
    let value = e.target.value;
    let currentLetter = e.nativeEvent.data;
    // console.log("tijjjjjjjjoooo", /^[a-zA-Z]+$/.test(currentLetter));
    if (currentLetter == null || !/^[a-zA-Z]+$/.test(currentLetter)) {
      // console.log("123");
      // setAddPrice(value);
      setPhoneNumber(value);
      setPhoneVal(false);
      // setErrMsg({
      //   ...errMsg,
      //   phoneNumber: false,
      // });
    }
  };

  const [passleng, setPassleng] = useState(false);
  const passLen = (e) => {
    const passwords = e.target.value;
    if (passwords.length < 6) {
      setPassleng(true);
    } else {
      setPassleng(false);
      setPassword(e.target.value);
    }
  };

  // const back = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };
  // const continues = (e) => {
  //   e.preventDefault();
  //   nextStep();
  // };
  // const passwordCheck = () => {
  //   // console.log("password", password);
  //   // console.log("confrmpassword", confrmpassword);

  //   if (password !== confrmpassword) {
  //     setPherror(true);
  //   } else {
  //     setPherror(false);
  //   }
  // };
  const handleAddress = (value) => {
    setAddress(value);
    setPassed(false);
  };
  const handlePassword = (value) => {
    setConfrmPassword(value);
    setPassed(false);
  };

  const handleEmail = (value) => {
    emailCheck(value);
    setEmailVal(false);
  };
  // const handlePhone = (value) => {
  //   emailCheck(value);
  //   setPhoneVal(false);
  // };

  // onSubmit={basicDetails}
  return (
    // <form autoComplete="off" onSubmit={basicDetails}>
    <div className="form-group mb-3">
      <input type="hidden" value="something" />
      <label className="mb-1">
        <strong>Email*</strong>
      </label>
      <input
        // value={email}
        className="form-control"
        placeholder="Enter Your Email"
        label="Email"
        type="email"
        // onChange={setEmail}
        onChange={(e) => {
          handleEmail(e);
        }}
        // defaultValue={values.email}
      />
      {emailVal && <h6 style={{ color: "red" }}>Email ID is Required</h6>}
      {erremail && <h6 style={{ color: "red" }}>Invalid Email ID </h6>}
      <br />
      <label className="mb-1 ">
        <strong>Nationality*</strong>
      </label>
      <select
        value={countryName}
        // onChange={(e) => {
        //   // CountryValue(e);
        //   setCountryName(e.target.value);
        // }}
        onChange={countrycheck}
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
      {conerr && <h6 style={{ color: "red" }}>Nationality is Required</h6>}
      <br />
      <div className="row">
        <div className="col-sm-3">
          <div className="marginBottom ">
            <label className="mb-1">
              <strong>Code*</strong>
            </label>
            <PhoneInput
              // inputStyle={{
              //   width: "100px",
              //   paddingLeft: "48px",
              //   borderRadius: "1rem 1rem 1rem 1rem ",
              // }}
              // containerStyle={{
              //   width: "10px",
              //   borderRadius: "1rem 1rem 1rem 1rem ",
              // }}

              value={countryCode}
              country={"in"}
              className="marginBottom"
              onChange={(phone) => setCountryCode(phone)}
            />
            {errMsg.codeerr && (
              <h6 style={{ color: "red" }}>Code is Required</h6>
            )}
          </div>
        </div>{" "}
        <div className="col-sm-9">
          <label className="mb-1" htmlFor="phonenum">
            <strong>Phone Number*</strong>
          </label>
          <input
            // autoComplete="new-password"
            autoComplete="off"
            name="phonenum"
            className="form-control"
            placeholder="Enter Your Phone Number"
            label="Phone Number"
            type="text"
            value={phoneNumber}
            // maxlength="13"
            onChange={mobileNumber}
          />
          {phoneVal && (
            <h6 style={{ color: "red" }}>Mobile Number is Required</h6>
          )}
          {perrMsg === "" && <h6 style={{ color: "red" }}>{perrMsg}</h6>}

          {/* {pherror ? (
              <span style={{ color: "red" }}>Please enter Mobile Number</span>
            ) : (
              ""
            )} */}
        </div>
      </div>
      <br />{" "}
      <div className="col-sm-12">
        {" "}
        <label className="mb-1">
          <strong>Address*</strong>
        </label>
        <input
          className="form-control"
          placeholder="Enter Your Address"
          label="Address"
          type="text"
          // value={password}
          onChange={(e) => {
            handleAddress(e.target.value);
          }}
          defaultValue={address}
          autoComplete="off"
        />{" "}
        {errAddress && <h6 style={{ color: "red" }}>Address is Required</h6>}
      </div>
      <br />
      <div className="row">
        <div className="col-sm-6">
          <label className="mb-1">
            <strong>Password*</strong>
          </label>
          <input
            className="form-control"
            placeholder="Enter Your Password"
            label="Password"
            type="password"
            // value={password}
            onChange={passLen}
            //   defaultValue={values.password}
          />{" "}
          {errMsg.passerr && (
            <h6 style={{ color: "red" }}>Password is Required</h6>
          )}
          {passleng && (
            <h6 style={{ color: "red" }}>
              Password must be atleast 6 characters
            </h6>
          )}
        </div>{" "}
        <div className="col-sm-6">
          <label className="mb-1">
            <strong>Confirm Password*</strong>
          </label>
          <input
            className="form-control"
            placeholder="Confirm  Password"
            label="Password"
            type="password"
            value={confrmpassword}
            onChange={(e) => {
              handlePassword(e.target.value);
            }}
            //   defaultValue={values.password}
            autoComplete="off"
          />
          {confrmpassword !== "" && password !== confrmpassword ? (
            <span style={{ color: "red" }}>Password does not match</span>
          ) : (
            ""
          )}
          {passed ? (
            <span style={{ color: "red" }}>Confirm password is required</span>
          ) : (
            ""
          )}
        </div>{" "}
      </div>
      {/* <button
          className="btn btn-primary ms-1"
          variant="contained"
          onClick={back}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn btn-primary ms-1"
          onClick={continues}
        >
          Next
        </button> */}
      <div className="new-account mt-3">
        <p className="">
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    // </form>
  );
}

const mapStateToProps = (state) => {
  return {
    // tid: state.auth.auth.id,
    // updatestatus: state.auth.updateSuccess,
    // changepassstatus: state.auth.changePassSuccess,
  };
};
export default connect(mapStateToProps, { otpAction })(UserDetails);
