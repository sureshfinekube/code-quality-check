import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Country from "../ReduxWizard/Country.json";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Redirect } from "react-router";
// import validate from "../ReduxWizard/validate";

export class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: Country,
      searchCode: "",
      errors: "",
      values: "",
      setMessage: "",
    };
  }

  Validatation = () => {
    if (!this.state.values.firstName) {
      this.state.errors.firstName = (
        <h6 style={{ color: "red" }}>Name Required</h6>
      );
    }
    if (!this.state.values.userName) {
      this.state.errors.userName = (
        <h6 style={{ color: "red" }}>Username Required</h6>
      );
    } else if (
      this.state.values.userName.length < 6 ||
      !/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i.test(
        this.state.values.userName
      )
    ) {
      this.state.errors.userName = "Username Required"; // errors.username = <h8 style={{ color: 'red' }}>Please enter valid username</h8>;
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <form>
        <div className="form-group mb-3">
          <label className="mb-1">
            <strong>Name *</strong>
          </label>
          <input
            className="form-control"
            placeholder="Enter Your Name"
            label="First Name"
            onChange={(e) => {
              handleChange(e.target.value, "firstName");
              // this.Validatation();
            }}
            // onChange={this.Validate}
            defaultValue={values.firstName}
          />
          {/* {errors.firstName} */}
          {/* {Object.keys(errors).map((key) => {
            return (
              <div style={{ color: "red" }} key={key}>
                {errors[key]}
              </div>
            );
          })} */}
          <br />
          <label className="mb-1">
            <strong>User Name *</strong>
          </label>
          <input
            className="form-control"
            placeholder="Enter Your User Name"
            label="Last Name"
            // onChange={handleChange("userName")}
            onChange={(e) => {
              handleChange(e.target.value, "userName");
              // this.Validatation();
            }}
            defaultValue={values.lastName}
          />
          {/* {errors.userName} */}

          <br />
          <button
            type="submit"
            className="btn btn-primary ms-1"
            onClick={this.continue}
          >
            Next
          </button>
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

export default UserName;
