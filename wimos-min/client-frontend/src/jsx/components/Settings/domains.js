import React, { Fragment, useMemo, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import data from "./tableData.js";
import {
  UpdateStoreAction,
  loadingToggleAction,
} from "../../../store/actions/AuthActions";
import PageTitle from "../../layouts/PageTitle";
import { Connect, useDispatch } from "react-redux";

const Domains = (props) => {
  // const [storeData, setStoreData] = useState(props.store);

  // useEffect(() => {
  //   setStoreData(props.store);
  // }, [props.store]);
  const storeData = useMemo(() => props.store || [], [props.store]);
  // console.log("storeData", storeData.store_domain);
  const DomainTable = {
    data: [
      [storeData.store_domain, storeData.activeStatus, storeData.store_domain],
    ],
    columns: ["Domain Name", "Status", "Actions"],
  };
  const tabledata = {
    DomainTable,
  };
  const data = useMemo(() => tabledata || [], [tabledata]);
  //console.log("data", data);
  const [modalDomainEdit, setModalDomainEdit] = useState(false);
  const [modalDomainconfirm, setModalDomainconfirm] = useState(false);
  const [modalDomain, setModalDomain] = useState(false);
  const [modalPrimary, setModalPrimary] = useState(false);
  const [domain, setDoamin] = useState();
  const [domainEdit, setDomainEdit] = useState();
  const [loader, SetLoader] = useState(false);
  const dispatch = useDispatch();
  const [modalCentered, setModalCentered] = useState(false);

  // const sort = 6;
  // let paggination = Array(Math.ceil(data.DomainTable.data.length / sort))
  //   .fill()
  //   .map((_, i) => i + 1);

  // const activePag = useRef(0);
  // const jobData = useRef(
  //   data.DomainTable.data.slice(
  //     activePag.current * sort,
  //     (activePag.current + 1) * sort
  //   )
  // );
  // //const [demo, setdemo] = useState();
  // const onClick = (i) => {
  //   activePag.current = i;

  //   jobData.current = data.DomainTable.data.slice(
  //     activePag.current * sort,
  //     (activePag.current + 1) * sort
  //   );
  //   /* setdemo(
  //     data.DomainTable.data.slice(
  //       activePag.current * sort,
  //       (activePag.current + 1) * sort
  //     )
  //   ); */
  // };

  // console.log("jobData", jobData);
  const onCheck = () => {
    SetLoader(true);

    setModalDomainconfirm(false);
    const formData = new FormData();
    // console.log("domainEdit", domainEdit);
    formData.append("storeId", props.store.id);
    // formData.append("store_name", props.store.store_name);
    // formData.append("store_content", props.store.store_content);
    // formData.append("footerContent", props.store.footerContent);
    // formData.append("bannerHeading", props.store.bannerHeading);
    formData.append(
      "store_domain",
      domainEdit ? domainEdit : props.store.store_domain
    );
    formData.append("type", 3);
    dispatch(loadingToggleAction(true));
    dispatch(
      UpdateStoreAction(formData, props.store.id, SetLoader, setModalCentered)
    );
    setModalDomainEdit(false);
  };

  return (
    <>
      {/* <PageTitle activeMenu="Domains" motherMenu="Home" /> */}
      <div className="col-12">
        <div className="card">
          {/* <div className="card-header">
          <h4 className="card-title">Customers</h4>
        </div> */}
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <div className="table-buttons">
                  {/* <Button
                    className="me-2 btn-sm"
                    variant="primary btn-rounded"
                    onClick={() => setModalPrimary(true)}
                  >
                    <span className="btn-icon-start-sm text-primary">
                      <i className="fa fa-pen" />
                    </span>
                    Change Primary Domain
                  </Button> */}

                  {/* <!-- Modal --> */}
                  <Modal className="fade" show={modalPrimary}>
                    <Modal.Header>
                      <Modal.Title>Set Primary Domain</Modal.Title>
                      <Button
                        onClick={() => setModalPrimary(false)}
                        variant=""
                        className="btn-close"
                      ></Button>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Primary domain is the domain name that's displayed in
                        the address bar while customers browse your store
                        website and see on search engine. Traffic from all your
                        domains will be directed to your primary domain.
                      </p>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option1"
                        defaultChecked
                      />
                      <label className="form-check-label">
                        {props.store.store_domain}
                      </label>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setModalDomain(false)}
                        variant="danger light"
                      >
                        Close
                      </Button>
                      <Button variant="primary">Set Primary Domain</Button>
                    </Modal.Footer>
                  </Modal>

                  {/* <Button
                    className="me-2 btn-sm"
                    variant="primary btn-rounded"
                    onClick={() => setModalDomain(true)}
                  >
                    <span className="btn-icon-start-sm text-primary">
                      <i className="fa fa-plus" />
                    </span>
                    Add Domain
                  </Button> */}
                  {/* <!-- Modal --> */}
                  <Modal className="fade" show={modalDomain}>
                    <Modal.Header>
                      <Modal.Title>Add Existing Domain</Modal.Title>
                      <Button
                        onClick={() => setModalDomain(false)}
                        variant=""
                        className="btn-close"
                      ></Button>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        To connect an existing external domain to your store,
                        you must configure DNS on your domain provider's website
                        before adding the domain also please point to this IP:
                        165.22.210.178
                      </p>
                      <label className="mb-1">
                        <strong>Domain Name</strong>
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        value={domain}
                        onChange={(e) => setDoamin(e.target.value)}
                        placeholder="examble.com"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setModalDomain(false)}
                        variant="danger light"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => setModalDomain(false)}
                        variant="primary"
                      >
                        Add Domain
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal className="fade" show={modalDomainEdit}>
                    <Modal.Header>
                      <Modal.Title>Edit your domain</Modal.Title>
                      <Button
                        onClick={() => setModalDomainEdit(false)}
                        variant=""
                        className="btn-close"
                      ></Button>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        To connect an existing external domain to your store,
                        you must configure DNS on your domain provider's website
                        before adding the domain also please point to this IP:
                        165.22.210.178
                      </p>
                      <label className="mb-1">
                        <strong>Domain Name</strong>
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        defaultValue={props.store.store_domain}
                        onChange={(e) => setDomainEdit(e.target.value)}
                        placeholder="examble.com"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setModalDomainEdit(false)}
                        variant="danger light"
                      >
                        Close
                      </Button>
                      {!loader ? (
                        <Button
                          onClick={() => setModalDomainconfirm(true)}
                          variant="primary"
                        >
                          Edit Domain
                        </Button>
                      ) : (
                        <Button
                          variant="outline-primary"
                          size="lg"
                          // onClick={handleSubmitAnalytics}
                        >
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Button>
                      )}
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    className="fade "
                    show={modalDomainconfirm}
                    centered
                    size="sm"
                  >
                    <Modal.Header>
                      <Modal.Title>Confirm domain chage</Modal.Title>
                      <Button
                        onClick={() => setModalDomainconfirm(false)}
                        variant=""
                        className="btn-close"
                      ></Button>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure to change the domain?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setModalDomainconfirm(false)}
                        variant="danger light"
                      >
                        Close
                      </Button>
                      {!loader ? (
                        <Button onClick={onCheck} variant="primary">
                          Confirm
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
                <table id="example" className="display w-100 dataTable">
                  <thead>
                    <tr role="row">
                      {data.DomainTable.columns.map((d, i) => (
                        <th key={i}>{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.DomainTable.data.map((d, i) => (
                      <tr key={i}>
                        {d.map((da, i) => (
                          <Fragment key={i}>
                            <td>
                              {i === 1 ? (
                                <div className="bootstrap-badge">
                                  {da && (
                                    <div className="badge badge-outline-success badge-rounded">
                                      active
                                    </div>
                                  )}
                                  {!da && (
                                    <div className="badge badge-outline-dark badge-rounded">
                                      inactive
                                    </div>
                                  )}
                                </div>
                              ) : i === 2 ? (
                                <div className="d-flex">
                                  <Link
                                    onClick={() => setModalDomainEdit(true)}
                                    to="#"
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </Link>
                                  {/* <Link 
                                    to="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link> */}
                                  <Link
                                    to={{ pathname: `https://` + da }}
                                    className="btn btn-warning shadow btn-xs sharp"
                                    target="_blank"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                </div>
                              ) : (
                                <>{da}</>
                              )}
                            </td>
                          </Fragment>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  {/* <tfoot>
                  <tr role="row">
                    {data.DomainTable.columns.map((d, i) => (
                      <th key={i}>{d}</th>
                    ))}
                  </tr>
                </tfoot> */}
                </table>

                {/* <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {data.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : data.length}{" "}
                    of {data.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/domains"
                      onClick={() =>
                        activePag.current > 0 && onClick(activePag.current - 1)
                      }
                    >
                      <i
                        className="fa fa-angle-double-left"
                        aria-hidden="true"
                      ></i>
                    </Link>
                    <span>
                      {paggination.map((number, i) => (
                        <Link
                          key={i}
                          to="/domains"
                          className={`paginate_button  ${
                            activePag.current === i ? "current" : ""
                          } `}
                          onClick={() => onClick(i)}
                        >
                          {number}
                        </Link>
                      ))}
                    </span>
                    <Link
                      className="paginate_button next"
                      to="/domains"
                      onClick={() =>
                        activePag.current + 1 < paggination.length &&
                        onClick(activePag.current + 1)
                      }
                    >
                      <i
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    store: state.auth.selectedStore,
  };
};
export default connect(mapStateToProps)(Domains);
