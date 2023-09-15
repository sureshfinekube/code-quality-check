import React, { Fragment, useEffect, useState } from "react";
import coming from "../../../../../src/images/coming2.svg";
// import PageTitle from "../../layouts/PageTitle";
import { Row, Button, Card, Tab, Nav } from "react-bootstrap";
import { Chip } from "@material-ui/core";
import {
  UpdateSEOAction,
  loadingToggleAction,
  AddAnalyticsData,
  GetStoreAction,
  SelectStoreAction,
} from "../../../../store/actions/AuthActions";
import { connect, useDispatch } from "react-redux";

const Seo = (props) => {
  // console.log("seooooo", props.seo);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [title, setTitle] = useState(
    props.seo?.meta_title === undefined ? "" : props.seo?.meta_title
  );
  const [description, setDescription] = useState(
    props.seo?.meta_description === undefined ? "" : props.seo?.meta_description
  );
  const [robot, setRobot] = useState(
    props.seo?.robotsText === undefined ? "" : props.seo?.robotsText
  );
  const [metatag, setMetaTag] = useState("");
  const [tags, setTags] = useState(
    props.seo?.meta_tag === undefined ? [] : props.seo.meta_tag
  );
  const [currValue, setCurrValue] = useState();
  const dispatch = useDispatch();
  // console.log("tags", tags);
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleTag = (e) => {
    const tt = e.target.value.replace(/[,.]/g, "");
    setCurrValue(tt);
  };
  const handleDelete = (item, index) => {
    let arr = [...tags];
    arr.splice(index, 1);
    //console.log(item);
    setTags(arr);
  };
  const handleKeyUp = (e) => {
    //console.log(e.keyCode);32
    if (e.keyCode === 13) {
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
    if (e.keyCode === 32) {
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };
  const [loader, SetLoader] = useState(false);

  // console.log("id", props.storeid);
  const handleSubmit = () => {
    // console.log("tags", tags);
    SetLoader(true);

    const formData = new FormData();
    formData.append("storeId", props.storeid);
    formData.append("meta_title", title);
    formData.append("meta_description", description);
    formData.append("previewImage", favimage.raw);
    formData.append("meta_tag", JSON.stringify(tags));
    formData.append("robotsText", robot);
    //tags.forEach((item) => formData.append("meta_tag", item));
    // console.log("fffff", formData);
    dispatch(loadingToggleAction(true));
    dispatch(UpdateSEOAction(formData, props.storeid, SetLoader));
    // SetLoader(false);
  };

  const [analytics, setAnalytics] = useState("");

  const handleSubmitAnalytics = () => {
    SetLoader(true);

    const Data = {
      storeId: props.storeid,
      trackingId: analytics || props?.store?.gaTrackingId,
    };
    // console.log("Data", Data);
    dispatch(AddAnalyticsData(Data, SetLoader));
    dispatch(GetStoreAction);
    dispatch(SelectStoreAction(props.storeid));
    // SetLoader(false);
  };
  // console.log("123", props?.store?.gaTrackingId);

  useEffect(() => {
    dispatch(SelectStoreAction(props.storeid));
  }, []);
  const [favError, setFaverror] = useState(false);
  const [favimage, setFavImage] = useState({
    preview: props.seo?.previewImage,
    raw: "",
    currentPreview: "",
  });
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
  console.log("favimage +++++", favimage.currentPreview);

  const tabData = [
    {
      name: "SEO",
      icon: "home",
      content: (
        <>
          <Card>
            <Card.Body>
              <div className="row">
                {/* <div className="col-xl-12"> */}

                {/* </div> */}
                <div className="row">
                  <div className="col-xl-6">
                    <h4>Title & Meta Description</h4>
                    <p>
                      The title and meta description help define how your store
                      shows up on search engines.
                    </p>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="cc-number">
                        <b>Meta Title</b>
                      </label>
                      <input
                        type="text"
                        value={title}
                        className="form-control"
                        id="cc-number"
                        placeholder="Enter your meta title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="cc-number">
                        <b>Meta Tag</b>
                      </label>
                      <div>
                        {/* className={"container"} */}
                        {tags &&
                          tags.map((item, index) => (
                            <Chip
                              size="medium"
                              onDelete={() => handleDelete(item, index)}
                              label={item}
                              key={index}
                              variant="filled"
                              style={{ color: "#767676" }}
                            />
                          ))}
                      </div>
                      <br />
                      <input
                        type="text"
                        value={currValue}
                        onChange={handleTag}
                        onKeyDown={handleKeyUp}
                        className="form-control"
                        id="text1"
                        placeholder="Add a tag and press enter"
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label htmlFor="cc-number">
                        <b>Meta Description</b>
                      </label>
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder="wimos helps you own the most unique NFT artwork in the digital content world!"
                      />{" "}
                      <br />
                      <br />{" "}
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body" style={{ padding: 0 }}>
                      <div className="row">
                        <div>
                          <label htmlFor="cc-number">
                            <h4>Social Sharing Preview</h4>
                          </label>
                          <p>
                            When you share your store website on social media ,
                            a preview image is usually shown.
                          </p>
                        </div>
                        <div className="col-5">
                          <label
                            className="bold-label"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            {/* Fav Icon{" "} */}
                            <span
                              style={{ fontSize: "10px", color: "#bd3bb1" }}
                            >
                              (Resolution 32 × 32)
                            </span>
                          </label>
                          <label
                            htmlFor="upload-button1"
                            className="upload-button"
                          >
                            {favimage.preview &&
                            favimage.preview !== "false" ? (
                              <img
                                src={
                                  "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                                  props.store.id +
                                  "/" +
                                  favimage.preview
                                }
                                alt="fav images"
                                className="image-preview"
                              />
                            ) : favimage.currentPreview !== "" ? (
                              <img
                                src={favimage.currentPreview}
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
                              Not accepted this format. available only JPG, PNG,
                              ICO, SVG formats
                            </p>
                          )}
                        </div>{" "}
                      </div>{" "}
                      <br />
                      <div>
                        <label htmlFor="cc-number">
                          <h4>Robots.txt</h4>
                        </label>
                        <p>
                          A robots.txt file is used to instruct search engines
                          on what web pages to be crawled
                        </p>
                        {/* <br /> */}
                        <label htmlFor="cc-number">Robots Text</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          onChange={(e) => {
                            setRobot(e.target.value);
                          }}
                          value={robot}
                        ></textarea>
                      </div>
                      <br />
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    {!loader ? (
                      <Button
                        variant="outline-primary"
                        size="lg"
                        style={{ textAlign: "center" }}
                        onClick={handleSubmit}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outline-primary"
                        size="lg"
                        style={{ textAlign: "center" }}
                        // onClick={handleSubmit}
                      >
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* <Card>
            <Card.Body>
              <div className="row">
                <div className="col-xl-6">
                  <h4>Favicon</h4>
                  Change the favicon to help visitors recognize your website
                  easier when they have multiple tabs open on their browsers.
                  This is also your store logo on FK Directory
                </div>
                <div className="col-xl-6">
                  <div className="col-md-12 mb-5">
                    <div>
                      <label className="bold-label">
                        <b>Favicon Image</b>
                      </label>
                      File types supported: JPG, PNG, SVG. Max size: 2 MB. Size
                      recommended 32 x 32px
                      <label className="bold-label"></label>
                      <label htmlFor="upload-button" className="upload-button">
                        {image.preview ? (
                          <img
                            src={image.preview}
                            alt="dummy"
                            className="image-preview"
                          />
                        ) : (
                          <div className="upload-product">
                            <span className="fa-stack fa-2x mt-3 mb-2">
                              <i
                                className="fas fa-circle fa-stack-2x"
                                style={{ color: "#886CC0" }}
                              />
                              <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                            </span>
                            <h5 className="text-center">
                              {" "}
                              UPLOAD FROM YOUR DEVICE
                            </h5>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleChange}
                      />
                      <br />
                      <Button variant="outline-primary" size="lg">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card> */}
        </>
      ),
    },
    {
      name: "Analyitcs",
      icon: "user",
      content: (
        <Card style={{ height: "14rem", width: "85rem" }}>
          <Card.Body>
            <div className="row">
              <div className="col-xl-12">
                {/* <img
                src={coming}
                style={{
                  width: "10rem",
                  height: "13rem",
                  alignSelf: "center",
                }}
              /> */}
                {/* <h2 style={{ textAlign: "center", color: "#bd3bb1" }}>
              Coming Soon...
            </h2>
            <p style={{ textAlign: "center" }}>
              {" "}
              Google Analytics enables you to track the visitors to your store,
              and generates reports that will help you with your marketing.
            </p> */}
              </div>
              <div className="col-xl-6">
                <div className="col-md-12 mb-3">
                  <label htmlFor="cc-number">
                    <b>Tracking ID</b>
                  </label>
                  <input
                    // value={props?.store?.gaTrackingId}
                    value={analytics || props?.store?.gaTrackingId}
                    onChange={(e) => {
                      setAnalytics(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder="Enter Google Analytics tracking ID (UA-XXXX...) here"
                  />{" "}
                  <br />
                  {!loader ? (
                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={handleSubmitAnalytics}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      size="lg"
                      // onClick={handleSubmitAnalytics}
                    >
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ),
    },
    {
      name: "Integration",
      icon: "phone",
      content: (
        <Card style={{ height: "10rem", width: "85rem" }}>
          <Card.Body>
            <h2 style={{ textAlign: "center", color: "#bd3bb1" }}>
              Coming Soon...
            </h2>
            <p style={{ textAlign: "center" }}>
              {" "}
              MailChimp is an email marketing and CRM tool that helps you to
              manage contacts during sales and marketing campaigns.
            </p>
            {/* <div className="row">
              <div className="col-xl-5">
                <h4>MailChimp</h4>
                MailChimp is an email marketing and CRM tool that helps you to
                manage contacts during sales and marketing campaigns.
              </div>
              <div className="col-xl-7">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">
                    <b>API Key</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder="Enter API key of your MailChimp acoount here"
                  />{" "}
                  <label htmlFor="cc-number">
                    <b>User Account</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder="MailChimp user account"
                  />{" "}
                  <br />
                  <Button variant="outline-primary" size="lg">
                    Verify
                  </Button>{" "}
                  <Button variant="outline-primary" size="lg">
                    Save
                  </Button>
                </div>
              </div>{" "}
            </div> */}
          </Card.Body>
        </Card>
      ),
    },

    {
      name: "Integration",
      icon: "envelope",
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
    },
  ];

  return (
    <Fragment>
      {/* <PageTitle activeMenu="Tab" motherMenu="Bootstrap" pageContent="Tab" /> */}
      {/* <Card> */}
      {/* <Card.Header>
          <Card.Title>Users-Seo Management</Card.Title>
        </Card.Header> */}
      {/* <Card.Body> */}
      <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
        <Nav as="ul" className="nav-pills mb-4 light">
          {tabData.map(
            (data, i) =>
              i !== tabData.length - 1 && (
                <Nav.Item as="li" key={i}>
                  <Nav.Link eventKey={data.name.toLowerCase()}>
                    <h3>
                      {i === 1 ? "Analytics" : i === 2 ? "Integration" : "SEO"}
                    </h3>
                  </Nav.Link>
                </Nav.Item>
              )
          )}
        </Nav>
        <Tab.Content className="">
          {tabData.map(
            (data, i) =>
              i !== tabData.length - 1 && (
                <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                  {data.content}
                </Tab.Pane>
              )
          )}
        </Tab.Content>
      </Tab.Container>
      {/* </Card.Body>{" "}
      </Card> */}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    storeid: state.auth.selectedStore.id,
    seo: state.auth.selectedStore.seo,
    store: state.auth.selectedStore,
  };
};
export default connect(mapStateToProps)(Seo);
