import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import profile from "../../../images/profile/profile11.png";
import CustomerDetails from "./CustomerDetails";
import ViewCollection from "./ViewCollection";
import NFT from "../Nft/nft";
import { connect } from "react-redux";
import Report from "../Report/report";

const ViewCustomer = (props) => {
  const [row, setRow] = useState(props.location.state);
  // console.log("rowwwwwwwwwwwwwwwww", row.storeId);
  // console.log("storeeeeeeeeeeeeee", props.getUser?.id);

  return (
    <Fragment>
      <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12 items">
        <div className="card contact-bx item-content">
          {/* <div className="card-header border-0">
            <div className="action-dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  as="div"
                  className="btn-link i-false"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                    <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                    <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  alignRight={true}
                  className="dropdown-menu-right"
                >
                  
                  <Dropdown.Item
                    className="text-danger"
                    
                  >
                    Block
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div> */}
          <div className="card-body user-profile">
            <div className="image-bx">
              <img
                src={
                  row.profile
                    ? process.env.NEXT_PUBLIC_USER_AWS_URL +
                      "/user/" +
                      row.profile
                    : profile
                }
                alt=""
                className="rounded-circle"
              />
              {row.status && <span className="active"></span>}
              {!row.status && <span className="inactive"></span>}
            </div>
            <div className="media-body user-meta-info">
              <h6 className="fs-18 font-w600 my-1">
                <div className="text-black user-name">
                  {row.storeId === props.getUser?.id ? (
                    <a
                      href={`https://${props.getUser?.store_domain}/author`}
                      target="_blank"
                    >
                      {row.name}
                    </a>
                  ) : (
                    <a
                      href={`https://${props.getUser?.store_domain}/user-profile/${row.id}`}
                      target="_blank"
                    >
                      {row.name}
                    </a>
                  )}
                </div>
              </h6>
              <p className="fs-14 mb-3 user-work">{row.username}</p>
              <ul>
                <li>
                  {/* <a href={`tel:${row.mobile_number}`}>
                    <i className="fas fa-phone-alt"></i>
                  </a> */}{" "}
                  <span>
                    <b style={{ fontSize: "13px" }}>{row.follower_count}</b>{" "}
                    followers
                  </span>
                </li>{" "}
                <li style={{ paddingLeft: "10px" }}>
                  {/* <a href={`mailto:${row.email}`}>
                    <i className="far fa-comment-alt"></i>
                  </a> */}{" "}
                  <span>
                    <b style={{ fontSize: "13px" }}>{row.following_count}</b>{" "}
                    following
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Col xl={12}>
          <Card>
            {/* <Card.Header>
              
              <Card.Title>Nav Pills Tabs</Card.Title>
            </Card.Header> */}
            <Card.Body>
              <Tab.Container defaultActiveKey={1}>
                <Nav as="ul" className="nav-pills mb-4 ">
                  <Nav.Item as="li">
                    <Nav.Link eventKey={1}>Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link eventKey={2}>NFT</Nav.Link>
                  </Nav.Item>

                  {props.getUser?.type === "single_store" &&
                  props.getUser?.metamaskId === row.metamaskId ? (
                    <Nav.Item as="li">
                      <Nav.Link eventKey={3}>Collection</Nav.Link>
                    </Nav.Item>
                  ) : (
                    ""
                  )}
                  <Nav.Item as="li">
                    <Nav.Link eventKey={4}>Report</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="">
                  <Tab.Pane eventKey={1}>
                    <CustomerDetails data={row} />
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <NFT data={row} />
                  </Tab.Pane>

                  <Tab.Pane eventKey={3}>
                    <ViewCollection data={row} />
                  </Tab.Pane>
                  <Tab.Pane eventKey={4}>
                    <Report data={row} />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    getUser: state.auth.selectedStore,
  };
};
export default connect(mapStateToProps)(ViewCustomer);
