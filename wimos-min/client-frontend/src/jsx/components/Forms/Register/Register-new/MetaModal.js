import React, { useState } from "react";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
// import { UpdateStep } from "../../../../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import Invoice from "../../../AppsMenu/Shop/Invoice/Invoice";
import axios from "axios";
import metamask from "../../../../../images/metamask.ico";

function MetaModal({ modalMteta, setmodalMteta }) {
  // const continues = (e) => {
  //   // e.preventDefault();
  //   // UpdateStep(4);
  //   nextStep();
  // };
  // const back = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };
  // let costdata = data?.filter((name) => name.includes(true));
  // let costdata = Object.keys(data).map(function (key, index) {
  //   // let value = {};
  //   if (data[key] == true) {
  //     return features.filter((feature) => feature.name === key);
  //   } else {
  //     return null;
  //   }
  // });

  //   let costdata = [];
  //   let featureIds = [];
  //   for (const [key, value] of Object.entries(data)) {
  //     if (value === true) {
  //       let trueObj = {};
  //       let seletedFeature = features.find((feature) => feature.name === key);
  //       featureIds.push(seletedFeature._id);
  //       costdata.push(seletedFeature);
  //     }
  //   }
  //   const [loader, SetLoader] = useState(false);
  //   //console.log("costdata", featureIds);
  //   const handleStrip = async () => {
  //     SetLoader(true);
  //     let BaseUrl = "https://lb.wimos.io/api";
  //     const instance = axios.create({
  //       // .. where we make our configurations
  //       baseURL: BaseUrl,
  //       withCredentials: true,
  //     });
  //     const Data = {
  //       store_id: sid,
  //       features: featureIds,
  //       return_domain: "https://portal.wimos.io/page-register",
  //     };
  //     // console.log("Datacheckout", Data);
  //     //console.log("data", costdata);
  //     instance
  //       .post(
  //         "/payments/contract-features/checkout",
  //         Data,

  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         // console.log("response", response.data);
  //         window.location.replace(response.data.redirectionUrl);

  //         // sucessMessage("response");

  //         //console.log("dn", values.domainName);
  //       })
  //       .catch((err) => {
  //         console.log("err", err.response.data);
  //         // console.log("err", err);
  //       });
  //   };
  return (
    <>
      <Modal className="fade" show={modalMteta} centered>
        <Modal.Header style={{ border: "none", paddingBottom: "0.1rem" }}>
          <Modal.Title style={{ marginLeft: "auto" }}>
            {/* Install Metamask for Continue */}
          </Modal.Title>
          <Button
            onClick={() => setmodalMteta(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: "3rem" }}>
          {/* <div className="row">
            <div className="col-12"> */}

          <a href="https://metamask.io/download/" target="_blank">
            <div style={{ display: "flex", paddingLeft: "20px" }}>
              <img src={metamask} style={{ width: "30px" }}></img>
              <span style={{ fontSize: "20px", marginLeft: "8px" }}>
                METAMASK
              </span>
            </div>

            <div style={{ paddingLeft: "20px", paddingTop: "5px" }}>
              <span> Install Metamask for continue </span>

              {/* <button
                className="px-4 my-2 btn-block"
                variant="primary"
                style={{ width: "50px", textAlign: "center" }}
                // onClick={() => openInNewTab("https://google.com")}
              > */}
              {/* </button> */}
            </div>
          </a>

          {/* </div>
          </div> */}
        </Modal.Body>
        {/* <Modal.Footer> */}
        {/* <Button onClick={() => setmodalMteta(false)} variant="danger light">
            Close
          </Button> */}
        {/* {!loader ? (
            <Button onClick={handleStrip} variant="primary">
              Confirm
            </Button>
          ) : (
            <Button variant="primary">
              <i className="fa fa-spinner fa-spin" style="font-size:24px"></i>;
            </Button>
          )} */}
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     features: state.packages.packages.features,
//     sid: state.auth.storeId.id,
//   };
// };
export default MetaModal;
