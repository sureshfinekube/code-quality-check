import React, { Component, useDispatch, useState } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
// import { UpdateStep } from "../../../../services/AuthService";
import ERC721Features from "../ERC721Features";
import AccessControls from "../AccessControls";
import ERC1155Features from "../ERC1155Features";
import erc271img from "../../../../../../src/images/share.svg";
import erc1155img from "../../../../../../src/images/dedicated.svg";
import waiting from "../../../../../../src/images/cypherpunk.svg";
import mintable from "../../../../../../src/images/cato.svg";

function TemplateType({ contractType, setContractType }) {
  const [checked, setChecked] = useState(false);
  const handleDedciated = (e) => {
    //console.log("dedicated");
    setContractType("marketplace");
    //console.log("dedi", contractType);
  };

  const handleShared = (e) => {
    // console.log("shared");
    setContractType("single_store");
    // console.log("shar", contractType);
  };

  return (
    <>
      <h5>
        <center>Select your contract type</center>
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
                value="SharedContract"
                checked={true}
                className="shareC card-input-element"
                onChange={handleShared}
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
                    Prepared Template
                  </h5>
                </div>
              </div>
            </label>
          </Card>
        </div>
        <div className="col-md-6">
          {/* <div className="soon"> */}
          <Card
            className="flyout shareC"
            data-toggle="tooltip"
            data-placement="top"
            title="Coming Soon....."
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
                onChange={handleDedciated}
                id="contract1"
                type="radio"
                name="contract"
                value="DedicatedContract"
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
                    Custom Template
                  </h5>
                  {/* <h6 className="comingsoon"> Coming soon..</h6> */}
                </div>
              </div>
            </label>
          </Card>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    tid: state.auth.otpId.id,
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { contractAction })(TemplateType);
