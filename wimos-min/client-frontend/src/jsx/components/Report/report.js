import React, { useMemo, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ColumnFilter } from "../table/FilteringTable/ColumnFilter";
import { SelectFilter } from "../table/FilteringTable/SelectFilter";
import moment from "moment";
// import PageTitle from "../../../layouts/PageTitle";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
// import MOCK_DATA from "./MOCK_DATA_2.json";
// import { COLUMNS } from "./Columns";
import { GlobalFilter } from "../table/FilteringTable/GlobalFilter";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import './table.css';
import "../table/FilteringTable/filtering.css";
import PageTitle from "../../layouts/PageTitle";
import { connect, useDispatch } from "react-redux";
import { useIPFS } from "../../../hooks/useIPFS";
import {
  GetUserNftAction,
  loadingToggleAction,
  // GetAllStoreNftAction,
} from "../../../store/actions/UserAction";

export const Report = (props) => {
  // const [row, setRow] = useState(props.location.state);
  const [rowdata, setRowdata] = useState(props.data);
  //   console.log("123456789", props.reportData.reports);
  // const user = props.getUser;
  const dispatch = useDispatch();
  const [modalCreate, setmodalCreate] = useState(false);

  useEffect(() => {
    // console.log("bhjnk", props.getUser);
    dispatch(loadingToggleAction(true));
    dispatch(GetUserNftAction(rowdata.id, props.getUser));
  }, [rowdata]);
  const myNft = props.userNftData;
  // console.log("page", props.userNftData);
  // const [modalCreate, setmodalCreate] = useState(false);
  // const dispatch = useDispatch();

  // const [catname, setCatName] = useState();

  //   console.log("daaaa", props.reportData?.reports);

  //   const data = useMemo(() => NFTTokenIds || [], [NFTTokenIds]);
  //  let posts.filter((post) => post.tags.map((t) => t.slug).includes(tag));
  //   let dataReport = props.reportData?.reports.filter((post) =>
  //     post.type.map((t) => t.id).includes(type === "nft")
  //   );
  const [userReport, setUserReport] = useState();
  const [newData, setNewData] = useState();

  useEffect(() => {
    console.log("newData----use", newData);
  }, [newData]);
  useEffect(() => {
    setUserReport(
      props.reportData?.reports.filter((obj) => obj.type === "user")
    );
  }, []);

  const data = useMemo(() => userReport || [], [userReport]);

  //   console.log("data", data);
  // useEffect(() => {
  //   dispatch(loadingToggleAction(true));
  //   dispatch(GetAllStoreNftAction());
  // }, []);

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
    },
    // {
    //   Header: "Id",
    //   Footer: "Id",
    //   accessor: "id",
    //   Filter: ColumnFilter,
    //   disableFilters: true,
    // },
    // {
    //   Header: "NFT",
    //   Footer: "NFT",
    //   accessor: "image",
    //   Filter: ColumnFilter,
    //   Cell: ({ value }) => {
    //     return <img src={value} className="img-fluid nft-image" />;
    //   },
    //   disableFilters: true,
    // },
    {
      Header: "Reason",
      Footer: "NFT Name",
      accessor: "subject",
      Filter: ColumnFilter,
    },
    {
      Header: "Message",
      Footer: "Message",
      accessor: "message",
      Filter: SelectFilter,
    },
    {
      Header: "Report On",
      Footer: "Report On",
      accessor: "createdAt",
      Filter: ColumnFilter,
      Cell: (props) => {
        return moment(props.createdAt).format("DD MMM YYYY");
      },
    },

    // {
    //   Header: "Category",
    //   Footer: "Category",
    //   accessor: "category_name",
    //   Filter: SelectFilter,
    // },
    {
      Header: "User",
      Footer: "User",
      accessor: "reportingUserData.name",
      Filter: ColumnFilter,
    },
    // {
    //   Header: "Collection",
    //   Footer: "Collection",
    //   accessor: "collectionName",
    //   Filter: ColumnFilter,
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
                pathname: `/edit-nft-${props.cell.row.original.id}`,
                state: props.cell.row.original,
              }}
              className="btn btn-warning shadow btn-xs sharp me-1"
            >
              <i className="fas fa-pen"></i>
            </Link> */}
            <div
              onClick={() => setmodalCreate(true)}
              onChange={setNewData(props.cell.row.original)}
              // to={{
              //   pathname: `/view-nft-${props.cell.row.original.id}`,
              //   state: props.cell.row.original,
              // }}
              className="btn btn-primary shadow btn-xs sharp me-1"
            >
              <i className="fas fa-eye"></i>
            </div>

            {/* <Link to="#" className="btn btn-danger shadow btn-xs sharp">
              <i className="fa fa-trash"></i>
            </Link> */}
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

  // const statusCheck = () => {
  //   if (catstatus === true) {
  //     setCatStatus(false);
  //   } else {
  //     setCatStatus(true);
  //   }getUser
  // };
  console.log("newData++++++", newData);
  // console.log("getUser++++++", props.getUser);

  return (
    <>
      {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
      {/* <PageTitle activeMenu="NFT" motherMenu="Home" /> */}
      {data.length > 0 ? (
        <div className="table-responsive">
          <div className="row">
            {/* <div className="col-6">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div> */}
            <div>
              <h5>
                {" "}
                Total reports <b>{data.length}</b>
              </h5>
            </div>
            {/* <div className="col-6">
                <div className="table-buttons">
                  <Link to="/create-nft">
                    <Button
                      className="me-2 btn-sm"
                      variant="primary btn-rounded"
                      style={{ marginTop: "10px" }}
                    >
                      <span className="btn-icon-start-sm text-primary">
                        <i className="fa fa-plus" />
                      </span>
                      Create NFT
                    </Button>
                  </Link>
                </div>
              </div> */}
          </div>
          {data ? (
            <table {...getTableProps()} className="table dataTable display">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {/* {column.canFilter ? column.render("Filter") : null} */}
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
            " "
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
          <h4>Don't have any reports</h4>
        </center>
      )}

      {/* // View Model*/}

      <Modal className="fade" show={modalCreate}>
        <Modal.Header>
          <Modal.Title>Report Detail</Modal.Title>
          <Button
            onClick={() => setmodalCreate(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <label className="mb-1">
            <strong>Reason</strong>
          </label>
          <p>{newData?.subject}</p>
          {/* <input
            value={newData?.subject}
            type="name"
            className="form-control"
            placeholder="Reason"
          /> */}
          <div className="row">
            <div className="col-6">
              <label className="mb-1">
                <strong>User</strong>
              </label>
              <p>{newData?.reportingUserData?.name}</p>
              {/* <input
                value={newData?.reportingUserData?.name}
                type="name"
                className="form-control"
                placeholder="Reason"
              /> */}
            </div>{" "}
            <div className="col-6">
              <label className="mb-1">
                <strong>Report On</strong>
              </label>
              <p>{moment(newData?.createdAt).format("DD MMM YYYY")}</p>
              {/* <input
                value={moment(newData?.createdAt).format("DD MMM YYYY")}
                type="name"
                className="form-control"
                placeholder="Report On"
              /> */}
            </div>
          </div>
          <br />
          <label className="mb-1">
            <strong>Message</strong>
          </label>
          <p>{newData?.message}</p>
          {/* <textarea
            value={newData?.message}
            type="name"
            className="form-control"
            placeholder="Message"
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setmodalCreate(false)} variant="danger light">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.user.getUserId,
    userNftData: state.user.getUserNft,
    // allStoreNft: state.user.getAllStoreNft,
    getUser: state.auth.selectedStore.store_domain,
    reportData: state.auth.reports.data,
    getAllUsers: state.user.getUser,
  };
};
export default connect(mapStateToProps)(Report);
