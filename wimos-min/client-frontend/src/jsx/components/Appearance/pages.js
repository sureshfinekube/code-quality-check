import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  PageGetAction,
  loadingToggleAction,
  PageDeleteAction,
  PageEditAction,
} from "../../../store/actions/PageAction";
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
import { useHistory } from "react-router-dom";

const Pages = (props) => {
  //const [status, setStatus] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(PageGetAction(props.storeid));
  }, []);
  let history = useHistory();

  const StatusChange = (e, data) => {
    // console.log(data);
    const Data = {
      storeId: data.storeId,
      pageId: data.id,
      name: data.name,
      title: data.title,
      content: data.content,
      status: e.target.checked,
    };
    dispatch(loadingToggleAction(true));
    dispatch(PageEditAction(Data, props.storeid, history));
  };
  const [deleteModal, SetDeleteModal] = useState(false);
  const [idNum, SetIdNum] = useState("");
  const [btnLoader, SetBtnLoader] = useState(false);

  const DeletePage = (id) => {
    SetDeleteModal(true);
    SetIdNum(id);
  };

  const DeletePages = (id) => {
    SetBtnLoader(true);
    const pageid = {
      pageId: idNum,
    };
    dispatch(loadingToggleAction(true));
    dispatch(
      PageDeleteAction(pageid, props.storeid, SetBtnLoader, SetDeleteModal)
    );
  };

  const data = useMemo(() => props.pages || [], [props.pages]);
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
      Header: "Page Title",
      Footer: "Page Title",
      accessor: "name",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Content",
      Footer: "Content",
      accessor: "content",
      Cell: (props) => {
        let rmcontent = props.value.replace(/<[^>]+>/g, "");
        let content = rmcontent.replaceAll("&nbsp;", " ");
        return <>{content}</>;
      },
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
                pathname: `/pages-edit-${props.cell.row.original.id}`,
                state: props.cell.row.original,
              }}
              className="btn btn-warning shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <div
              className="btn btn-danger shadow btn-xs sharp"
              onClick={() => DeletePage(props.cell.row.original.id)}
            >
              <i className="fa fa-trash"></i>
            </div>
          </div>
        );
      },
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "View Status",
      Footer: "View Status",
      accessor: "status",
      Cell: (props) => {
        return (
          <div className="form-check form-switch toggle-switch">
            <input
              className="form-check-input custome"
              type="checkbox"
              checked={props.cell.value}
              onChange={(e) => StatusChange(e, props.cell.row.original)}
              // id="flexSwitchCheckChecked1"
              // defaultChecked
            />
          </div>
        );
      },
      Filter: ColumnFilter,
      disableFilters: true,
    },
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
  return (
    <>
      {/* <PageTitle activeMenu="Pages" motherMenu="Home" /> */}
      <div className="card">
        {/* <div className="card-header">
          <h4 className="card-title">Page List</h4>
        </div> */}
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
                {data.length > 0 ? (
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-6">
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
                      Create Page
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {data.length > 0 ? (
              <div>
                {props.pagegetstatus ? (
                  <table
                    {...getTableProps()}
                    className="table dataTable display"
                    style={{ tableLayout: "fixed" }}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render("Header")}
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
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
                                <td
                                  {...cell.getCellProps()}
                                  className="td-wrap"
                                >
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
                  " "
                )}
              </div>
            ) : (
              <center>
                <h4>Don't have any pages</h4>
              </center>
            )}
            {data.length > 0 ? (
              <div>
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
              ""
            )}
          </div>
        </div>

        {deleteModal ? (
          <Modal className="fade" show={deleteModal}>
            <Modal.Header>
              <Modal.Title>Delete page</Modal.Title>
              {/* <Button
                onClick={() => SetDeleteModal(false)}
                variant=""
                className="btn-close"
              ></Button> */}
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <label className="mb-1">
                    Are you sure want to delete the page ?{" "}
                  </label>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger light"
                onClick={() => SetDeleteModal(false)}
              >
                Close
              </Button>

              {!btnLoader ? (
                <Button variant="primary" onClick={DeletePages}>
                  Confirm
                </Button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
              )}
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeid: state.auth.selectedStore.id,
    pages: state.page.pagesGet.data,
    pagegetstatus: state.page.pagegetSuccess,
    pageid: state.page.pagesGet.data,
  };
};
export default connect(mapStateToProps)(Pages);
