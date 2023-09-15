import React, { Component, useDispatch, useEffect, useState } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// import { UpdateStep } from "../../../../services/AuthService";
import ERC721Features from "../ERC721Features";
// import delet from "../../../../../../src/images/contract-feature/Burnable.svg";
// import storage from "../../../../../../src/images/contract-feature/Uristorage.svg";
// //import increment from "../../../../../../src/images/contract-feature/Auto-increment-01.svg";
// import pause from "../../../../../../src/images/contract-feature/Pausable.svg";
// import vote from "../../../../../../src/images/contract-feature/Vote.svg";
// import transfer from "../../../../../../src/images/contract-feature/Enumerable.svg";
// import mintables from "../../../../../../src/images/contract-feature/Mintable.svg";
import { Tab, Nav, Button } from "react-bootstrap";
import mintablep from "../../../../../../src/images/contract-feature/mintable-pink.svg";
import mintablew from "../../../../../../src/images/contract-feature/mintable-white.svg";
import burnp from "../../../../../../src/images/contract-feature/burn-pink.svg";
import burnw from "../../../../../../src/images/contract-feature/burn-white.svg";
import storagep from "../../../../../../src/images/contract-feature/storage-pink.svg";
import storagew from "../../../../../../src/images/contract-feature/storage-white.svg";
import pausep from "../../../../../../src/images/contract-feature/pause-pink.svg";
import pausew from "../../../../../../src/images/contract-feature/pause-white.svg";
import votep from "../../../../../../src/images/contract-feature/vote-pink.svg";
import votew from "../../../../../../src/images/contract-feature/vote-white.svg";
import enumerablep from "../../../../../../src/images/contract-feature/enumerable-pink.svg";
import enumerablew from "../../../../../../src/images/contract-feature/enumerable-white.svg";

