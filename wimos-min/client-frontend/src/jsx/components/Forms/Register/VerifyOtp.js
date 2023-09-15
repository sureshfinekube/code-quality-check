import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ReactCodeInput from "react-code-input";
import axios from "axios";
import swal from "sweetalert";
import { connect } from "react-redux";
import { verifyotpAction } from "../../../../store/actions/AuthActions";
const props = {
  className: "reactCodeInput",
  inputStyle: {
    fontFamily: "monospace",
    margin: "4px",
    MozAppearance: "textfield",
    width: "33px",
    borderRadius: ".5rem",
    fontSize: "20px",
    height: "33px",
    padding: "10px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid #e4e4e4",
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
export class VerifyOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      isFormSubmitted: false,
    };
    this.onchange = this.onchange.bind(this);
  }
  onchange(e) {
    this.setState({ otp: e });

    return;
  }
  continue = (e) => {
    // e.preventDefault();
    if (!this.props.authdata.alreadyClientRegistered) {
      this.props.nextStep();
    } else {
      this.props.jumpStep(this.props.authdata.data.currentStep);
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  //     .then((response) => {
  //       // console.log("then");
  //       console.log(response.data.message);
  //       if (response.data.status === true) {
  //         swal("Success", response.data.message, "success", {
  //           button: "Next",
  //         });
  //         this.setState({ active: !this.state.active });
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log("err");
  //       // console.log(err.response.data.errors[0].message);
  //       swal("Oops", err.response.data.errors[0].message, "error", {
  //         button: "Try Again!",
  //       });
  //     });
  // };

  CodeChange = async (e) => {
    e.preventDefault();
    const { values, handleChange } = this.props;
    const Data = {
      id: this.props.otpid,
      otp: this.state.otp,
    };

    this.props.verifyotpAction(Data, this.continue);
    // console.log("authdata   ", this.props.authdata);
    // if (this.props.authdata.status === true) {
    //   this.setState({ active: !this.state.active });
    // }
    // if (this.props.authdata.status === true) {
    //   this.setState({ active: !this.state.active });
    // }
    // handleChange(this.props.authdata.id, "storeId");
    // console.log("status   ", this.props.authdata.status);
  };

  // componentDidMount() {
  //   console.log("authdata   ", this.props.authdata);
  //   if (this.props.authdata1 !== "") {
  //     if (this.props.authdata.status === true) {
  //       this.setState({ active: !this.state.active });
  //     }
  //   }
  // }

  render() {
    const { active } = this.state;
    const { values } = this.props;

    return (
      <>
        {/* <label
          className="mb-1"
          htmlFor="val-email"
          style={{ textAlign: "center" }}
        > */}
        <b>
          <p style={{ textAlign: "center" }}>Verify Account</p>
        </b>
        {/* </label> */}
        <p style={{ textAlign: "center" }}>
          Please enter the 6-digit verfication code
          <br /> that wast sent to <b>{values.email}</b>
          <br />
          The code is valid for <b>3</b> Mintues
        </p>{" "}
        <center>
          <ReactCodeInput
            type="text"
            fields={6}
            onChange={this.onchange}
            value={this.state.otp}
            {...props}
          />
        </center>
        <br />
        <div style={{ textAlign: "center" }}>
          <Tooltip
            title={
              <div style={{ fontSize: "9px" }}>
                If you haven't received the email ,do the following:
                <br />
                1. Make sure provided email address is correct.
                <br />
                2. Check spam or other folders.
                <br />
                3. Set email address whitelist.
                <br />
                4. Check the email cilent works normally
                <br />
              </div>
            }
            placement="bottom"
          >
            <i className="fas fa-info-circle" style={{ color: "#f06969" }}>
              Instructions
            </i>
          </Tooltip>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button className="btn btn-success  " onClick={this.CodeChange}>
            Verify Code
          </button>
        </div>
        <br /> <br />
        <button
          className="btn btn-primary ms-1"
          variant="contained"
          onClick={this.back}
        >
          Back
        </button>
        {/* {this.props.authdata.status ? (
          <button
            type="submit"
            className="btn btn-primary ms-1"
            onClick={this.continue}
          >
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-dark ms-1">
            Next
          </button>
        )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    otpid: state.auth.otpId.id,
    authdata: state.auth.authData,
  };
};
export default connect(mapStateToProps, { verifyotpAction })(VerifyOtp);
