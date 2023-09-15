import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//Images
import theme from "./../../../images/theme.png";
import pic3 from "./../../../images/profile/small/pic3.jpg";
import pic4 from "./../../../images/profile/small/pic4.jpg";
import pic5 from "./../../../images/profile/small/pic5.jpg";
import pic6 from "./../../../images/profile/small/pic6.jpg";
//import pic7 from './../../../images/profile/small/pic7.jpg';
import pic8 from "./../../../images/profile/small/pic8.jpg";
import wind from "./../../../images/big-wind.png";
import hunt from "./../../../images/circle-hunt.png";
import {
  GetDashboardAction,
  loadingToggleAction,
} from "../../../store/actions/UserAction";
import { GetBillingAction } from "../../../store/actions/BillingAction";
import { GetPackageAction } from "../../../store/actions/packageAction";
import {
  storeStatusAction,
  StoreCreationStatus,
} from "../../../store/actions/AuthActions";
import { connect, useDispatch } from "react-redux";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import ProjectStatisticsTab from "./Dashboard/ProjectStatisticsTab";
import ProfileSlider from "./Dashboard/ProfileSlider";
import AllSell1 from "../../pages/WidgetBasic/AllSell1";
const CompletionApexChart = loadable(() =>
  pMinDelay(import("./Dashboard/CompletionApexChart"), 1000)
);
const ClientsColumnChart = loadable(() =>
  pMinDelay(import("./Dashboard/ClientsColumnChart"), 1000)
);
const NewCustomersApex = loadable(() =>
  pMinDelay(import("./Dashboard/NewCustomersApex"), 1000)
);
const NewCustomersApex2 = loadable(() =>
  pMinDelay(import("./Dashboard/NewCustomersApex2"), 1000)
);
const ProfileRedialApex = loadable(() =>
  pMinDelay(import("./Dashboard/ProfileRedialApex"), 1000)
);
const EmailChartApex = loadable(() =>
  pMinDelay(import("./Dashboard/EmailChartApex"), 1000)
);

