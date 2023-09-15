import React, { Fragment, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Rte from "./Rte";
import {
  PageEditAction,
  loadingToggleAction,
} from "../../../store/actions/PageAction";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { storeAction } from "../../../store/actions/AuthActions";
import { Editor } from "@tinymce/tinymce-react";
import { useHistory } from "react-router-dom";

//import data from "./tableData.js";

const PageEdit = (props) => {
  const dispatch = useDispatch();
  const [row, setRow] = useState(props.location.state);
  const [title, setTitle] = useState(row.title);
  const [name, setName] = useState(row.name);

  const [content, setContent] = useState(row.content);
  const handleEditorChange = (content, editor) => {
    setContent(content);
  };
  let errorsObj = {
    title: "",
    content: "",
    name: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  let history = useHistory();
  const [btnLoader, SetBtnLoader] = useState(false);

  const submitHandler = async (e) => {
    let error = false;
    const errorObj = { ...errorsObj };
    if (title === "") {
      errorObj.title = "Title is Required";
      error = true;
    }
    if (name === "") {
      errorObj.name = "Name is Required";
      error = true;
    }
    if (content === "") {
      errorObj.content = "content is Required";
      error = true;
    } else if (content.length < 6) {
      errorObj.content = "At least 6 characters Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    } else {
      SetBtnLoader(true);
      const Data = {
        storeId: props.storeId,
        pageId: row.id,
        name: name,
        title: title,
        content: content,
        status: row.status,
      };

      dispatch(loadingToggleAction(true));
      dispatch(PageEditAction(Data, props.storeId, history, SetBtnLoader));
    }
  };
  const ResetData = () => {
    setTitle(row.title);
    setContent(row.content);
  };
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Create Page</h4>
          {/* {props.title} */}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <label className="mb-1" htmlFor="val-email">
                <strong>Page Name</strong>
              </label>
              <input
                className="form-control"
                placeholder="Enter Your title"
                label="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              {errors.name && (
                <div className="text-danger fs-12">{errors.name}</div>
              )}
            </div>
            <div className="col-6">
              <label className="mb-1" htmlFor="val-email">
                <strong>Page Title</strong>
              </label>
              <input
                className="form-control"
                placeholder="Enter Your title"
                label="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
              {errors.title && (
                <div className="text-danger fs-12">{errors.title}</div>
              )}
            </div>
          </div>
          <br />
          <label className="mb-1" htmlFor="val-email">
            <strong>Content</strong>
          </label>
          {/* <textarea
            placeholder="Enter Your content"
            name="body"
            className="form-control"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          /> */}
          <Editor
            // initialValue="<p></p>"
            value={content}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image code charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | code |link | image | bold italic backcolor |  alignleft aligncenter alignright alignjustify | \n" +
                "bullist numlist outdent indent | removeformat | help ",
              content_style: "body { color: #828282 }",
            }}
            onEditorChange={handleEditorChange}
          />{" "}
          {errors.content && (
            <div className="text-danger fs-12">{errors.content}</div>
          )}
          {/* <div className="summernote">
            <Rte />
          </div> */}
          <br />
          <div className="form-group ">
            <button
              type="submit"
              className="btn btn-outline-primary"
              style={{ marginRight: "12px" }}
              onClick={ResetData}
            >
              Discard Item
            </button>
            {!btnLoader ? (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitHandler}
              >
                Save Changes
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
  );
};

const mapStateToProps = (state) => {
  return {
    storeId: state.auth.selectedStore.id,
  };
};
export default connect(mapStateToProps, {
  storeAction,
})(PageEdit);
