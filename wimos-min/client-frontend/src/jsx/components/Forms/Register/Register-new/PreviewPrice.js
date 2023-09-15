import React, { useState } from "react";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
// import { UpdateStep } from "../../../../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import Invoice from "../../../AppsMenu/Shop/Invoice/Invoice";
import axios from "axios";
function PreviewPrice({
  prevStep,
  nextStep,
  modalCreate,
  setmodalCreate,
  features,
  data,
  sid,
  fee,
  fbasicFee,
  setPaymentSuccess,
  isFreePeriod,
  auth,
  contract,
  isnewstore,
}) {
  //console.log("fefeefeee", fbasicFee);
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
  // console.log("fee", fee);
  let costdata = [];
  let featureIds = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === true) {
      let trueObj = {};
      let seletedFeature = features.find((feature) => feature.name === key);
      featureIds.push(seletedFeature._id);
      costdata.push(seletedFeature);
    }
  }
  const [loader, SetLoader] = useState(false);
  //console.log("costdata", featureIds);

  const handleStrip = async () => {
    if (isFreePeriod) {
      setPaymentSuccess(true);
      setmodalCreate(false);
    } else {
      SetLoader(true);
      let BaseUrl = "https://lb.wimos.io/api";
      const instance = axios.create({
        baseURL: BaseUrl,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("c_wimos"),
        },
      });
      const Data = {
        store_id: sid,
        features: featureIds,
        return_domain: isnewstore
          ? "https://portal.wimos.io/addnewstore"
          : "https://portal.wimos.io/page-register",
      };
      // return_domain: "https://portal.wimos.io/page-register",
      //return_domain: "http://localhost:3001/page-register",

      // console.log("Datacheckout", Data);
      //console.log("data", costdata);
      instance
        .post(
          "/payments/contract-features/checkout",
          Data,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          window.location.replace(response.data.redirectionUrl);
        })
        .catch((err) => {
          SetLoader(false);
          console.log("err", err.response.data);
        });
    }
  };

  return (
    <>
      <Modal className="fade" show={modalCreate}>
        <Modal.Header>
          <Modal.Title style={{ marginLeft: "auto" }}>Pay Invoice</Modal.Title>
          <Button
            onClick={() => setmodalCreate(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="row">
            <div className="col-12"> */}
          {/* <p>Name: ghjk</p> */}
          <Invoice
            feature={costdata}
            fee={fbasicFee?.amount}
            isFreePeriod={isFreePeriod}
            auth={auth}
            contract={contract}
          />
          {/* <label className="mb-1">
                <center>
                  <strong style={{ textAlign: "center" }}>
                    Contract Price
                  </strong>
                </center>
              </label> */}
          {/* <p>
                Mintable: <b>$20</b>
              </p>
              <p>
                Auto Increment:<b>$20</b>
              </p>
              <p>
                Burnable:<b>$20</b>
              </p>
              <p>
                Uri Storage:<b>$20</b>
              </p>
              <p>
                Pausable:<b>$20</b>
              </p>
              <p>
                Votes:<b>$20</b>
              </p>
              <p>
                Enumerable:<b>$20</b>
              </p>
              <br />
              Total Contract Amount : <b>$200</b> */}
          {/* <input
                type="name"
                className="form-control"
                value={catname}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="Category Name"
              /> */}
          {/* </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setmodalCreate(false)} variant="danger light">
            Close
          </Button>
          {!loader ? (
            <Button onClick={handleStrip} variant="primary">
              Confirm
            </Button>
          ) : (
            <Button variant="primary" style={{ width: "100px" }}>
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "20px" }}
              ></i>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    features: state.packages.packages.features,
    fbasicFee: state.packages.packages.basicFee,
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { contractAction })(PreviewPrice);
