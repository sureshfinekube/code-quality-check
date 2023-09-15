import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { Row, Card, CardBody, CardTitle, Button } from "reactstrap";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { connect } from "react-redux";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { updatePackageStatusAction } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";
import UpdatePackageModal from "./UpdatePackageModal";

function PackageTable({
  packages,
  onPackagesFetch,
  packagesFetchErr,
  packagesFetchSuccess,
  onUpdatePackageStatus,
  updatePackageStatusErr,
  updatePackageStatusSuccess,
  updatePackageStatusAction,
  updatePackageStatusId,
}) {
  const [updateModalOpen, setUpdateModalOpen] = useState({
    openStat: false,
    data: {},
  });

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

    const SwitchHandler = (value, proId) => {
      updatePackageStatusAction({ packageId: proId, status: value });
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
                        {cell.column.Header === "Action" ? (
                          <>
                            <Switch
                              className="custom-switch custom-switch-primary custom-switch-small"
                              checked={cell.value}
                              onChange={(primary) =>
                                SwitchHandler(primary, row.original._id)
                              }
                            />
                            <Button
                              className="mt-2"
                              type="submit"
                              color="primary"
                              onClick={() => {
                                setUpdateModalOpen({
                                  openStat: !updateModalOpen.openStat,
                                  data: row.original,
                                });
                              }}
                            >
                              Update
                            </Button>
                          </>
                        ) : cell.column.Header === "Subscription Type" ? (
                          cell.value === "yearly_subscription" ? (
                            <>Yearly</>
                          ) : (
                            <>Monthly</>
                          )
                        ) : cell.column.Header === "Product Limit" ? (
                          cell.row.original.unlimited_product ? (
                            <>Unlimited</>
                          ) : (
                            cell.value
                          )
                        ) : cell.column.Header === "Collection Limit" ? (
                          cell.row.original.unlimited_collection ? (
                            <>Unlimited</>
                          ) : (
                            cell.value
                          )
                        ) : (
                          cell.value
                        )}
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
        Header: "Package-Name",
        accessor: "name",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Subscription Type",
        accessor: "type",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Subscription Fee",
        accessor: "amount",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Product Limit",
        accessor: "product_limit",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      //   {
      //     Header: "Page Limit",
      //     accessor: "page_limit",
      //     cellClass: "text-muted w-10",
      //     Cell: (props) => <>{props.value}</>,
      //   },
      {
        Header: "Collection Limit",
        accessor: "collection_limit",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Description",
        accessor: "description",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Action",
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
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Packages</CardTitle>

              <Table columns={cols} data={packages} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <UpdatePackageModal
        modalOpen={updateModalOpen.openStat}
        data={updateModalOpen.data}
        toggleModal={() => setUpdateModalOpen(!updateModalOpen.openStat)}
      />
    </>
  );
}
const mapStateToProps = ({ adminData }) => {
  const {
    packages,
    onPackagesFetch,
    packagesFetchErr,
    packagesFetchSuccess,
    onUpdatePackageStatus,
    updatePackageStatusErr,
    updatePackageStatusSuccess,
    updatePackageStatusId,
  } = adminData;

  return {
    packages,
    onPackagesFetch,
    packagesFetchErr,
    packagesFetchSuccess,
    onUpdatePackageStatus,
    updatePackageStatusErr,
    updatePackageStatusSuccess,
    updatePackageStatusId,
  };
};

export default connect(mapStateToProps, {
  updatePackageStatusAction,
})(PackageTable);
