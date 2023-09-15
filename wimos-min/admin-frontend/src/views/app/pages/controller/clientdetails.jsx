import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { useHistory, Link } from "react-router-dom";
import { ChangeClientStatus, GetClients } from "utils/axios/requestHandler";
import { NotificationManager } from "components/common/react-notifications";
import { updateClientAction } from "redux/actions";
import { connect } from "react-redux";

// import IntlMessages from 'helpers/IntlMessages';

const ClientDetails = ({
  match,
  onClientsFetch,
  clientsFetchErr,
  clientsFetchSuccess,
  clients,
  updateClientAction,
  updateClientErr,
  updateClientSuccess,
  updatedClientID,
}) => {
  const history = useHistory();
  // const [clients, setClients] = useState([]);

  const SwitchHandler = (bool, user) => {
    // console.log(bool);
    user && updateClientAction({ clientId: user.id, status: bool });
    // .then(({ status }) => {
    //   if (status) {
    //     user.status = bool;
    //     setClients([...clients]);
    //   } else {
    //   }
    // })
    // .catch((err) => {
    //   // console.log(err);
    // });
  };

  function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
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
                        {cell.column.Header === "Action" ? (
                          <Switch
                            className="custom-switch custom-switch-primary custom-switch-small"
                            checked={cell.value}
                            onChange={(primary) =>
                              SwitchHandler(primary, row.original)
                            }
                          />
                        ) : cell.column.Header === "View" ? (
                          <div
                            className="align-self-center list-thumbnail-letters rounded-circle"
                            style={{
                              width: "25px",
                              height: "25px",
                              backgroundColor: "#ffc107",
                              cursor: "pointer",
                            }}
                          >
                            <Link
                              to={{
                                pathname: `client-${row.original.id}`,
                                state: row.original,
                              }}
                            >
                              <i
                                className="simple-icon-eye"
                                style={{ fontSize: "14px", color: "#fff" }}
                              ></i>
                            </Link>
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
        Header: "Name",
        accessor: "name",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Username",
        accessor: "username",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Email",
        accessor: "email",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Nationality",
        accessor: "nationality",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Action",
        accessor: "status",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "View",
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
          <Breadcrumb heading="menu.clients" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Clients</CardTitle>

              <Table columns={cols} data={clients} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  const {
    onClientsFetch,
    clientsFetchErr,
    clientsFetchSuccess,
    clients,
    updateClientErr,
    updateClientSuccess,
    updatedClientID,
  } = adminData;
  return {
    onClientsFetch,
    clientsFetchErr,
    clientsFetchSuccess,
    clients,
    updateClientErr,
    updateClientSuccess,
    updatedClientID,
  };
};

export default connect(mapStateToProps, {
  updateClientAction,
})(ClientDetails);