const Home = (props) => {
  const dispatch = useDispatch();
  const user = props.getUser;
  //   console.log("userrrr", user);
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(GetDashboardAction(user));
    dispatch(GetBillingAction());
  }, []);
  useEffect(() => {
    // console.log("cli", props.client);
    dispatch(GetPackageAction(props.client?.packageId));
  }, []);
  const data = props.getDashboard;

  const date1 = new Date();
  let date2;
  //   console.log("d1", date1, date2);

  // const date2 = new Date("8/13/2010");
  if (!props.client.isFreePackageClient) {
    date2 = new Date(props.bill?.expires_at);
  } else {
    date2 = new Date(props.client?.freePackageEndingDate);
  }
  const expiresin = getDifferenceInDays(date1, date2);
  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  const [modalCreate, setmodalCreate] = useState(false);
  const [loader, SetLoader] = useState(false);
  let history = useHistory();

  const StatusChange = () => {
    SetLoader(true);
    // console.log(e);

    dispatch(storeStatusAction(props.storeid, true, setmodalCreate, SetLoader));
  };

  const handlerView = () => {
    history.push("/customers");
  };

  useEffect(() => {
    dispatch(StoreCreationStatus(false));
  }, []);
  // console.log("dataaaa", expiresin);
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            {expiresin < 3 ? (
              <div className="col-xl-12">
                <div
                  className="card tryal-gradient"
                  // style={{ background: "#ffc3fb" }}
                >
                  <div
                    className="card-body tryal "
                    style={{ textAlign: "center" }}
                  >
                    <h2>Your subscription plan will be end soon....</h2>
                    {/* <p>Please subcribe new plan or pay bill</p> */}
                    <Link
                      className=" btn btn-rounded  fs-18 font-w500"
                      to="/change-packages"
                    >
                      <i className="fa fa-usd"></i> Subscribe
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card tryal-gradient">
                    <div className="card-body tryal row">
                      <div className="col-xl-7 col-sm-6">
                        <h2>Manage your Market Place</h2>
                        <span>
                          Edit the look and feel of your online store. Add your
                          logo, colors, and images to reflect your brand.{" "}
                        </span>
                       <div style={{display:"flex"}}>
                       <Link
                          to="/customize-theme"
                          className="btn btn-rounded  fs-15 font-w500"
                        >
                          Customize
                        </Link>
                        {!props.activeStatus ? (
                          <Link
                            className="btn btn-rounded  fs-15 font-w500"
                            style={{ marginLeft: "8px" }} 
                            onClick={() => setmodalCreate(true)}
                          >
                            Activate Store
                          </Link>
                        ) : (
                          ""
                        )}
                       </div>
                      </div>
                      <div className="col-xl-5 col-sm-6">
                        <img src={theme} alt="" className="sd-shape" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-xl-12">
									<ProjectStatisticsTab />
								</div> */}
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="fs-20 font-w700 mb-0">Weekly Revenue</h4>
                      {/* <Dropdown className="dropdown ms-2">
												<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
														<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
														<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
													</svg>
												</Dropdown.Toggle>
												<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
													<Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
													<Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown> */}
                    </div>
                    <div className="card-body pb-0">
                      <div id="revenueMap" className="revenueMap">
                        <CompletionApexChart />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xl-12">
									<div className="card">
										<div className="card-header border-0">
											<div>
												<h4 className="fs-20 font-w700">Recent Emails</h4>
												<span className="fs-14 font-w400">Lorem ipsum dolor sit amet</span>
											</div>
											<div>
												<Link to={"#"} className="btn btn-outline-primary btn-rounded fs-18">View More</Link>
											</div>
										</div>
										<div className="card-body px-0">
											<div className="d-flex justify-content-between recent-emails">
												<div className="d-flex">
													<div className="profile-k">
														<span className="bg-success">K</span>	
													</div>
													<div className="ms-3">
														<h4 className="fs-18 font-w500">How to improve project management flows</h4>
														<span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
													</div>
												</div>
												<div className="email-check">
													<label className="like-btn mb-0">
														<input type="checkbox" />
														<span className="checkmark"></span>
													</label>
												</div>
											</div>
											<div className="d-flex justify-content-between recent-emails">
												<div className="d-flex">
													<div className="profile-k">
														<img src={pic6} alt="" />
													</div>
													<div className="ms-3">
														<h4 className="fs-18 font-w500">Fillow Final UseCase Diagram</h4>
														<span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
														<div className="final-badge">
															<span className="badge text-black border"><i className="far fa-file-alt me-3"></i>Master_file.fig</span>
															<span className="badge text-black border"><i className="fas fa-image me-2"></i>CoverPreview.jpg</span>
															<span className="badge border bgl-primary font-w700">4 files more</span>
														</div>
													</div>
												</div>
												<div className="email-check">
													<label className="like-btn mb-0">
														<input type="checkbox" />
														<span className="checkmark"></span>
													</label>
												</div>
											</div>
											<div className="d-flex justify-content-between recent-emails">
												<div className="d-flex">
													<div className="profile-k">
														<span className="bg-warning">G</span>	
													</div>
													<div className="ms-3">
														<h4 className="fs-18 font-w500">Weekly Design Inspirations by Envato</h4>
														<span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
													</div>
												</div>
												<div className="email-check">
													<label className="like-btn mb-0">
														<input type="checkbox" />
														<span className="checkmark"></span>
													</label>
												</div>
											</div>
											<div className="d-flex justify-content-between recent-emails">
												<div className="d-flex">
													<div className="profile-k">
														<img src={pic8} alt="" />
													</div>
													<div className="ms-3">
														<h4 className="fs-18 font-w500">How to improve project management flows</h4>
														<span className="font-w400 d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua...</span>
													</div>
												</div>
												<div className="email-check">
													<label className="like-btn mb-0">
														<input type="checkbox" />
														<span className="checkmark"></span>
													</label>
												</div>
											</div>
										</div>
									</div>
								</div> */}
              </div>
            </div>
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-12">
                  <div className="row">
                    <div className="col-xl-6 col-sm-6">
                      <div className="card">
                        <div className="card-body d-flex px-4 pb-0 justify-content-between">
                          <div
                            onClick={handlerView}
                            style={{ cursor: "pointer" }}
                          >
                            <h4 className="fs-18 font-w600 mb-4 text-nowrap">
                              Total Customers
                            </h4>
                            <div className="d-flex align-items-center">
                              <h2 className="fs-32 font-w700 mb-0">
                                {data.usersCount}
                              </h2>
                              <span className="d-block ms-4">
                                {/* <svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z" fill="#09BD3C"/>
																</svg> */}
                                {/* <small className="d-block fs-16 font-w400 text-success">
                                  +0,5%
                                </small> */}
                              </span>
                            </div>
                          </div>

                          {/* <div id="columnChart">
                            <NewCustomersApex />
                          </div> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="70"
                            fill="#bd3bb1"
                            class="bi bi-people"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="card">
                        <div className="card-body d-flex px-4  justify-content-between">
                          {/* <div>
                            <div className="">
                              <h2 className="fs-32 font-w700">
                                {data.todayUsersCount}
                              </h2>
                              <span className="fs-18 font-w500 d-block">
                                Today's Customers
                              </span>
                            
                            </div>
                          </div> */}

                          <div
                            onClick={handlerView}
                            style={{ cursor: "pointer" }}
                          >
                            <h4 className="fs-18 font-w600 mb-4 text-nowrap">
                              New Customers
                            </h4>
                            <div className="d-flex align-items-center">
                              <h2 className="fs-32 font-w700 mb-0">
                                {data.usersCount}
                              </h2>
                              <span className="d-block ms-4">
                                {/* <svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z" fill="#09BD3C"/>
																</svg> */}
                                {/* <small className="d-block fs-16 font-w400 text-success">
                                  +0,5%
                                </small> */}
                              </span>
                            </div>
                          </div>
                          {/* <div id="NewCustomers">
                            <NewCustomersApex />
                          </div> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="70"
                            fill="#bd3bb1"
                            class="bi bi-person-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path
                              fill-rule="evenodd"
                              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="card">
                        <div className="card-body d-flex px-4  justify-content-between">
                          <div>
                            <div
                              className=""
                              onClick={handlerView}
                              style={{ cursor: "pointer" }}
                            >
                              <h2 className="fs-32 font-w700">
                                {data.nftsCount}
                              </h2>
                              <span className="fs-18 font-w600 d-block">
                                Total NFT
                              </span>
                              {/* <span className="d-block fs-16 font-w400">
																<small className="text-danger">-2%</small> than last month
															</span> */}
                            </div>
                          </div>
                          {/* <div id="NewCustomers">
                            <NewCustomersApex />
                          </div> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="70"
                            fill="#bd3bb1"
                            class="bi bi-images"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div className="card">
                        <div className="card-body d-flex px-4  justify-content-between">
                          <div>
                            <div
                              className=""
                              onClick={handlerView}
                              style={{ cursor: "pointer" }}
                            >
                              <h2 className="fs-32 font-w700">
                                {data.collectionsCount}
                              </h2>
                              <span className="fs-18 font-w600 d-block">
                                Total Collections
                              </span>
                              {/* <span className="d-block fs-16 font-w400"><small className="text-success">-2%</small> than last month</span> */}
                            </div>
                          </div>
                          {/* <div id="NewCustomers1">
                            <NewCustomersApex2 />
                          </div> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="70"
                            fill="#bd3bb1"
                            class="bi bi-collection"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body text-center ai-icon  text-primary">
                      <svg
                        id="rocket-icon"
                        className="my-2"
                        viewBox="0 0 24 24"
                        width="80"
                        height="80"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>

                      <h4 style={{ fontWeight: "600", color: "#bd3bb1" }}>
                        {props.package?.name}
                      </h4>
                      <h6 style={{ fontWeight: "600" }}>
                        $ {props.package?.amount}
                        {props.package?.type === "yearly_subscription" ? (
                          <>/Yr</>
                        ) : (
                          <>/Mo</>
                        )}
                      </h6>

                      <h4 className="my-2">
                        You want to Upgrade your current package?
                      </h4>
                      <Link
                        className="btn my-2 btn-primary btn-lg px-4"
                        to="/change-packages"
                      >
                        <i className="fa fa-usd"></i> Upgrade Your Package
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                  
                      <p>All Sales</p>
                    </div>
                    <div className="chart-wrapper">
                      <AllSell1 />
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-xl-12">
									<div className="card">
										<div className="card-body">
											<div className="row">
												<div className="col-xl-6 col-sm-6">
													<ProfileSlider />
												</div>
												<div className="col-xl-6 redial col-sm-6">
													<div id="redial">
														<ProfileRedialApex />
													</div>
													<span className="text-center d-block fs-18 font-w600">On Progress <small className="text-success">70%</small></span>	
												</div>
											</div>
										</div>
									</div>
								</div> */}
                {/* <div className="col-xl-12 col-lg-12">
									<div className="row">
										<div className="col-xl-6 col-xxl-12 col-sm-6">
											<div className="card">
												<div className="card-header border-0">
													<div>
														<h4 className="fs-20 font-w700">Email Categories</h4>
														<span className="fs-14 font-w400 d-block">Lorem ipsum dolor sit amet</span>
													</div>	
												</div>	
												<div className="card-body">
													<div id="emailchart"> 
														<EmailChartApex />
													</div>
													<div className="mb-3 mt-4">
														<h4 className="fs-18 font-w600">Legend</h4>
													</div>
													<div>
														<div className="d-flex align-items-center justify-content-between mb-4">
															<span className="fs-18 font-w500">	
																<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect width="20" height="20" rx="6" fill="#886CC0"/>
																</svg>
																Primary (27%)
															</span>
															<span className="fs-18 font-w600">763</span>
														</div>
														<div className="d-flex align-items-center justify-content-between  mb-4">
															<span className="fs-18 font-w500">	
																<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect width="20" height="20" rx="6" fill="#26E023"/>
																</svg>
																Promotion (11%)
															</span>
															<span className="fs-18 font-w600">321</span>
														</div>
														<div className="d-flex align-items-center justify-content-between  mb-4">
															<span className="fs-18 font-w500">	
																<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect width="20" height="20" rx="6" fill="#61CFF1"/>
																</svg>
																Forum (22%)
															</span>
															<span className="fs-18 font-w600">69</span>
														</div>
														<div className="d-flex align-items-center justify-content-between  mb-4">
															<span className="fs-18 font-w500">	
																<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect width="20" height="20" rx="6" fill="#FFDA7C"/>
																</svg>
																Socials (15%) 
															</span>
															<span className="fs-18 font-w600">154</span>
														</div>
														<div className="d-flex align-items-center justify-content-between  mb-4">
															<span className="fs-18 font-w500">	
																<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect width="20" height="20" rx="6" fill="#FF86B1"/>
																</svg>
																Spam (25%) 
															</span>
															<span className="fs-18 font-w600">696</span>
														</div>
													</div>
													
												</div>
												<div className="card-footer border-0 pt-0">
													<Link to={"#"} className="btn btn-outline-primary d-block btn-rounded">Update Progress</Link>		
													
												</div>
											</div>
										</div>		
										<div className="col-xl-6 col-xxl-12 col-sm-6">
											<div className="card">
												<div className="card-header border-0 pb-0">
													<div>
														<h4 className="fs-20 font-w700">Important Projects</h4>
														<span className="fs-14 font-w400 d-block">Lorem ipsum dolor sit amet</span>
													</div>
												</div>
												<div className="card-body pb-0">
													<div className="project-details"> 
														<div className="d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<span className="big-wind">
																	<img src={wind} alt="" />
																</span>
																<div className="ms-3">
																	<h4>Big Wind</h4>
																	<span className="fs-14 font-w400">Creative Agency</span>
																</div>
															</div>	
															<Dropdown className="dropdown ms-2">
																<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
																		<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
																		<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
																	</svg>
																</Dropdown.Toggle>
																<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
																	<Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
																	<Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
														</div>
														<h4 className="fs-16 font-w600 mt-4">Optimization Dashboard Page for indexing in Google</h4>
														<div className="projects">
															<span className="badge bgl-warning text-warning font-w700 me-3">SEO</span>
															<span className="badge bgl-danger text-danger font-w700">MARKETING</span>
														</div>
														<div className="mt-3">
															<div className="progress default-progress">
																<div className="progress-bar bg-gradient1 progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
																	<span className="sr-only">45% Complete</span>
																</div>
															</div>
															<div className="d-flex align-items-end mt-3 pb-3 justify-content-between">
																<span className="fs-14 font-w400"><small className="font-w700 me-2">12</small>Task Done</span>
																<span className="fs-14 font-w400">Due date: 12/05/2020</span>
															</div>
														</div>
													</div>	
													<div className="project-details"> 
														<div className="d-flex align-items-center justify-content-between">
															<div className="d-flex align-items-center">
																<span className="big-wind">
																	<img src={hunt} alt="" />
																</span>
																<div className="ms-3">
																	<h4>Circle Hunt</h4>
																	<span className="fs-14 font-w400">Creative Agency</span>
																</div>
															</div>	
															<Dropdown className="dropdown ms-2">
																<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
																		<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
																		<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
																	</svg>
																</Dropdown.Toggle>
																<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
																	<Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
																	<Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
														</div>
														<h4 className="fs-16 font-w600 mt-4">Redesign Landing Page Website for Company Profile</h4>
														<div className="projects">
															<span className="badge bgl-primary text-primary font-w700 me-3">UI/UX</span>
															<span className="badge bgl-danger text-danger font-w700">WEBSITE</span>
														</div>
														<div className="mt-3">
															<div className="progress default-progress">
																<div className="progress-bar bg-gradient1 progress-animated" style={{width: "45%", height:"10px"}} role="progressbar">
																	<span className="sr-only">45% Complete</span>
																</div>
															</div>
															<div className="d-flex align-items-end mt-3 pb-3 justify-content-between">
																<span className="fs-14 font-w400"><small className="font-w700 me-2">12</small>Task Done</span>
																<span className="fs-14 font-w400">Due date: 12/05/2020</span>
															</div>
														</div>
													</div>	
												</div>
												<div className="card-footer pt-0 border-0">
													<Link to={"#"} className="btn btn-outline-primary d-block btn-rounded">Pin other projects</Link>
												</div>
											</div>
										</div>
									</div>
										
								</div> */}
                {/* <div className="col-xl-12 col-lg-12">
									<div className="card">
										<div className="card-header border-0">
											<div>
												<h4 className="fs-20 font-w700">Messages</h4>
												<span>Lorem ipsum dolor sit amet</span>
											</div>
											<div>
												<Link to={"#"} className="btn btn-primary btn-rounded">+New Messages</Link>
											</div>
										</div>
										<div className="card-body px-0">
											{MessagesBlog.map((item,index)=>(
												<div className="msg-bx d-flex justify-content-between align-items-center" key={index}>
													<div className="msg d-flex align-items-center w-100">
														<div className="image-box active">
															<img src={item.images} alt="" />
														</div>
														<div className="ms-3 w-100 ">
															<h4 className="fs-18 font-w600">{item.title}</h4>
															<div className="d-flex justify-content-between">
																<span className="me-auto">{item.para}</span>
																<span className="me-4 fs-12">{item.datetime}</span>
															</div>
														</div>
													</div>
													<Dropdown className="dropdown ms-2">
														<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
																<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
																<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
															</svg>
														</Dropdown.Toggle>
														<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
															<Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
															<Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
														</Dropdown.Menu>
													</Dropdown>
												</div>
											))}	
										</div>
									</div>
								
								</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal className="fade" show={modalCreate}>
        <Modal.Header>
          <Modal.Title>Activate Store</Modal.Title>
          <Button
            onClick={() => setmodalCreate(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <label className="mb-1">
                <strong>Are you sure want to activate store?</strong>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setmodalCreate(false)} variant="danger light">
            Close
          </Button>

          {!loader ? (
            <Button variant="primary" onClick={StatusChange}>
              Confirm
            </Button>
          ) : (
            <Button variant="outline-primary" size="sm">
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "24px" }}
              ></i>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    getDashboard: state.user.getDashboard,
    getUser: state.auth.selectedStore.store_domain,
    client: state.auth.auth,
    package: state.packages.currentpackage,
    bill: state.billings.billing.currentBill,
    storeid: state.auth.selectedStore.id,
    activeStatus: state.auth.selectedStore.activeStatus,
  };
};
export default connect(mapStateToProps)(Home);
