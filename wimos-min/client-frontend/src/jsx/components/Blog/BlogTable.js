import React, { useMemo, useState, useEffect } from "react";
import { ColumnFilter } from "../table/FilteringTable/ColumnFilter";
import { connect, useDispatch } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { Button, Modal } from "react-bootstrap";
//redux
import {
  BlogGetAction,
  loadingToggleAction,
  BlogDeleteAction,
} from "../../../store/actions/BlogActions";
//import MOCK_DATA from "./Mock_Data.json";
// import { COLUMNS } from "./Columns";
import { GlobalFilter } from "../table/FilteringTable/GlobalFilter";
import { Link } from "react-router-dom";
//import './table.css';
import "../table/FilteringTable/filtering.css";
import PageTitle from "../../layouts/PageTitle";

export const BlogTable = (props) => {
  useEffect(() => {
    // console.log("duplesis:", props);
  }, [props]);
  const [blogs, setBlogs] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(BlogGetAction(props.storeid));
  }, []);

  const [deleteModal, SetDeleteModal] = useState(false);
  const [idNum, SetIdNum] = useState("");
  const [btnLoader, SetBtnLoader] = useState(false);

  const DeleteBlog = (blogid) => {
    SetDeleteModal(true);
    SetIdNum(blogid);
  };

  const DeleteBlogs = (blogid) => {
    SetBtnLoader(true);
    dispatch(loadingToggleAction(true));
    dispatch(
      BlogDeleteAction(idNum, props.storeid, SetBtnLoader, SetDeleteModal)
    );
  };

  const data = useMemo(() => props.blogs || [], [props.blogs]);

  // const ChangeStatus = (e) => {
  //   setStatus(e.target.value);
  // };
  // const handleShow = (cell) => {
  //   console.log(cell?.row?.original);
  // };
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
      Header: "Blog Title",
      Footer: "Blog Title",
      accessor: "title",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Description",
      Footer: "Description",
      accessor: "description",
      Filter: ColumnFilter,
      // Cell: ({ row }) => (
      //   <div className="text-wrap" style={{ overflowWrap: "break-word" }}>
      //     {row.original.description}
      //   </div>
      // ),
      disableFilters: true,
    },
    {
      Header: "Meta Tag",
      Footer: "Meta Tag",
      accessor: "metaTags",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Meta Description",
      Footer: "Meta Description",
      accessor: "metaDescription",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    // {
    //   Header: "Last Modified	",
    //   Footer: "Last Modified	",
    //   accessor: "last_modified",
    //   Filter: ColumnFilter,
    //   disableFilters: true,
    // },

    // {
    //   Header: "Status",
    //   Footer: "Status",
    //   accessor: "status",
    //   Cell: (props) => {
    //     return (
    //       <div className="bootstrap-badge">
    //         {props.value && (
    //           <div className="badge badge-outline-success badge-rounded">
    //             On Sale
    //           </div>
    //         )}
    //         {!props.value && (
    //           <div className="badge badge-outline-dark badge-rounded">
    //             Off Sale
    //           </div>
    //         )}
    //       </div>
    //     );
    //   },
    //   Filter: ColumnFilter,
    //   disableFilters: true,
    // },
    {
      Header: "Action",
      Footer: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <div className="d-flex">
            <Link
              to={{
                pathname: `/blog-edit-${props.cell.row.original.id}`,
                state: props.cell.row.original,
              }}
              className="btn btn-warning shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pen"></i>
            </Link>
            {/* <Link
              to={{
                pathname: `/blog-view-${props.cell.row.original.id}`,
                state: props.cell.row.original,
              }}
              className="btn btn-primary shadow btn-xs sharp me-1"
            >
              <i className="fas fa-eye"></i>
            </Link> */}

            <div
              className="btn btn-danger shadow btn-xs sharp"
              onClick={() => DeleteBlog(props.cell.row.original.id)}
            >
              <i className="fa fa-trash"></i>
            </div>
          </div>
        );
      },
      Filter: ColumnFilter,
      disableFilters: true,
    },
  ];
  const columns = useMemo(() => COLUMNS, []);

  //  console.log("data", data[0].id);
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
      {/* <PageTitle activeMenu="Blog" motherMenu="Home" /> */}
      <div className="card">
        {/* <div className="card-header">
          <h4 className="card-title">Blog List</h4>
        </div> */}
        <div className="card-body">
          {/* <h2 style={{ textAlign: "center", color: "#bd3bb1" }}>
            Coming Soon...
          </h2>
          <p style={{ textAlign: "center" }}>
            {" "}
            You can add blogs for your store
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
                <div
                  className="table-buttons"
                  // style={{ marginRight: "-230px", cursor: "pointer" }}
                >
                  <Link to="/blog-category">
                    <Button
                      className="me-2 btn-sm"
                      variant="primary btn-rounded"
                      style={{ marginTop: "10px" }}
                    >
                      <span className="btn-icon-start-sm text-primary">
                        <i className="fa fa-plus" />
                      </span>
                      Manage Blog Category
                    </Button>
                  </Link>
                </div>
                {/* </div>
              <div className="col-4"> */}
                <div className="table-buttons">
                  <Link to="/create-blog">
                    <Button
                      className="me-2 btn-sm"
                      variant="primary btn-rounded"
                      style={{ marginTop: "10px" }}
                    >
                      <span className="btn-icon-start-sm text-primary">
                        <i className="fa fa-plus" />
                      </span>
                      Create Blog
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {data.length > 0 ? (
              <div>
                {props.bloggetstatus ? (
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
                          <tr
                            {...row.getRowProps()}
                            // style={{ wordWrap: "break-word" }}
                          >
                            {row.cells.map((cell) => {
                              //  console.log("hihirow", cell);

                              return (
                                <td
                                  {...cell.getCellProps()}
                                  // style={{ overflowWrap: "break-word" }}
                                  className="td-wrap"
                                >
                                  {" "}
                                  {Array.isArray(cell?.value)
                                    ? cell.value.toString()
                                    : cell.render("Cell")}{" "}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <center>
                <h4>Don't have any blogs</h4>
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
              <Modal.Title>Delete blog</Modal.Title>
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
                    Are you sure want to delete the blog ?{" "}
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
                <Button variant="primary" onClick={DeleteBlogs}>
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
    blogs: state.blog.blogs.data,
    bloggetstatus: state.blog.bloggetSuccess,
  };
};
export default connect(mapStateToProps)(BlogTable);
