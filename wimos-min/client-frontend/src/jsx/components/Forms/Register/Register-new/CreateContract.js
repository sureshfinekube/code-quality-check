import React, { Component, useDispatch, useEffect, useState } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
// import { UpdateStep } from "../../../../services/AuthService";
import ERC721Features from "../ERC721Features";
import AccessControls from "../AccessControls";
import ERC1155Features from "../ERC1155Features";
import erc271img from "../../../../../../src/images/smart-contracts.svg";
import erc1155img from "../../../../../../src/images/smart.svg";
import waiting from "../../../../../../src/images/cypherpunk.svg";
import mintable from "../../../../../../src/images/cato.svg";

function CreateContract({
  prevStep,
  nextStep,
  erc1155,
  setErc1155,
  erc721,
  setErc721,
  erc721Data,
  setErc721Data,
  erc1155Data,
  setErc1155Data,
  contractType,
  isnewstore,
}) {
  const [checked, setChecked] = useState(true);
  const handleChange = (value) => {
    //console.log("e", value);
    if (value === "erc1155") {
      setErc1155(true);
      setErc721(false);
    } else {
      setErc721(true);
      setErc1155(false);
    }
  };

  // useEffect(() => {
  //   if (contractType === "single_store") {
  //     console.log('in shared effect')

  //     // both contract states set to true because now we are using combined contract (both contract)
  //     setErc1155(true);
  //     setErc721(true);
  //     nextStep(10)
  //     // console.log("isnewstore", isnewstore);
  //     // if (isnewstore) {
  //     //   console.log('in new store')

  //     //   nextStep(7);
  //     // } else {
  //     //   console.log('in not new store')
  //     //   nextStep(10);
  //     // }
  //   }
  // }, []);

  return (
    <>
      {/* <h5>
        <center>Select your standard</center>
      </h5>
      <br />

      <div className="row">
        <div className="col-md-6">
          <Card
            className="flyout "
            style={{
              width: "100%",
              cursor: "pointer",
              border: " 0.0625rem solid #e4e4e4",
            }}
            // onClick={handleShared}
            // checked={checked}
          >
            <label style={{ marginBottom: "0rem" }}>
              <input
                //   readOnly={true}
                id="contract"
                type="radio"
                name="contract"
                value="erc721"
                //   checked={true}
                className="shareC card-input-element"
                onChange={(e) => handleChange(e.target.value)}
              />
              <div className="default card-input tt">
                <div className="heading" style={{ textAlign: "center" }}>
                  <img
                    src={erc271img}
                    style={{ width: "43%", height: "8.5rem" }}
                  ></img>
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    ERC721
                  </h5>
                </div>
              </div>
            </label>
          </Card>
        </div>
        <div className="col-md-6">
          <Card
            className="flyout shareC"
            // data-toggle="tooltip"
            // data-placement="top"
            //   title="Coming Soon....."
            style={{
              width: "100%",
              cursor: "pointer",
              border: " 0.0625rem solid #e4e4e4",
            }}
            // onClick={handleDedciated}
            // checked={checked}
          >
            <label style={{ marginBottom: "0rem" }}>
              <input
                // readOnly={true}
                onChange={(e) => handleChange(e.target.value)}
                id="contract1"
                type="radio"
                name="contract"
                value="erc1155"
                className="shareC card-input-element"
              />
              <div className="default card-input tt">
                <div className="heading" style={{ textAlign: "center" }}>
                  <img
                    src={erc1155img}
                    style={{ width: "43%", height: "8.5rem" }}
                  ></img>
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    ERC1155
                  </h5>
                </div>
              </div>
            </label>
          </Card>
        </div>
      </div> */}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    tid: state.auth.otpId.id,
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { contractAction })(CreateContract);
