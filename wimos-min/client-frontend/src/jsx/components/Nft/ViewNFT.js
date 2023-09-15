import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import data from "./MOCK_DATA_2.json";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ViewNFT = (props) => {
  const history = useHistory();

  const [row, setRow] = useState(props.location.state);
  const [modalCreate, setmodalCreate] = useState(false);
  // let reportData = props.reportCount?.filter(({ type }) =>
  //   console.log("11t", type)
  // );
  const [userReport, setUserReport] = useState();
  console.log("row", row);
  useEffect(() => {
    setUserReport(
      props.reportData?.reports.filter(
        (obj) => obj.type === "nft" && row.id === obj.nftId
      )
    );
    console.log("user", props.reportData?.reports);
    console.log("userReport", userReport);
  }, []);

  // const handlerReport = () => {
  //   history.push('/report-nft-${userReport.id}`)
  // };
  console.log("userReport out", userReport);

  return (
    <div>
      {/* <PageTitle activeMenu="View NFT" motherMenu="Home" /> */}
      <div className="row">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* <div className="card-header">
                <h4 className="card-title">Content *</h4>
              </div> */}
                <div className="card-body">
                  <div className="row">
                    <div className="upload-button">
                      <img className="nft-view-image" src={row.image} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <label className="bold-label">{row.name}</label>
                  <p>
                    Created on {new Date(row.createdAt).toLocaleDateString()}
                  </p>
                  <label className="bold-label">Status</label>
                  <div>
                    {row.status && (
                      <div className="badge badge-outline-success badge-rounded">
                        On Sale
                      </div>
                    )}
                    {!row.status && (
                      <div className="badge badge-outline-dark badge-rounded">
                        Off Sale
                      </div>
                    )}
                  </div>
                  <br />
                  <div>
                    <label className="bold-label">
                      Report{" "}
                      {/* <button
                        style={{ border: "none" }}
                        onClick={() => handlerReport()}
                      > */}{" "}
                      <Link
                        to={{
                          pathname: `/report-nft-${row.id}`,
                          state: userReport,
                        }}
                      >
                        {userReport?.length}
                      </Link>
                      {/* </button>{" "} */}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row">
            {/* <div className="col-xl-12">
              <div className="card">
               
                <div className="card-body">
                  <div className="row">
                    {" "}
                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4 col-xs-4">
                      <div className="widget-stat card">
                        <div className="card-body p-4">
                          <div className="media1 ai-icon">
                            <span className="me-3 bgl-primary text-primary">
                              <i className="fas fa-eye"></i>
                            </span>
                            <div className="media-body">
                              <p className="mb-1">Views</p>
                              <h5 className="mb-0">10</h5>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4 col-xs-4">
                      <div className="widget-stat card">
                        <div className="card-body p-4">
                          <div className="media1 ai-icon">
                            <span className="me-3 bgl-primary text-primary">
                              <i className="fas fa-user"></i>
                            </span>
                            <div className="media-body">
                              <p className="mb-1">Trades</p>
                              <h5 className="mb-0">8</h5>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4 col-xs-4">
                      <div className="widget-stat card">
                        <div className="card-body p-4">
                          <div className="media1 ai-icon">
                            <span className="me-3 bgl-primary text-primary">
                              <i className="fas fa-eye"></i>
                            </span>
                            <div className="media-body">
                              <p className="mb-1">Owners</p>
                              <h5 className="mb-0">{row.nameOfSeller}</h5>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-xl-12">
              <div className="card">
                {/* <div className="card-header">
                <h4 className="card-title">NFT interface *</h4>
              </div> */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <label className="bold-label">Name of seller</label>
                      <p>{row.nameOfSeller}</p>
                      <label className="bold-label">Email of seller</label>
                      <p>{row.emailOfSeller}</p>
                      <label className="bold-label">Username of seller</label>
                      <p>{row.usernameOfSeller}</p>
                    </div>
                    <div className="col-xl-6">
                      <label className="bold-label">Royalties</label>
                      <p>{row.royalties}</p>
                      {/* <label className="bold-label">Current sell order</label>
                      <p>None</p> */}
                      <label className="bold-label">Token ID</label>
                      <p>{row.tokenId}</p>
                      <label className="bold-label">Collection</label>
                      <p>{row.collectionName}</p>
                    </div>
                    <label className="bold-label">Mint from</label>
                    <p>{row.mintFrom}</p>

                    <label className="bold-label">Description</label>
                    <p>{row.description}</p>

                    <label className="bold-label">Like</label>
                    <p>{row.likes_count ? row.likes_count : 0}</p>
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
    userId: state.user.getUserId,
    userData: state.user.getUser,
    getUser: state.auth.selectedStore.store_domain,
    reportData: state.auth.reports.data,
  };
};
export default connect(mapStateToProps)(ViewNFT);
