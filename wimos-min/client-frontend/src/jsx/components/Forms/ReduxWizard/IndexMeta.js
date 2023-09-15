import React from "react";
import ReactDOM from "react-dom";
import WizardFormFourthPage from "./WizardFormFourthPage";
import StepFour from "../Wizard/StepFour";

import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "./useMetaMask ";

import "bootstrap/dist/css/bootstrap.min.css";
const IndexMeta = (props) => {
  function getLibrary(provider, connector) {
    return new Web3(provider);
  }

  ReactDOM.render(
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetaMaskProvider>
          <WizardFormFourthPage />
          <StepFour />
        </MetaMaskProvider>
      </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
  // export default getLibrary;
};
export default IndexMeta;
