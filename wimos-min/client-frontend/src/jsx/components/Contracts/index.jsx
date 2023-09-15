import React from "react";
import MicroFrontend from "../../../MicroFrontend";

let contractHost = process.env.REACT_APP_CONTRACT_HOST;

if (process.env.REACT_APP_ENV == 'DEV') {
  contractHost = process.env.REACT_APP_DEV_CONTRACT_HOST
}

function ContractPage({ history }) {
  return (
    <>
      <Contract history={history} />
    </>
  );
}

function Contract({ history }) {
  return (
    <MicroFrontend history={history} host={contractHost} name="Contract" />
  );
}

export default ContractPage;
