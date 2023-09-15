import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Chip } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import {
  BlogEditAction,
  loadingToggleAction,
  IamgeGetAction,
  clearImageAction,
  BlogGetAction,
  BlogCategoryGetAction,
} from "../../../store/actions/BlogActions";

const BlogEdit = (props) => {
  // console.log("props", props.blogs);
  const dispatch = useDispatch();

  const [row, setRow] = useState(props.location.state);
  console.log("rowww", row);
  useEffect(() => {
    //  console.log("image", row.imageName);
    dispatch(loadingToggleAction(true));
    dispatch(clearImageAction());
    dispatch(BlogGetAction(props.storeid));
    dispatch(BlogCategoryGetAction(props.storeid));
  }, []);
  const [image, setImage] = useState({
    preview: "",
    currentPreview: "",
    raw: "",
  });
  console.log("image", image);
  console.log("row?.imageName", row?.imageName);

  const [title, setTitle] = useState(row.title);
  const [description, setDescription] = useState(row.description);
  const [readTime, setReadTime] = useState(row.readTime);
  const [metatags, setMetaTags] = useState(row.metaTags);
  const [metadescription, setMetadescription] = useState(row.metaDescription);
  const [tags, setTags] = useState(row.tags);
  const [currValue, setCurrValue] = useState("");
  const [currValueMeta, setCurrValueMeta] = useState("");
  const [selectedRelated, setSelectedRelates] = useState(row.relatedPosts);
  const [blogCategory, setBlogCategory] = useState(row.categoryId);
  const [defaultCategory, setDefaultCategory] = useState();
  // console.log("realted", selectedRelated);
  // console.log("blogs", props.blogs);

  // console.log("blogCategory", blogCategory);

  // let blogs = props.blogs.filter(({ id }) => id.includes(selectedRelated));
  // blogs = blogs.find((x) => x.id == selectedRelated);
  // console.log("bew", blogs);
  // blogs;

  useEffect(() => {
    console.log('fff',tags)
  },[tags])
  function containsOnlySpaces(str) {
    return str.trim().length === 0;
  }

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        currentPreview: "",
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
    //console.log(e.keyCode);
    if (e.keyCode === 13 && e.target.value !== '' && !containsOnlySpaces(e.target.value)) {
      e.target.value = e.target.value.trim()
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };

  const handleTag = (e) => {
    setCurrValue(e.target.value);
  };

  let errorsObj = {
    title: "",
    description: "",
    metatags: "",
    metadescription: "",
    tags: "",
    readTime: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const handleDeleteMeta = (item, index) => {
    let arr = [...metatags];
    arr.splice(index, 1);
    //console.log(item);
    setMetaTags(arr);
  };

  const handleKeyUpMeta = (e) => {
    //console.log(e.keyCode);32
    if (e.keyCode === 13 && e.target.value !== '' && !containsOnlySpaces(e.target.value)) {
      e.target.value = e.target.value.trim()
      setMetaTags((oldState) => [...oldState, e.target.value]);
      setCurrValueMeta("");
    }
  };

  const handleTagMeta = (e) => {
    // const tt = e.target.value.replace(/[,.]/g, "");
    setCurrValueMeta(e.target.value);
  };
  let history = useHistory();
  const [loader, SetLoader] = useState(false);

  const submitHandler = () => {
    SetLoader(true);

    //console.log(tags);
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
      errorObj.tags = "At least 2 Tags is Required";
      error = true;
    }
    if (description === "") {
      errorObj.description = "Description is Required";
      error = true;
    } else if (description.length < 4) {
      errorObj.description = "At least 4 characters Required";
      error = true;
    }
    // else if (description.length > 50) {
    //   errorObj.description = "Only 50 characters allowed";
    //   error = true;
    // }
    if (metadescription === "") {
      errorObj.metadescription = "Meta Description is Required";
      error = true;
    } else if (metadescription.length < 4) {
      errorObj.metadescription = "At least 4 characters Required";
      error = true;
    }
    //  else if (metadescription.length > 50) {
    //   errorObj.description = "Only 50 characters allowed";
    //   error = true;
    // }
    if (metatags.length < 2) {
      errorObj.metatags = "At least 2 Tags is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      SetLoader(false);
      return;
    } else {
      const formData = new FormData();
      formData.append("id", row.id);
      formData.append("file", image.raw);
      formData.append("title", title);
      formData.append("readTime", readTime);
      formData.append("image_title", image.raw.name);
      formData.append("heading", title);
      formData.append("description", description);
      selectedRelated?.forEach((item) =>
        formData.append("relatedPosts", item.value)
      );
      formData.append("categoryId", blogCategory.value);
      formData.append("meta_description", metadescription);
      tags.forEach((item) => formData.append("tags", item));
      metatags.forEach((item) => formData.append("meta_tags", item));
      formData.append("status", false);
      dispatch(loadingToggleAction(true));
      dispatch(BlogEditAction(formData, history, SetLoader));
    }
  };

  const ResetData = () => {
    setImage({
      preview: "",
      raw: "",
    });
    setTitle(row.title);
    setDescription(row.description);
    setMetaTags(row.metaTags);
    setTags(row.tags);
    setMetadescription(row.metaDescription);
  };
  // console.log("row", row);
  // console.log("row", row?.imageName);
  // console.log("image", image);

  const [rp, setRp] = useState([]);

  useEffect(() => {
    let rpInner = [];
    if (Array.isArray(props.blogs)) {
      rpInner = props.blogs?.map((blogItem) => {
        if (selectedRelated?.includes(blogItem.id)) {
          return {
            value: blogItem.id,
            label: blogItem.title,
          };
        } else {
          return null;
        }
      });
    }
    // console.log("rpInner", rpInner);

    if (rpInner.length) {
      rpInner = rpInner.filter((n) => n);
      // console.log("spider", rpInner);
      setRp(rpInner);
    }
  }, [props.blogs]);

  // useEffect(() => {
  //   console.log("rppppppppppp", rp);
  // }, [rp]);

  useEffect(() => {
    // console.log("dhonei", props.blogCategorys);
    let sc = props.blogCategorys?.find((prod) => prod._id == blogCategory);

    // console.log("sssccc", sc.title);
    console.count();
    setDefaultCategory({
      label: sc?.title,
      value: sc?._id,
    });
    // setDefaultCategory(sc?.title);
  }, [blogCategory, props.blogCategorys]);

  // useEffect(() => {
  //   console.log("defaultCategory===>", defaultCategory);
  // }, [defaultCategory]);
  // console.log("rp===>", rp);

  function handleCategoryChange(e) {
    // console.log("finalll", e);
    setDefaultCategory(e);
    setBlogCategory(e.value);
  }
  function handleRelatedChange(e) {
    // console.log("finalll relati", e);
    setRp(e);
    setSelectedRelates(e.value);
  }

  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              {/* <div className="card-header">
                <h4 className="card-title">Content *</h4>
              </div> */}
              <div className="card-body">
                <div>
                  <label className="bold-label">
                    <b>Blog Image</b>
                  </label>
                  <label
                    htmlFor="upload-button"
                    className="upload-button"
                    style={{ height: "422px" }}
                  >
                    {row?.imageName && image?.preview === "" ? (
                      <>
                        <img
                          // src={
                          //   "https://t3.ftcdn.net/jpg/02/91/54/38/360_F_291543809_26XYk48erTYbRDdu7MxOCOzAyEwtCMK5.jpg"
                          // }
                          src={`https://wimos-client-1.s3.us-west-2.amazonaws.com/blogs/${row.storeId}/${row.imageName}`}
                          alt="blog"
                          className="image-preview"
                          style={{ maxHeight: "422px" }}
                        />
                        <div class="overlay">
                          <div class="edit-icon" title="User Profile">
                            <i class="fa fa-pen"></i>
                            <p>Change Image</p>
                          </div>
                        </div>
                      </>
                    ) : image?.preview !== "" ? (
                      <img
                        // src={`data:image/jpeg;base64,` + props.image}
                        src={image?.preview}
                        alt="blogs"
                        className="image-preview"
                      />
                    ) : (
                      <div className="upload-product">
                        <span>
                          <i className="fa fa-spinner fa-spin" />
                        </span>
                        {/* <h5 className="text-center">UPLOAD FROM YOUR DEVICE</h5> */}
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
                  {/* <button onClick={handleUpload}>Upload</button> */}
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
                    placeholder="enter title"
                    value={title}
                    required
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
                    placeholder="Enter Serach tags seperate with space"
                  />
                  {errors.tags && (
                    <div className="text-danger fs-12">{errors.tags}</div>
                  )}
                </div>
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
                        // value={selectedRelated}
                        //   value = {
                        //     props.options.filter(option =>
                        //        option.label === 'Some label')
                        //  }
                        value={defaultCategory}
                        width={"100%"}
                        options={props.blogCategorys?.map((prod) => ({
                          value: prod._id,
                          label: prod.title,
                        }))}
                        // isMulti
                        onChange={handleCategoryChange}
                      />
                    </div>
                  </div>{" "}
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
                        // value={selectedRelated}
                        // defaultValue={selectedRelated?.map((prod) => ({
                        //   value: prod.id,
                        //   label: prod.title,
                        // }))}

                        value={rp}
                        width={"100%"}
                        options={props.blogs?.map((prod) => ({
                          value: prod.id,
                          label: prod.title,
                        }))}
                        isMulti
                        onChange={handleRelatedChange}
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
                  {errors.metatags && (
                    <div className="text-danger fs-12">{errors.metatags}</div>
                  )}
                </div>{" "}
                <br />
                <h6>Meta Description</h6>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  value={metadescription}
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
                    {!loader ? (
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
    blogs: state.blog.blogs.data,
    storeid: state.auth.selectedStore.id,
    image: state.blog.blogimage,
    blogCategorys: state.blog.blogsCategory?.data,
  };
};
export default connect(mapStateToProps)(BlogEdit);
