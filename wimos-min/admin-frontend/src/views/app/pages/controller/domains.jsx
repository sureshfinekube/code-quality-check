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
import { ChangeClientStatus, GetClients } from "utils/axios/requestHandler";
import { NotificationManager } from "components/common/react-notifications";
import { connect } from "react-redux";
import AddDomainModal from '../../../../containers/pages/AddDomainModal';
import EditDomainModal from '../../../../containers/pages/EditDomainModal';


// import IntlMessages from 'helpers/IntlMessages';

const DomainDetails = ({
  match,
 
  domain,

}) => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, seteditModalOpen] = useState(false);
  const [editingDomainData, setEditingDomainData] = useState()
  // const Data=[domain]
  const Data=domain

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

function editModal (row) {
  console.log('dragon-->',row)
  seteditModalOpen(!editmodalOpen)
  setEditingDomainData(row)
}

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

  function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
    console.log('inside-table',data)
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
                        <div className="align-self-center list-thumbnail-letters rounded-circle" 
                          style={{width:"35px",height:"35px", backgroundColor:"#ffc107",cursor:"pointer"}}
                          onClick={() => editModal(row.original)}>
                          <a href= {cell.value} target="_blank" >
                            <i className="simple-icon-pencil" style={{fontSize:"16px",color:"#fff"}}></i>
                          </a>
                        </div>
                        <EditDomainModal
                             modalOpen={editmodalOpen}
                             edittoggleModal={() => seteditModalOpen(!editmodalOpen)}
                             data={editingDomainData}
                        />
                        </>
                        ):
                        cell.column.Header==="Last Updated At"?(<> {formatDate(cell.value)}</>): (
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
        Header: "Domain Name",
        accessor: "domain",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "Last Updated At",
        accessor: "updatedAt",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },
      
      {
        Header: "Edit",
        accessor: "status",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: "Delete",
      //   accessor: "delete",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      // }
    ],
    []
  );

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.domains" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Domains</CardTitle>
              <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => setModalOpen(!modalOpen)}
              style={{float:"right"}}
            >
              Add New Domain
            </Button>
            <AddDomainModal
                modalOpen={modalOpen}
                toggleModal={() => setModalOpen(!modalOpen)}
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
  const {
    
    domain
   
  } = adminData;
  return {
    
    domain
    
  };
};

export default connect(mapStateToProps, {
})(DomainDetails);
