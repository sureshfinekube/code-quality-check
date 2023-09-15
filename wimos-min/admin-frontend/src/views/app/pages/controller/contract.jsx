import React, { useState, useEffect } from "react";
import { NotificationManager } from "components/common/react-notifications";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { Button, CardSubtitle, CardText } from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateContractFeeAction, getContractFeeAction } from "redux/actions";
// import IntlMessages from 'helpers/IntlMessages';

const ContractDetails = ({
  match,
  contractFeeData,
  onUpdateContractFee,
  updateContractFeeSuccess,
  updateContractFeeErr,
  updateContractFeeAction,
  getContractFeeAction,
}) => {
  const [contractfee, setContrract] = useState(contractFeeData?.amount);
  const [freestatus, setFreeStatus] = useState(contractFeeData?.isFreePeriod);

  useEffect(() => {
    if (updateContractFeeSuccess) {
      getContractFeeAction();
      NotificationManager.success(
        "Success",
        "Contract Fee Updated Successfully",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updateContractFeeSuccess]);

  useEffect(() => {
    if (updateContractFeeErr) {
      NotificationManager.warning(
        updateContractFeeErr,
        "Failed",
        3000,
        null,
        null,
        ""
      );
    }
  }, [updateContractFeeErr]);
  const [errMsg, setErrMsg] = useState("");
  const contractfeeHandler = (event) => {
    const re = /^[0-9\b]+$/;
    if (re.test(event.target.value)) {
      setContrract(event.target.value);
    } else {
      setContrract("");
    }
    // else {
    //   setErrMsg("Please enter a number");
    // }
  };

  const SwitchHandler = (value) => {
    setFreeStatus(value);
  };

  const updateHandler = () => {
    if (contractfee === "") {
      setErrMsg("Please enter fee amount");
    } else {
      const Data = {
        amount: contractfee,
        isFreePeriod: freestatus,
      };
      updateContractFeeAction(Data);
      //console.log("test", contractfee, freestatus);
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.contracts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Contracts</CardTitle>
              <Row className=" flex-row" style={{ display: "flow-root" }}>
                {/* <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  //   onClick={() => setModalOpen(!modalOpen)}
                  style={{ float: "right" }}
                >
                  Add New Standard
                </Button> */}
              </Row>
              <Row>
                <Colxx xxs="6">
                  <Form>
                    <FormGroup>
                      <Label for="Username">Contract Fee</Label>
                      <Input
                        type="contractfee"
                        name="contractfee"
                        id="exampleContractfee"
                        value={contractfee}
                        onChange={contractfeeHandler}
                      />
                    </FormGroup>
                  </Form>
                  {errMsg !== "" && <p style={{ color: "red" }}>{errMsg}</p>}
                </Colxx>
                <Colxx xxs="3">
                  <Label for="Username">Free Status</Label>

                  <Switch
                    className="custom-switch custom-switch-primary custom-switch-small"
                    checked={freestatus}
                    onChange={(primary) => SwitchHandler(primary)}
                  />
                </Colxx>

                <Colxx
                  xxs="3"
                  className=" flex-row"
                  style={{ padding: "19px" }}
                >
                  <Button
                    color="primary"
                    size="lg"
                    className="top-right-button"
                    onClick={() => updateHandler()}
                    style={{ float: "right" }}
                  >
                    Save
                  </Button>
                </Colxx>
              </Row>

              <br />
              {/* <AddDomainModal
                modalOpen={modalOpen}
                toggleModal={() => setModalOpen(!modalOpen)}
            /> */}
              {/* <Table columns={cols} data={Data} /> */}
              <Row>
                <Colxx xxs="6">
                  <Card className=" flex-row mb-4">
                    <div
                      className="  flex-grow-1 "
                      style={{ textAlign: "center" }}
                    >
                      <Link
                        to={{
                          pathname: `contracts-ERC721`,
                          state: "ERC721",
                        }}
                      >
                        <CardBody>
                          <CardSubtitle className="truncate mb-1">
                            <strong>ERC721</strong>
                          </CardSubtitle>
                          {/* <CardText className="text-muted text-small mb-2">
                            Executive Director
                          </CardText> */}
                        </CardBody>
                      </Link>
                    </div>
                  </Card>
                </Colxx>
                <Colxx xxs="6">
                  <Card className="d-flex flex-row mb-4">
                    <div
                      className="  flex-grow-1 "
                      style={{ textAlign: "center" }}
                    >
                      <Link
                        to={{
                          pathname: `contracts-ERC115`,
                          state: "ERC1155",
                        }}
                      >
                        <CardBody>
                          <CardSubtitle className="truncate mb-1">
                            <strong>ERC1155</strong>
                          </CardSubtitle>

                          {/* <CardText className="text-muted text-small mb-2">
                            Executive Director
                          </CardText> */}
                        </CardBody>
                      </Link>
                    </div>
                  </Card>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  const {
    contractFeeData,
    onUpdateContractFee,
    updateContractFeeSuccess,
    updateContractFeeErr,
  } = adminData;
  return {
    contractFeeData,
    updateContractFeeErr,
    updateContractFeeSuccess,
    onUpdateContractFee,
  };
};

export default connect(mapStateToProps, {
  updateContractFeeAction,
  getContractFeeAction,
})(ContractDetails);
