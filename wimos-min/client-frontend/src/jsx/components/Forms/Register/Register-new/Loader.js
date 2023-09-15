import React, { Suspense } from "react";
// import MicroFrontend from "../../../../../MicroFrontend";
// import { UpdateStep } from "../../../../../services/AuthService";
// import axios from "axios";
// import swal from "sweetalert";

function Loader({ prevStep, nextStep, history }) {
  return (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontSize: "50px", color: "#bd3bb1", textAlign: "center" }}>
        <i className="fa fa-spinner fa-spin" />
      </span>
    </div>
  );
}

export default Loader;
