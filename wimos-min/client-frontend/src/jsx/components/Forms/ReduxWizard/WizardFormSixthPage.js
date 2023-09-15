import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const WizardFormSixthPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const [checked, setChecked] = React.useState();

  const handleChange = () => {
    setChecked(checked);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>Features select</h5>
        <br />
        <form method="post" required>
          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            name="name1"
            value="10"
            id="customCheckBox1"
          />

          <label className="form-check-label" htmlFor="customCheckBox1">
            Lazy minting
          </label>

          <br />

          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            name="name2"
            value="20"
            id="customCheckBox2"
          />

          <label className="form-check-label" htmlFor="customCheckBox2">
            Single collection, multi collection
          </label>

          <br />
          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            name="name3"
            value="80"
            id="customCheckBox3"
          />
          <label className="form-check-label" htmlFor="customCheckBox3">
            Auction
          </label>

          <br />

          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            name="name4"
            value="90"
            id="customCheckBox4"
          />

          <label className="form-check-label" htmlFor="customCheckBox4">
            Time bidding
          </label>

          <br />

          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            name="name5"
            value="50"
            id="customCheckBox5"
          />
          <label className="form-check-label" htmlFor="customCheckBox5">
            Lazy minting
          </label>

          <br />
          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            name="name6"
            value="70"
            id="customCheckBox6"
          />
          <label className="form-check-label" htmlFor="customCheckBox6">
            None
          </label>
          <br />
        </form>
        {/* <p>Is "My Value" checked? {checked.toString()}</p> */}
      </div>

      <br />
      <div className="col-md-12">
        <button
          style={{
            width: "100px",
            height: "50px",
            // display: "block",
            textAlign: "center",
          }}
          type="button"
          className="previous btn btn-secondary me-2"
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          style={{
            width: "100px",
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
    </form>
  );
};
export default compose(
  connect((state, props) => {
    return {
      initialValues: {
        // Password: "Password",
        // confirmpassword: "confirmpassword",
        // domainname1: ".domainname",
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
)(WizardFormSixthPage);
