import React, { Component, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { UpdateStep } from "../../../../services/AuthService";
import ContractPage from "../../Contracts/index";
import MicroFrontend from "../../../../MicroFrontend";

const { ethereum } = window;
let contractHost = process.env.REACT_APP_CONTRACT_HOST;

if (process.env.REACT_APP_ENV == 'DEV') {
  contractHost = process.env.REACT_APP_DEV_CONTRACT_HOST
}
export class MetamaskCon extends Component {
  constructor(props) {
    super(props);
    this.state = { contract: "", complete: false };
  }

  // componentDidMount() {
  //   // Web3 Browswer Detection
  //   if (typeof window.ethereum !== "undefined") {
  //     console.log("Injected Web3 Wallet is installed!");
  //   }
  //   //Button ID
  //   const connectButton = document.getElementById("connect");
  //   console.log("connectButton", connectButton);

  //   //Click Event
  //   connectButton.addEventListener("click", () => {
  //     this.connectAccount();
  //   });

  //   //Connect Account Function
  // }

  // connectAccount = async () => {
  //   const { handleChange } = this.props;
  //   //   console.log("tijooojohny");
  //   const accounts = await ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const account = accounts[0];

  //   this.setState({ metaId: account });
  //   handleChange(account, "MetaMask");
  // };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  continue = (e) => {
    e.preventDefault();
    UpdateStep(4);
    this.props.nextStep();
  };
  //   onYesPress() {

  //   }

  render() {
    const { values, history } = this.props;
    // console.log("values", history);
    return (
      <>
        {/* <Contract history={history} /> */}
        <MicroFrontend
          history={history}
          host={contractHost}
          name="Contract"
          complete={this.state.complete}
          contract={this.state.contract}
        />
        <br />
        <h4 style={{ textAlign: " center", marginTop: " 50px" }}>
          Deploying contract......
        </h4>
        {/* <div className="col-md-12">
          <h5>
            <b>Connect your wallet</b>
          </h5>
          <br />
          <div className="d-grid gap-2 ">
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <Grid textAlign="center">
              <button
                // onClick={connectAccount}
                id="connect"
                className="btn btn-info light ms-1 btn-block"
                // variant="outline-primary"
                //   justifyContent="center"
                //   textAlign="center"
                // size="lg"
                // onClick={connect}
              >
                Connect to Metamask
              </button> */}
        {/* <button id="connect">Yes</button> */}
        {/* </Grid>
          </div>
          <br />
          <div
            className=" btn-card bg-white text-success mt-3 "
            textAlign="center"
          >
            <p style={{ color: "#000", textAlign: "center" }}>
              {values.MetaMask}
            </p>
          </div>
        </div> */}
        <br />
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
          onClick={this.continue}
        >
          Next
        </button>
      </>
    );
  }
}

export default MetamaskCon;