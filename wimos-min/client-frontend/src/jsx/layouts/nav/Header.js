import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { ThemeContext } from "../../../context/ThemeContext";

/// Image
// import profile1 from "../../../images/profile/wimos-client.jpg";
// import avatar from "../../../images/avatar/1.jpg";
import profile1 from "../../../images/profile/profile11.png";

import { Dropdown } from "react-bootstrap";
import LogoutPage from "./Logout";

/// redux
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  storeStatusAction,
  modeChange,
  StoreChange,
} from "../../../store/actions/AuthActions";

const Header = (props) => {
  let history = useHistory();
  // const [searchBut, setSearchBut] = useState(false);
  const dispatch = useDispatch();
  const { changeBackground, background } = useContext(ThemeContext);
  const [storestatus, setStoreStatus] = useState();
  const statusCheck = (e) => {
    setStoreStatus(e.target.checked);
  };

  useEffect(() => {
    setStoreStatus(props.activeStatus);
  }, [props.activeStatus]);
  const changeMode = () => {
    if (background.value === "dark") {
      // setMode(false);
      changeBackground({ value: "light", label: "Light" });
      dispatch(modeChange("light"));
    } else {
      // setMode(true);
      changeBackground({ value: "dark", label: "dark" });
      dispatch(modeChange("dark"));
    }
  };

  const changeModefirst = () => {
    if (props.mode === "light") {
      // setMode(false);
      changeBackground({ value: "light", label: "Light" });
      dispatch(modeChange("light"));
    } else {
      // setMode(true);
      changeBackground({ value: "dark", label: "dark" });
      dispatch(modeChange("dark"));
    }
  };

  useEffect(() => {
    changeModefirst();
  }, []);
  // const StoreChangeHandler = () => {
  //   //console.log("his", history);
  //   dispatch(StoreChange(history));
  // };
  const [modalCreate, setmodalCreate] = useState(false);
  const [loader, SetLoader] = useState(false);

  const StatusChange = (e) => {
    // setStoreStatus(e.target.checked);
    // console.log(e);
    SetLoader(true);
    dispatch(loadingToggleAction(true));
    dispatch(
      storeStatusAction(props.storeid, storestatus, setmodalCreate, SetLoader)
    );
  };

  const ChangeStore = () => {
    dispatch(StoreChange(history));
  };

  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  return (
    <div className="header border-bottom">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              {/* <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {finalName.join(" ").length === 0
                  ? "Dashboard"
                  : finalName.join(" ") === "dashboard dark"
                  ? "Dashboard"
                  : finalName.join(" ")}
              </div> */}
            </div>
            <ul className="navbar-nav header-right main-notification">
              {/* <li className="nav-item d-flex align-items-center">
					<div className="input-group search-area">
						<input type="text" 
							className={`form-control ${searchBut ? "active" : ""}`}
							placeholder="Search here..." 
						/>
						<span className="input-group-text" onClick={() => setSearchBut(!searchBut)}>
							<Link to={"#"}><i className="flaticon-381-search-2"></i></Link>
						</span>
					</div>
				</li>  */}

              {/* <Dropdown
                as="li"
                className="nav-item dropdown notification_dropdown "
              >
                <Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a"
					data-toggle="dropdown" aria-expanded="false"
                >
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M23.3333 19.8333H23.1187C23.2568 19.4597 23.3295 19.065 23.3333 18.6666V12.8333C23.3294 10.7663 22.6402 8.75902 21.3735 7.12565C20.1068 5.49228 18.3343 4.32508 16.3333 3.80679V3.49996C16.3333 2.88112 16.0875 2.28763 15.6499 1.85004C15.2123 1.41246 14.6188 1.16663 14 1.16663C13.3812 1.16663 12.7877 1.41246 12.3501 1.85004C11.9125 2.28763 11.6667 2.88112 11.6667 3.49996V3.80679C9.66574 4.32508 7.89317 5.49228 6.6265 7.12565C5.35983 8.75902 4.67058 10.7663 4.66667 12.8333V18.6666C4.67053 19.065 4.74316 19.4597 4.88133 19.8333H4.66667C4.35725 19.8333 4.0605 19.9562 3.84171 20.175C3.62292 20.3938 3.5 20.6905 3.5 21C3.5 21.3094 3.62292 21.6061 3.84171 21.8249C4.0605 22.0437 4.35725 22.1666 4.66667 22.1666H23.3333C23.6428 22.1666 23.9395 22.0437 24.1583 21.8249C24.3771 21.6061 24.5 21.3094 24.5 21C24.5 20.6905 24.3771 20.3938 24.1583 20.175C23.9395 19.9562 23.6428 19.8333 23.3333 19.8333Z" fill="#717579"/>
						<path d="M9.9819 24.5C10.3863 25.2088 10.971 25.7981 11.6766 26.2079C12.3823 26.6178 13.1838 26.8337 13.9999 26.8337C14.816 26.8337 15.6175 26.6178 16.3232 26.2079C17.0288 25.7981 17.6135 25.2088 18.0179 24.5H9.9819Z" fill="#717579"/>
					</svg>
					<span className="badge light text-white bg-warning rounded-circle">12</span>
                </Dropdown.Toggle>
				<Dropdown.Menu align="right" className="mt-2 dropdown-menu dropdown-menu-end">
                  <PerfectScrollbar className="widget-media dlab-scroll p-3 height380">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-panel">
							<div className="media me-2">
								<img alt="images" width={50} src={avatar} />
							</div>
							<div className="media-body">
								<h6 className="mb-1">Dr sultads Send you Photo</h6>
								<small className="d-block">
								  29 July 2020 - 02:26 PM
								</small>
							</div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-info">KG</div>
                          <div className="media-body">
                            <h6 className="mb-1">
                              Resport created successfully
                            </h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-success">
                            <i className="fa fa-home" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Reminder : Treatment Time!</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2">
                            <img alt="" width={50} src={avatar} />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Dr sultads Send you Photo</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-danger">KG</div>
                          <div className="media-body">
                            <h6 className="mb-1">
                              Resport created successfully
                            </h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-primary">
                            <i className="fa fa-home" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Reminder : Treatment Time!</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                  <Link className="all-notification" to="#">
                    See all notifications <i className="ti-arrow-right" />
                  </Link>
                </Dropdown.Menu>
              </Dropdown> */}

              {/* <Dropdown
					as="li"
					className="nav-item dropdown notification_dropdown "
				  >
					<Dropdown.Toggle
					  variant=""
					  as="a"
					  className="nav-link bell bell-link i-false c-pointer"
					  onClick={() => onNote()}
					>
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M27.076 6.24662C26.962 5.48439 26.5787 4.78822 25.9955 4.28434C25.4123 3.78045 24.6679 3.50219 23.8971 3.5H4.10289C3.33217 3.50219 2.58775 3.78045 2.00456 4.28434C1.42137 4.78822 1.03803 5.48439 0.924011 6.24662L14 14.7079L27.076 6.24662Z" fill="#717579"/>
							<path d="M14.4751 16.485C14.3336 16.5765 14.1686 16.6252 14 16.6252C13.8314 16.6252 13.6664 16.5765 13.5249 16.485L0.875 8.30025V21.2721C0.875926 22.1279 1.2163 22.9484 1.82145 23.5536C2.42659 24.1587 3.24707 24.4991 4.10288 24.5H23.8971C24.7529 24.4991 25.5734 24.1587 26.1786 23.5536C26.7837 22.9484 27.1241 22.1279 27.125 21.2721V8.29938L14.4751 16.485Z" fill="#717579"/>
						</svg>
						<span className="badge light text-white bg-danger rounded-circle">76</span>
					</Dropdown.Toggle>
				</Dropdown>	 */}

              {/* <Dropdown
                as="li"
                className="nav-item  notification_dropdown "
              >
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link  ai-icon i-false c-pointer"
                  // href="#"
                  role="button"
                  data-toggle="dropdown"
                >
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.1666 5.83331H20.9999V3.49998C20.9999 3.19056 20.877 2.89381 20.6582 2.67502C20.4394 2.45623 20.1427 2.33331 19.8333 2.33331C19.5238 2.33331 19.2271 2.45623 19.0083 2.67502C18.7895 2.89381 18.6666 3.19056 18.6666 3.49998V5.83331H9.33325V3.49998C9.33325 3.19056 9.21034 2.89381 8.99154 2.67502C8.77275 2.45623 8.47601 2.33331 8.16659 2.33331C7.85717 2.33331 7.56042 2.45623 7.34163 2.67502C7.12284 2.89381 6.99992 3.19056 6.99992 3.49998V5.83331H5.83325C4.90499 5.83331 4.01476 6.20206 3.35838 6.85844C2.702 7.51482 2.33325 8.40506 2.33325 9.33331V10.5H25.6666V9.33331C25.6666 8.40506 25.2978 7.51482 24.6415 6.85844C23.9851 6.20206 23.0948 5.83331 22.1666 5.83331Z" fill="#717579"/>
						<path d="M2.33325 22.1666C2.33325 23.0949 2.702 23.9851 3.35838 24.6415C4.01476 25.2979 4.90499 25.6666 5.83325 25.6666H22.1666C23.0948 25.6666 23.9851 25.2979 24.6415 24.6415C25.2978 23.9851 25.6666 23.0949 25.6666 22.1666V12.8333H2.33325V22.1666Z" fill="#717579"/>
					</svg>
					<span className="badge light text-white bg-success rounded-circle">1</span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="right" className="mt-4 dropdown-menu dropdown-menu-end">
                  <PerfectScrollbar className="widget-timeline dlab-scroll style-1 ps p-3 height370">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-badge primary" />
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>10 minutes ago</span>
                          <h6 className="mb-0">
                            Youtube, a video-sharing website, goes live{" "}
                            <strong className="text-primary">$500</strong>.
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge info"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            New order placed{" "}
                            <strong className="text-info">#XF-2356.</strong>
                          </h6>
                          <p className="mb-0">
                            Quisque a consequat ante Sit amet magna at
                            volutapt...
                          </p>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge danger"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>30 minutes ago</span>
                          <h6 className="mb-0">
                            john just buy your product{" "}
                            <strong className="text-warning">Sell $250</strong>
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge success"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>15 minutes ago</span>
                          <h6 className="mb-0">
                            StumbleUpon is acquired by eBay.{" "}
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge warning"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            Mashable, a news website and blog, goes live.
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge dark"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            Mashable, a news website and blog, goes live.
                          </h6>
                        </Link>
                      </li>
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                </Dropdown.Menu>
              </Dropdown> */}

              {/* <Dropdown as="li" className="nav-item dropdown">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  role="button"
                  data-toggle="dropdown"
                >
                  <div className="header-info ms-3">
                    <span className="font-w600 ">domain1.com</span>
                    <small
                      className="text-end font-w400"
                      style={{ marginLeft: "10px" }}
                    >
                      <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="right"
                  className="mt-3 dropdown-menu dropdown-menu-end"
                >
                  <Link to="#" className="dropdown-item ai-icon">
                    <span className="ms-2">domain1.com </span>
                  </Link>

                  <Link to="#" className="dropdown-item ai-icon">
                    <span className="ms-2">domain2.com </span>
                  </Link>
                </Dropdown.Menu>
              </Dropdown> */}

              {/* <div className="d-flex align-items-center">
                <div className="form-check form-switch toggle-switch">
                  <input
                    className="form-check-input custome"
                    type="checkbox"
                    id="flexSwitchCheckChecked1"
                    // defaultChecked
                  />
                </div>
              </div> */}
              <div className="d-flex align-items-center">
                {background.value == "dark" && (
                  <label
                    className="form-check-label font-w400 fs-16 mb-0"
                    htmlFor="flexSwitchCheckChecked1"
                  >
                    <div className="mode-button">
                      <div style={{ cursor: "pointer" }} onClick={changeMode}>
                        <i
                          style={{ color: "#fff" }}
                          className="bi bi-sun-fill"
                        ></i>
                      </div>
                    </div>
                  </label>
                )}
                {background.value == "light" && (
                  <label
                    className="form-check-label font-w400 fs-16 mb-0"
                    htmlFor="flexSwitchCheckChecked1"
                  >
                    <div className="mode-button">
                      <div style={{ cursor: "pointer" }} onClick={changeMode}>
                        <i
                          style={{ color: "#fff" }}
                          className="bi bi-moon-stars-fill"
                        ></i>
                      </div>
                    </div>
                  </label>
                )}
              </div>
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  role="button"
                  data-toggle="dropdown"
                >
                  <img src={profile1} width={20} alt="" />
                  {/* <div className="header-info ms-3">
						<span className="font-w600 ">Hi,<b>William</b></span>
						<small className="text-end font-w400">william@example.com</small>
						</div> */}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="right"
                  className="mt-3 dropdown-menu dropdown-menu-end"
                >
                  <div className="dropdown-item">
                    <label>
                      <strong>{props.name}</strong>
                    </label>
                    <div style={{ display: "flex" }}>
                      <p style={{ fontSize: "10px", marginRight: "10px" }}>
                        {props.storename}
                      </p>

                      <div className="form-check form-switch toggle-switch">
                        <input
                          className="form-check-input custome"
                          type="checkbox"
                          checked={storestatus}
                          onChange={(e) => statusCheck(e)}
                          onClick={() => setmodalCreate(true)}
                          // id="flexSwitchCheckChecked1"
                          // defaultChecked
                        />
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                  <Link to="/app-profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary me-1"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2">Profile </span>
                  </Link>

                  <Link
                    className="dropdown-item ai-icon"
                    onClick={(e) => ChangeStore(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#bd3bb1"
                      class="bi bi-shop-window"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    <span className="ms-2">Change Store </span>
                  </Link>

                  {/* <Link
                    onClick={(e) => StoreChangeHandler(e)}
                    className="dropdown-item ai-icon"
                  >
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary me-1"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2">Select Another Store </span>
                  </Link> */}
                  {/* <Link to="/email-inbox" className="dropdown-item ai-icon">
                    <svg
                      id="icon-inbox"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-success me-1"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="ms-2">Inbox </span>
                  </Link> */}
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>

              {/* <li className="nav-item header-profile">
					<Link to={"#"} className="nav-link" role="button" data-bs-toggle="dropdown">
						<img src={profile} width="20" alt=""/>
					</Link>
				</li> */}
            </ul>
          </div>
        </nav>
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
                // style={{ fontSize: "14px" }}
              ></i>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.auth.email,
    name: state.auth.auth.name,
    username: state.auth.auth.username,
    nationality: state.auth.auth.nationality,
    phonenum: state.auth.auth.phone_number,
    storename: state.auth.selectedStore.store_name,
    storedomain: state.auth.selectedStore.store_domain,
    storeid: state.auth.selectedStore.id,
    activeStatus: state.auth.selectedStore.activeStatus,
    mode: state.auth.mode,
    // updatestatus: state.auth.updateSuccess,
    // changepassstatus: state.auth.changePassSuccess,
  };
};

export default connect(mapStateToProps)(Header);
