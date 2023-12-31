import React, { useState, useEffect } from "react";
import { change, Field, reduxForm } from "redux-form";
// import renderField from "./renderField";
import validate from "./validate";
import { compose } from "redux";
import { connect } from "react-redux";
import renderField from "./renderField";

import { Button } from "react-bootstrap";
const { ethereum } = window;

const WizardFormFourthPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const [metaValue, setValue] = useState("");
  //
  useEffect(() => {
    // Web3 Browswer Detection
    if (typeof window.ethereum !== "undefined") {
      console.log("Injected Web3 Wallet is installed!");
    }

    //Button ID
    const connectButton = document.getElementById("connect");

    //Click Event
    connectButton.addEventListener("click", () => {
      connectAccount();
    });

    //Connect Account Function
    async function connectAccount() {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      connectButton.innerHTML =
        account[0] +
        account[1] +
        account[2] +
        account[3] +
        account[4] +
        account[5] +
        "..." +
        account[38] +
        account[39] +
        account[40] +
        account[41];
      // console.log(accounts);
      props.change("metaId", accounts, undefined);
      // setValue("Sucessfully connected, Account:   " + accounts);
      connectButton.innerHTML = "Connect to Metamask";
    }
  }, []);
  //

  // const { connect, isActive, account, shouldDisable } = useMetaMask();
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12">
        <h5>
          <b>Connect your wallet</b>
        </h5>
        <br />
        <div className="d-grid gap-2 ">
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <Button
            // onClick={connectAccount}
            id="connect"
            className="me-2"
            variant="outline-warning"
            size="lg"
            // onClick={connect}
          >
            Connect to Metamask
          </Button>
        </div>
        <br />
        <div className=" btn-card bg-white text-success mt-3 ">
          <Field component={renderField} name="metaId" type="text"></Field>
        </div>
        <br /> <br />
        {/* <div className="mt-2 mb-2"> 
          Connected Account: {isActive ? account : ""}
        </div> */}
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
      initialValues: { metaId: "metaId" },
    };
  }),

  reduxForm({
    form: "wizard", //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
    // enableReinitialize: true,
  })
)(WizardFormFourthPage);
