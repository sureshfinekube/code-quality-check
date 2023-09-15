import React from "react";

const StatusColumn = (props) => {
  return (
    <div className="bootstrap-badge">
      {props.value && (
        <div className="badge badge-outline-success badge-rounded">Active</div>
      )}
      {!props.value && (
        <div className="badge badge-outline-dark badge-rounded">Inactive</div>
      )}
    </div>
  );
};

export default StatusColumn;
