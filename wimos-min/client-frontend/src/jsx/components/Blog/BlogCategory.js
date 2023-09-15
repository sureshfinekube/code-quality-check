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
  BlogCategoryPostAction,
  BlogCategoryEditAction,
  BlogCategoryDeleteAction,
  BlogCategoryGetAction,
} from "../../../store/actions/BlogActions";
//import MOCK_DATA from "./Mock_Data.json";
// import { COLUMNS } from "./Columns";
import { GlobalFilter } from "../table/FilteringTable/GlobalFilter";
import { Link } from "react-router-dom";
//import './table.css';
import "../table/FilteringTable/filtering.css";
import PageTitle from "../../layouts/PageTitle";
import { useHistory } from "react-router-dom";
import moment from "moment";

export const BlogCategory = (props) => {
  useEffect(() => {
    // console.log("duplesis:", props);
  }, [props]);
  const [blogs, setBlogs] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(BlogCategoryGetAction(props.storeid));
  }, []);
  const history = useHistory();
  const [row, setRow] = useState(props.location.state);
  console.log("blogsCategory", props.blogsCategory);
  const [deleteModal, SetDeleteModal] = useState(false);
  const [idNum, SetIdNum] = useState("");
  const [btnLoader, SetBtnLoader] = useState(false);
  const [editCategoryModal, SetEditCategoryModal] = useState(false);
  const [AddCategoryModal, SetAddCategoryModal] = useState(false);
  const [name, setName] = useState("");
  const [btnLoaderAdd, SetBtnLoadeAdd] = useState(false);
  const [idEdit, SetIdEdit] = useState("");
  const [valueEdit, SetValueEdit] = useState("");

  const [btnLoaderEdit, SetBtnLoaderEdit] = useState(false);

  // const [title, setTitle] = useState(row.title);
  const [errors, SetErrors] = useState(false);

  const AddBlogCategoryCancel = () => {
    SetAddCategoryModal(false);
    setName("");
  };

  const AddBlogCategory = () => {
    SetAddCategoryModal(true);
  };
  const addCatName = (value) => {
    setName(value);
    SetErrors(false);
  };
  const AddBlogCategoryConfrm = () => {
    if (name === "") {
      SetErrors(true);
    } else {
      SetBtnLoadeAdd(true);
      const Data = {
        store_id: props.storeid,
        title: name,
      };
      dispatch(
        BlogCategoryPostAction(
          Data,
          history,
          SetBtnLoadeAdd,
          SetAddCategoryModal,
          props.storeid
        )
      );
    }
  };

  const EditBlogCategory = (value) => {
    SetEditCategoryModal(true);
    SetIdEdit(value?._id);
    SetValueEdit(value?.title);
  };
  const EditBlogCategoryConfrm = () => {
    SetBtnLoaderEdit(true);
    const Data = {
      id: idEdit,
      store_id: props.storeid,
      title: name ? name : valueEdit,
    };
    dispatch(
      BlogCategoryEditAction(
        Data,
        history,
        SetBtnLoaderEdit,
        SetEditCategoryModal,
        props.storeid
      )
    );
  };
  const DeleteBlogCategory = (blogid) => {
    // console.log("id 1 ", blogid);
    SetDeleteModal(true);
    SetIdNum(blogid);
  };

  const DeleteBlogCategoryConfrm = () => {
    // console.log("id 2 ", idNum);

    SetBtnLoader(true);
    dispatch(loadingToggleAction(true));
    dispatch(
      BlogCategoryDeleteAction(
        idNum,
        props.storeid,
        SetBtnLoader,
        SetDeleteModal
      )
    );
  };

  const data = useMemo(() => props.blogsCategory || [], [props.blogsCategory]);

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
      Header: "Name",
      Footer: "Name",
      accessor: "title",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Number of post",
      Footer: "Number of post",
      accessor: "blogs_count",
      Filter: ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Date",
      Footer: "Date",
      accessor: "updatedAt",
      Filter: ColumnFilter,
      Cell: (props) => {
        return moment(props.updatedAt).format("DD MMM YYYY");
      },
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
            {/* <Link
              to={{
                pathname: `/blog-edit-${props.cell.row.original.id}`,
                state: props.cell.row.original,
              }}
              className="btn btn-warning shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pen"></i>
            </Link> */}

            <div
              className="btn btn-warning shadow btn-xs sharp me-1"
              //   style={{ coloe: "yellow" }}
              onClick={() => EditBlogCategory(props.cell.row.original)}
            >
              <i className="fas fa-pen"></i>
            </div>
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
              onClick={() => DeleteBlogCategory(props.cell.row.original._id)}
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
                <div className="table-buttons">
                  {/* <Link to="/create-blog"> */}
                  <Button
                    className="me-2 btn-sm"
                    variant="primary btn-rounded"
                    style={{ marginTop: "10px" }}
                    onClick={AddBlogCategory}
                  >
                    <span className="btn-icon-start-sm text-primary">
                      <i className="fa fa-plus" />
                    </span>
                    Create Blog Category
                  </Button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            {data === "" || data === "undefined" ? (
              <center>
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ fontSize: "20px" }}
                ></i>
              </center>
            ) : data.length > 0 ? (
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
                    Are you sure want to delete the blog category ?{" "}
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
                <Button variant="primary" onClick={DeleteBlogCategoryConfrm}>
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

        {editCategoryModal ? (
          <Modal className="fade" show={editCategoryModal}>
            <Modal.Header>
              <Modal.Title>Edit blog category</Modal.Title>
              {/* <Button
                onClick={() => SetDeleteModal(false)}
                variant=""
                className="btn-close"
              ></Button> */}
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <label className="mb-1">Category name</label>
                  <input
                    type="text"
                    className="form-control input-default "
                    placeholder="Enter category name"
                    required
                    // value={valueEdit}
                    defaultValue={valueEdit}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger light"
                onClick={() => SetEditCategoryModal(false)}
              >
                Close
              </Button>

              {!btnLoaderEdit ? (
                <Button variant="primary" onClick={EditBlogCategoryConfrm}>
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

        {AddCategoryModal ? (
          <Modal className="fade" show={AddCategoryModal}>
            <Modal.Header>
              <Modal.Title>Add blog category</Modal.Title>
              {/* <Button
                onClick={() => SetDeleteModal(false)}
                variant=""
                className="btn-close"
              ></Button> */}
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <label className="mb-1">Category name</label>
                  <input
                    type="text"
                    className="form-control input-default "
                    placeholder="Enter category name"
                    required
                    value={name}
                    onChange={(e) => {
                      addCatName(e.target.value);
                    }}
                  />
                  {errors && (
                    <div className="text-danger fs-12">Title is Required</div>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger light"
                onClick={() => AddBlogCategoryCancel(false)}
              >
                Close
              </Button>

              {!btnLoaderAdd ? (
                <Button variant="primary" onClick={AddBlogCategoryConfrm}>
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
    blogsCategory: state.blog.blogsCategory.data,
    bloggetstatus: state.blog.bloggetSuccess,
  };
};
export default connect(mapStateToProps)(BlogCategory);