function ContractERC721({
  prevStep,
  nextStep,
  erc1155,
  setErc1155,
  erc721,
  setErc721,
  erc721Data,
  setErc721Data,
  setErc1155Data,
  erc1155Data,
  features,
  errMsg,
  freemint,
  setFreemint,
}) {
  // console.log("gvbhn", erc1155, erc721);
  // const continues = (e) => {
  //   // e.preventDefault();
  //   // UpdateStep(4);
  //   nextStep();
  // };
  // const back = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };

  //console.log("features", features);

  // const [erc721Value, setErc721value] = useState({
  //   accessControl: "",
  //   upgradeability: "",
  //   name: "",
  //   symbol: "",
  //   baseUri: "",
  //   license: "",
  //   securityContact: "",
  //   mintable: false,
  //   incremental: false,
  //   burnable: false,
  //   supply: false,
  //   pausable: false,
  //   votes: false,
  //   enumerable: false,
  //   uriStorage: false,
  // });
  const tabData = [
    {
      name: "Simple token",
      content: "Create a simple ERC20 Token",
    },
    {
      name: "Simple NFT",
      content: "Create a simple ERC721 Token",
    },
    {
      name: "Simple multi token",
      content: "Create a simple ERC1155 Token",
    },
    {
      name: "Simple NFT marketplace",
      content: "Marketplace with fixed-price sales for NFT (ERC721)",
    },
    {
      name: "Simple multi token marketplace",
      content: "Marketplace with fixed-price sales for NFT (ERC1155)",
    },
    {
      name: "ICO",
      content: "initial coin offering for erc20 tokens",
    },
  ];

  const CustomTooltip = withStyles({
    tooltip: {
      color: "#fff",
      backgroundColor: "#bd1bb3b0",
      width: "200px",
      padding: "10px",
    },
  })(Tooltip);

  // const handleCheckbox2 = (e) => {
  //   // let newState = !erc1155;
  //   setErc1155(!erc1155);
  //   if (erc721 === false) {
  //     erc1155Data.accessControl = false;
  //     erc1155Data.burnable = false;
  //     erc1155Data.pausable = false;
  //     erc1155Data.mintable = false;
  //     erc1155Data.supply = false;
  //   }
  // };
  // const handleERC1155 = (e) => {
  //   // let state = this.state;
  //   setErc1155((e.target.name = e.target.value));
  //   // this.setState(state);
  // };
  // const handleerc1155Data = (e) => {
  //   // let state = this.state;
  //   setErc1155((e.target.name = e.target.value));
  //   // this.setState(state);
  // };
  // const handleCheckbox2Data = (e) => {
  //   // let state = this.state;
  //   setErc1155((e.target.name = e.target.checked));
  //   // this.setState(state);
  // };

  // const handleCheckbox3 = (e) => {

  //   setErc721(!erc721);
  //   if (erc1155 === false) {
  //     erc721Data.accessControl = false;
  //     erc721Data.burnable = false;
  //     erc721Data.pausable = false;
  //     erc721Data.mintable = false;
  //     erc721Data.enumerable = false;
  //     erc721Data.uriStorage = false;
  //     erc721Data.incremental = false;
  //     erc721Data.votes = false;
  //   }
  // };
  // const erc721features =
  const handleERC721 = (e) => {
    // let state = this.state;
    // setErc721Data((e.target.name = e.target.value));
    // console.log("erc721Data", erc721Data);
    // this.setState(state);
    setErc721Data({
      ...erc721Data,
      [e.target.name]: e.target.value,
    });
    // setErc721Data(erc721Features);
  };
  const handleCheckbox3Data = (e) => {
    setErc721Data({
      ...erc721Data,
      [e.target.name]: e.target.checked,
    });
  };

  const handleERC1155 = (e) => {
    // let state = this.state;
    // setErc721Data((e.target.name = e.target.value));
    // console.log("erc721Data", erc721Data);
    // this.setState(state);
    setErc1155Data({
      ...erc1155Data,
      [e.target.name]: e.target.value,
    });
    // setErc721Data(erc721Features);
  };

  const handleCheckbox2Data = (e) => {
    setErc1155Data({
      ...erc1155Data,
      [e.target.name]: e.target.checked,
    });
  };

  const FreemintChange = (e) => {
    setFreemint(e.target.checked);
  };

  // useEffect(() => {
  //   console.log(freemint);
  // }, [freemint]);

  // const handleerc721Data = (e) => {
  //   // let state = this.state;
  //   setErc721Data((e.target.name = e.target.value));
  //   // setState(state);
  // };
  //   const dispatch = useDispatch();

  //   const handleSubmit = () => {
  //     const { values } = this.props;
  //     let Data = {
  //       storeId: this.props.sid,
  //       userId: this.props.tid,
  //       erc20: false,
  //       erc721: this.state.erc721,
  //       erc1155: this.state.erc1155,
  //       governor: false,
  //       erc20Data: {
  //         accessControl: "",
  //         upgradeability: "",
  //         Info: {
  //           securityContact: "",
  //           license: "",
  //         },
  //         name: "",
  //         symbol: "",
  //         burnable: false,
  //         snapshots: false,
  //         pausable: false,
  //         premint: "",
  //         mintable: false,
  //         votes: false,
  //         flashmint: false,
  //         premit: false,
  //       },
  //       governorData: {
  //         name: "",
  //         upgradeability: "",
  //         Info: {
  //           securityContact: "",
  //           license: "",
  //         },
  //         delay: "",
  //         period: "",
  //         blockTime: "",
  //         proposalThreshold: "",
  //         decimals: "",

  //         quorumMode: "",
  //         quorumPercent: "",
  //         quorumAbsolute: "",
  //         votes: false,
  //         timelock: false,
  //         bravo: false,
  //         settings: false,
  //       },
  //       erc721Data: {
  //         accessControl: this.state.erc721Data.accessControl,
  //         upgradeability: this.state.erc721Data.upgradeability,
  //         Info: {
  //           securityContact: this.state.erc721Data.securityContact,
  //           license: this.state.erc721Data.license,
  //         },
  //         name: this.state.erc721Data.name,
  //         symbol: this.state.erc721Data.symbol,
  //         baseUri: this.state.erc721Data.baseUri,
  //         enumerable: this.state.erc721Data.enumerable,
  //         uriStorage: this.state.erc721Data.uriStorage,
  //         burnable: this.state.erc721Data.burnable,
  //         pausable: this.state.erc721Data.pausable,
  //         mintable: this.state.erc721Data.mintable,
  //         incremental: this.state.erc721Data.incremental,
  //         votes: this.state.erc721Data.votes,
  //       },
  //       erc1155Data: {
  //         accessControl: this.state.erc1155Data.accessControl,
  //         upgradeability: this.state.erc1155Data.upgradeability,
  //         Info: {
  //           securityContact: this.state.erc1155Data.securityContact,
  //           license: this.state.erc1155Data.license,
  //         },
  //         name: this.state.erc1155Data.name,
  //         uri: this.state.erc1155Data.uri,
  //         burnable: this.state.erc1155Data.burnable,
  //         pausable: this.state.erc1155Data.pausable,
  //         mintable: this.state.erc1155Data.mintable,
  //         supply: this.state.erc1155Data.supply,
  //       },
  //     };
  //     dispatch(contractAction(Data, continues));
  //   };

  return (
    <Card
      className="contract-selector"
      style={{ padding: "1.25rem 1.85rem 1.25rem" }}
    >
      {/* <center>
        <b>{erc721 ? "ERC721" : "ERC1155"}</b>
      </center> */}
      <div className="custom-tab-1">
        <Tab.Container defaultActiveKey="Custom">
          {/* <div
            className="project-page d-flex justify-content-between align-items-center flex-wrap"
            style={{ paddingLeft: "49px" }}
          >
            <div className="project mb-4">
              <Nav as="ul" className="nav nav-tabs" role="tablist">
                <Nav.Item as="li" className="nav-item">
                  <Nav.Link className="nav-link" eventKey="PreparedTemplate">
                    Prepared Template
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className="nav-item">
                  <Nav.Link className="nav-link" eventKey="Custom">
                    Custom
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div> */}

          <div className="row">
            <div className="col-xl-12">
              <Tab.Content>
                <Tab.Pane eventKey="Custom">
                  <div className="row">
                    <div className="col-sm-12">
                      <div style={{ display: "flex" }}>
                        <p style={{ width: "100%" }}>
                          <b>Free minting</b>
                          <CustomTooltip
                            title={
                              <div style={{ fontSize: "12px" }}>
                                Your NFT won't be minted in blockchain. Your NFT
                                will be stored for future minting by buyer
                              </div>
                            }
                            placement="bottom"
                          >
                            <i
                              className="far fa-question-circle"
                              style={{ color: "#bd3bb1", marginLeft: "10px" }}
                            />
                          </CustomTooltip>
                          <br />
                          <span style={{ fontSize: "9px" }}>
                            Buyer will pay gas fees for minting
                          </span>
                        </p>
                        <div className="form-check form-switch toggle-switch">
                          <input
                            className="form-check-input custome"
                            type="checkbox"
                            checked={freemint}
                            onChange={(e) => FreemintChange(e)}
                            // id="flexSwitchCheckChecked1"
                            // defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                    {!freemint ? (
                      <>
                        <div className={erc721 ? "col-sm-6" : "col-sm-12"}>
                          <b>Contract name</b>
                          <br />
                          <br />
                          <input
                            onChange={
                              erc721 && erc1155
                                ? handleERC1155
                                : erc721
                                ? handleERC721
                                : handleERC1155
                            }
                            type="text"
                            name="name"
                            placeholder="MyToken"
                            className="form-control"
                            required
                          />
                          {errMsg.nameerr && (
                            <h7 style={{ color: "red" }}>
                              Contract name is Required
                            </h7>
                          )}
                          <br />
                        </div>
                        {erc721 && (
                          <div className="col-sm-6">
                            <b>Symbol</b>
                            <br />
                            <br />
                            <input
                              onChange={handleERC721}
                              type="text"
                              name="symbol"
                              placeholder="MTK"
                              className="form-control"
                              required
                            />
                            {errMsg.symbolerr && (
                              <h7 style={{ color: "red" }}>
                                Symbol is Required
                              </h7>
                            )}
                            <br />
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {!freemint ? (
                    <>
                      <b>Select Features</b>
                      <br />

                      <div className="row">
                        {erc721 === true &&
                          !erc1155 &&
                          features &&
                          features
                            .filter((feature) => feature.type === "ERC721")
                            .map((item, index) => (
                              <div
                                className="col-md-2 col-lg-2 col-sm-2"
                                key={index}
                                style={{ padding: "2px" }}
                              >
                                <label style={{ width: "100%" }}>
                                  <CustomTooltip
                                    title={
                                      <div style={{ fontSize: "12px" }}>
                                        {item.description}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <div
                                      className="text-center "
                                      style={
                                        {
                                          //   width: "11.2rem",
                                          //border: "0.1rem solid #e4e4e4",
                                        }
                                      }
                                    >
                                      <input
                                        onChange={handleCheckbox3Data}
                                        type="checkbox"
                                        name={item.name}
                                        //value={false}
                                        checked={erc721Data[`${item.name}`]}
                                        //value={erc721Features.mintable}
                                        className="card-input-element"
                                        cursor="pointer"
                                      />
                                      <div className="panel panel-default card-input-image">
                                        <div className="">
                                          {/* <div className="col-sm-5"> */}
                                          {/* </div> */}
                                          {/* <div className="col-sm-7"> */}
                                          <div
                                            className="package-name text-capitalize"
                                            style={{
                                              // fontSize: "10px",
                                              // display: "flex",
                                              textAlign: "center",
                                            }}
                                          >
                                            {" "}
                                            <div className="cardimage">
                                              {item.name === "Mintable" ? (
                                                <>
                                                  {erc721Data.Mintable ===
                                                  true ? (
                                                    <img src={mintablew}></img>
                                                  ) : (
                                                    <img src={mintablep}></img>
                                                  )}
                                                </>
                                              ) : //  : item.name === "incremental" ? (
                                              //   <img src={increment} className="cardimage"></img>
                                              // )
                                              item.name === "Burnable" ? (
                                                <>
                                                  {erc721Data.Burnable ===
                                                  true ? (
                                                    <img src={burnw}></img>
                                                  ) : (
                                                    <img src={burnp}></img>
                                                  )}
                                                </>
                                              ) : item.name === "Uristorage" ? (
                                                <>
                                                  {erc721Data.Uristorage ===
                                                  true ? (
                                                    <img src={storagew}></img>
                                                  ) : (
                                                    <img src={storagep}></img>
                                                  )}
                                                </>
                                              ) : item.name === "Pausable" ? (
                                                <>
                                                  {erc721Data.Pausable ===
                                                  true ? (
                                                    <img src={pausew}></img>
                                                  ) : (
                                                    <img src={pausep}></img>
                                                  )}
                                                </>
                                              ) : item.name === "Votes" ? (
                                                <>
                                                  {erc721Data.Votes === true ? (
                                                    <img src={votew}></img>
                                                  ) : (
                                                    <img src={votep}></img>
                                                  )}
                                                </>
                                              ) : item.name === "Enumerable" ? (
                                                <>
                                                  {erc721Data.Enumerable ===
                                                  true ? (
                                                    <img
                                                      src={enumerablew}
                                                    ></img>
                                                  ) : (
                                                    <img
                                                      src={enumerablep}
                                                    ></img>
                                                  )}
                                                </>
                                              ) : (
                                                ""
                                              )}{" "}
                                            </div>
                                          </div>
                                          <span
                                            className="feature-name text-capitalize"
                                            style={{ fontSize: "86%" }}
                                          >
                                            {" "}
                                            {item.name}
                                          </span>
                                          {/* </div> */}
                                          <br />{" "}
                                        </div>
                                        {/* <div style={{ fontSize: "9px", color: "#7a8c8c" }}>
                        {" "}
                        {item.description}
                      </div> */}
                                      </div>
                                    </div>
                                  </CustomTooltip>
                                </label>
                              </div>
                            ))}

                        {erc1155 === true &&
                          !erc721 &&
                          features &&
                          features
                            .filter((feature) => feature.type === "ERC1155")
                            .map((item, index) => (
                              <div
                                className="col-md-2 col-lg-2 col-sm-2"
                                key={index}
                                style={{ padding: "2px" }}
                              >
                                <label style={{ width: "100%" }}>
                                  <CustomTooltip
                                    title={
                                      <div style={{ fontSize: "12px" }}>
                                        {item.description}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <div
                                      className="text-center "
                                      style={
                                        {
                                          //   width: "11.2rem",
                                          //border: "0.1rem solid #e4e4e4",
                                        }
                                      }
                                    >
                                      <input
                                        onChange={handleCheckbox2Data}
                                        type="checkbox"
                                        name={item.name}
                                        //value={false}
                                        checked={erc1155Data[`${item.name}`]}
                                        //value={erc721Features.mintable}
                                        className="card-input-element"
                                        cursor="pointer"
                                      />
                                      <div className="panel panel-default card-input-image">
                                        <div className="">
                                          {/* <div className="col-sm-5"> */}
                                          {/* </div> */}
                                          {/* <div className="col-sm-7"> */}
                                          <div
                                            className="package-name text-capitalize"
                                            style={{
                                              // fontSize: "10px",
                                              // display: "flex",
                                              textAlign: "center",
                                            }}
                                          >
                                            {" "}
                                            <div className="cardimage">
                                              {item.name === "Mintable" ? (
                                                <>
                                                  {erc1155Data.Mintable ===
                                                  true ? (
                                                    <img src={mintablew}></img>
                                                  ) : (
                                                    <img src={mintablep}></img>
                                                  )}
                                                </>
                                              ) : //  : item.name === "incremental" ? (
                                              //   <img src={increment} className="cardimage"></img>
                                              // )
                                              item.name === "Burnable" ? (
                                                <>
                                                  {erc1155Data.Burnable ===
                                                  true ? (
                                                    <img src={burnw}></img>
                                                  ) : (
                                                    <img src={burnp}></img>
                                                  )}
                                                </>
                                              ) : // : item.name === "Uristorage" ? (
                                              //   <>
                                              //     {erc721Data.Uristorage === true ? (
                                              //       <img src={storagew}></img>
                                              //     ) : (
                                              //       <img src={storagep}></img>
                                              //     )}
                                              //   </>
                                              // )
                                              item.name === "Pausable" ? (
                                                <>
                                                  {erc1155Data.Pausable ===
                                                  true ? (
                                                    <img src={pausew}></img>
                                                  ) : (
                                                    <img src={pausep}></img>
                                                  )}
                                                </>
                                              ) : (
                                                // : item.name === "Votes" ? (
                                                //   <>
                                                //     {erc721Data.Votes === true ? (
                                                //       <img src={votew}></img>
                                                //     ) : (
                                                //       <img src={votep}></img>
                                                //     )}
                                                //   </>
                                                // ) : item.name === "Enumerable" ? (
                                                //   <>
                                                //     {erc721Data.Enumerable === true ? (
                                                //       <img src={enumerablew}></img>
                                                //     ) : (
                                                //       <img src={enumerablep}></img>
                                                //     )}
                                                //   </>
                                                // )
                                                ""
                                              )}{" "}
                                            </div>
                                          </div>
                                          <span
                                            className="feature-name text-capitalize"
                                            style={{ fontSize: "86%" }}
                                          >
                                            {" "}
                                            {item.name}
                                          </span>
                                          {/* </div> */}
                                          <br />{" "}
                                        </div>
                                        {/* <div style={{ fontSize: "9px", color: "#7a8c8c" }}>
                        {" "}
                        {item.description}
                      </div> */}
                                      </div>
                                    </div>
                                  </CustomTooltip>
                                </label>
                              </div>
                            ))}

                        {erc1155 === true &&
                          erc721 === true &&
                          features &&
                          features
                            .filter((feature) => feature.type === "ERC1155")
                            .map((item, index) => (
                              <div
                                className="col-md-2 col-lg-2 col-sm-2"
                                key={index}
                                style={{ padding: "2px" }}
                              >
                                <label style={{ width: "100%" }}>
                                  <CustomTooltip
                                    title={
                                      <div style={{ fontSize: "12px" }}>
                                        {item.description}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <div
                                      className="text-center "
                                      style={
                                        {
                                          //   width: "11.2rem",
                                          //border: "0.1rem solid #e4e4e4",
                                        }
                                      }
                                    >
                                      <input
                                        onChange={handleCheckbox2Data}
                                        type="checkbox"
                                        name={item.name}
                                        //value={false}
                                        checked={erc1155Data[`${item.name}`]}
                                        //value={erc721Features.mintable}
                                        className="card-input-element"
                                        cursor="pointer"
                                      />
                                      <div className="panel panel-default card-input-image">
                                        <div className="">
                                          {/* <div className="col-sm-5"> */}
                                          {/* </div> */}
                                          {/* <div className="col-sm-7"> */}
                                          <div
                                            className="package-name text-capitalize"
                                            style={{
                                              // fontSize: "10px",
                                              // display: "flex",
                                              textAlign: "center",
                                            }}
                                          >
                                            {" "}
                                            <div className="cardimage">
                                              {item.name === "Mintable" ? (
                                                <>
                                                  {erc1155Data.Mintable ===
                                                  true ? (
                                                    <img src={mintablew}></img>
                                                  ) : (
                                                    <img src={mintablep}></img>
                                                  )}
                                                </>
                                              ) : //  : item.name === "incremental" ? (
                                              //   <img src={increment} className="cardimage"></img>
                                              // )
                                              item.name === "Burnable" ? (
                                                <>
                                                  {erc1155Data.Burnable ===
                                                  true ? (
                                                    <img src={burnw}></img>
                                                  ) : (
                                                    <img src={burnp}></img>
                                                  )}
                                                </>
                                              ) : // : item.name === "Uristorage" ? (
                                              //   <>
                                              //     {erc721Data.Uristorage === true ? (
                                              //       <img src={storagew}></img>
                                              //     ) : (
                                              //       <img src={storagep}></img>
                                              //     )}
                                              //   </>
                                              // )
                                              item.name === "Pausable" ? (
                                                <>
                                                  {erc1155Data.Pausable ===
                                                  true ? (
                                                    <img src={pausew}></img>
                                                  ) : (
                                                    <img src={pausep}></img>
                                                  )}
                                                </>
                                              ) : (
                                                // : item.name === "Votes" ? (
                                                //   <>
                                                //     {erc721Data.Votes === true ? (
                                                //       <img src={votew}></img>
                                                //     ) : (
                                                //       <img src={votep}></img>
                                                //     )}
                                                //   </>
                                                // ) : item.name === "Enumerable" ? (
                                                //   <>
                                                //     {erc721Data.Enumerable === true ? (
                                                //       <img src={enumerablew}></img>
                                                //     ) : (
                                                //       <img src={enumerablep}></img>
                                                //     )}
                                                //   </>
                                                // )
                                                ""
                                              )}{" "}
                                            </div>
                                          </div>
                                          <span
                                            className="feature-name text-capitalize"
                                            style={{ fontSize: "86%" }}
                                          >
                                            {" "}
                                            {item.name}
                                          </span>
                                          {/* </div> */}
                                          <br />{" "}
                                        </div>
                                        {/* <div style={{ fontSize: "9px", color: "#7a8c8c" }}>
                        {" "}
                        {item.description}
                      </div> */}
                                      </div>
                                    </div>
                                  </CustomTooltip>
                                </label>
                              </div>
                            ))}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <br />
                  <p>
                    <b>Terms and conditions</b>
                  </p>
                  <p>
                    Additional charges will be applied for each features
                    selected, apart from the marketplace smartcontract charges.
                  </p>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
      {/* </Card> */}
      {/* <Card
        className="contract-selector"
        style={{ padding: "1.25rem 1.85rem 1.25rem" }}
      >
        {" "}
        <br />
        <div style={{ textAlign: "center" }}>
          <h5
            style={{
              textAlign: "center",
            }}
          >
            ERC1155
          </h5>
          <img src={waiting} style={{ width: "130px" }}></img>
          <center>Stay Tuned</center>
          <center>
            <b> Coming Soon...</b>
          </center>
          <br />
          </div> */}
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    tid: state.auth.otpId.id,
    sid: state.auth.storeId.id,
    features: state.packages.packages.features,
  };
};
export default connect(mapStateToProps, { contractAction })(ContractERC721);
