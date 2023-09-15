import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../../layouts/PageTitle";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  GetUserCollectionAction,
} from "../../../store/actions/UserAction";
const ViewCollection = (props) => {
  const [data, setData] = useState(props.data);
  const user = props.getUser;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(GetUserCollectionAction(data.id, user));
  }, [data]);
  const row = props.userCollectionData;
  console.log("collectionnnn", row);

  return (
    <div className="row">
      {/* <PageTitle activeMenu="Collection" motherMenu="List" /> */}
      {row.length > 0 ? (
        row.map((data) => (
          <>
            <div className="col-lg-4">
              <div
                className="profile card card-body px-3 pt-3 pb-0"
                style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
              >
                <div className="profile-head">
                  <div className="photo-content ">
                    {/* <div className="cover-photo rounded"> */}{" "}
                    <img
                      // src={
                      //   "https://nft-user.s3.ap-south-1.amazonaws.com/collection/" +
                      //   data.bannerImage
                      // }

                      src={
                        process.env.NEXT_PUBLIC_USER_AWS_URL +
                        "/collection/" +
                        data.bannerImage
                      }
                      // className="img-fluid rounded-circle"
                      alt="cover"
                      // width="100%"
                      // height="100%"
                      style={{
                        width: "100%",
                        height: "230px",
                        objectFit: "cover",
                      }}
                    />
                    {/* </div> */}
                  </div>
                  <div className="profile-info">
                    <div className="profile-photo">
                      <img
                        // src={
                        //   "https://nft-user.s3.ap-south-1.amazonaws.com/collection/" +
                        //   data.profileImage
                        // }
                        src={
                          process.env.NEXT_PUBLIC_USER_AWS_URL +
                          "/collection/" +
                          data.profileImage
                        }
                        className="img-fluid rounded-circle"
                        alt="profile"
                        style={{
                          width: "80%",
                          height: "100%",
                          objectFit: "cover",
                          background: "#fffff",
                        }}
                      />
                    </div>
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2 float:center">
                        <h4 className="text-primary mb-0">{data.name}</h4>
                      </div>
                      <div className="profile-email px-2 pt-2">
                        {/* <h4 className="text-muted mb-0">{data.category}</h4> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-xl-4 col-lg-12 col-sm-12">
              <div className="card overflow-hidden">
                <div
                  className="text-center p-3  "
                  style={{
                    backgroundImage: `url(${
                      "https://nft-user.s3.ap-south-1.amazonaws.com/collection/" +
                      data.bannerImage
                    })`,
                  }}
                >
                  <div className="profile-photo">
                    <img
                      src={
                        "https://nft-user.s3.ap-south-1.amazonaws.com/collection/" +
                        data.profileImage
                      }
                      className="img-fluid rounded-circle"
                      alt="profile"
                    />
                  </div>
                  <h3 className="mt-3 mb-1 text-white">Deangelo Sena</h3>
                  <p className="text-white mb-0">Senior Manager</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="mb-0">Patient Gender</span>{" "}
                    <strong className="text-muted">Female </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="mb-0">Years Old</span>{" "}
                    <strong className="text-muted">Age: 24 </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="mb-0">Patient Height</span>{" "}
                    <strong className="text-muted">1.5 M </strong>
                  </li>
                </ul>
                <div className="card-footer border-0 mt-0">
                  <button className="btn btn-primary btn-lg btn-block">
                    <i className="fa fa-bell-o"></i> Reminder Alarm
                  </button>
                </div>
              </div>
            </div> */}
          </>
        ))
      ) : props.showLoading ? (
        <center>
          <i
            className="fas fa-spinner fa-spin"
            style={{ fontSize: "20px" }}
          ></i>
        </center>
      ) : row.length === 0 && !props.showLoading ? (
        <center>
          <h4>Don't have any collections</h4>
        </center>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userCollectionData: state.user.getUserCollections,
    showLoading: state.user.showLoading,
    getUser: state.auth.selectedStore.store_domain,
  };
};
export default connect(mapStateToProps)(ViewCollection);
