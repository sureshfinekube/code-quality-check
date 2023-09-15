import React from "react";
import { Link } from "react-router-dom";

const ActionColumn = (props) => {
  return (
    <div className="d-flex">
      <Link
        to={{
          pathname: `/view-customer-${props.cell.row.original.id}`,
          state: props.cell.row.original,
        }}
        className="btn btn-primary shadow btn-xs sharp me-1"
      >
        <i className="fas fa-eye"></i>
      </Link>

      {/* <Link to="#" className="btn btn-danger shadow btn-xs sharp">
        <i className="fa fa-trash"></i>
      </Link> */}
    </div>
  );
};

export default ActionColumn;
