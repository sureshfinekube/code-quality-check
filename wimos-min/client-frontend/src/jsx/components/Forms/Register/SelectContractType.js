import React, { Component } from "react";
import { Card, Button, Row } from "react-bootstrap";
// import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { UpdateStep } from "../../../../services/AuthService";

export class SelectContractType extends Component {
  continue = (e) => {
    e.preventDefault();
    UpdateStep(2);
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <>
        <form>
          {/* <Example title="Pick a team" cardContents={teams} /> */}
          <Row className="justify-content-center align-self-center">
            <div className="container">
              <h6 style={{ textAlign: "center" }}>
                Select Contract{"  "}
                <Tooltip
                  title={
                    <div style={{ fontSize: "12px" }}>
                      Now we have only one contract.
                    </div>
                  }
                  placement="bottom"
                >
                  <i
                    className="fas fa-info-circle"
                    style={{ color: "#f06969", fontSize: "12px" }}
                  ></i>
                </Tooltip>
              </h6>

              {/* <div style={{ textAlign: "center" }}> */}

              {/* </div> */}
              <br />
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-4 ">
                  <label>
                    <Card
                      className="flyout"
                      style={{ width: "100%", cursor: "pointer" }}
                      defaultChecked
                    >
                      <input
                        type="radio"
                        name="product"
                        className="card-input-element"
                        defaultChecked
                      />

                      <div className="default card-input">
                        <div className="heading">
                          <h5
                            style={{
                              textAlign: "center",
                            }}
                          >
                            Dedicated
                          </h5>
                        </div>
                      </div>
                    </Card>
                  </label>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-4">
                  <label>
                    <Card
                      className="flyout"
                      style={{
                        width: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="product"
                        className="card-input-element"
                        disabled
                      />
                      <div className="default card-input">
                        <div className="heading">
                          <h5
                            style={{
                              textAlign: "center",
                            }}
                          >
                            Free
                          </h5>
                        </div>
                      </div>
                    </Card>
                  </label>
                </div>
              </div>
            </div>
          </Row>
          <br />
        </form>
        <button
          type="submit"
          className="btn btn-primary ms-1"
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

export default SelectContractType;
