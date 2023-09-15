import React, { useMemo, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ColumnFilter } from "../table/FilteringTable/ColumnFilter";
import { SelectFilter } from "../table/FilteringTable/SelectFilter";
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
import moment from "moment";
import {
  GetSocialMedia,
  AddSocialMedia,
  UpdateSocialMedia,
  DeleteSocialMedia,
} from "../../../store/actions/AuthActions";

export const SocialMedia = (props) => {
  // const [row, setRow] = useState(props.location.state);
  const [rowdata, setRowdata] = useState(props.data);
  const [AddSocailModal, SetAddSocialModal] = useState(false);
  const [editSocailModal, SetEditSocialModal] = useState(false);
  const [deleteSocailModal, SetDeleteSocialModal] = useState(false);

  const [btnLoaderAdd, SetBtnLoadeAdd] = useState(false);
  const [btnLoaderEdit, SetBtnLoadeEdit] = useState(false);
  const [btnLoaderDelete, SetBtnLoadeDelete] = useState(false);
  const [errorCheckName, SetErrorCheckName] = useState(false);
  const [errorCheckLink, SetErrorCheckLink] = useState(false);
  const [errorCheckLogo, SetErrorCheckLogo] = useState(false);

  const [addName, SetAddName] = useState("");
  const [editName, SetEditName] = useState("");
  const [editLink, SetEditLink] = useState("");
  const [editLogo, SetEditLogo] = useState("");
  const [editid, SetEditID] = useState("");
  const [idSocial, SetIdSocial] = useState("");
  const [newName, SetNewName] = useState("");
  const [newLink, SetNewLink] = useState("");

  const [addLink, SetAddLink] = useState("");

  // console.log("socailMediaGet", props.socailMediaGet.data.socialMedias);
  // const user = props.getUser;
  const dispatch = useDispatch();

  useEffect(async () => {
    // console.log("bhjnk", props.store);
    dispatch(loadingToggleAction(true));
    dispatch(GetSocialMedia(props.store?.id));
  }, []);
  const handlerAddSocialClose = () => {
    handlerAddSocialModal(false);
    SetAddLink("");
    SetAddName("");
    setFavImage("");
    setNewImage("");
    SetEditLogo("");
    SetEditID("");
  };

  const handlerAddSocialModal = () => {
    SetAddSocialModal(false);
    SetBtnLoadeAdd(false);
    // SetAddLink("");
    // SetAddName("");
    // setFavImage("");
    // setNewImage("");
    // SetEditLogo("");
    // SetEditID("");
  };

  const handlerAddSocial = () => {
    if (addName === "") {
      SetErrorCheckName(true);
    } else if (addLink === "") {
      SetErrorCheckLink(true);
    } else if (favimage.raw === "") {
      SetErrorCheckLogo(true);
    } else {
      SetBtnLoadeAdd(true);
      SetErrorCheckName(false);
      SetErrorCheckLink(false);
      SetErrorCheckLogo(false);

      const formData = new FormData();
      formData.append("storeId", props.store.id);
      formData.append("name", addName);
      formData.append("link", addLink);
      formData.append("image", favimage.raw);
      dispatch(loadingToggleAction(true));
      
      dispatch(
        AddSocialMedia(
          formData,
          props.store?.id,
          SetBtnLoadeAdd,
          SetAddSocialModal,
          SetAddName,
          SetAddLink,
          setFavImage
        )
      );

    }
  };

  const handlerEditSocial = () => {
    SetBtnLoadeEdit(true);
    const formData = new FormData();
    formData.append("storeId", props.store.id);
    formData.append("name", newName ? newName : editName);
    formData.append("link", newLink ? newLink : editLink);
    formData.append("image", newimage.raw ? newimage.raw : favimage.raw);
    formData.append("id", editid);
    dispatch(loadingToggleAction(true));
    dispatch(
      UpdateSocialMedia(
        formData,
        props.store?.id,
        SetBtnLoadeEdit,
        SetEditSocialModal
      )
    );
  };
  const DeleteSocial = (id) => {
    handleSocialMediaDelete(true);
    SetIdSocial(id);
  };
  const DeleteSocialConfrm = () => {
    SetBtnLoadeDelete(true);
    const Data = {
      storeId: props.store?.id,
      id: idSocial,
    };
    dispatch(loadingToggleAction(true));
    dispatch(
      DeleteSocialMedia(
        Data,
        props.store?.id,
        SetBtnLoadeDelete,
        SetDeleteSocialModal
      )
    );
  };

  //   useEffect(() => {
  //     // console.log("bhjnk", props.getUser);
  //     dispatch(loadingToggleAction(true));
  //     dispatch(GetUserNftAction(rowdata.id, props.getUser));
  //   }, [rowdata]);

  const handleSocialMedia = () => {
    SetAddSocialModal(true);
  };
  const handleSocialMediaEdit = (id) => {
    SetEditSocialModal(true);
    SetEditName(id?.name === undefined ? "" : id?.name);
    SetEditLogo(id?.image === undefined ? "" : id?.image);
    SetEditLink(id?.link === undefined ? "" : id?.link);
    SetEditID(id?.id === undefined ? "" : id?.id);
  };
  const handleSocialMediaDelete = () => {
    SetDeleteSocialModal(true);
  };
  const [favError, setFaverror] = useState(false);
  const [favErroredit, setFaverrorEdit] = useState(false);

  const [favimage, setFavImage] = useState({
    preview: "",
    raw: "",
    currentPreview: "",
  });

  const [newimage, setNewImage] = useState({
    preview: "",
    raw: "",
    currentPreview: "",
  });
  const [editfavimage, setEditFavImage] = useState({
    preview: props.socailMediaGet?.data?.socialMedias?.image,
    raw: "",
    currentPreview: "",
  });
  console.log("favimage", favimage);
  console.log("newimage", newimage);

  const handleAddName = (value) => {
    SetAddName(value);
    SetErrorCheckName(false);
  };
  const handleAddLink = (value) => {
    SetAddLink(value);
    SetErrorCheckLink(false);
  };
  const favChangeEdit = (e) => {
    //console.log("file", e.target.files);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/x-icon",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setFaverrorEdit(true);
      } else {
        //console.log("false");
        setFaverrorEdit(false);
        if (e.target.files && e.target.files.length > 0) {
          setEditFavImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };
  const favChange = (e) => {
    SetErrorCheckLogo(false);

    //console.log("file", e.target.files);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/x-icon",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setFaverror(true);
      } else {
        //console.log("false");
        setFaverror(false);
        if (e.target.files && e.target.files.length > 0) {
          setFavImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };
  const favNewChange = (e) => {
    //console.log("file", e.target.files);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/x-icon",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setFaverror(true);
      } else {
        //console.log("false");
        setFaverror(false);
        if (e.target.files && e.target.files.length > 0) {
          setNewImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };

  const myNft = props.userNftData;

  // console.log("editLogo", editLogo);

  const data = useMemo(
    () => props.socailMediaGet?.data?.socialMedias || [],
    [props.socailMediaGet?.data?.socialMedias]
  );

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

    {
      Header: "Logo",
      Footer: "Logo",
      accessor: "image",
      Filter: ColumnFilter,
      Cell: ({ value }) => {
        return (
          <img
            // src={value}
            src={
              "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
              props.store.id +
              "/" +
              value
            }
            className="img-fluid nft-image"
          />
        );
      },
      disableFilters: true,
    },
    {
      Header: "Name",
      Footer: "Name",
      accessor: "name",
      Filter: ColumnFilter,
    },
    {
      Header: "Link",
      Footer: "Link",
      accessor: "link",
      Filter: ColumnFilter,
    },
    {
      Header: "Created On",
      Footer: "Created On",
      accessor: "updatedAt",
      Filter: ColumnFilter,
      Cell: (props) => {
        return moment(props.updatedAt).format("DD MMM YYYY");
      },
    },

    {
      Header: "Action",
      Footer: "Action",
      accessor: "action",
      Cell: (props) => {
        return (
          <div className="d-flex">
            <div
              className="btn btn-warning shadow btn-xs sharp me-1"
              onClick={() => handleSocialMediaEdit(props.cell.row.original)}
            >
              <i className="fas fa-pen"></i>
            </div>
            <div
              className="btn btn-danger shadow btn-xs sharp"
              onClick={() => DeleteSocial(props.cell.row.original.id)}
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
      {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
      {/* <PageTitle activeMenu="NFT" motherMenu="Home" /> */}

      <div className="table-responsive">
        <h3>Social Media</h3>
        <div className="row">
          <div className="col-6">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <div className="col-6">
            <div className="table-buttons">
              <Button
                className="me-2 btn-sm"
                variant="primary btn-rounded"
                style={{ marginTop: "10px" }}
                onClick={handleSocialMedia}
              >
                <span className="btn-icon-start-sm text-primary">
                  <i className="fa fa-plus" />
                </span>
                Manage Social Media{" "}
              </Button>
            </div>
          </div>
        </div>

        {data.length > 0 ? (
          <>
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
          </>
        ) : data === "" || data === undefined ? (
          <center>
            <i
              className="fas fa-spinner fa-spin"
              style={{ fontSize: "20px" }}
            ></i>
          </center>
        ) : data.length === 0 ? (
          <center>
            <br />
            <h4>Don't have any social media's</h4>
          </center>
        ) : (
          ""
        )}
      </div>
      {/* ) : (
        <center>
          <h4>Don't have any NFT's</h4>
        </center>
      )} */}

      {/* add */}
      {AddSocailModal ? (
        <Modal className="fade" show={AddSocailModal}>
          <Modal.Header>
            <Modal.Title>Add Social Media Links</Modal.Title>
            {/* <Button
                onClick={() => SetDeleteModal(false)}
                variant=""
                className="btn-close"
              ></Button> */}
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <label className="mb-1">Social media name</label>
                <input
                  type="text"
                  className="form-control input-default "
                  placeholder="Enter social media name"
                  required
                  onChange={(e) => {
                    handleAddName(e.target.value);
                  }}
                />
                {errorCheckName && (
                  <h7 style={{ color: "red" }}>
                    Social media name is Required
                  </h7>
                )}
                <br />
                <label className="mb-1">Social media links</label>
                <input
                  type="text"
                  className="form-control input-default "
                  placeholder="https://www.facebook.com/"
                  required
                  onChange={(e) => {
                    handleAddLink(e.target.value);
                  }}
                />
                <h7 style={{ color: "red" }}>
                  Link should be with <b>http</b> or <b>https</b>{" "}
                </h7>
                {errorCheckLink && (
                  <h7 style={{ color: "red" }}>
                    Social media links is Required
                  </h7>
                )}
                <br /> <br />
                <label className="mb-1">Social media logo</label>
                <label
                  className="bold-label"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#bd3bb1" }}>
                    (Resolution 32 × 32)
                  </span>
                </label>
                <label htmlFor="upload-button1" className="upload-button">
                  {favimage.preview !== "false" &&
                  favimage.preview === "undefined" ? (
                    <img
                      src={
                        "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                        props.store.id +
                        "/" +
                        favimage.preview
                      }
                      // src={favimage.preview}
                      alt="fav images"
                      className="image-preview"
                    />
                  ) : favimage.currentPreview !== "" ? (
                    <img
                      src={favimage.currentPreview}
                      // src={
                      //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                      // }
                      // src={logoimage.preview}
                      alt="favimage"
                      className="image-preview"
                    />
                  ) : (
                    <div className="upload-themeimage">
                      <span className="fa-stack fa-2x mt-3 mb-2">
                        <i
                          className="fas fa-circle fa-stack-2x"
                          style={{ color: "#bd3bb1" }}
                        />
                        <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                      </span>
                      <p className="text-center">UPLOAD</p>
                      {/* <p className="text-center">UPLOAD</p> */}
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="upload-button1"
                  style={{ display: "none" }}
                  onChange={favChange}
                />
                <br />
                {errorCheckLogo && (
                  <h7 style={{ color: "red" }}>
                    Social media icon is Required
                  </h7>
                )}
                {favError && (
                  <p style={{ color: "red" }}>
                    {" "}
                    Not accepted this format. available only JPG, PNG, ICO, SVG
                    formats
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger light"
              onClick={() => handlerAddSocialModal(false)}
            >
              Close
            </Button>

            {!btnLoaderAdd ? (
              <Button variant="primary" onClick={handlerAddSocial}>
                Add
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

      {/* edit */}
      {editSocailModal ? (
        <Modal className="fade" show={editSocailModal}>
          <Modal.Header>
            <Modal.Title>Update Social Media Links</Modal.Title>
            {/* <Button
                onClick={() => SetDeleteModal(false)}
                variant=""
                className="btn-close"
              ></Button> */}
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <label className="mb-1">Social media name</label>
                <input
                  type="text"
                  className="form-control input-default "
                  placeholder="Enter social media name"
                  required
                  defaultValue={editName}
                  onChange={(e) => {
                    SetNewName(e.target.value);
                  }}
                />
                <br />
                <label className="mb-1">Social media links</label>
                <input
                  type="text"
                  className="form-control input-default "
                  placeholder="Enter social media links"
                  required
                  defaultValue={editLink}
                  onChange={(e) => {
                    SetNewLink(e.target.value);
                  }}
                />
                <br />
                <label className="mb-1">Social media logo</label>
                <label
                  className="bold-label"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#bd3bb1" }}>
                    (Resolution 32 × 32)
                  </span>
                </label>
                <label htmlFor="upload-button1" className="upload-button">
                  {editLogo !== "false" && newimage.currentPreview === "" ? (
                    <img
                      src={
                        "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                        props.store.id +
                        "/" +
                        editLogo
                      }
                      // src={favimage.preview}
                      alt="fav image"
                      className="image-preview"
                    />
                  ) : newimage.currentPreview !== "" &&
                    newimage.preview === "false" ? (
                    <img
                      src={newimage.currentPreview}
                      // src={
                      //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                      // }
                      // src={logoimage.preview}
                      alt="favimage"
                      className="image-preview"
                    />
                  ) : (
                    <div className="upload-themeimage">
                      <span className="fa-stack fa-2x mt-3 mb-2">
                        <i
                          className="fas fa-circle fa-stack-2x"
                          style={{ color: "#bd3bb1" }}
                        />
                        <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                      </span>
                      <p className="text-center">UPLOAD</p>
                      {/* <p className="text-center">UPLOAD</p> */}
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="upload-button1"
                  style={{ display: "none" }}
                  onChange={favNewChange}
                />
                <br />
                {favErroredit && (
                  <p style={{ color: "red" }}>
                    {" "}
                    Not accepted this format. available only JPG, PNG, ICO, SVG
                    formats
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger light"
              onClick={() => SetEditSocialModal(false)}
            >
              Close
            </Button>

            {!btnLoaderEdit ? (
              <Button variant="primary" onClick={handlerEditSocial}>
                Add
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

      {/* delte*/}
      {deleteSocailModal ? (
        <Modal className="fade" show={deleteSocailModal}>
          <Modal.Header>
            <Modal.Title>Delete Social Media</Modal.Title>
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
                  Are you sure want to delete the social media ?{" "}
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger light"
              onClick={() => SetDeleteSocialModal(false)}
            >
              Close
            </Button>

            {!btnLoaderDelete ? (
              <Button variant="primary" onClick={DeleteSocialConfrm}>
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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.user.getUserId,
    userNftData: state.user.getUserNft,
    showLoading: state.user.showLoading,
    store: state.auth.selectedStore,
    // allStoreNft: state.user.getAllStoreNft,
    getUser: state.auth.selectedStore.store_domain,
    socailMediaGet: state.auth.GetsocialMedia,
  };
};
export default connect(mapStateToProps)(SocialMedia);
