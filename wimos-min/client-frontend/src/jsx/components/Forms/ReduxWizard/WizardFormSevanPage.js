import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import validate from "./validate";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const WizardFormSevanPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          Deployment Gas Fee: <b>ETH 100</b>
        </h5>
        <br />
        <div className="d-grid gap-2 ">
          <Button className="me-2" variant="outline-warning" size="lg">
            {" "}
            Payment with Metamask
          </Button>
        </div>
        <br />
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
)(WizardFormSevanPage);
