import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  updateProfileSection,
  loadingToggleAction,
} from "../../../store/actions/AuthActions";
import { useHistory } from "react-router-dom";

const DummyProfile = (props) => {
  let history = useHistory();

  const [profileimage, setProfileImage] = useState({
    preview: props?.store.user_profile_picture,
    raw: "",
    currentPreview: "",
  });
  //   const [bannerimage, setBannerImage] = useState({
  //     preview: props.store?.banner_image,
  //     raw: "",
  //     currentPreview: "",
  //   });
  const [coverimage, setCoverImage] = useState({
    preview: props?.store.user_cover_picture,
    raw: "",
    currentPreview: "",
  });
  // console.log("fgh", profileimage.preview);
  // console.log("bannerimage", bannerimage);
  // console.log("coverimage", coverimage);
  // console.log("logo", profileimage);

  // console.log("store", props.store);

  // console.log("pffefvijew", props.store.store_content);

  //const [themecolor, setThemecolor] = useState("#000000");

  const [profileError, setProfileerror] = useState(false);
  const [coverError, setCovererror] = useState(false);
  const [emptycoverError, setEmptycovererror] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [emptyprofileimage, setEmptyprofileimage] = useState(false);

  // console.log("1stbannerhead", bannerhead);
  // console.log("1stcontent", content);
  // console.log("1stsectiontitle", sectiontitle);

  //   const handleChange = (name) => (e) => {
  //     if (name === "bannerHeading") {
  //       setBannerHead(e.target.value);
  //     } else if (name === "bannerContent") {
  //       setContent(e.target.value);
  //     } else if (name === "footerContent") {
  //       setSectionTitle(e.target.value);
  //     }
  //   };
  const validationCheck = () => {
    if (profileimage.preview === "") {
      setEmptyprofileimage(true);
    } else {
      setEmptyprofileimage(false);
    }
    if (coverimage.preview === "") {
      setEmptycovererror(true);
    } else {
      setEmptycovererror(false);
    }

    // if (bannerhead === "") {
    //   setEmptyheader(true);
    // } else {
    //   setEmptyheader(false);
    // }
    // if (sectiontitle === "") {
    //   setEmptytitle(true);
    // } else {
    //   setEmptytitle(false);
    // }
    // if (content === "") {
    //   setEmptycontent(true);
    // } else {
    //   setEmptycontent(false);
    // }
    // console.log("emptycontent", emptycontent);
    // console.log("emptyheader", emptyheader);
    // console.log("emptytitel", emptytitel);
    // console.log("emptyprofileimage", emptyprofileimage);
    // if (bannerhead === "") {
    //   // setBannerChk(true);
    //   setBannerHead(e.target.value);
    // } else {
    //   setBannerChk(false);
    //   setBannerHead(e.target.value);
    //   //console.log("2stbannerhead", bannerhead);
    // }
  };

  const dispatch = useDispatch();

  const updateStore = () => {
    validationCheck();
    if (profileimage.preview !== "" && coverimage.preview !== "") {
      SetLoader(true);
      // console.log(bannerhead);
      const formData = new FormData();
      formData.append("storeId", props.store.id);
      formData.append("image", profileimage.raw);
      formData.append("coverImage", coverimage.raw);

      // console.log(formData);
      dispatch(loadingToggleAction(true));
      dispatch(
        updateProfileSection(formData, props.store.id, SetLoader, history)
      );
      // }
    }
  };
  const coverChnage = (e) => {
    //console.log("file", e.target.files);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setProfileerror(true);
      } else {
        //console.log("false");
        setProfileerror(false);
        if (e.target.files && e.target.files.length > 0) {
          setCoverImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };
  const profileChnage = (e) => {
    // console.log("in targett", e.target.files[0]);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        // "image/x-icon",
        "image/gif",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setCovererror(true);
      } else {
        //console.log("false");
        setCovererror(false);
        if (e.target.files && e.target.files.length > 0) {
          setProfileImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Customize Profile Section</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <label
                      className="bold-label"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      Dummy Profile Image{" "}
                      <span style={{ fontSize: "10px", color: " #bd3bb1" }}>
                        (Resolution 140 × 140)
                      </span>
                    </label>
                    <label htmlFor="upload-button2" className="upload-button">
                      {profileimage.preview !== "" &&
                      profileimage.preview !== "false" &&
                      profileimage.preview !== undefined ? (
                        <img
                          src={
                            "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                            props.store.id +
                            "/" +
                            profileimage.preview
                          }
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={profileimage.preview}
                          alt="profileimage"
                          className="image-preview"
                        />
                      ) : profileimage.currentPreview !== "" ? (
                        <img
                          src={profileimage.currentPreview}
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={profileimage.preview}
                          alt="profileimage"
                          className="image-preview"
                        />
                      ) : (
                        <div className="upload-themeimage">
                          <span className="fa-stack fa-2x mt-3 mb-2">
                            <i
                              className="fas fa-circle fa-stack-2x"
                              style={{ color: "#bd3bb1" }}
                            />
                            <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                          </span>
                          <p className="text-center">UPLOAD</p>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-button2"
                      style={{ display: "none" }}
                      onChange={profileChnage}
                    />
                    <br />
                    {coverError && (
                      <p style={{ color: "red" }}>
                        {" "}
                        Not accepted this format. available only JPG, PNG, GIF,
                        SVG formats
                      </p>
                    )}

                    {emptyprofileimage && (
                      <p style={{ color: "red" }}> Image is required</p>
                    )}

                    {/* <button onClick={handleUpload}>Upload</button> */}
                  </div>
                  <div className="col-7">
                    <label
                      className="bold-label"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      Dummy Cover Image{" "}
                      <span style={{ fontSize: "10px", color: "#bd3bb1" }}>
                        (Resolution 1920 × 300)
                      </span>
                    </label>
                    <label htmlFor="upload-button1" className="upload-button">
                      {coverimage.preview !== "" &&
                      coverimage.preview !== "false" &&
                      coverimage.preview !== undefined ? (
                        <img
                          src={
                            "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                            props.store.id +
                            "/" +
                            coverimage.preview
                          }
                          // src={coverimage.preview}
                          alt="coverimage"
                          className="image-preview"
                        />
                      ) : coverimage.currentPreview !== "" ? (
                        <img
                          src={coverimage.currentPreview}
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={profileimage.preview}
                          alt="coverimage"
                          className="image-preview"
                        />
                      ) : (
                        <div className="upload-themeimage">
                          <span className="fa-stack fa-2x mt-3 mb-2">
                            <i
                              className="fas fa-circle fa-stack-2x"
                              style={{ color: "#bd3bb1" }}
                            />
                            <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                          </span>
                          <p className="text-center">UPLOAD</p>
                          {/* <p className="text-center">UPLOAD</p> */}
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-button1"
                      style={{ display: "none" }}
                      onChange={coverChnage}
                    />
                    <br />
                    {profileError && (
                      <p style={{ color: "red" }}>
                        {" "}
                        Not accepted this format. available only JPG, PNG, GIF,
                        SVG formats
                      </p>
                    )}

                    {emptycoverError && (
                      <p style={{ color: "red" }}> Image is required</p>
                    )}
                    {/* <button onClick={handleUpload}>Upload</button> */}
                  </div>
                </div>
                <br />
                {/* <label className="bold-label">Banner Image</label>
                <label htmlFor="upload-button3" className="upload-button">
                  {bannerimage.preview !== "false" ? (
                    <img
                      id="bannerImage"
                      src={
                        "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                        props.store.id +
                        "/" +
                        bannerimage.preview
                      }
                      // src={bannerimage.preview}
                      alt="banner image"
                      className="image-preview"
                    />
                  ) : bannerimage.currentPreview !== "" ? (
                    <img
                      src={bannerimage.currentPreview}
                      // src={
                      //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                      // }
                      // src={profileimage.preview}
                      alt="bannerimage"
                      className="image-preview"
                    />
                  ) : (
                    <div className="upload-themeimage">
                      <span className="fa-stack fa-2x mt-3 mb-2">
                        <i
                          className="fas fa-circle fa-stack-2x"
                          style={{ color: "#bd3bb1" }}
                        />
                        <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                      </span>
                      <p className="text-center">UPLOAD</p>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="upload-button3"
                  style={{ display: "none" }}
                  onChange={bannerChange}
                />
                <div style={{ color: "red" }}>* Max size 1 mb</div>
                {bannerError && (
                  <p style={{ color: "red" }}>
                    {" "}
                    Not accepted this format. available only JPG, PNG, GIF, SVG
                    formats
                  </p>
                )} */}
                <div className="form-group mb-3">
                  <div className="form-group ">
                    {!loader ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={updateStore}
                      >
                        Save
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Section Contents</h4>
              </div>

              <div className="card-body">
                <div className="form-group mb-3">
                  <label className="bold-label">Section Heading</label>
                  <input
                    className="form-control"
                    placeholder="Enter section heading"
                    label="bannerhead"
                    value={bannerhead}
                    onChange={handleChange("bannerHeading")}
                  />
                 
                  {emptyheader && (
                    <p style={{ color: "red" }}> Section heading is required</p>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="bold-label">Section title</label>
                  <input
                    className="form-control"
                    placeholder="Enter section title"
                    label="sectiontitle"
                    value={sectiontitle}
                    onChange={handleChange("footerContent")}
                  />{" "}
           
                  {emptytitel && (
                    <p style={{ color: "red" }}>Section title is requied</p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="bold-label">Section Content</label>
                  <textarea
                    type="text"
                    className="form-control input-default "
                    placeholder="Section content"
                    value={content}
                    onChange={handleChange("bannerContent")}
                  />{" "}
                 
                  {emptycontent && (
                    <p style={{ color: "red" }}>Section content is requied</p>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group ">
             
                    {!loader ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={updateStore}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        
                      >
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    store: state.auth.selectedStore,
  };
};
export default connect(mapStateToProps)(DummyProfile);
