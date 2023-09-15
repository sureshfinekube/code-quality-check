import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, Badge, Card } from "react-bootstrap";

const WizardFormFifthPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          <b>Now we have only one package</b>
        </h5>
        <br />

        <Card body>
          <input
            type="radio"
            value="Dedicated"
            name="Dedicated"
            defaultChecked
          />{" "}
          Dedicated
        </Card>
        <Card body>
          <input type="radio" value="free" name="freee" disabled /> Free
        </Card>

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
)(WizardFormFifthPage);
