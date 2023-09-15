import React, { useState, useEffect } from "react";
import { adminRoot } from "constants/defaultValues";
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

import AddStandardModal from '../../../../containers/pages/AddStandardModal';
import EditDomainModal from '../../../../containers/pages/EditDomainModal';
import FeatureData from '../../../../data/featuredata.json'

const Features = ({match,}) => {

  const Data = FeatureData
  const Standard = Data.contracts.standards
  const FilmainData = Standard.filter(function(item){
      return item.name == "erc-721";
   }).map(function({features}){
       return {features};
   });
 
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editmodalOpen, seteditModalOpen] = useState(false);
  const [FilFeatureData, setFilFeatureData] = useState(FilmainData[0].features);

  
 
 const tableChange = (standard) =>{
  //  console.log(standard)
   
  const FilData = Standard.filter(function(item){
    return item.name == standard;
 }).map(function({features}){
     return {features};
 });
 setFilFeatureData(FilData[0].features)
  //  console.log(FeauterMain[0])
 }




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
                        {cell.column.Header === "Actions" ? (
                        //   <Switch
                        //     className="custom-switch custom-switch-primary custom-switch-small"
                        //     checked={cell.value}
                        //     onChange={(primary) =>
                        //       SwitchHandler(primary, row.original)
                        //     }
                        //   />
                        <>
                        <div className="align-self-center list-thumbnail-letters rounded-circle" style={{width:"35px",height:"35px", backgroundColor:"#ffc107",cursor:"pointer"}} onClick={() => seteditModalOpen(!editmodalOpen)}>
                          <a href= {cell.value} target="_blank" >
                            <i className="simple-icon-eye" style={{fontSize:"16px",color:"#fff"}}></i>
                          </a>
                        </div>
                        <EditDomainModal
                             modalOpen={editmodalOpen}
                             toggleModal={() => seteditModalOpen(!editmodalOpen)}
                             data =  {cell.row.original}
                        />
                        </>
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
        Header: "Feature Name",
        accessor: "name",
        cellClass: "list-item-heading w-10",
        Cell: (props) => <>{props.value}</>,
      },

      // {
      //   Header: "Standard",
      //   accessor: "standards",
      //   cellClass: "list-item-heading w-10",
      //   Cell: (props) => <>{props.value}</>,
      // },

      
      
      {
        Header: "Actions",
        accessor: "",
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
          <Breadcrumb heading="menu.features" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Features</CardTitle>
              {
                
              Standard.map((item) => (
                <Button
              color="primary"
              size="sm"
              className="top-right-button"
              onClick={() => tableChange(item.name)}
              style={{float:"left", marginRight:"10px"}}
            >
              {item.name}
            </Button>
              ))
           }
              
             <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => setModalOpen(!modalOpen)}
              style={{float:"right"}}
            >
              Add New Standard
            </Button>
            <AddStandardModal
                modalOpen={modalOpen}
                toggleModal={() => setModalOpen(!modalOpen)}
            />
              <Table columns={cols} data={FilFeatureData} />
              
              <Link to={`${adminRoot}/pages/manage/addfeature`}>
              <Button
              color="primary"
              size="lg"
              className="top-right-button"
              // onClick={() => setModalOpen(!modalOpen)}
              style={{float:"right"}}
            >
              Add New Feature
            </Button>
            </Link>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};


export default Features;
