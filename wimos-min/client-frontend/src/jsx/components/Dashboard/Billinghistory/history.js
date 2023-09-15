import React, { useMemo, Fragment, useState, useEffect } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { connect, useDispatch } from "react-redux";
import { ColumnFilter } from "./ColumnFilter";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Row,
  ButtonGroup,
} from "react-bootstrap";

import {
  GetBillingAction,
  loadingToggleAction,
} from "../../../../store/actions/BillingAction";
import { GetPackageAction } from "../../../../store/actions/packageAction";
//import { COLUMNS } from "./Columns";
//import MockData from "./MockData.json";
import { GlobalFilter } from "./filiter";
import { Route, Link } from "react-router-dom";
import "../../table/FilteringTable/filtering.css";

// //import './table.css';
// import "./filtering.css";

export const BillingHistory = (props) => {
  // console.log(props.client.packageId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(GetBillingAction());
    dispatch(GetPackageAction(props.client?.packageId));
  }, []);

  const current = useMemo(() => props.current || [], [props.current]);
  const data = useMemo(() => props.billing || [], [props.billing]);
  const COLUMNS = [
    {
      Header: "#",
      Footer: "#",
      Cell: (props) => {
        // console.log(props);
        return <>{props.cell.row.index + 1}</>;
      },
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Date",
      Footer: "Date",
      accessor: "updated_on",
      Filter: ColumnFilter,
      Cell: (props) => {
        let date = new Date(props.value).toLocaleDateString();
        return <>{date}</>;
      },
      disableFilters: true,
    },
    {
      Header: "Mode Of Payment",
      Footer: "Mode Of Payment",
      accessor: "mode",
      Filter: ColumnFilter,
      disableFilters: true,
    },

    {
      Header: "Amount",
      Footer: "Amount",
      accessor: "amount",
      // Cell: ({ value }) => {
      //   return format(new Date(value), "dd/mm/yyyy");
      // },
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Total Amount Paid",
      Footer: "Total Amount Paid",
      accessor: "amount_sub_total",
      // Cell: ({ value }) => {
      //   return format(new Date(value), "dd/mm/yyyy");
      // },
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Status",
      Footer: "Status",
      accessor: "payment_status",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    // {
    //   Header: "Download",
    //   Footer: "Download",
    //   disableFilters: true,
    //   Filter: ColumnFilter,
    //   Cell: (props) => {
    //     return (
    //       <div className="d-flex">
    //         {/* <Link
    //           // to={{
    //           //   pathname: `/view-customer-${props.cell.row.original.id}`,
    //           //   state: props.cell.row.original,
    //           // }}
    //           className="btn btn-primary shadow btn-xs sharp me-1"
    //         >
    //           <i className="fas fa-eye"></i>
    //         </Link> */}
    //         <a
    //           href={props.value}
    //           className="btn btn-warning shadow btn-xs sharp"
    //           download="test"
    //         >
    //           <i className="fas fa-download"></i>
    //         </a>
    //       </div>
    //     );
    //   },
    //   disableFilters: true,
    // },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );
  const ChangeAddress = () => {
    <form>Enter address</form>;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      {/* <PageTitle activeMenu="Billing History" motherMenu="Home" /> */}

      <Fragment>
        <Row>
          {/* <Col xl="6">
            <Card className="text-white bg-primary">
              <Card.Body className=" mb-0">
                <Card.Title className="text-white">
                  Next Billing Info
                </Card.Title>
                <Card.Text>Information and Amount</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-white">5 days left</small>
              </Card.Footer>
            </Card>
          </Col> */}
          <Col xl="6">
            <Card className="text-white bg-primary">
              <Card.Body className=" mb-0">
                <Card.Title className="text-white text-center">
                  Last Billing Details
                </Card.Title>
                <Card.Text>
                  {/* Amount Payed: ${props.current.amount}
                  <br /> */}
                  <div className="row">
                    <div className="col-6">
                      <div className="widget-stat card">
                        <div className="card-body  p-4">
                          <div className="media ai-icon">
                            <span className="me-3 bgl-info text-info">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </span>
                            <div className="media-body">
                              <p className="mb-1 text-black">Package Name</p>
                              <h4
                                className="mb-0 text-capitalize"
                                style={{ fontSize: ".9rem" }}
                              >
                                {props?.package?.name}
                              </h4>
                              {/* <span className="badge badge-danger">-3.5%</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="widget-stat card">
                        <div className="card-body  p-4">
                          <div className="media ai-icon">
                            <span className="me-3 bgl-success text-success">
                              <svg
                                id="icon-revenue"
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-dollar-sign"
                              >
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                              </svg>
                            </span>
                            <div className="media-body">
                              <p className="mb-1 text-black">Amount Paid</p>
                              <h4
                                className="mb-0"
                                style={{ fontSize: ".9rem" }}
                              >
                                {props.packagestatus ? (
                                  <>0</>
                                ) : (
                                  <>{current.amount}</>
                                )}
                              </h4>
                              {/* <span className="badge badge-danger">-3.5%</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="widget-stat card">
                        <div className="card-body p-4">
                          <div className="media ai-icon">
                            <span className="me-3 bgl-warning text-warning">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                            </span>
                            <div className="media-body">
                              <p className="mb-1 text-black">Starting date</p>
                              <h4
                                className="mb-0"
                                style={{ fontSize: ".9rem" }}
                              >
                                {props.packagestatus ? (
                                  <>
                                    {new Date(
                                      props.startingdate
                                    ).toLocaleDateString()}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    {new Date(
                                      current.updated_on
                                    ).toLocaleDateString()}
                                  </>
                                )}
                              </h4>
                              {/* <span className="badge badge-warning">+3.5%</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="widget-stat card">
                        <div className="card-body p-4">
                          <div className="media ai-icon">
                            <span className="me-3 bgl-danger text-danger">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                            </span>
                            <div className="media-body">
                              <p className="mb-1 text-black">Renewal date</p>
                              <h4
                                className="mb-0"
                                style={{ fontSize: ".9rem" }}
                              >
                                {props.packagestatus ? (
                                  <>
                                    {new Date(
                                      props.endingdate
                                    ).toLocaleDateString()}
                                  </>
                                ) : (
                                  <>
                                    {new Date(
                                      current.expires_at
                                    ).toLocaleDateString()}
                                  </>
                                )}
                              </h4>
                              {/* <span className="badge badge-warning">+3.5%</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
              {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
            </Card>
          </Col>
          <Col xl="6">
            <Card className="text-white bg-primary">
              <Card.Body className=" mb-0">
                <Card.Title className="text-white text-center">
                  Current Package Details
                </Card.Title>
                <br />
                <Card.Text>
                  {/* <div className="row">
                    <div className="col-6">
                      <h4
                        className="text-white"
                        style={{ textTransform: "uppercase" }}
                      >
                        {props.package.name}
                      </h4>
                    </div>
                    <div className="col-6 float-right">
                      {props.package.type === "yearly_subscription" ? (
                        <h4
                          className="text-white "
                          style={{ textTransform: "uppercase" }}
                        >
                          {props.package.amount}/Year
                        </h4>
                      ) : (
                        <h4
                          className="text-white"
                          style={{ textTransform: "uppercase" }}
                        >
                          {props.package.amount}/Month
                        </h4>
                      )}
                    </div>
                  </div> */}
                  <div className="card text-center ">
                    <div className="panel panel-default card-input">
                      {/* <div className="card-body user-profile">
                        <div className="media-body user-meta-info"> */}
                      <h4 className="package-name text-uppercase">
                        <b>{props?.package?.name}</b>
                      </h4>

                      <div>
                        <h3>
                          $ {props.package?.amount}
                          {props.package?.type === "yearly_subscription" ? (
                            <>/Yr</>
                          ) : (
                            <>/Mo</>
                          )}
                        </h3>
                      </div>
                      {/* <h3>
                                <b>$ {item.amount}/Yr</b>
                              </h3> */}
                      {/* <p className="text-black">
                        Unlimited Stores
                        <br />
                        Unlimited NFT's
                        <br />
                        Unlimited Pages
                        <br />
                      </p> */}

                      {/* <b>
                                {item.features.map((values, index) => (
                                  <p>{values.value}</p>
                                ))}
                              </b> */}

                      {/* <p className="text-black">{props.package.description}</p> */}
                    </div>
                  </div>
                </Card.Text>
                <div className="text-center">
                  <ButtonGroup>
                    {/* <Button variant="primary" onClick={"./change-packages"}>
                      Upgrade Now
                    </Button> */}
                    {/* <Link
                    className="btn my-2 btn-primary btn-lg px-4"
                    to="/change-packages"
                  >
                    <i className="fa fa-usd"></i> Upgrade Now
                  </Link> */}
                    <Link
                      className="btn my-2 btn-primary btn-lg px-4 "
                      to="/change-packages"
                      style={{ border: ".1rem solid #fff" }}
                    >
                      Change Package
                    </Link>
                    {/* <Button variant="primary" onClick={"./change-packages"}>
                      
                    </Button> */}
                    {/* <Button variant="primary">3</Button>
                <Button variant="primary">4</Button> */}
                  </ButtonGroup>
                </div>
              </Card.Body>

              {/* <Button variant="primary">Upgrade Now</Button>
              <Button variant="info">Change Package</Button> */}
            </Card>
          </Col>
        </Row>
      </Fragment>

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Billing History</h4>
        </div>
        <div className="card-body">
          {data.length > 0 ? (
            <div className="table-responsive">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              {props.billingstatus ? (
                <table {...getTableProps()} className="table dataTable display">
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                            {column.canFilter ? column.render("Filter") : null}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()} className="">
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()}>
                                {" "}
                                {cell.render("Cell")}{" "}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h6 style={{ color: "#f26363", textAlign: "center" }}>
                  You Don't have any Billing History
                </h6>
              )}
              <div className="d-flex justify-content-between">
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                  {""}
                </span>
                <span className="table-index">
                  Go to page :{" "}
                  <input
                    type="number"
                    className="ml-2"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(pageNumber);
                    }}
                  />
                </span>
              </div>
              <div className="text-center">
                <div className="filter-pagination  mt-3">
                  <button
                    className=" previous-button"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {"<<"}
                  </button>

                  <button
                    className="previous-button"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous
                  </button>
                  <button
                    className="next-button"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                  <button
                    className=" next-button"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {">>"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <center>
              <h4>You Don't have any Billing History</h4>
            </center>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    current: state.billings.billing.currentBill,
    billing: state.billings.billing.billings,
    billingstatus: state.billings.billinggetSuccess,
    client: state.auth.auth,
    package: state.packages.currentpackage,
    packagestatus: state.auth.auth.isFreePackageClient,
    endingdate: state.auth.auth.freePackageEndingDate,
    startingdate: state.auth.auth.freePackageStartingDate,
  };
};
export default connect(mapStateToProps)(BillingHistory);
