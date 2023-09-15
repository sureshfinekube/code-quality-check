import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  updateSliderSection,
  loadingToggleAction,
} from "../../../store/actions/AuthActions";
import { useHistory } from "react-router-dom";

const SectionEdit = (props) => {
  const [row, setRow] = useState(props.location.state);
  let history = useHistory();

  const [topimage, setTopImage] = useState({
    preview: row.stepLogo,
    raw: "",
    currentPreview: "",
  });
  //   const [bannerimage, setBannerImage] = useState({
  //     preview: props.store?.banner_image,
  //     raw: "",
  //     currentPreview: "",
  //   });
  const [bottomimage, setBottumImage] = useState({
    preview: row?.navigationIcon,
    raw: "",
    currentPreview: "",
  });

  // console.log("bu", bottomimage);
  // console.log("bannerimage", bannerimage);
  // console.log("bottomimage", bottomimage);
  // console.log("logo", topimage);

  // console.log("store", props.store);

  // console.log("pffefvijew", props.store.store_content);

  //const [themecolor, setThemecolor] = useState("#000000");
  const [content, setContent] = useState(row.description);
  const [sectiontitle, setSectionTitle] = useState(row.title);
  const [bannerhead, setBannerHead] = useState(row.header);
  const [bannerchk, setBannerChk] = useState(false);
  const [contentchk, setContentChk] = useState(false);
  const [footerchk, setFooterChk] = useState(false);
  const [favError, setFaverror] = useState(false);
  const [logoError, setLogoerror] = useState(false);
  const [bannerError, setBannererror] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [emptytopimage, setEmptytopimage] = useState(false);
  const [emptyheader, setEmptyheader] = useState(false);
  const [emptytitel, setEmptytitle] = useState(false);
  const [emptycontent, setEmptycontent] = useState(false);

  // console.log("1stbannerhead", bannerhead);
  // console.log("1stcontent", content);
  // console.log("1stsectiontitle", sectiontitle);

  const handleChange = (name) => (e) => {
    if (name === "bannerHeading") {
      setBannerHead(e.target.value);
    } else if (name === "bannerContent") {
      setContent(e.target.value);
    } else if (name === "footerContent") {
      setSectionTitle(e.target.value);
    }
  };
  const validationCheck = () => {
    if (topimage.preview === "") {
      setEmptytopimage(true);
    } else {
      setEmptytopimage(false);
    }

    if (bannerhead === "") {
      setEmptyheader(true);
    } else {
      setEmptyheader(false);
    }
    if (sectiontitle === "") {
      setEmptytitle(true);
    } else {
      setEmptytitle(false);
    }
    if (content === "") {
      setEmptycontent(true);
    } else {
      setEmptycontent(false);
    }
    // console.log("emptycontent", emptycontent);
    // console.log("emptyheader", emptyheader);
    // console.log("emptytitel", emptytitel);
    // console.log("emptytopimage", emptytopimage);
    // if (bannerhead === "") {
    //   // setBannerChk(true);
    //   setBannerHead(e.target.value);
    // } else {
    //   setBannerChk(false);
    //   setBannerHead(e.target.value);
    //   //console.log("2stbannerhead", bannerhead);
    // }
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
    if (sectiontitle === "") {
      setFooterChk(true);
    } else {
      setFooterChk(false);
      setSectionTitle(e.target.value);
      //onsole.log("2stcontent", sectiontitle);
    }
  };
  const dispatch = useDispatch();

  const updateStore = () => {
    validationCheck();
    if (
      topimage.preview !== "" &&
      bannerhead !== "" &&
      sectiontitle !== "" &&
      content !== ""
    ) {
      SetLoader(true);
      // console.log(bannerhead);
      const formData = new FormData();
      formData.append("id", row.id);
      formData.append("storeId", props.store.id);
      formData.append("stepLogo", topimage.raw);
      formData.append("description", content);
      formData.append("navigationIcon", bottomimage.raw);
      formData.append("title", sectiontitle);
      formData.append("header", bannerhead);
      // console.log(formData);
      dispatch(loadingToggleAction(true));
      dispatch(
        updateSliderSection(formData, props.store.id, SetLoader, history)
      );
      // }
    }
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
        "image/gif",
      ];

      if (!validImageTypes.includes(fileType)) {
        // console.log("true");
        setFaverror(true);
      } else {
        //console.log("false");
        setFaverror(false);
        if (e.target.files && e.target.files.length > 0) {
          setBottumImage({
            preview: "",
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
          setTopImage({
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
      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Customize Section</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label
                      className="bold-label"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      Top Icon{" "}
                      <span style={{ fontSize: "10px", color: " #bd3bb1" }}>
                        (Resolution 85 × 85)
                      </span>
                    </label>
                    <label htmlFor="upload-button2" className="upload-button">
                      {topimage.preview && topimage.preview !== "false" ? (
                        <img
                          src={
                            "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                            props.store.id +
                            "/" +
                            topimage.preview
                          }
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={topimage.preview}
                          alt="topimage"
                          className="image-preview"
                        />
                      ) : topimage.currentPreview !== "" ? (
                        <img
                          src={topimage.currentPreview}
                          // src={
                          //   " https://wimos-client-1.s3.us-west-2.amazonaws.com/batman-dc-superheroes-silhouette-dark-background-5k-5120x2880-8499.jpg"
                          // }
                          // src={topimage.preview}
                          alt="topimage"
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

                    {emptytopimage && (
                      <p style={{ color: "red" }}> Image is required</p>
                    )}

                    {/* <button onClick={handleUpload}>Upload</button> */}
                  </div>
                  {/* <div className="col-5">
                    <label
                      className="bold-label"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      Bottom Icon{" "}
                      <span style={{ fontSize: "10px", color: "#bd3bb1" }}>
                        (Resolution 85 × 85)
                      </span>
                    </label>
                    <label htmlFor="upload-button1" className="upload-button">
                      {bottomimage.preview ? (
                        <img
                          src={
                            "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                            props.store.id +
                            "/" +
                            bottomimage.preview
                          }
                       
                          alt="bottomimage"
                          className="image-preview"
                        />
                      ) : bottomimage.currentPreview !== "" ? (
                        <img
                          src={bottomimage.currentPreview}
                       
                          alt="bottomimage"
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
                      id="upload-button1"
                      style={{ display: "none" }}
                      onChange={favChange}
                    />
                    <br />
                    {favError && (
                      <p style={{ color: "red" }}>
                        {" "}
                        Not accepted this format. available only JPG, PNG, GIF,
                        SVG formats
                      </p>
                    )}
                   
                  </div> */}
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
                      // src={topimage.preview}
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
                  {/* {bannerchk && (
                    <h6 style={{ color: "red" }}>Banner heading needed</h6>
                  )} */}
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
                  {/* {footerchk && (
                    <h6 style={{ color: "red" }}>Footer content needed</h6>
                  )} */}
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
                  {/* {contentchk && (
                    <h6 style={{ color: "red" }}>Banner content needed</h6>
                  )} */}
                  {emptycontent && (
                    <p style={{ color: "red" }}>Section content is requied</p>
                  )}
                </div>

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
export default connect(mapStateToProps)(SectionEdit);
