import React, { Component } from "react";
import Country from "../ReduxWizard/Country.json";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";

import { Link } from "react-router-dom";
import { otpAction } from "../../../../store/actions/AuthActions";
import { connect } from "react-redux";

export class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: Country, searchCode: "", pherror: false };
  }

  Validatation = (values) => {
    if (!this.state.values.phoneNumber) {
      this.state.errors.phoneNumber = (
        <h6 style={{ color: "red" }}>Mobile Number Required</h6>
      );
    }
    if (!this.state.values.password) {
      this.state.errors.password = (
        <h6 style={{ color: "red" }}>Password Required</h6>
      );
    }
    if (!this.state.values.email) {
      this.state.errors.email = (
        <h6 style={{ color: "red" }}>Email Required</h6>
      );
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      this.state.errors.email = (
        <h6 style={{ color: "red" }}>Invalid email address</h6>
      );
    }
  };

  onChangePhone = (value) => {
    const { handleChange } = this.props;

    var reg = /^\d+$/;
    //console.log(reg.test(value));
    if (reg.test(value)) {
      handleChange(value, "phoneNumber");
      this.setState({ pherror: false });
    } else {
      this.setState({ pherror: true });
    }
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  basicDetails = async (e) => {
    const { values, handleChange } = this.props;
    e.preventDefault();

    const Data = {
      name: values.firstName,
      email: values.email,
      username: values.userName,
      password: values.password,
      phone_number: values.phoneNumber,
      phone_code: values.CountryCode,
      nationality: values.CountryName,
    };
    // console.log("tjo", Data);
    this.props.otpAction(Data);

    // console.log("tokenId", values.tokenId);
    this.continue();
    // handleChange(this.props.tid, "tokenId");
  };

  CountryValue = async (e) => {
    const { values, handleChange } = this.props;
    this.setState({ searchCode: e.target.value });

    const searchCountry = this.state.countries.find((obj) => {
      if (obj.name === e.target.value) {
        return true;
      }
      return false;
    });
    const value = (searchCountry && searchCountry.dial_code) || "";
    // props.change("code", value, undefined);
    // this.setState({ code: value });
    handleChange(value, "CountryCode");
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  continue = (e) => {
    // e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { pherror } = this.state;
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
          <br />
          <label className="mb-1 ">
            <strong>Nationality *</strong>
          </label>
          <select
            value={this.state.searchCode}
            onChange={(e) => {
              this.CountryValue(e);
              handleChange(e.target.value, "CountryName");
            }}
            label="Country"
            defaultValue={values.Countries}
            className="form-control w-full h-14 text-xl rounded-lg"
            name="countries"
          >
            {/* <p>Nationality</p> */}
            <option value="" hidden>
              Select Country
            </option>
            {this.state.countries.map((item) => {
              return (
                <option key={uuidv4()} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <br />
          <div className="row">
            <div className="col-sm-4">
              <label className="mb-1">
                <strong>Code </strong>
              </label>
              <input
                name="code"
                placeholder="Country code"
                defaultValue={values.CountryCode}
                type="text"
                // placeholder="Code"
                className="form-control "
                disabled
              />
            </div>{" "}
            <div className="col-sm-8">
              <label className="mb-1">
                <strong>Phone Number*</strong>
              </label>
              <input
                name="phonenum"
                className="form-control"
                placeholder="Enter Your Phone Number"
                label="Phone Number"
                type="tel"
                // onChange={handleChange("phoneNumber")}
                // onChange={(e) => {
                //   handleChange(e.target.value, "phoneNumber");
                // }}

                onChange={(e) => this.onChangePhone(e.target.value)}
                defaultValue={values.phoneNumber}
              />
              {pherror ? (
                <span style={{ color: "red" }}>Please enter Mobile Number</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <br />{" "}
          <label className="mb-1">
            <strong>Password*</strong>
          </label>
          <input
            className="form-control"
            placeholder="Enter Your Password"
            label="Password"
            type="password"
            // onChange={handleChange("password")}
            onChange={(e) => {
              handleChange(e.target.value, "password");
            }}
            defaultValue={values.password}
          />
          <br />{" "}
          <button
            className="btn btn-primary ms-1"
            variant="contained"
            onClick={this.back}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-primary ms-1"
            // onclick={this.basicDetails}
          >
            Next
          </button>
          {/* <Button color="primary" variant="contained" onClick={this.continue}>
            Continue
          </Button> */}
          <div className="new-account mt-3">
            <p className="">
              Already have an account?{" "}
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
export default connect(mapStateToProps, { otpAction })(UserDetails);
