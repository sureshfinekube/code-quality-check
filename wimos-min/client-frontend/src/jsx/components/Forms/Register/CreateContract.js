import React, { Component } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import { contractAction } from "../../../../store/actions/AuthActions";
import { connect } from "react-redux";
import { UpdateStep } from "../../../../services/AuthService";
import ERC721Features from "./ERC721Features.json";
import AccessControls from "./AccessControls.json";
import ERC1155Features from "./ERC1155Features.json";
export class CreateContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erc20: false,
      erc20Data: {
        accessControl: "",
        upgradeability: "",
        name: "",
        symbol: "",
        license: "",
        securityContact: "",
        premint: "",
        mintable: false,
        burnable: false,
        pausable: false,
        premit: false,
        votes: false,
        flashmint: false,
        snapshots: false,
      },
      governor: false,
      governorData: {
        votes: "",
        timelock: "",
        upgradeability: "",
        name: "",
        delay: "",
        license: "",
        securityContact: "",
        period: "",
        blockTime: "",
        quorumPercent: "",
        proposalThreshold: "",
        Updatable_Settings: false,
        Bravo_Compatible: false,
      },
      erc721: false,
      erc721Data: {
        accessControl: "",
        upgradeability: "",
        name: "",
        symbol: "",
        baseUri: "",
        license: "",
        securityContact: "",
        mintable: false,
        incremental: false,
        burnable: false,
        supply: false,
        pausable: false,
        votes: false,
        enumerable: false,
        uriStorage: false,
      },
      erc1155: false,
      erc1155Data: {
        accessControl: "",
        upgradeability: "",
        name: " ",
        uri: "",
        license: "",
        securityContact: "",
        mintable: false,
        burnable: false,
        supply: false,
        pausable: false,
      },
    };
  }
  continue = (e) => {
    // e.preventDefault();
    UpdateStep(3);
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  // handleCheckbox0 = () => {
  //   let newState = !this.state.erc20;
  //   this.setState({ erc20: newState });
  //   // console.log(this.state);
  // };
  // handleERC20 = (e) => {
  //   let state = this.state;
  //   state.erc20Data[e.target.name] = e.target.value;
  //   this.setState(state);
  //   // console.log("dataaaaaaaa", this.state.erc20Data);
  // };

  // handleErc20Radio = (e) => {
  //   let state = this.state;
  //   state.erc20Data[e.target.name] = e.target.value;
  //   this.setState(state);
  //   // console.log(this.state.erc20Data);
  // };
  // handleCheckbox0Data = (e) => {
  //   let state = this.state;
  //   state.erc20Data[e.target.value] = e.target.checked;
  //   this.setState(state);
  //   // console.log(this.state.erc20Data);
  // };

  // handleCheckbox1 = (e) => {
  //   let newState = !this.state.governor;
  //   this.setState({ governor: newState });
  //   // console.log(this.state);
  // };
  // handleGovernor = (e) => {
  //   let state = this.state;
  //   state.governorData[e.target.name] = e.target.value;
  //   this.setState(state);
  //   // console.log(this.state.governorData);
  // };
  // handleGovernorInfo = (e) => {
  //   let state = this.state;
  //   state.governorData.Info[e.target.name] = e.target.value;
  //   this.setState(state);
  //   // console.log(this.state.governorData);
  // };
  // handleGovernorRadio = (e) => {
  //   let state = this.state;
  //   state.governorData[e.target.name] = e.target.value;
  //   this.setState(state);
  //   // console.log(this.state.governorData);
  // };

  handleCheckbox1Data = (e) => {
    let state = this.state;
    state.governorData[e.target.value] = e.target.checked;
    this.setState(state);
    // console.log(this.state.governorData);
  };

  handleCheckbox2 = (e) => {
    // this.setState({ toggle: !this.state.toggle });
    let newState = !this.state.erc1155;
    this.setState({ erc1155: newState });
    if (this.state.erc721 === false) {
      this.state.erc1155Data.accessControl = false;
      this.state.erc1155Data.burnable = false;
      this.state.erc1155Data.pausable = false;
      this.state.erc1155Data.mintable = false;
      this.state.erc1155Data.supply = false;
    }
    // console.log(this.state);
  };
  handleERC1155 = (e) => {
    let state = this.state;
    // this.setState({ [e.target.name]: e.target.value });
    state.erc1155Data[e.target.name] = e.target.value;
    this.setState(state);
    // console.log(this.state.erc1155Data);
  };

  handleerc1155Data = (e) => {
    let state = this.state;
    state.erc1155Data[e.target.name] = e.target.value;
    this.setState(state);
    // console.log(this.state.erc1155Data);
  };
  handleCheckbox2Data = (e) => {
    let state = this.state;
    state.erc1155Data[e.target.value] = e.target.checked;
    this.setState(state);
    // console.log(this.state.erc1155Data);
  };

  handleCheckbox3 = (e) => {
    let newState = !this.state.erc721;
    this.setState({ erc721: newState });
    if (this.state.erc1155 === false) {
      this.state.erc721Data.accessControl = false;
      this.state.erc721Data.burnable = false;
      this.state.erc721Data.pausable = false;
      this.state.erc721Data.mintable = false;
      this.state.erc721Data.enumerable = false;
      this.state.erc721Data.uriStorage = false;
      this.state.erc721Data.incremental = false;
      this.state.erc721Data.votes = false;
    }
    // this.setState({ toggle: !this.state.toggle });
    // console.log(this.state);
  };
  handleERC721 = (e) => {
    let state = this.state;
    // this.setState({ [e.target.name]: e.target.value });
    state.erc721Data[e.target.name] = e.target.value;
    this.setState(state);
    // console.log(this.state.erc721Data);
  };
  handleCheckbox3Data = (e) => {
    let state = this.state;
    state.erc721Data[e.target.value] = e.target.checked;
    this.setState(state);
    // console.log(this.state.erc721Data);
  };

  handleerc721Data = (e) => {
    let state = this.state;
    state.erc721Data[e.target.name] = e.target.value;
    this.setState(state);
    // console.log(this.state.erc721Data);
  };

  //  values.tokenId values.storeId

  handleSubmit = () => {
    // console.log("haha", this.state.erc721Data.incremental);
    // console.log("haha", this.state.erc721Data.mintable);

    const { values } = this.props;
    let Data = {
      storeId: this.props.sid,
      userId: this.props.tid,
      // this.state.erc20 this.state.governor
      erc20: false,
      erc721: this.state.erc721,
      erc1155: this.state.erc1155,
      governor: false,
      erc20Data: {
        //  this.state.erc20Data.accessControl
        accessControl: "",
        upgradeability: "",
        Info: {
          securityContact: "",
          license: "",
        },
        name: "",
        symbol: "",
        burnable: false,
        snapshots: false,
        pausable: false,
        premint: "",
        mintable: false,
        votes: false,
        flashmint: false,
        premit: false,
      },
      governorData: {
        name: "",
        upgradeability: "",
        Info: {
          securityContact: "",
          license: "",
        },
        delay: "",
        period: "",
        blockTime: "",
        proposalThreshold: "",
        decimals: "",
        //  this.state.governorData.decimals
        //this.state.governorData.quorumMode
        quorumMode: "",
        quorumPercent: "",
        quorumAbsolute: "",
        votes: false,
        timelock: false,
        bravo: false,
        settings: false,
        // this.state.governorData.bravo
        // this.state.governorData.settings
      },
      erc721Data: {
        accessControl: this.state.erc721Data.accessControl,
        upgradeability: this.state.erc721Data.upgradeability,
        Info: {
          securityContact: this.state.erc721Data.securityContact,
          license: this.state.erc721Data.license,
        },
        name: this.state.erc721Data.name,
        symbol: this.state.erc721Data.symbol,
        baseUri: this.state.erc721Data.baseUri,
        enumerable: this.state.erc721Data.enumerable,
        uriStorage: this.state.erc721Data.uriStorage,
        burnable: this.state.erc721Data.burnable,
        pausable: this.state.erc721Data.pausable,
        mintable: this.state.erc721Data.mintable,
        incremental: this.state.erc721Data.incremental,
        // supply: this.state.erc721Data.supply,
        votes: this.state.erc721Data.votes,
      },
      erc1155Data: {
        accessControl: this.state.erc1155Data.accessControl,
        upgradeability: this.state.erc1155Data.upgradeability,
        Info: {
          securityContact: this.state.erc1155Data.securityContact,
          license: this.state.erc1155Data.license,
        },
        name: this.state.erc1155Data.name,
        uri: this.state.erc1155Data.uri,
        burnable: this.state.erc1155Data.burnable,
        pausable: this.state.erc1155Data.pausable,
        mintable: this.state.erc1155Data.mintable,
        supply: this.state.erc1155Data.supply,
      },
    };
    //console.log("Data", Data);
    this.props.contractAction(Data, this.continue);
    // if (this.status === true) {
    //   this.setState({ active: !this.state.active });
    // }
  };

  render() {
    return (
      <>
        <h5>
          <center>Select your Standard</center>
        </h5>
        {/* <ul className="check-card">
          <li className="check-card-item">
            <input type="checkbox" id="check01" name="check" value="1" />
            <label for="check01" class="radio"></label>
            <div className="check-card-bg"></div>
            <div className="check-card-body">
              <div className="check-card-toggle">
                <span></span>
                <span></span>
              </div>
              <div className="check-card-body-in">
                <h3 className="check-card-title">CARD ITEM 01</h3>
                <p className="check-card-description">Card item description</p>
              </div>
              <div className="check-card-cancel">CANCEL</div>
            </div>
          </li>
        </ul> */}
        <div className="row">
          <div className="col-md-6">
            <Card className="contract-selector" onClick={this.handleCheckbox3}>
              <div className="card-check">
                <input
                  readOnly={true}
                  type="checkbox"
                  name="erc721"
                  value="erc721"
                  checked={this.state.erc721}
                  className="form-check-input"
                />

                <div className="form-check-label" style={{ fontSize: "14px" }}>
                  ERC721
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-6">
            {/* <Card
              className="contract-selector"
              onClick={this.handleCheckbox2}
              style={
                this.state.erc1155
                  ? { border: "0.1rem solid #bb3f96 !important" }
                  : { border: "0.1rem solid #ebebeb" }
              }
            >
              <div className="card-check">
                <input
                  readOnly={true}
                  type="checkbox"
                  name="erc1155"
                  value="erc1155"
                  checked={this.state.erc1155}
                  className="form-check-input"
                />

                <div className="form-check-label" style={{ fontSize: "14px" }}>
                  ERC1155
                </div>
              </div>
            </Card> */}
            <Card className="contract-selector">
              <div className="card-check">
                {/* <input
                  readOnly={true}
                  type="checkbox"
                  name="erc1155"
                  value="erc1155"
                  checked={this.state.erc1155}
                  className="form-check-input"
                /> */}
                <div className="form-check-label" style={{ fontSize: "14px" }}>
                  ERC1155 Coming Soon....
                </div>
              </div>
            </Card>
          </div>
        </div>
        {this.state.erc721 ? (
          <Card
            className="contract-selector"
            style={{ padding: "1.25rem 1.85rem 1.25rem" }}
          >
            <center>
              <b>ERC721</b>
            </center>
            <br />
            <br />
            <div className="row">
              <div className="col-sm-6">
                Name
                <input
                  onChange={this.handleERC721}
                  type="text"
                  name="name"
                  placeholder="MyToken"
                  className="form-control"
                />
                <br />
              </div>
              <div className="col-sm-6">
                Symbol
                <input
                  onChange={this.handleERC721}
                  type="text"
                  name="symbol"
                  placeholder="Symbol"
                  className="form-control"
                />
                <br />
              </div>
            </div>
            {/* <br />
                Base URI
                <input
                  onChange={this.handleERC721}
                  type="text"
                  name="baseUri"
                  placeholder="https:// ..."
                  className="form-control"
                />
                <br /> */}
            {/* <label>
                  <div className="card contact-bx ">
                    <input
                      type="checkbox"
                      name="mintable"
                      value="mintable"
                      className="card-input-element"
                      cursor="pointer"
                      onClick={console.log("clicked")}
                    />

                    <div className="panel panel-default card-input">
                     <h4 className=" text-uppercase">
                        <b>Mintable</b>
                      </h4>
                    </div>
                  </div>
                </label> */}
            <b>Select Features</b>
            <br />
            <br />
            <div className="row">
              {ERC721Features &&
                ERC721Features.map((item, index) => (
                  <div className="col-md-6 col-lg-4 col-sm-3" key={index}>
                    <label>
                      <div
                        className="card contact-bx "
                        style={{
                          width: "11.2rem",
                          border: "0.1rem solid #e4e4e4",
                        }}
                      >
                        <input
                          onChange={this.handleCheckbox3Data}
                          type="checkbox"
                          name="erc721"
                          value={item.value}
                          className="card-input-element"
                          cursor="pointer"
                          //checked={this.state.erc721Data.mintable}
                        />

                        <div className="panel panel-default card-input">
                          {/* <div className="card-body user-profile">
                        <div className="media-body user-meta-info"> */}
                          <h4
                            className="package-name text-uppercase"
                            style={{ fontSize: "12px" }}
                          >
                            {item.name}{" "}
                            <Tooltip
                              title={
                                <div style={{ fontSize: "12px" }}>
                                  {/* {item.features.map((values, index) => (
                                    <p>{values}</p>
                                  ))} */}
                                  {item.description}
                                </div>
                              }
                              placement="bottom"
                            >
                              <i
                                className="fas fa-question-circle"
                                style={{ color: "#bb3f96" }}
                              ></i>
                            </Tooltip>
                          </h4>

                          {/* <p style={{ fontSize: "10px" }}>
                                {item.description}
                              </p> */}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
            {/* <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="erc721"
                  value="mintable"
                  checked={this.state.erc721Data.mintable}
                />
                Mintable
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="erc721"
                  value="incremental"
                  checked={this.state.erc721Data.incremental}
                />
                Auto Increment Ids
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="erc721"
                  value="burnable"
                  checked={this.state.erc721Data.burnable}
                />
                Burnable
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="ERC721"
                  value="supply"
                  checked={this.state.erc721Data.supply}
                />
                Supply Tracking
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="ERC721"
                  value="pausable"
                  checked={this.state.erc721Data.pausable}
                />
                Pausable
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="ERC721"
                  value="votes"
                  checked={this.state.erc721Data.votes}
                />
                Votes
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="ERC721"
                  value="enumerable"
                  checked={this.state.erc721Data.enumerable}
                />
                Enumerable
                <br />
                <input
                  onChange={this.handleCheckbox3Data}
                  type="checkbox"
                  name="ERC721"
                  value="uriStorage"
                  checked={this.state.erc721Data.uriStorage}
                />
                URI Storage <br />
                <p /> */}
            <b> Select Access control</b>
            <br />
            <br />
            <div className="row">
              {AccessControls &&
                AccessControls.map((item, index) => (
                  <div className="col-md-6 col-lg-4 col-sm-3" key={index}>
                    <label>
                      <div
                        className="card contact-bx "
                        style={{
                          width: "11.2rem",
                          border: "0.1rem solid #e4e4e4",
                        }}
                      >
                        <input
                          onChange={this.handleerc721Data}
                          type="radio"
                          name="accessControl"
                          value={item.name}
                          className="card-input-element"
                          cursor="pointer"
                          //checked={this.state.erc721Data.mintable}
                        />

                        <div className="panel panel-default card-input">
                          {/* <div className="card-body user-profile">
                        <div className="media-body user-meta-info"> */}
                          <h4
                            className="package-name text-uppercase"
                            style={{ fontSize: "12px" }}
                          >
                            {item.name}{" "}
                            <Tooltip
                              title={
                                <div style={{ fontSize: "12px" }}>
                                  {/* {item.features.map((values, index) => (
                                    <p>{values}</p>
                                  ))} */}
                                  {item.description}
                                </div>
                              }
                              placement="bottom"
                            >
                              <i
                                className="fas fa-question-circle"
                                style={{ color: "#bb3f96" }}
                              ></i>
                            </Tooltip>
                          </h4>

                          {/* <p style={{ fontSize: "10px" }}>
                                {item.description}
                              </p> */}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
            {/* <input
                  type="radio"
                  name="accessControl"
                  value="ownable"
                  onChange={this.handleerc721Data}
                />
                Ownable
                <br />
                <input
                  type="radio"
                  name="accessControl"
                  value="roles"
                  onChange={this.handleerc721Data}
                />
                Roles <br />
                <p /> */}
            {/* <b>Upgradeability</b>
                <br />
                <input
                  type="radio"
                  name="upgradeability"
                  value="transparent"
                  onChange={this.handleerc721Data}
                />
                Transparent
                <br />
                <input
                  type="radio"
                  name="upgradeability"
                  value="uups"
                  onChange={this.handleerc721Data}
                />
                UUPS{" "} */}
            {/* <p>
                  <b>Info</b>
                </p>
                <div className="row">
                  <div className="col-sm-7">
                    Security Contact
                    <input
                      onChange={this.handleerc721Data}
                      type="text"
                      name="securityContact"
                      placeholder="security@example.com"
                      className="form-control"
                    />
                    <br />
                  </div>
                  <div className="col-sm-5">
                    License
                    <input
                      onChange={this.handleerc721Data}
                      type="text"
                      name="license"
                      placeholder="MIT"
                      className="form-control"
                    />
                    <br />
                  </div>
                </div> */}
          </Card>
        ) : (
          ""
        )}

        {this.state.erc1155 ? (
          <Card
            className="contract-selector"
            style={{ padding: "1.25rem 1.85rem 1.25rem" }}
          >
            <center>
              <b>ERC1155</b>
            </center>
            <br />
            <br />
            Name
            <input
              onChange={this.handleERC1155}
              type="text"
              name="name"
              placeholder="MyToken"
              className="form-control"
            />
            <br />
            {/* <br />
                URI
                <input
                  onChange={this.handleERC1155}
                  type="text"
                  name="uri"
                  placeholder="https:// ..."
                  className="form-control"
                />
                <p /> */}
            <b>Features</b>
            <br />
            <br />
            <div className="row">
              {ERC1155Features &&
                ERC1155Features.map((item, index) => (
                  <div className="col-md-6 col-lg-4 col-sm-3" key={index}>
                    <label>
                      <div
                        className="card contact-bx "
                        style={{
                          width: "11.2rem",
                          border: "0.1rem solid #e4e4e4",
                        }}
                      >
                        <input
                          onChange={this.handleCheckbox2Data}
                          type="checkbox"
                          name="erc721"
                          value={item.value}
                          className="card-input-element"
                          cursor="pointer"
                          //checked={this.state.erc721Data.mintable}
                        />

                        <div className="panel panel-default card-input">
                          {/* <div className="card-body user-profile">
                        <div className="media-body user-meta-info"> */}
                          <h4
                            className="package-name text-uppercase"
                            style={{ fontSize: "12px" }}
                          >
                            {item.name}{" "}
                            <Tooltip
                              title={
                                <div style={{ fontSize: "12px" }}>
                                  {/* {item.features.map((values, index) => (
                                    <p>{values}</p>
                                  ))} */}
                                  {item.description}
                                </div>
                              }
                              placement="bottom"
                            >
                              <i
                                className="fas fa-question-circle"
                                style={{ color: "#bb3f96" }}
                              ></i>
                            </Tooltip>
                          </h4>

                          {/* <p style={{ fontSize: "10px" }}>
                                {item.description}
                              </p> */}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
            {/* <input
                  onChange={this.handleCheckbox2Data}
                  type="checkbox"
                  name="erc1155"
                  value="mintable"
                  checked={this.state.erc1155Data.mintable}
                />
                Mintable
                <br />
                <input
                  onChange={this.handleCheckbox2Data}
                  type="checkbox"
                  name="erc1155"
                  value="burnable"
                  checked={this.state.erc1155Data.burnable}
                />
                Burnable
                <br />
                <input
                  onChange={this.handleCheckbox2Data}
                  type="checkbox"
                  name="erc1155"
                  value="supply"
                  checked={this.state.erc1155Data.supply}
                />
                Supply Tracking
                <br />
                <input
                  onChange={this.handleCheckbox2Data}
                  type="checkbox"
                  name="erc1155"
                  value="pausable"
                  checked={this.state.erc1155Data.pausable}
                />
                Pausable <br />
                <p /> */}
            <b>Access control</b>
            <br />
            <br />
            <div className="row">
              {AccessControls &&
                AccessControls.map((item, index) => (
                  <div className="col-md-6 col-lg-4 col-sm-3" key={index}>
                    <label>
                      <div
                        className="card contact-bx "
                        style={{
                          width: "11.2rem",
                          border: "0.1rem solid #e4e4e4",
                        }}
                      >
                        <input
                          onChange={this.handleerc1155Data}
                          type="radio"
                          name="accessControl"
                          value={item.name}
                          className="card-input-element"
                          cursor="pointer"
                          //checked={this.state.erc721Data.mintable}
                        />

                        <div className="panel panel-default card-input">
                          {/* <div className="card-body user-profile">
                        <div className="media-body user-meta-info"> */}
                          <h4
                            className="package-name text-uppercase"
                            style={{ fontSize: "12px" }}
                          >
                            {item.name}{" "}
                            <Tooltip
                              title={
                                <div style={{ fontSize: "12px" }}>
                                  {/* {item.features.map((values, index) => (
                                    <p>{values}</p>
                                  ))} */}
                                  {item.description}
                                </div>
                              }
                              placement="bottom"
                            >
                              <i
                                className="fas fa-question-circle"
                                style={{ color: "#bb3f96" }}
                              ></i>
                            </Tooltip>
                          </h4>

                          {/* <p style={{ fontSize: "10px" }}>
                                {item.description}
                              </p> */}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
            {/* <input
                  type="radio"
                  name="accessControl"
                  value="ownable"
                  onChange={this.handleerc1155Data}
                />
                Ownable
                <br />
                <input
                  type="radio"
                  name="accessControl"
                  value="roles"
                  onChange={this.handleerc1155Data}
                />
                Roles <br />
                <p />
                <b>Upgradeability</b>
                <br />
                <input
                  type="radio"
                  name="upgradeability"
                  value="transparent"
                  onChange={this.handleerc1155Data}
                />
                Transparent
                <br />
                <input
                  type="radio"
                  name="upgradeability"
                  value="uups"
                  onChange={this.handleerc1155Data}
                />
                UUPS{" "} */}
            {/* <p>
                  <b>Info</b>
                </p> */}
            {/* <div className="row">
                  <div className="col-sm-7">
                    Security Contact
                    <input
                      onChange={this.handleERC1155}
                      type="text"
                      name="securityContact"
                      placeholder="security@example.com"
                      className="form-control"
                    />
                    <br />
                  </div>
                  <div className="col-sm-5">
                    License
                    <input
                      onChange={this.handleERC1155}
                      type="text"
                      name="license"
                      placeholder="MIT"
                      className="form-control"
                    />
                    <br />
                  </div>
                </div> */}
          </Card>
        ) : (
          " "
        )}

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
          onClick={this.handleSubmit}
        >
          Next
        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tid: state.auth.otpId.id,
    sid: state.auth.storeId.id,
  };
};
export default connect(mapStateToProps, { contractAction })(CreateContract);
