import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";

import validate from "./validate";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, Badge, Card } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";

const WizardFormEightPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          <b>Packages</b>
        </h5>
        <br />
        <Card body>
          <input
            type="radio"
            value="Dedicated"
            name="Dedicated"
            defaultChecked
          />{" "}
          Free Package
        </Card>
        <Card body>
          <input type="radio" value="Dedicated" name="Dedicated" /> Paid
          Package1
        </Card>
        <Card body>
          <input type="radio" value="Dedicated" name="Dedicated" /> Paid
          Package2
        </Card>{" "}
        {/* <div>
          <Button onClick={"/WizardFormTenPage"} variant="outline-success">
            Pay
          </Button>{" "}
        </div> */}
        <br />
        <div className="col-md-12">
          <Grid container justify="center">
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
              Pay
            </button>
          </Grid>
        </div>
      </div>
    </form>
  );
};
export default compose(
  connect((state, props) => {
    return {
      values: {
        name: state.form.wizard.values.WizardFormFirstPage,
        userName: state.form.wizard.values.WizardFormFirstPage,
        password: state.form.wizard.values.WizardFormSecondPage,
        email: state.form.wizard.values.WizardFormSecondPage,
        phone_number: state.form.wizard.values.WizardFormSecondPage,
        nationality: state.form.wizard.values.WizardFormSecondPage,
        store_name: state.form.wizard.values.WizardFormThirdPage,
        domain_name: state.form.wizard.values.WizardFormThirdPage,
        wallet_id: state.form.wizard.values.WizardFormFourthPage,
        network: "Ethereum",
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
)(WizardFormEightPage);
