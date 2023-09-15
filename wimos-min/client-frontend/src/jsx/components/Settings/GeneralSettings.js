import React, { useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { connect, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
  UpdateStoreAction,
  loadingToggleAction,
} from "../../../store/actions/AuthActions";

const GeneralSettings = (props) => {
  // console.log("store", props.store.store_content);
  const dispatch = useDispatch();
  const [modalCentered, setModalCentered] = useState(false);
  const [storename, setStoreName] = useState(props.store.store_name);
  const [loader, SetLoader] = useState(false);

  const UpdateStore = () => {
    // console.log(storename);
    SetLoader(true);
    const formData = new FormData();
    formData.append("storeId", props.store.id);
    formData.append("store_name", storename);
    // formData.append("store_content", props.store.store_content);
    // formData.append("footerContent", props.store.footerContent);
    // formData.append("bannerHeading", props.store.bannerHeading);
    // formData.append("store_domain", props.store.store_domain);
    formData.append("type", 2);
    dispatch(loadingToggleAction(true));
    dispatch(
      UpdateStoreAction(formData, props.store.id, SetLoader, setModalCentered)
    );
    // setModalCentered(false);
  };

  return (
    <div>
      {/* <PageTitle activeMenu="General Settings" motherMenu="Home" /> */}
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Store Settings</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <label className="bold-label">Store Name</label>
                      <p>{props.store.store_name}</p>
                      <label className="bold-label">Sub Domain</label>
                      <p>{props.store.store_domain}</p>

                      <label className="bold-label">Store Type</label>
                      {props.store.type === "marketplace" ? (
                        <p>Dedicated</p>
                      ) : (
                        <p>Shared</p>
                      )}
                      <label className="bold-label">Store Status</label>
                      <p>
                        {props.store.activeStatus && (
                          <div className="badge badge-outline-success badge-rounded">
                            Active
                          </div>
                        )}
                        {!props.store.activeStatus && (
                          <div className="badge badge-outline-dark badge-rounded">
                            Inactive
                          </div>
                        )}
                      </p>
                    </div>
                    <div className="col-xl-6">
                      <label className="bold-label">Network</label>

                      <p>
                        <i className="fab fa-ethereum"></i>{" "}
                        {props.store.network}
                      </p>
                      <label className="bold-label">Contract Standard</label>
                      <p style={{ textTransform: "uppercase" }}>
                        {props.store.contractStandard}
                      </p>
                      <label className="bold-label">Contract Address</label>
                      <p>
                        <strong>Market Address:</strong>{" "}
                        <a
                          href={
                            props.store.chainId === "5"
                              ? `https://goerli.etherscan.io/address/${props.store?.marketplaceContractAddress}`
                              : `https://etherscan.io/address/${props.store?.marketplaceContractAddress}`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {props.store?.marketplaceContractAddress}
                        </a>
                      </p>
                      <p>
                        <strong>NFT Address:</strong>{" "}
                        <a
                          href={
                            props.store.chainId === "5"
                              ? `https://goerli.etherscan.io/address/${props.store?.nftContractAddress}`
                              : `https://etherscan.io/address/${props.store?.nftContractAddress}`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          {props.store?.nftContractAddress}
                        </a>
                      </p>
                    </div>
                    <div className="form-group ">
                      {/* <button type="submit" className="btn btn-outline-primary">
                        Close Store
                      </button> */}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginRight: "12px" }}
                        onClick={() => setModalCentered(true)}
                      >
                        Change Store Name
                      </button>
                    </div>
                    <Modal className="fade" show={modalCentered}>
                      <Modal.Header>
                        <Modal.Title>Change Store Name</Modal.Title>
                        <Button
                          onClick={() => setModalCentered(false)}
                          variant=""
                          className="btn-close"
                        ></Button>
                      </Modal.Header>
                      <Modal.Body>
                        <label className="mb-1" htmlFor="val-email">
                          <strong>Store Name</strong>
                        </label>
                        <input
                          className="form-control"
                          placeholder="Enter Store Name"
                          label="title"
                          value={storename}
                          onChange={(e) => {
                            setStoreName(e.target.value);
                          }}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={() => setModalCentered(false)}
                          variant="danger light"
                        >
                          Close
                        </Button>{" "}
                        {!loader ? (
                          <Button variant="primary" onClick={UpdateStore}>
                            Save changes
                          </Button>
                        ) : (
                          <Button variant="outline-primary" size="lg">
                            <i
                              className="fa fa-spinner fa-spin"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    store: state.auth.selectedStore,
  };
};
export default connect(mapStateToProps)(GeneralSettings);
