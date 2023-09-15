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
import { Link, useHistory } from "react-router-dom";
import { ChangeClientStatus, GetClients } from "utils/axios/requestHandler";
import { NotificationManager } from "components/common/react-notifications";
import { updateClientAction } from "redux/actions";
import { connect } from "react-redux";



// import IntlMessages from 'helpers/IntlMessages';
const Data=[
    {id:"1",
    customername:"sts", client:"User1", number_of_nfts:"10",amount_spend:"1000"},
    {id:"2",
    customername:"tijo",client:"User2", number_of_nfts:"20",amount_spend:"2000"},
]
const CustomerDetails = ({
  match,
 
  clients,

}) => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, seteditModalOpen] = useState(false);

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
                        {
                          cell.value
                        }

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
        Header: "Customer name",
        accessor: "customername",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "Under By Client",
        accessor: "client",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },
      
      {
        Header: "Number Of NFT's",
        accessor: "number_of_nfts",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Amount Spend",
        accessor: "amount_spend",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      }
    ],
    []
  );

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.customers" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Customers</CardTitle>
            
              <Table columns={cols} data={Data} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  const {
    
    clients,
   
  } = adminData;
  return {
    
    clients,
    
  };
};

export default connect(mapStateToProps, {
  updateClientAction,
})(CustomerDetails);
