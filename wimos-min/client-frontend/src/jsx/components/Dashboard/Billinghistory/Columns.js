import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
import { Link } from "react-router-dom";
export const COLUMNS = [
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
    Header: "Date",
    Footer: "Date",
    accessor: "updated_on",
    Filter: ColumnFilter,
  },
  {
    Header: "Mode Of Payment",
    Footer: "Mode Of Payment",
    accessor: "mode",
    Filter: ColumnFilter,
  },

  {
    Header: "Amount",
    Footer: "Amount",
    accessor: "amount",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/mm/yyyy");
    // },
    Filter: ColumnFilter,
  },
  {
    Header: "Total Amount Paid",
    Footer: "Total Amount Paid",
    accessor: "amount_sub_total",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/mm/yyyy");
    // },
    Filter: ColumnFilter,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "payment_status",
    Filter: ColumnFilter,
  },
  {
    Footer: "Download",
    accessor: "download",
    disableFilters: true,
    Filter: ColumnFilter,
    Cell: (props) => {
      return (
        <div className="d-flex">
          {/* <Link
            // to={{
            //   pathname: `/view-customer-${props.cell.row.original.id}`,
            //   state: props.cell.row.original,
            // }}
            className="btn btn-primary shadow btn-xs sharp me-1"
          >
            <i className="fas fa-eye"></i>
          </Link> */}
          <a
            href={props.value}
            className="btn btn-warning shadow btn-xs sharp"
            download="test"
          >
            <i className="fas fa-download"></i>
          </a>
        </div>
      );
    },
  },
];
