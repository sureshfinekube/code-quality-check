import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { Button } from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { useHistory } from "react-router-dom";
import {
  deleteContractFeatureAction,
  getContractFeaturesAction,
} from "../../../../redux/adminData/actions";
import { NotificationManager } from "components/common/react-notifications";
import { connect } from "react-redux";
import AddContractFeatureModal from "../../../../containers/pages/AddContractFeature";
import EditContractFeatureModal from "../../../../containers/pages/EditContractFeature";

// import IntlMessages from 'helpers/IntlMessages';

const ContractView = ({
  match,

  contractFeatures,
  location,
  deleteContractFeatureAction,
  deleteContractFeaturesSuccess,
  getContractFeaturesAction,
}) => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, seteditModalOpen] = useState({
    openStat: false,
    data: {},
  });

  // console.log("hd", location.state);
  const [contractname] = useState(location.state);
  const Data = contractFeatures.filter(({ type }) => type === contractname);
  useEffect(() => {
    if (deleteContractFeaturesSuccess) {
      getContractFeaturesAction();
      NotificationManager.success(
        "Success",
        "Feature Deleted Successfully",
        3000,
        null,
        null,
        ""
      );
    }
  }, [deleteContractFeaturesSuccess]);
  // const [clients, setClients] = useState([]);

  //   const SwitchHandler = (bool, user) => {
  //     user && updateClientAction({ status: bool, userId: user._id });
  //     // .then(({ status }) => {
  //     //   if (status) {
  //     //     user.status = bool;
  //     //     setClients([...clients]);
  //     //   } else {
  //     //   }
  //     // })
  //     // .catch((err) => {
  //     //   // console.log(err);
  //     // });
  //   };

  const deleteHandler = (id) => {
    deleteContractFeatureAction(id);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function Table({ columns, data, divided = false, defaultPageSize = 8 }) {
    const {
      getTableProps,
      getTableBodyProps,
      prepareRow,
      headerGroups,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: defaultPageSize },
      },
      useSortBy,
      usePagination
    );

    return (
      <>
        <table
          {...getTableProps()}
          className={`r-table table ${classnames({
            "table-divided": divided,
          })}`}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    key={`th_${columnIndex}`}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sorted-desc"
                          : "sorted-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                    <span />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        key={`td_${cellIndex}`}
                        {...cell.getCellProps({
                          className: cell.column.cellClass,
                        })}
                      >
                        {cell.column.Header === "Edit" ? (
                          //   <Switch
                          //     className="custom-switch custom-switch-primary custom-switch-small"
                          //     checked={cell.value}
                          //     onChange={(primary) =>
                          //       SwitchHandler(primary, row.original)
                          //     }
                          //   />

                          <>
                            <div
                              className="align-self-center list-thumbnail-letters rounded-circle"
                              style={{
                                width: "35px",
                                height: "35px",
                                backgroundColor: "#ffc107",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                seteditModalOpen({
                                  openStat: !editmodalOpen.openStat,
                                  data: row.original,
                                })
                              }
                            >
                              <i
                                className="simple-icon-pencil"
                                style={{ fontSize: "16px", color: "#fff" }}
                              ></i>
                            </div>
                          </>
                        ) : cell.column.Header === "Delete" ? (
                          <div
                            className="align-self-center list-thumbnail-letters rounded-circle"
                            style={{
                              width: "35px",
                              height: "35px",
                              backgroundColor: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteHandler(cell.value)}
                          >
                            <i
                              className="simple-icon-trash"
                              style={{ fontSize: "16px", color: "#fff" }}
                            ></i>
                          </div>
                        ) : (
                          cell.value
                        )}

                        {/* {cell.column.Header === "Action" ? (
                          <Switch
                            className="custom-switch custom-switch-primary custom-switch-small"
                            checked={cell.value}
                            onChange={(primary) =>
                              SwitchHandler(primary, row.original)
                            }
                          />
                        ) : cell.column.Header === "Delete" ? (
                          <div className="simple-line-icons">
                            <div className="glyph">
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "22px",
                                  cursor: "pointer",
                                }}
                                className="glyph-icon simple-icon-user-unfollow"
                              />
                            </div>
                          </div>
                        ) : (
                          cell.value
                        )} */}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <DatatablePagination
          page={pageIndex}
          pages={pageCount}
          canPrevious={canPreviousPage}
          canNext={canNextPage}
          pageSizeOptions={[4, 10, 20, 30, 40, 50]}
          showPageSizeOptions={false}
          showPageJump={false}
          defaultPageSize={pageSize}
          onPageChange={(p) => gotoPage(p)}
          onPageSizeChange={(s) => setPageSize(s)}
          paginationMaxSize={pageCount}
        />
      </>
    );
  }

  const cols = React.useMemo(
    () => [
      {
        Header: "Name of feature",
        accessor: "name",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "Description",
        accessor: "description",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "Amount",
        accessor: "amount",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Edit",
        accessor: "",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Delete",
        accessor: "_id",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.contracts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>{contractname} Features</CardTitle>
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => setModalOpen(!modalOpen)}
                style={{ float: "right" }}
              >
                Add New Feature
              </Button>
              <AddContractFeatureModal
                modalOpen={modalOpen}
                toggleModal={() => setModalOpen(!modalOpen)}
                contractname={contractname}
              />
              <EditContractFeatureModal
                modalOpen={editmodalOpen.openStat}
                edittoggleModal={() =>
                  seteditModalOpen({
                    openStat: !editmodalOpen.openStat,
                    data: {},
                  })
                }
                data={editmodalOpen.data}
                contractname={contractname}
              />
              <Table columns={cols} data={Data} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  const { contractFeatures, deleteContractFeaturesSuccess } = adminData;
  return {
    contractFeatures,
    deleteContractFeaturesSuccess,
  };
};

export default connect(mapStateToProps, {
  deleteContractFeatureAction,
  getContractFeaturesAction,
})(ContractView);
