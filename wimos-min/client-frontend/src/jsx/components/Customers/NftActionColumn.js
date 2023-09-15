import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  GetUserNftAction,
} from "../../../store/actions/UserAction";

const NftActionColumn = (props) => {
  const dispatch = useDispatch();

  // const handler = () => {
  //   dispatch(loadingToggleAction(true));
  //   dispatch(GetUserNftAction(props.cell.row.original.id));
  // };
  return (
    <div className="d-flex">
      <Link
        to={{
          pathname: `/nft-${props.cell.row.original.id}`,
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

// const mapStateToProps = (state) => {
//   return {
//     userId: state.user.getUserId,
//     userData: state.user.getUserNft,
//   };
// };
export default NftActionColumn;
