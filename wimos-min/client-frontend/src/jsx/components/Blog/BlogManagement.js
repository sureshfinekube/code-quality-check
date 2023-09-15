import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Chip } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BlogPostAction,
  loadingToggleAction,
  BlogGetAction,
  BlogCategoryGetAction,
} from "../../../store/actions/BlogActions";
import Select from "react-select";

const BlogManagement = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingToggleAction(true));
    dispatch(BlogGetAction(props.storeid));
    dispatch(BlogCategoryGetAction(props.storeid));
  }, []);
  // console.log("blogCategorys1111111", props.blogCategorys);
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metatags, setMetaTags] = useState([]);
  const [metadescription, setMetadescription] = useState("");
  const [tags, setTags] = useState([]);
  const [btnLoader, SetBtnLoader] = useState(false);
  const [readTime, setReadTime] = useState("");

  const [currValue, setCurrValue] = useState("");
  const [currValueMeta, setCurrValueMeta] = useState("");

  let errorsObj = {
    title: "",
    description: "",
    metatags: "",
    metadescription: "",
    readTime: "",
    tags: "",
    category: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
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
  };

  const handleTag = (e) => {
    const tt = e.target.value.replace(/[,.]/g, "");
    setCurrValue(tt);
  };

  const handleDeleteMeta = (item, index) => {
    let arr = [...metatags];
    arr.splice(index, 1);
    //console.log(item);
    setMetaTags(arr);
  };

  const handleKeyUpMeta = (e) => {
    //console.log(e.keyCode);32
    if (e.keyCode === 13) {
      setMetaTags((oldState) => [...oldState, e.target.value]);
      setCurrValueMeta("");
    }
  };

  const handleTagMeta = (e) => {
    const tt = e.target.value.replace(/[,.]/g, "");
    setCurrValueMeta(tt);
  };
  let history = useHistory();
  const [loader, SetLoader] = useState(false);
  const [selectedRelated, setSelectedRelates] = useState([]);
  const [blogCategory, setBlogCategory] = useState();

  // console.log("1233", blogCategory.value);
  const submitHandler = () => {
    // SetLoader(true);

    let error = false;
    const errorObj = { ...errorsObj };
    if (title === "") {
      errorObj.title = "Title is Required";
      error = true;
    }
    if (!readTime) {
      errorObj.readTime = "Read time is Required";
      error = true;
    }

    if (tags.length < 2) {
      errorObj.tags = "At least 2Tags is Required";
      error = true;
    }
    if (description === "") {
      errorObj.description = "Description is Required";
      error = true;
    } else if (description.length < 4) {
      errorObj.description = "At least 4 characters Required";
      error = true;
    }

    if (metadescription === "") {
      errorObj.metadescription = "Meta Description is Required";
      error = true;
    } else if (metadescription.length < 4) {
      errorObj.metadescription = "At least 4 characters Required";
      error = true;
    }
    if (metatags.length < 2) {
      errorObj.metatags = "At least 2Tags is Required";
      error = true;
    }
    if (!blogCategory) {
      errorObj.category = "Please choose a category";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      SetLoader(false);
      return;
    } else {
      SetBtnLoader(true);

      const formData = new FormData();
      formData.append("file", image.raw);
      formData.append("client_id", props?.client_id);
      formData.append("store_id", props?.storeid);
      formData.append("title", title);
      formData.append("readTime", readTime);
      formData.append("image_title", image?.raw?.name);
      formData.append("heading", title);
      formData.append("description", description);
      // formData.append("meta_tags", metatags);
      formData.append("meta_description", metadescription);
      selectedRelated.forEach((item) =>
        formData.append("relatedPosts", item?.value)
      );
      formData.append("categoryId", blogCategory?.value);
      // blogCategory?.forEach((item) =>
      //   formData.append("categoryId", item.value)
      // );

      tags.forEach((item) => formData.append("tags", item));
      metatags.forEach((item) => formData.append("meta_tags", item));
      formData.append("status", false);
      dispatch(loadingToggleAction(true));
      dispatch(BlogPostAction(formData, history, SetBtnLoader));
    }
  };
  useEffect(() => {
    if (props.blogpoststatus) {
      ResetData();
    }
  }, [props.blogpoststatus]);

  const ResetData = () => {
    setImage({
      preview: "",
      raw: "",
    });
    setTitle("");
    setDescription("");
    setMetaTags([]);
    setTags([]);
    setMetadescription("");
    SetLoader(false);
  };

  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Blog List</h4>
              </div>
              <div className="card-body">
                <div>
                  <label className="bold-label">
                    <b>Blog Image</b>
                  </label>
                  <label
                    htmlFor="upload-button"
                    className="upload-button"
                    style={{ height: "418px" }}
                  >
                    {image.preview ? (
                      <img
                        src={image.preview}
                        alt="dummy"
                        className="image-preview"
                        style={{ maxHeight: "418px" }}
                      />
                    ) : (
                      <div className="upload-product">
                        <span className="fa-stack fa-2x mt-3 mb-2">
                          <i
                            className="fas fa-circle fa-stack-2x"
                            style={{ color: "#bb3f96" }}
                          />
                          <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                        </span>
                        <h5 className="text-center">UPLOAD FROM YOUR DEVICE</h5>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="form-group ">
                  <label className="bold-label">
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control input-default "
                    placeholder="Enter Title"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  {errors.title && (
                    <div className="text-danger fs-12">{errors.title}</div>
                  )}
                </div>
                <br />
                <div className="form-group ">
                  <label className="bold-label">
                    <b>Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    placeholder=" Enter Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                  {errors.description && (
                    <div className="text-danger fs-12">
                      {errors.description}
                    </div>
                  )}
                </div>
                <br />

                <div className="form-group multiple-input">
                  <label className="bold-label">
                    <b>Search Tags</b>
                  </label>
                  <div className={"container"}>
                    {tags &&
                      tags.map((item, index) => (
                        <Chip
                          size="small"
                          onDelete={() => handleDelete(item, index)}
                          label={item}
                          key={index}
                        />
                      ))}
                  </div>
                  <input
                    type="text"
                    className="form-control input-default "
                    value={currValue}
                    onChange={handleTag}
                    onKeyDown={handleKeyUp}
                    placeholder="Enter Serach tags"
                  />
                </div>
                {errors.tags && (
                  <div className="text-danger fs-12">{errors.tags}</div>
                )}

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div
                  className="form-group multiple-input"
                  style={{ display: "contents" }}
                >
                  <label className="bold-label">
                    <b>Blog Catgory</b>
                  </label>
                  <div className={"container"}>
                    {/* <CustomClearIndicator blogs={props.blogs} /> */}
                    <div style={{ width: "100%" }}>
                      <Select
                        width={"100%"}
                        options={props.blogCategorys?.map((prod) => ({
                          value: prod._id,
                          label: prod.title,
                        }))}
                        // isMulti
                        onChange={setBlogCategory}
                      />
                    </div>
                  </div>{" "}
                  {errors.category && (
                    <div className="text-danger fs-12">{errors.category}</div>
                  )}
                </div>
                <br />
                <div className="form-group ">
                  <label className="bold-label">
                    <b>Read Time</b>
                  </label>
                  <input
                    type="text"
                    className="form-control input-default "
                    placeholder="enter read time"
                    value={readTime}
                    required
                    onChange={(e) => {
                      setReadTime(e.target.value);
                    }}
                  />
                  {errors.readTime && (
                    <div className="text-danger fs-12">{errors.readTime}</div>
                  )}
                </div>
                <br />
                <div
                  className="form-group multiple-input"
                  style={{ display: "contents" }}
                >
                  <label className="bold-label">
                    <b>Related Post</b>
                  </label>
                  <div className={"container"}>
                    {/* <CustomClearIndicator blogs={props.blogs} /> */}
                    <div style={{ width: "100%" }}>
                      <Select
                        width={"100%"}
                        options={props.blogs?.map((prod) => ({
                          value: prod.id,
                          label: prod.title,
                        }))}
                        isMulti
                        onChange={setSelectedRelates}
                      />
                    </div>
                  </div>{" "}
                </div>
                <br />

                <div
                  className="form-group multiple-input"
                  style={{ display: "contents" }}
                >
                  <label className="bold-label">
                    <b>SEO Content</b>
                  </label>

                  <h6>Meta Tags</h6>
                  <div className={"container"}>
                    {metatags &&
                      metatags.map((item, index) => (
                        <Chip
                          size="small"
                          onDelete={() => handleDeleteMeta(item, index)}
                          label={item}
                          key={index}
                        />
                      ))}
                  </div>
                  <br />
                  <input
                    type="text"
                    className="form-control input-default "
                    value={currValueMeta}
                    onChange={handleTagMeta}
                    onKeyDown={handleKeyUpMeta}
                    placeholder="Enter meta tags"
                  />
                </div>

                {errors.metatags && (
                  <div className="text-danger fs-12">{errors.metatags}</div>
                )}
                <br />
                <h6>Meta Description</h6>
                <textarea
                  className="form-control"
                  rows="4"
                  value={metadescription}
                  placeholder="Enter Meta Description"
                  onChange={(e) => {
                    setMetadescription(e.target.value);
                  }}
                ></textarea>
                {errors.metadescription && (
                  <div className="text-danger fs-12">
                    {errors.metadescription}
                  </div>
                )}
                <br></br>
                <div className="form-group ">
                  <Grid container justify="center">
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      style={{
                        marginRight: "12px",
                        width: "100px",
                        height: "50px",
                        textAlign: "center",
                      }}
                      onClick={ResetData}
                    >
                      Discard
                    </button>
                    {!btnLoader ? (
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        style={{
                          width: "100px",
                          height: "50px",
                          // display: "block",
                          textAlign: "center",
                        }}
                        onClick={submitHandler}
                      >
                        Post
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </button>
                    )}
                  </Grid>
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
    client_id: state.auth.selectedStore.clientId,
    storeid: state.auth.selectedStore.id,
    blogpoststatus: state.blog.blogpostSuccess,
    blogs: state.blog.blogs?.data,
    blogCategorys: state.blog.blogsCategory?.data,
  };
};
export default connect(mapStateToProps)(BlogManagement);
