import React, { Component } from "react";
// import axios from "axios";

import { Link } from "react-router-dom";
import { forgotpasswordotpAction } from "../../../../store/actions/AuthActions";
import { connect } from "react-redux";

export class Email extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { countries: Country, searchCode: "", pherror: false };
  //   }

  //   Validatation = (values) => {
  //     // if (!this.state.values.phoneNumber) {
  //     //   this.state.errors.phoneNumber = (
  //     //     <h6 style={{ color: "red" }}>Mobile Number Required</h6>
  //     //   );
  //     // }
  //     // if (!this.state.values.password) {
  //     //   this.state.errors.password = (
  //     //     <h6 style={{ color: "red" }}>Password Required</h6>
  //     //   );
  //     // }
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

  //   handleClick = () => {
  //     this.setState({ active: !this.state.active });
  //   };

  OtpSend = async (e) => {
    //console.log("arrived here: ", e);
    const { values, handleChange } = this.props;
    //  console.log("value", values.email);
    e.preventDefault();
    const Data = {
      email: values.email,
    };
    this.props.forgotpasswordotpAction(Data, this.continue);
    // this.continue();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  continue = (e) => {
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    //    onSubmit={this.basicDetails}
    // onSubmit={(event) => this.BasicDetails(event)}
    return (
      <form onSubmit={this.basicDetails} autoComplete="off">
        <div className="form-group mb-3">
          <label className="mb-1">
            <strong>Email *</strong>
          </label>
          <input
            className="form-control"
            placeholder="Enter Your Email"
            label="Email"
            type="email"
            // onChange={handleChange("email")}
            onChange={(e) => {
              handleChange(e.target.value, "email");
            }}
            defaultValue={values.email}
          />
          <br />{" "}
          {/* <button
            className="btn btn-primary ms-1"
            variant="contained"
            onClick={this.back}
          >
            Back
          </button> */}
          <button
            type="submit"
            className="btn btn-primary ms-1"
            onClick={this.OtpSend}
          >
            Next
          </button>
          {/* <Button color="primary" variant="contained" onClick={this.continue}>
            Continue
          </Button> */}
          <div className="new-account mt-3">
            <p className="">
              Go to{" "}
              <Link className="text-primary" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // tid: state.auth.auth.id,
    // updatestatus: state.auth.updateSuccess,
    // changepassstatus: state.auth.changePassSuccess,
  };
};
export default connect(mapStateToProps, { forgotpasswordotpAction })(Email);
