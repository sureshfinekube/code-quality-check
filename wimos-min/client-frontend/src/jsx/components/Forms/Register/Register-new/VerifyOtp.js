import React, { Component, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ReactCodeInput from "react-code-input";
import { connect, useDispatch } from "react-redux";
//import { verifyotpAction } from "../../../../../store/actions/AuthActions";
import { withStyles } from "@material-ui/core/styles";

const props = {
  className: "reactCodeInput",
  inputStyle: {
    fontFamily: "monospace",
    margin: "4px",
    MozAppearance: "textfield",
    width: "33px",
    borderRadius: ".8rem",
    fontSize: "20px",
    height: "33px",
    padding: "10px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid #E4E4E4",
  },

  // inputStyleInvalid: {
  //   fontFamily: "monospace",
  //   margin: "4px",
  //   MozAppearance: "textfield",
  //   width: "15px",
  //   borderRadius: "3px",
  //   fontSize: "14px",
  //   height: "26px",
  //   paddingLeft: "7px",
  //   backgroundColor: "black",
  //   color: "red",
  //   border: "1px solid red",
  // },
};

function VerifyOtp({ nextStep, prevStep, email, otpid, setOtpData, otpData }) {
  const [active, setActive] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       active: false,
  //       isFormSubmitted: false,
  //     };
  //     this.onchange = this.onchange.bind(this);
  //   }
  //   const onchanges = (e) => {
  //     setOtp({ otp: e });
  //     console.log(otp.length);
  //     return;
  //   };
  // const continues = (e) => {
  //   // e.preventDefault();
  //   nextStep();
  // };

  // const back = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };

  // const CodeChange = async (e) => {
  //   // continues();
  //   // e.preventDefault();
  //   // const Data = {
  //   //   id: this.state.otpid,
  //   //   otp: otp,
  //   // };
  //   // verifyotpAction(Data, continues);
  // };
  const CustomTooltip = withStyles({
    tooltip: {
      color: "#fff",
      backgroundColor: "#bd1bb3b0",
      // width: "200px",
      padding: "10px",
    },
  })(Tooltip);

  useEffect(() => {
    if (otpData?.length === 6) {
      nextStep();
      // setOtpData("");
      // //console.log("otppp", otpData);

      // setOtpData("");
      // console.log("otppp1", otpData);
    }
  }, [otpData]);
  // const callApi = (otp) => {
  //   //  console.log("otp", otpData);

  //   setOtpData(otp);
  //   nextStep();
  // };

  // const handleOtp = (e) => {
  //   console.log("otp", e.length);
  //   setOtp(e);
  //   console.log("otp", otp);
  //   // let otptest = e;
  //   // // console.log("otp", otptt);
  //   // if (otptest?.length === 6) {
  //   //   console.log("otp", otptest);
  //   //   setOtp(otptest);
  //   //   console.log("otp", otp);
  //   //   callApi(otp);
  //   // }
  // };

  return (
    <>
      <b>
        <p style={{ textAlign: "center" }}>Verify Account</p>
      </b>
      <p style={{ textAlign: "center", fontSize: "10px" }}>
        Please enter the 6-digit verfication code that was sent to{" "}
        <b>{email}</b>
        <br />
        The code is valid for <b>3</b> mintues only
      </p>{" "}
      <center>
        <ReactCodeInput
          type="text"
          fields={6}
          // defaultValue={otpData}
          value={otpData}
          onChange={(e) => {
            setOtpData(e);
          }}
          {...props}
        />
      </center>
      <br />
      <div style={{ textAlign: "center" }}>
        <CustomTooltip
          title={
            <div style={{ fontSize: "11px" }}>
              If you haven't received the email ,do the following:
              <br />
              1. Make sure provided email address is correct.
              <br />
              2. Check spam or other folders.
              <br />
              3. Set email address whitelist.
              <br />
              4. Check the email cilent works normally.
              <br />
            </div>
          }
          placement="bottom"
        >
          {/* <i className="fas fa-info-circle" style={{ color: "#f06969" }} /> */}
          <p className="feature-name" style={{ color: "#901075" }}>
            Instructions
          </p>
        </CustomTooltip>

        {/* <Tooltip
          title={
            <div style={{ fontSize: "11px" }}>
              If you haven't received the email ,do the following:
              <br />
              1. Make sure provided email address is correct.
              <br />
              2. Check spam or other folders.
              <br />
              3. Set email address whitelist.
              <br />
              4. Check the email cilent works normally.
              <br />
            </div>
          }
          placement="bottom"
        >
          <i className="fas fa-info-circle" style={{ color: "#f06969" }}>
            Instructions
          </i>
        </Tooltip> */}
      </div>
      <br />
      {/* <div style={{ textAlign: "center" }}>
        <button className="btn btn-success  " onClick={CodeChange}>
          Verify Code
        </button>
      </div> */}
      {/* <br /> <br /> */}
      {/* <button
        className="btn btn-primary ms-1"
        variant="contained"
        onClick={back}
      >
        Back
      </button> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    otpid: state.auth.otpId.id,
    authdata: state.auth.authData,
  };
};
export default connect(mapStateToProps)(VerifyOtp);
