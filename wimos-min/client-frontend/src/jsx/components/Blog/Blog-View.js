import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

const BlogView = (props) => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [row, setRow] = useState(props.location.state);

  //   const handleChange = (e) => {
  //     if (e.target.files.length) {
  //       setImage({
  //         preview: URL.createObjectURL(e.target.files[0]),
  //         raw: e.target.files[0],
  //       });
  //     }
  //   };

  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <label className="bold-label"></label>
                  <div className="upload-button">
                    <img className="nft-view-image" src={row.blog} />
                  </div>
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
            {/* <div className="card"> */}
            <div className="card-body">
              <div className="form-group ">
                <label className="bold-label">
                  <b>Title</b>
                </label>
                <p>Test name 1</p>
              </div>
              <br />
              <div className="form-group ">
                <label className="bold-label">
                  <b>Description</b>
                </label>
                {/* <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Test name 1"
                  disabled
                ></textarea> */}
                <p>Test name 1</p>
              </div>
              <br />
              <label className="bold-label">
                <b>SEO Content</b>
              </label>
              <h6>Meta Tag</h6>
              {/* <input
                type="text"
                className="form-control input-default "
                placeholder="test Meta Tag 1"
                disabled
              /> */}{" "}
              <p>test Meta Tag 1</p>
              <h6>Description</h6>
              {/* <textarea
                className="form-control"
                rows="4"
                placeholder="meta mask Description"
                disabled
              ></textarea> */}{" "}
              <p>test meta mask Description</p>
            </div>

            {/* <div className="row">
              <div className="col-xl-12">
                <div className="row">
                  <div className="col-12">
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
                        >
                          Discard
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                          style={{
                            width: "100px",
                            height: "50px",
                            // display: "block",
                            textAlign: "center",
                          }}
                        >
                          Post
                        </button>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogView;
