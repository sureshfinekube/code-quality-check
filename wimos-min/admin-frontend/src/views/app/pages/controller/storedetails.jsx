import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { useHistory } from "react-router-dom";
import { updateStoreAction } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";

const StoreDetails = ({ match }) => {
  const history = useHistory();
  const stores = useSelector((state) => state.adminData.stores);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(" store changed", stores);
  // }, [stores]);
  // const [stores, setClients] = useState([]);

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

    const SwitchHandler = (value, storeid) => {
      console.log('here is ok',storeid)
      storeid &&
        dispatch(updateStoreAction({ store_id: storeid, status: value }));
    };

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
                        {cell.column.Header === "Status" ? (
                          <>
                            <Switch
                              className="custom-switch custom-switch-primary custom-switch-small"
                              checked={cell.value}
                              onChange={(primary) =>
                                SwitchHandler(primary, row.original._id)
                              }
                            />
                          </>
                        ) : (
                      
                          cell.value
                        )}
                        
                            {/* <>
                            <div
                              className="align-self-center list-thumbnail-letters rounded-circle"
                              style={{
                               width: "35px",
                               height: "35px",
                               backgroundColor: "#ffc107",
                                cursor: "pointer",
                              }}
                           >
                             <a href={cell.value} target="_blank">
                               <i
                                 className="simple-icon-eye"
                                  style={{ fontSize: "16px", color: "#fff" }}
                               ></i>
                             </a>
                            </div>
                        </> */}

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
        Header: "Store name",
        accessor: "store_name",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "Created By",
        accessor: "username",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "Domain",
        accessor: "store_domain",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Network",
        accessor: "network",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Status",
        accessor: "status",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: "View",
      //   accessor: "store_domain",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      // },
    ],
    []
  );

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.stores" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Stores</CardTitle>

              <Table columns={cols} data={stores} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
// const mapStateToProps = ({ adminData }) => {
//   const { stores } = adminData;
//   return {
//     stores,
//   };
// };

// export default connect(mapStateToProps, { updateStoreAction })(StoreDetails);
export default StoreDetails;
