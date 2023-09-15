import React, { useState } from "react";
// import { Table, Pagination } from "react-bootstrap";
import Rte from "../Forms/Summernote/Rte";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
const Editnft = (props) => {
  const [row, setRow] = useState(props.location.state);

  const [image, setImage] = useState({ preview: row.nft, raw: "" });
  const [nftname, setNftname] = useState(row.nft_name);
  const [statuschange, setStatusChange] = useState(row.status);
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  //   const handleUpload = async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("image", image.raw);

  //     await fetch("YOUR_URL", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     });
  //   };

  return (
    <div>
      <PageTitle activeMenu="Edit NFT" motherMenu="Home" />
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
                    <label className="bold-label">NFT Content *</label>
                    <label htmlFor="upload-button" className="upload-button">
                      {image.preview ? (
                        <>
                          <img
                            src={image.preview}
                            alt="dummy"
                            className="image-preview"
                          />
                          <div className="overlay">
                            <div className="edit-icon" title="User Profile">
                              <i className="fa fa-pen"></i>
                              <p>Change Image</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="upload-product">
                          <span className="fa-stack fa-2x mt-3 mb-2">
                            <i
                              className="fas fa-circle fa-stack-2x"
                              style={{ color: "#bb3f96" }}
                            />
                            <i className="bi bi-file-earmark-arrow-up fa-stack-1x fa-inverse" />
                          </span>
                          <h5 className="text-center">
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
                    {/* <button onClick={handleUpload}>Upload</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* <div className="card-header">
                <h4 className="card-title">NFT interface *</h4>
              </div> */}
                <div className="card-body">
                  <label className="bold-label">{row.nft_name}</label>
                  <p>Created By {row.created_by}</p>
                  <label className="bold-label">Status</label>
                  <div className="d-flex">
                    {row.status && (
                      <div className="badge badge-outline-success badge-rounded">
                        On Sale
                      </div>
                    )}
                    {!row.status && (
                      <div className="badge badge-outline-dark badge-rounded">
                        Off Sale
                      </div>
                    )}
                    <div className="d-flex align-items-center">
                      <div className="form-check form-switch toggle-switch">
                        <input
                          className="form-check-input custome"
                          type="checkbox"
                          id="flexSwitchCheckChecked1"
                          checked={statuschange}
                          //  onChange={(e) => ChangeStatus(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="form-group ">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option1"
                        defaultChecked
                      />
                      <label className="form-check-label">
                        Show on store website
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        value="option1"
                      />
                      <label className="form-check-label">
                        Hide on store website
                      </label>
                    </div>
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
                {/* <div className="card-header">
                <h4 className="card-title">NFT interface *</h4>
              </div> */}
                <div className="card-body">
                  <div className="form-group mb-3">
                    <label className="bold-label">NFT Interface *</label>
                    <select defaultValue={"option"} className="form-control">
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label className="bold-label">Collection *</label>
                    <select defaultValue={"option"} className="form-control">
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label className="bold-label">Name *</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="name"
                      value={nftname}
                    />
                  </div>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3">
                        <label className="bold-label">Royalties *</label>
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="enter royalty fee"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="form-group mb-3">
                        <label className="bold-label">Number of copies *</label>
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="enter qundity"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="bold-label">Category *</label>
                    <select defaultValue={"option"} className="form-control">
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  <div className="form-group ">
                    <label className="bold-label">Description</label>
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-12">
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ marginRight: "12px" }}
                >
                  Discard Item
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editnft;
