import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  UpdateStoreAction,
  loadingToggleAction,
} from "../../../store/actions/AuthActions";

const ThemeCustomize = (props) => {
  const [logoimage, setLogoImage] = useState({
    preview: props.store?.store_logo,
    raw: "",
    currentPreview: "",
  });
  const [bannerimage, setBannerImage] = useState({
    preview: props.store?.banner_image,
    raw: "",
    currentPreview: "",
  });
  const [favimage, setFavImage] = useState({
    preview: props.store?.favIcon,
    raw: "",
    currentPreview: "",
  });
  // console.log("bannerimage", bannerimage);
  // console.log("favimage", favimage);
  // console.log("logo", logoimage);

  // console.log("store", props.store);

  // console.log("pffefvijew", props.store.store_content);

  //const [themecolor, setThemecolor] = useState("#000000");
  const [content, setContent] = useState(
    props.store?.store_content === "undefined" ? "" : props.store?.store_content
  );
  const [footercontent, setFooterContent] = useState(
    props.store?.footerContent === "undefined" ? "" : props.store?.footerContent
  );
  const [bannerhead, setBannerHead] = useState(
    props.store?.bannerHeading === "undefined" ? "" : props.store?.bannerHeading
  );
  const [bannerchk, setBannerChk] = useState(false);
  const [contentchk, setContentChk] = useState(false);
  const [footerchk, setFooterChk] = useState(false);
  const [favError, setFaverror] = useState(false);
  const [logoError, setLogoerror] = useState(false);
  const [bannerError, setBannererror] = useState(false);
  const [loader, SetLoader] = useState(false);

  // console.log("1stbannerhead", bannerhead);
  // console.log("1stcontent", content);
  // console.log("1stfootercontent", footercontent);

  const handleChange = (name) => (e) => {
    if (name === "bannerHeading") {
      setBannerHead(e.target.value);
    } else if (name === "bannerContent") {
      setContent(e.target.value);
    } else if (name === "footerContent") {
      setFooterContent(e.target.value);
    }
  };

  const bannerCheck = (e) => {
    if (bannerhead === "") {
      // setBannerChk(true);
      setBannerHead(e.target.value);
    } else {
      setBannerChk(false);
      setBannerHead(e.target.value);
      //console.log("2stbannerhead", bannerhead);
    }
  };
  const contentCheck = (e) => {
    if (content === "") {
      // setContentChk(true);
    } else {
      setContentChk(false);
      setContent(e.target.value);
      //console.log("2stcontent", content);
    }
  };
  const footerCheck = (e) => {
    if (footercontent === "") {
      setFooterChk(true);
    } else {
      setFooterChk(false);
      setFooterContent(e.target.value);
      //onsole.log("2stcontent", footercontent);
    }
  };
  const dispatch = useDispatch();

  const updateStore = () => {
    SetLoader(true);
    // console.log(content);
    // console.log(logoimage.preview);
    // console.log(props.store);
    // if (content === "") {
    //   setBannerChk(true);
    //   console.log("null");
    // } else if (content === "") {
    // } else if (bannerhead === "") {
    // } else {
    //   setBannerChk(false);

    //console.log("content", content);

    const formData = new FormData();
    formData.append("storeId", props.store.id);
    // formData.append("store_name", props.store.store_name);
    formData.append("logo", logoimage.raw);
    formData.append("banner", bannerimage.raw);
    formData.append("store_content", content);
    formData.append("favIcon", favimage.raw);
    formData.append("footerContent", footercontent);
    formData.append("bannerHeading", bannerhead);
    formData.append("type", 1);

    dispatch(loadingToggleAction(true));
    dispatch(UpdateStoreAction(formData, props.store.id, SetLoader));
    // }
  };
  const favChange = (e) => {
    //console.log("file", e.target.files);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const fileType = file["type"];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/x-icon",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setFaverror(true);
      } else {
        //console.log("false");
        setFaverror(false);
        if (e.target.files && e.target.files.length > 0) {
          setFavImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };
  const logoChange = (e) => {
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
        setLogoerror(true);
      } else {
        //console.log("false");
        setLogoerror(false);
        if (e.target.files && e.target.files.length > 0) {
          setLogoImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
          // const { offsetHeight, offsetWidth } = logoimage.currentPreview;
          // console.log(offsetHeight, offsetWidth);
          // let imgHeights = {};

          // let img = new Image();
          // img.src = logoimage.currentPreview;
          // img.onload = () =>
          //   (imgHeights[logoimage.currentPreview] = img.height);

          // console.log("imgHeights", imgHeights);
        }
      }
    }
  };

  //console.log(logoimage.raw.size);
  const bannerChange = (e) => {
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
        setBannererror(true);
      } else {
        //console.log("false");
        setBannererror(false);
        if (e.target.files && e.target.files.length > 0) {
          setBannerImage({
            preview: "false",
            currentPreview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      }
    }
  };
  //console.log("imggg", favimage.preview);
  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Customize Your Theme</h4>
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
                      Fav Icon{" "}
                      <span style={{ fontSize: "10px", color: "#bd3bb1" }}>
                        (Resolution 32 × 32)
                      </span>
                    </label>
                    <label htmlFor="upload-button1" className="upload-button">
                      {favimage.preview !== "false" ? (
                        <img
                          src={
                            "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                            props.store.id +
                            "/" +
                            favimage.preview
                          }
                          // src={favimage.preview}
                          alt="fav image"
                          className="image-preview"
                        />
                      ) : favimage.currentPreview !== "" ? (
                        <img
                          src={favimage.currentPreview}
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={logoimage.preview}
                          alt="favimage"
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
                      onChange={favChange}
                    />
                    <br />
                    {favError && (
                      <p style={{ color: "red" }}>
                        {" "}
                        Not accepted this format. available only JPG, PNG, ICO,
                        SVG formats
                      </p>
                    )}
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
                      Store Logo{" "}
                      <span style={{ fontSize: "10px", color: " #bd3bb1" }}>
                        (Resolution 350 × 80)
                      </span>
                    </label>
                    <label htmlFor="upload-button2" className="upload-button">
                      {logoimage.preview !== "false" ? (
                        <img
                          src={
                            "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                            props.store.id +
                            "/" +
                            logoimage.preview
                          }
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={logoimage.preview}
                          alt="logoimage"
                          className="image-preview"
                        />
                      ) : logoimage.currentPreview !== "" ? (
                        <img
                          src={logoimage.currentPreview}
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={logoimage.preview}
                          alt="logoimage"
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
                      onChange={logoChange}
                    />
                    <br />
                    {logoError && (
                      <p style={{ color: "red" }}>
                        {" "}
                        Not accepted this format. available only JPG, PNG, GIF,
                        SVG formats
                      </p>
                    )}

                    {/* <button onClick={handleUpload}>Upload</button> */}
                  </div>
                </div>
                <br />
                <label className="bold-label">Banner Image</label>
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
                      // src={logoimage.preview}
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
                {/* <div style={{ color: "red" }}>* Max size 1 mb</div> */}
                {bannerError && (
                  <p style={{ color: "red" }}>
                    {" "}
                    Not accepted this format. available only JPG, PNG, GIF, SVG
                    formats
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Theme Contents</h4>
              </div>

              <div className="card-body">
                <div className="form-group mb-3">
                  <label className="bold-label">Banner Heading</label>
                  <input
                    className="form-control"
                    placeholder="Enter Your banner heading"
                    label="bannerhead"
                    value={bannerhead}
                    onChange={handleChange("bannerHeading")}
                  />
                  {/* {bannerchk && (
                    <h6 style={{ color: "red" }}>Banner heading needed</h6>
                  )} */}
                </div>
                <div className="form-group mb-3">
                  <label className="bold-label">Banner Content</label>
                  <textarea
                    type="text"
                    className="form-control input-default "
                    placeholder="Banner content"
                    value={content}
                    onChange={handleChange("bannerContent")}
                  />{" "}
                  {/* {contentchk && (
                    <h6 style={{ color: "red" }}>Banner content needed</h6>
                  )} */}
                </div>
                <div className="form-group mb-3">
                  <label className="bold-label">Footer Content</label>
                  <input
                    className="form-control"
                    placeholder="Enter Your footer content"
                    label="footercontent"
                    value={footercontent}
                    onChange={handleChange("footerContent")}
                  />{" "}
                  {/* {footerchk && (
                    <h6 style={{ color: "red" }}>Footer content needed</h6>
                  )} */}
                </div>
                <br />
                <div className="form-group mb-3">
                  <div className="form-group ">
                    {/* <button
                      type="submit"
                      className="btn btn-outline-primary"
                      style={{ marginRight: "12px" }}
                    >
                      Discard
                    </button> */}
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
                        // onClick={updateStore}
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
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    store: state.auth.selectedStore,
  };
};
export default connect(mapStateToProps)(ThemeCustomize);
