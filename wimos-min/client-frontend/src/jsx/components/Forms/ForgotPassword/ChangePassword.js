import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ReactCodeInput from "react-code-input";
import { connect } from "react-redux";
import { forgotpasswordAction } from "../../../../store/actions/AuthActions";

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMsg: "", SetBtnLoader: false };

    this.onchange = this.onchange.bind(this);
  }
  onchange(e) {
    this.setState({ otp: e });

    return;
  }
  continue = (e) => {
    e.preventDefault();

    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  // const [btnLoader, SetBtnLoader] = useState(false);

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

  buttonLoaderFalse = () => {
    this.setState({ SetBtnLoader: false });
  };

  SubmitPassword = async (e) => {
    // this.state.SetBtnLoader(true);
    this.setState({ SetBtnLoader: true });
    e.preventDefault();
    const { values, handleChange } = this.props;
    // if (values.password === values.confirmPass) {
    const Data = {
      id: this.props?.otpid?.id,
      otp: this.state.otp,
      new_password: values.password,
      confirm_password: values.confirmPass,
    };
    // console.log(this.props.history);
    this.props.forgotpasswordAction(
      Data,
      this.props.history,
      this.buttonLoaderFalse
      // this.setState({ SetBtnLoader: true })
    );
    // } else {
    //   this.setState({ errorMsg: "Password and Confirm Password not matched" });
    //   // console.log("errorMsg", this.state.errorMsg);
    // }

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
    const { values, handleChange } = this.props;

    return (
      <>
        {/* <label
          className="mb-1"
          htmlFor="val-email"
          style={{ textAlign: "center" }}
        > */}
        <div style={{ textAlign: "center" }}>
          <b>
            <p>Enter OTP *</p>
          </b>
          {/* </label> */}
          <p>
            Please enter the 6-digit verfication code
            <br /> that wast sent to <b>{values.email}</b>
            <br />
            The code is valid for <b>3</b> Mintues
          </p>{" "}
          <ReactCodeInput
            type="text"
            fields={6}
            onChange={this.onchange}
            defaultValue={values.otp}
            autoComplete="off"
            // {...props}
          />
          <br />
        </div>
        {/* <div>
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
        </div> */}
        <br />
        {/* <div style={{ textAlign: "center" }}>
          <button className="btn btn-success  " onClick={this.CodeChange}>
            Verify Code
          </button>
        </div> */}
        <br />
        <label className="mb-1">
          <strong>New Password *</strong>
        </label>
        <input
          className="form-control"
          placeholder="Enter Your Password"
          label="Password"
          type="password"
          autoComplete="off"
          // onChange={handleChange("password")}
          onChange={(e) => {
            handleChange(e.target.value, "password");
          }}
          defaultValue={values.password}
        />
        <br />
        <label className="mb-1">
          <strong>Confirm Password *</strong>
        </label>
        <input
          className="form-control"
          placeholder="Enter Your Password"
          label="Password"
          type="password"
          // onChange={handleChange("password")}
          onChange={(e) => {
            handleChange(e.target.value, "confirmPass");
          }}
          defaultValue={values.confirmPass}
        />

        {values.password !== values.confirmPass ? (
          <span style={{ color: "red" }}>Password does not match</span>
        ) : (
          ""
        )}

        {this.state.errorMsg === "" ? (
          " "
        ) : (
          <p style={{ color: "red" }}>{this.state.errorMsg}</p>
        )}
        <br />
        <button
          className="btn btn-primary ms-1"
          variant="contained"
          onClick={this.back}
        >
          Back
        </button>

        {!this.state.SetBtnLoader ? (
          <button
            type="submit"
            className="btn btn-primary ms-1"
            onClick={this.SubmitPassword}
          >
            Submit
          </button>
        ) : (
          <button type="submit" className="btn btn-primary ms-1">
            <i
              className="fa fa-spinner fa-spin"
              style={{ fontSize: "24px" }}
            ></i>
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    otpid: state.auth.otpdata.data,
  };
};
export default connect(mapStateToProps, { forgotpasswordAction })(
  ChangePassword
);
