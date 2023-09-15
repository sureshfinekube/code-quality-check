import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import validate from "./validate";
import renderField from "./renderField";
import Country from "./Country.json";
import { v4 as uuidv4 } from "uuid";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const WizardFormSecondPage = (props) => {
  // console.log("hello")
  let errorsObj = { email: "", contactnumber: "", searchCode: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [countries] = useState(Country);
  const [searchCode, setSearchCode] = useState();
  const [contactnumber, setContactNumber] = useState("");
  const [email, setEmail] = useState();
  const [code] = useState(Country);

  const onContact = (value) => {
    if (!/\D/.test(value)) {
      setContactNumber(value);
    }
  };

  // const searchCountry = countries.find((obj) => {
  //   if (obj.name === searchCode) {
  //     return true;
  //   }
  //   return false;
  // });

  const CountryCode = (e) => {
    setSearchCode(e.target.value);
    const searchCountry = countries.find((obj) => {
      if (obj.name === e.target.value) {
        return true;
      }
      return false;
    });
    const value = (searchCountry && searchCountry.dial_code) || "";
    props.change("code", value, undefined);
  };

  const { handleSubmit, previousPage } = props;
  // const {
  //   fields: { email, contactnumber, code, countries, password },
  // } = this.props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-md-12">
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email"
          />
        </div>
        <div className="col-md-12 mt-2 ">
          <div className="form-group">
            <label className="mb-1 ">
              <strong>Nationality</strong>
            </label>
            <Field
              component="select"
              value={searchCode}
              onChange={CountryCode}
              className="form-control w-full h-14 text-xl rounded-lg"
              name="countries"
            >
              <p>Nationality</p>
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
            </Field>
            {errors.searchCode && <div>{errors.searchCode}</div>}
          </div>
          <br />
          <div className="row">
            <div className="col-sm-3">
              {/* <label className="mb-1 ">
                <strong>Code</strong>
              </label> */}
              <Field
                name="code"
                component={renderField}
                value="code"
                type="text"
                label="code"
                // placeholder="Code"
                className="form-control "
              />
              {errors.searchCountry && <div>{errors.searchCountry}</div>}
            </div>{" "}
            <br />
            <div className="col-sm-9">
              <Field
                value={contactnumber}
                onChange={(e) => onContact(e.target.value)}
                type="tel"
                label="Phone Number"
                // className="form-control "
                name="contactnumber"
                component={renderField}
                required
              />
              {errors.contactnumber && <div>{errors.contactnumber}</div>}
            </div>
          </div>
          <br />
          <div className="col-md-12">
            <label className="font-w600">Password</label>
            <Field name="password" type="password" component={renderField} />
          </div>
          {errors.password && <div>{errors.password}</div>}
        </div>
      </div>
      <br />
      <div className="validate-redux-form row">
        <div className="col-md-12">
          <button
            style={{
              width: "100px",
              height: "50px",
              // display: "block",
              textAlign: "center",
            }}
            type="button"
            className="previous btn btn-secondary me-1"
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            style={{
              width: "80px",
              height: "50px",
              // display: "block",
              textAlign: "center",
            }}
            type="submit"
            className="next btn btn-primary ms-1"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default compose(
  connect((state, props, values) => {
    return {
      initialValues: {
        name: localStorage.getItem("name"),
        userName: localStorage.getItem("username"),
        email: "email",
        contactnumber: "Mobile Number",
        code: "code",
        countries: "country",
        password: "password",
      },
    };
  }),
  reduxForm({
    form: "wizard", //                 <------ same form name

    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
    // enableReinitialize: true,
  })
)(WizardFormSecondPage);
