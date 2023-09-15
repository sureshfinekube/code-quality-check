import React, { Component, useDispatch, useEffect, useState } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { contractAction } from "../../../../../store/actions/AuthActions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CheckCircleOutlineRounded } from "@material-ui/icons";
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

function MarketplaceTemplates({
  prevStep,
  nextStep,
  erc1155,
  setErc1155,
  erc721,
  setErc721,
  //   erc721Data,
  //   setErc721Data,
  //   setErc1155Data,
  //   erc1155Data,
  marketplaceTemplate,
  setMarketplaceTemplate,
  //   features,
  //   errMsg,
  //   freemint,
  //   setFreemint,
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
    // {
    //   name: "Simple token",
    //   content: "Create a simple ERC20 Token",
    //   value: ''
    // },
    // {
    //   name: "Simple NFT",
    //   content: "Create a simple ERC721 Token",
    //   value: ''
    // },
    // {
    //   name: "Simple multi token",
    //   content: "Create a simple ERC1155 Token",
    //   value: ''
    // },
    {
      name: "Simple NFT marketplace",
      content: "Marketplace with fixed-price sales for NFT (ERC721)",
      value: "simpleERC721",
    },
    {
      name: "Simple multi token marketplace",
      content: "Marketplace with fixed-price sales for NFT (ERC1155)",
      value: "simpleERC1155",
    },
    {
      name: "NFT marketplace Auction",
      content:
        "Marketplace with fixed-price and auction sales for NFT (ERC721)",
      value: "nonSimpleERC721",
    },
    {
      name: "Multi token marketplace with auction",
      content:
        "Marketplace with fixed-price and auction sales for NFT (ERC1155)",
      value: "combinedContract",
    },
    // {
    //   name: "ICO",
    //   content: "initial coin offering for erc20 tokens",
    // },
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
  //   const handleERC721 = (e) => {
  //     // let state = this.state;
  //     // setErc721Data((e.target.name = e.target.value));
  //     // console.log("erc721Data", erc721Data);
  //     // this.setState(state);
  //     setErc721Data({
  //       ...erc721Data,
  //       [e.target.name]: e.target.value,
  //     });
  //     // setErc721Data(erc721Features);
  //   };
  //   const handleCheckbox3Data = (e) => {
  //     setErc721Data({
  //       ...erc721Data,
  //       [e.target.name]: e.target.checked,
  //     });
  //   };

  //   const handleERC1155 = (e) => {
  //     // let state = this.state;
  //     // setErc721Data((e.target.name = e.target.value));
  //     // console.log("erc721Data", erc721Data);
  //     // this.setState(state);
  //     setErc1155Data({
  //       ...erc1155Data,
  //       [e.target.name]: e.target.value,
  //     });
  //     // setErc721Data(erc721Features);
  //   };

  //   const handleCheckbox2Data = (e) => {
  //     setErc1155Data({
  //       ...erc1155Data,
  //       [e.target.name]: e.target.checked,
  //     });
  //   };

  //   const FreemintChange = (e) => {
  //     setFreemint(e.target.checked);
  //   };

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

  const [selectedTemplate, setSelectedTemplate] = useState();

  const handleSelectTemplate = (value) => (e) => {
    if (value === "simpleERC721" || value === "nonSimpleERC721") {
      setErc721(true);
      setErc1155(false);
    } else if (value === "simpleERC1155" || value === "nonSimpleERC1155") {
      setErc1155(true);
      setErc721(false);
    } else if (value === "combinedContract") {
      setErc1155(true);
      setErc721(true);
    }

    setSelectedTemplate(value);
    setMarketplaceTemplate(value);
  };

  useEffect(() => {
    console.log("seleee", marketplaceTemplate);
  }, [marketplaceTemplate]);

  return (
    <Card
      className="contract-selector"
      style={{ padding: "1.25rem 1.85rem 1.25rem" }}
    >
      {/* <center>
        <b>{erc721 ? "ERC721" : "ERC1155"}</b>
      </center> */}
      <div className="custom-tab-1">
        <Tab.Container defaultActiveKey="PreparedTemplate">
          <div
            className="project-page d-flex justify-content-center align-items-center flex-wrap"
            // style={{ paddingLeft: "49px" }}
          >
            <div className="project mb-4">
              <Nav as="ul" className="nav nav-tabs" role="tablist">
                <Nav.Item as="li" className="nav-item">
                  <Nav.Link className="nav-link" eventKey="PreparedTemplate">
                    Marketplace Templates
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <Tab.Content>
                <Tab.Pane eventKey="PreparedTemplate">
                  {tabData.map((data, i) => (
                    <div
                      className="panel panel-default card-input-image"
                      key={i}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "5px",
                        height: "auto",
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-8">
                          <h4>{data.name}</h4>
                          <span>{data.content}</span>
                        </div>
                        <div className="col-sm-4">
                          {/* <button
                            style={{
                              borderRadius: "20px",
                              background: "#bd3bb1",
                              color: "white",
                              border: "white",
                            }}
                          >
                            Use this template
                          </button> */}
                          {selectedTemplate !== data.value ? (
                            <Button
                              variant="primary"
                              style={{ height: "auto", width: "95%" }}
                              onClick={handleSelectTemplate(data.value)}
                            >
                              Use this template
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              style={{ height: "auto", width: "95%" }}
                            >
                              <CheckCircleOutlineRounded />
                            </Button>
                          )}
                        </div>
                      </div>
                      <br />
                    </div>
                  ))}
                  {/* <div>
                      <h4>Simple token</h4>
                      <p>Create a simple ERC20 Token</p>
                    </div>
                    <div>
                      <h4>Simple NFT</h4>
                      <p>Create a simple ERC721 Token</p>
                    </div>
                    <div>
                      <h4>Simple multi token</h4>
                      <p>Create a simple ERC1155 Token</p>
                    </div>
                    <div>
                      <h4>Simple NFT marketplace</h4>
                      <p>
                        Simple marketplace with fixed-price sales for NFT
                        (ERC721)
                      </p>
                    </div>
                    <div>
                      <h4>Simple multi token marketplace</h4>
                      <p>
                        {" "}
                        Simple marketplace with fixed-price sales for NFT
                        (ERC1155)
                      </p>
                    </div>
                    <div>
                      <h4>ICO</h4>
                      <p>initial coin offering for erc20 tokens</p>
                    </div> */}
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
  };
};
export default connect(mapStateToProps, { contractAction })(
  MarketplaceTemplates
);
