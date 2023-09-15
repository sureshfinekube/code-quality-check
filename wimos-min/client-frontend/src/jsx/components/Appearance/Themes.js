import React from "react";
import demoimg from "../../../images/demoimg.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
const Themes = () => {
  return (
    <div>
      {/* <PageTitle activeMenu="Themes" motherMenu="Home" /> */}
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Theme Settings</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <h4>Current theme</h4>
                <p>
                  This is the theme customers see when they visit your store.
                  You can customize the look and feel of your online store to
                  reflect your brand.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="card">
        <div className="card-header">
          <h4 className="card-title">Theme Settings</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h4>More theme</h4>
              <h5>Coming Soon..........</h5>
            </div>
          </div>
        </div>
      </div> */}
        </div>
        <div className="col-6">
          <div className=" card">
            <div className="card-header">
              <h4 className="card-title">Default Theme</h4>
              <div className="table-buttons"></div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <Link to="/customize-theme">
                    <div
                      className="widget-stat card"
                      style={{ background: "#bd3bb1" }}
                    >
                      <div className="card-body  p-4">
                        <div className="media ai-icon">
                          <span
                            className="me-3 bgl-warning text-info"
                            style={{
                              background: "#fff9ed",
                              borderColor: "#fff9ed",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000"
                              class="bi bi-gear"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                          </span>
                          <div className="media-body">
                            <p className="mb-1 text-white">General </p>
                            {/* <h4
                            className="mb-0 text-capitalize"
                            style={{ fontSize: ".9rem" }}
                          >
                            test
                          </h4> */}
                            {/* <span className="badge badge-danger">-3.5%</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="profile-section">
                    <div
                      className="widget-stat card"
                      style={{ background: "#bd3bb1" }}
                    >
                      <div className="card-body  p-4">
                        <div className="media ai-icon">
                          <span
                            className="me-3 bgl-warning text-info"
                            style={{
                              background: "#fff9ed",
                              borderColor: "#fff9ed",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000"
                              class="bi bi-person"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                          </span>
                          <div className="media-body">
                            <p className="mb-1 text-white">Profile Section</p>
                            {/* <h4
                            className="mb-0 text-capitalize"
                            style={{ fontSize: ".9rem" }}
                          >
                            test
                          </h4> */}
                            {/* <span className="badge badge-danger">-3.5%</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="customize-section">
                    <div
                      className="widget-stat card"
                      style={{ background: "#bd3bb1" }}
                    >
                      <div className="card-body  p-4">
                        <div className="media ai-icon">
                          <span
                            className="me-3 bgl-warning text-info"
                            style={{
                              background: "#fff9ed",
                              borderColor: "#fff9ed",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000"
                              class="bi bi-files-alt"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2zm2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1V3zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" />
                            </svg>
                          </span>
                          <div className="media-body">
                            <p className="mb-1 text-white">Slider Section</p>
                            {/* <h4
                            className="mb-0 text-capitalize"
                            style={{ fontSize: ".9rem" }}
                          >
                            test
                          </h4> */}
                            {/* <span className="badge badge-danger">-3.5%</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
