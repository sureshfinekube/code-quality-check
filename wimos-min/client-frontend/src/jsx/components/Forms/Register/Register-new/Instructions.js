import React, { useState } from "react";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
// import { UpdateStep } from "../../../../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import Invoice from "../../../AppsMenu/Shop/Invoice/Invoice";
import axios from "axios";
import { otpAction } from "../../../../../store/actions/AuthActions";
import { useDispatch } from "react-redux";

function Instructions({
  prevStep,
  nextStep,
  firstName,
  email,
  userName,
  password,
  phoneNumber,
  countryCode,
  countryName,
  setStep,
  step,
  setInstrumodal,
  instrumodal,
  features,
  data,
  sid,
  fee,
}) {
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
  const [loader, SetLoader] = useState(false);
  //console.log("costdata", featureIds);
  const dispatch = useDispatch();

  const handleStrip = async () => {
    SetLoader(true);
    const Data = {
      name: firstName,
      email: email,
      username: userName,
      password: password,
      phone_number: phoneNumber,
      phone_code: countryCode,
      nationality: countryName,
    };
    dispatch(otpAction(Data, setStep, step, setInstrumodal));
    SetLoader(false);
  };

  return (
    <>
      <Modal className="fade" show={instrumodal}>
        <Modal.Header>
          <Modal.Title style={{ marginLeft: "auto" }}>
            General Instructions
          </Modal.Title>
          <Button
            onClick={() => setInstrumodal(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              {/* <Invoice feature={costdata} fee={fee} /> */}
              <label className="mb-1">
                <center>
                  <strong style={{ textAlign: "center" }}>
                    Contract Price
                  </strong>
                </center>
              </label>

              {/* <input
                type="name"
                className="form-control"
                value={catname}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="Category Name"
              /> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setInstrumodal(false)} variant="danger light">
            Close
          </Button>
          {!loader ? (
            <Button onClick={handleStrip} variant="primary">
              Procced
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
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { contractAction })(Instructions);
