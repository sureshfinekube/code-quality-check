import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  getSliderSection,
  deteteSliderSection,
  loadingToggleAction,
  updateSliderTitle,
  getSliderTitle,
} from "../../../store/actions/AuthActions";
import { ColumnFilter } from "../table/FilteringTable/ColumnFilter";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { GlobalFilter } from "../table/FilteringTable/GlobalFilter";
import PageTitle from "../../layouts/PageTitle";

const StepsArea = (props) => {
  const [sectiontitle, setSectionTitle] = useState(props.sectiontitle?.title);
  const [titleerr, setTitleerr] = useState(false);
  const dispatch = useDispatch();
  const [modalHeading, setmodalHeading] = useState(false);
  //   const handleCreate = ()=>{

  //   }
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(getSliderSection(props.storeid));
  }, []);
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(getSliderTitle(props.storeid));
  }, []);

  const [sectionid, setSectionid] = useState();
  const [deleName, setdeleName] = useState();
  const [modalDelete, setmodalDelete] = useState(false);
  const modalhandleDelete = async (row) => {
    setSectionid(row.id);
    setdeleName(row.header);
    setmodalDelete(true);
  };
  const handleDelete = async (id) => {
    //  console.log(id);
    setmodalDelete(false);
    // console.log("data", cateid);
    dispatch(loadingToggleAction(true));
    dispatch(deteteSliderSection(sectionid, props.storeid));
  };
  const [loader, SetLoader] = useState(false);

  const handleSectionTitle = async () => {
    if (sectiontitle === "") {
      setTitleerr(true);
    } else {
      SetLoader(true);

      setmodalHeading(false);
      const Data = {
        storeId: props.storeid,
        type: "firstSlider",
        title: sectiontitle,
      };
      dispatch(loadingToggleAction(true));
      dispatch(updateSliderTitle(Data, props.storeid, SetLoader));
    }
  };

  //   const StatusChange = (e, data) => {
  //     // console.log(data);
  //     const Data = {
  //       storeId: data.storeId,
  //       pageId: data.id,
  //       name: data.name,
  //       content: data.content,
  //       status: e.target.checked,
  //     };
  //     dispatch(loadingToggleAction(true));
  //     dispatch(PageEditAction(Data, props.storeid));
  //   };

  //   const DeletePage = (id) => {
  //     const pageid = {
  //       pageId: id,
  //     };
  //     dispatch(loadingToggleAction(true));
  //     dispatch(PageDeleteAction(pageid, props.storeid));
  //   };
  //console.log("gvhbnj", props.slidersection);
  const data = useMemo(() => props.slidersection || [], [props.slidersection]);
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
      Header: "Header",
      Footer: "Header",
      accessor: "header",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Title",
      Footer: "Title",
      accessor: "title",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Content",
      Footer: "Content",
      accessor: "description",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Action",
      Footer: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <div className="d-flex">
            <Link
              to={{
                pathname: `section-edit-${props.cell.row.original.id}`,
                state: props.cell.row.original,
              }}
              className="btn btn-warning shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <div
              className="btn btn-danger shadow btn-xs sharp"
              onClick={() => modalhandleDelete(props.cell.row.original)}
            >
              <i className="fa fa-trash"></i>
            </div>
          </div>
        );
      },
      Filter: ColumnFilter,
      disableFilters: true,
    },
    // {
    //   Header: "View Status",
    //   Footer: "View Status",
    //   accessor: "status",
    //   Cell: (props) => {
    //     return (
    //       <div className="form-check form-switch toggle-switch">
    //         <input
    //           className="form-check-input custome"
    //           type="checkbox"
    //           checked={props.cell.value}
    //           // onChange={(e) => StatusChange(e, props.cell.row.original)}
    //           // id="flexSwitchCheckChecked1"
    //           // defaultChecked
    //         />
    //       </div>
    //     );
    //   },
    //   Filter: ColumnFilter,
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

  // console.log("h", data);
  return (
    <>
      {/* <PageTitle activeMenu="Pages" motherMenu="Home" /> */}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Slider Section</h4>
        </div>
        <div className="card-body">
          {/* Comming Soon */}

          {/* <h2 style={{ textAlign: "center", color: "#bd3bb1" }}>
            Coming Soon...
          </h2>
          <p style={{ textAlign: "center" }}>
            {" "}
            You can add pages for your store
          </p> */}

          <div className="table-responsive">
            <div className="row">
              <div className="col-6">
                {data.length > 0 && (
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                )}
              </div>
              <div
                className="col-6"
                // style={{
                //   display: "flex",
                //   alignItems: "end",
                //   justifyContent: "center",
                // }}
              >
                <div className="table-buttons">
                  <Link to="/addnew-section">
                    <Button
                      className="me-2 btn-sm"
                      variant="primary btn-rounded"
                      style={{ marginTop: "10px" }}
                    >
                      <span className="btn-icon-start-sm text-primary">
                        <i className="fa fa-plus" />
                      </span>
                      Add New
                    </Button>
                  </Link>
                </div>
                <div className="table-buttons">
                  <Button
                    className="me-2 btn-sm"
                    variant="primary btn-rounded"
                    onClick={() => setmodalHeading(true)}
                    style={{ marginTop: "10px" }}
                  >
                    <span className="btn-icon-start-sm text-primary">
                      <i className="fas fa-pen" />
                    </span>
                    Slider Section heading
                  </Button>
                </div>
              </div>
              {/* <div className="col-3">
                <div className="table-buttons">
                  <Link to="/PageCreate">
                    <Button
                      className="me-2 btn-sm"
                      variant="primary btn-rounded"
                      style={{ marginTop: "10px" }}
                    >
                      <span className="btn-icon-start-sm text-primary">
                        <i className="fa fa-plus" />
                      </span>
                      Add New
                    </Button>
                  </Link>
                </div>
              </div> */}
            </div>

            {data.length > 0 ? (
              <>
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
              </>
            ) : (
              <center>
                <h4>You don't have any slider section</h4>
                <h6>
                  There is a default sliders in your store if you want to add
                  your own? <br />{" "}
                  <Link to="/addnew-section">
                    <Button
                      className="me-2 btn-sm"
                      variant="primary btn-rounded"
                      style={{ marginTop: "10px" }}
                    >
                      {/* <span className="btn-icon-start-sm text-primary">
                        <i className="fa fa-plus" />
                      </span> */}
                      Add New
                    </Button>
                  </Link>
                </h6>
              </center>
            )}
          </div>
        </div>
      </div>
      {/* Heading text modal */}
      <Modal className="fade" show={modalHeading}>
        <Modal.Header>
          <Modal.Title>Section Heading</Modal.Title>
          <Button
            onClick={() => setmodalHeading(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <label className="mb-1">
                <strong>Section Title</strong>
              </label>
              <input
                type="name"
                className="form-control"
                value={sectiontitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Slider Section Title"
              />
            </div>
            {/* 
            <div className="col-2">
              <label className="mb-1">
                <strong>Status</strong>
              </label>
              <br />
              <br />

              <div className="d-flex align-items-center">
                <div className="form-check form-switch toggle-switch">
                  <input
                    className="form-check-input custome"
                    type="checkbox"
                    id="flexSwitchCheckChecked1"
                    // checked={catstatus}
                    // onChange={() => statusCheck()}
                  />
                </div>
              </div>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setmodalHeading(false)} variant="danger light">
            Close
          </Button>
          {!loader ? (
            <Button variant="primary" onClick={handleSectionTitle}>
              Update
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

      {/* Delete modal */}
      {/* modal delete */}
      <Modal className="fade" show={modalDelete}>
        <Modal.Header>
          <Modal.Title>Delete Section</Modal.Title>
          <Button
            onClick={() => setmodalDelete(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <label className="mb-1">
                Are you sure want to delete the section{" "}
                <strong>{deleName}</strong>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setmodalDelete(false)} variant="danger light">
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(sectionid)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeid: state.auth.selectedStore.id,
    sectiontitle: state.auth.sectiontitle,
    slidersection: state.auth.slidersection,
  };
};
export default connect(mapStateToProps)(StepsArea);
