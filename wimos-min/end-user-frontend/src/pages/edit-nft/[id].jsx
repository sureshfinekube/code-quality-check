/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Web3 from "web3";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import { UpdateNft } from "src/redux/actions/main";
import { useIPFS } from "src/hooks/useIPFS";
import {
  getContract,
  getCollection,
  getAllStoreNfts,
  getCurrentStore,
  getTopCollections,
  getTopNfts,
  getAuctionNft,
  updateLoader,
  getHomeData,
  getBlogsData,
} from "src/redux/actions/main";
import Loader from "@containers/loader";

// import { getNFTData } from "src/redux/actions/main";
// import { UpdateNft } from "src/redux/actions/main";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const EditNft = ({ className, space, Collections, nft, loader, getStore }) => {
  // const getContract = useSelector((state) => state.main.getContract);
  // console.log("test", getContract.nftContract.contract_address);
  // console.log("bla", product);
  // useEffect(() => {
  //   // console.log("0000", router.query.path);
  //   dispatch(getNFTData(router.query.id));
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (getStore === "") {
      dispatch(updateLoader(true));
      dispatch(getHomeData());
      dispatch(getCurrentStore());
      dispatch(getContract());
      dispatch(getCollection());
      dispatch(getAllStoreNfts());
      dispatch(getTopCollections());
      dispatch(getTopNfts());
      dispatch(getBlogsData());
      dispatch(getAuctionNft());
    }
  }, [getStore]);
  const router = useRouter();
  let product = "";
  // const nft = useSelector((state) => state.main.getAllStoreNft);
  // console.log("selector", nft);
  try {
    product = nft.find(({ id }) => id === router.query.id);
  } catch (error) {
    //console.log(error);
  }

  const { resolveLink } = useIPFS();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const [fetchSuccess, setFetchSuccess] = useState(true);

  // console.log("12345", NFTTokenIds);
  const web03 = new Web3(Web3.givenProvider);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [hasImageError, setHasImageError] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [contract, setContract] = useState("erc721");
  const [btnsubmit, setBtnsubmit] = useState(false);
  const [name, setName] = useState(NFTTokenIds.name);
  const [description, setDescription] = useState(NFTTokenIds.description);
  const [external_link, setExternal_link] = useState();
  const [collection, setCollection] = useState();
  const [royalities, setRoyalities] = useState();
  const [block_chain, setBlock_chain] = useState();
  const [copies, setCopies] = useState();

  const { account, user, isAuthenticated, authenticate } = useMoralis();

  useEffect(() => {
    NFTDataHandler(product);
  }, [product]);

  const NFTDataHandler = async (product) => {
    if (product) {
      // const NFTs = nft.result;
      //setTotalNFTs(nft.total);
      setFetchSuccess(true);
      // for (let NFT of product) {
      // if (NFT?.metadata) {
      //   NFT.metadata = JSON.parse(NFT.metadata);
      //   NFT.image = resolveLink(NFT.metadata?.image);
      // } else
      if (product?.uri) {
        try {
          await fetch(product.uri)
            .then((response) => response.json())
            .then((data) => {
              product.image = resolveLink(data.image);
              product.metadata = {
                name: data.name,
                description: data.description,
                copies: data.copies,
                block_chain: data.block_chain,
              };
            });
        } catch (error) {
          setFetchSuccess(false);
        }
      }

      setNFTTokenIds(product);
      // setSelectedImage(NFTTokenIds.image);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const notify = () => toast("Your NFT has updated");
  const errornotify = () =>
    toast.error("An error occured! your NFT not updated");

  const handleProductModal = () => {
    setShowProductModal(false);
  };

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // console.log("log", history);
  const onSubmit = async (data, e) => {
    setBtnsubmit(true);
    const { target } = e;
    const submitBtn =
      target.localName === "span" ? target.parentElement : target;
    const isPreviewBtn = submitBtn.dataset?.btn;
    // setHasImageError(!selectedImage);
    if (isPreviewBtn && selectedImage) {
      setPreviewData({ ...data, image: selectedImage });
      setShowProductModal(true);
    }
    if (!isPreviewBtn) {
      // console.log(data);
      // console.log(selectedImage);
      try {
        // Attempt to save image to IPFS
        // const file1 = new Moralis.File(selectedImage.name, selectedImage);
        // await file1.saveIPFS();
        // const file1url = file1.ipfs();
        // // Generate metadata and save to IPFS
        // const metadata = {
        //   name: data.name,
        //   description: data.description,
        //   external_link: data.external_link,
        //   collection: data.collection,
        //   copies: "1",
        //   royalities: data.royalties,
        //   block_chain: data.block_chain,
        //   image: file1url,
        // };
        // const file2 = new Moralis.File(`${data.name}metadata.json`, {
        //   base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
        // });
        // await file2.saveIPFS();
        // const metadataurl = file2.ipfs();
        // console.log("metadataurl: ", metadataurl);
        // // Interact with smart contract
        // const contract = new web03.eth.Contract(
        //   getContract.nftContract.abi,
        //   getContract.nftContract.contract_address
        // );
        // //  console.log("contract: ", contract);
        // const response = await contract.methods
        //   .mintToken(metadataurl)
        //   .send({ from: user.get("ethAddress") });
        // // const aprrove = await contract.methods
        // //   .setApprovalForAll(
        // //     getContract.marketPlaceContract.contract_address,
        // //     true
        // //   )
        // //   .send({ from: user.get("ethAddress") });

        // // Get token id
        // console.log("response: ", response);
        // // console.log("aprrove: ", aprrove);
        // const tokenId = response.events.Transfer.returnValues.tokenId;
        // //market place
        // const marketContract = new web03.eth.Contract(
        //   getContract.marketPlaceContract.abi,
        //   getContract.marketPlaceContract.contract_address
        // );
        // console.log(
        //   tokenId,
        //   data.royalities,
        //   getContract.nftContract.contract_address
        // );
        // const marketResponse = await marketContract.methods
        //   .create_market_items_erc721(
        //     tokenId,
        //     getContract.nftContract.contract_address,
        //     data.royalities
        //   )
        //   .send({ from: user.get("ethAddress") });
        // console.log("marketResponse: ", marketResponse);
        // const itemId =
        //   marketResponse.events.create_market_items_for_erc721.returnValues
        //     .itemId;

        // Api call
        const Data = {
          id: router.query.id,
          description: data.description,
          name: data.name,
        };
        dispatch(UpdateNft(Data, router));
        // Display alert
        notify();
        reset();
        setSelectedImage();
        setBtnsubmit(false);
      } catch (err) {
        // console.log("err", err);
        errornotify();
        setBtnsubmit(false);
      }
    }
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <div
          className={clsx(
            "create-area",
            space === 1 && "rn-section-gapTop",
            className
          )}
        >
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                  <div className="upload-area">
                    <div className="upload-formate mb--30">
                      <h6 className="title">
                        Upload file <span style={{ color: "red" }}>*</span>
                      </h6>
                      <p className="formate">
                        Drag or choose your file to upload
                      </p>
                    </div>

                    <div className="brows-file-wrapper">
                      <input
                        name="file"
                        id="file"
                        type="file"
                        className="inputfile"
                        data-multiple-caption="{count} files selected"
                        multiple
                        onChange={imageChange}
                        disabled
                      />
                      {!selectedImage ? (
                        <img
                          id="createfileImage"
                          src={NFTTokenIds.image}
                          alt=""
                          data-black-overlay="6"
                        />
                      ) : (
                        <img
                          id="createfileImage"
                          src={URL.createObjectURL(selectedImage)}
                          alt=""
                          data-black-overlay="6"
                        />
                      )}

                      <label htmlFor="file" title="No File Choosen">
                        {/* <i className="feather-upload" />
                      <span className="text-center">Choose a File</span>
                      <p className="text-center mt--10">
                        PNG, GIF, WEBP, MP4 or MP3. <br /> Max 1Gb.
                      </p> */}
                      </label>
                    </div>
                    {/* {hasImageError && !selectedImage && (
                    <ErrorText>Image is required</ErrorText>
                  )} */}
                  </div>

                  {/* <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                  <h5> Note: </h5>
                  <span>
                    {" "}
                    Service fee : <strong>2.5%</strong>{" "}
                  </span>{" "}
                  <br />
                  <span>
                    {" "}
                    You will receive : <strong>25.00 ETH $50,000</strong>
                  </span>
                </div> */}
                </div>
                <div className="col-lg-7">
                  <div className="form-wrapper-one">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-box pb--20">
                          <label htmlFor="name" className="form-label">
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            // value={NFTTokenIds.name}
                            defaultValue={NFTTokenIds.name}
                            id="name"
                            placeholder="e. g. `My NFT`"
                            {...register("name", {
                              value: NFTTokenIds.name,
                              required: "Name is required",
                            })}
                          />
                          {errors.name && (
                            <ErrorText>{errors.name?.message}</ErrorText>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="input-box pb--20">
                          <label htmlFor="Description" className="form-label">
                            Description
                          </label>
                          <textarea
                            defaultValue={NFTTokenIds.description}
                            id="description"
                            rows="3"
                            placeholder="e. g. “After purchasing the product you can get item...”"
                            {...register("description", {
                              value: NFTTokenIds.description,
                            })}
                          />
                          {/* {errors.discription && (
                          <ErrorText>{errors.discription?.message}</ErrorText>
                        )} */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label htmlFor="External Link" className="form-label">
                            External Link
                          </label>
                          <input
                            disabled
                            defaultValue={NFTTokenIds.external_link}
                            id="external_link"
                            placeholder="e. g. `https://www.example.com`"
                            {...register("external_link", {
                              value: NFTTokenIds.external_link,
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label htmlFor="collection" className="form-label">
                            Select Collection
                          </label>
                          <select
                            disabled
                            defaultValue={NFTTokenIds.collection}
                            id="collection"
                            placeholder="Select Collection"
                            {...register("collection", {
                              value: NFTTokenIds.collection,
                            })}
                          >
                            {Collections &&
                              Collections.map((collection, index) => (
                                <option value={collection.id} key={index}>
                                  {collection.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* <div className="col-md-4">
                      <div className="input-box pb--20">
                        <label htmlFor="price" className="form-label">
                          Item Price in $
                        </label>
                        <input
                          id="price"
                          placeholder="e. g. `20$`"
                          {...register("price", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Please enter a number",
                            },
                            required: "Price is required",
                          })}
                        />
                        {errors.price && (
                          <ErrorText>{errors.price?.message}</ErrorText>
                        )}
                      </div>
                    </div> */}

                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label htmlFor="Royalities" className="form-label">
                            Royalities
                          </label>
                          <input
                            disabled
                            defaultValue={NFTTokenIds.royalities}
                            id="royalities"
                            placeholder="e. g. `20`"
                            {...register("royalities", {
                              value: NFTTokenIds.royalities,
                            })}
                          />
                          {/* {errors.size && (
                          <ErrorText>{errors.size?.message}</ErrorText>
                        )} */}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-box pb--20">
                          <label htmlFor="Block Chain" className="form-label">
                            Block Chain
                          </label>
                          <select
                            disabled
                            id="block_chain"
                            placeholder="Select Blok Chain"
                            {...register("block_chain")}
                          >
                            <option value="Ethereum">Ethereum</option>
                            {/* <option value="mycollection">My Collection</option> */}
                          </select>
                        </div>
                      </div>

                      {contract === "erc115" ? (
                        <div className="col-md-6">
                          <div className="input-box pb--20">
                            <label htmlFor="Copies" className="form-label">
                              Copies
                            </label>
                            <input
                              disabled
                              id="copies"
                              placeholder="e. g. `20`"
                              {...register("copies")}
                            />
                            {/* {errors.size && (
                            <ErrorText>{errors.size?.message}</ErrorText>
                          )} */}
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-6"> </div>
                      )}
                      <div className="col-md-6"> </div>
                      {/* <div className="col-md-6"> </div> */}
                      {/* <div className="col-md-12">
                      <div className="input-box pb--20">
                        <label htmlFor="Royality" className="form-label">
                          Royality
                        </label>
                        <input
                          id="royality"
                          placeholder="e. g. `20%`"
                          {...register("royality", {
                            required: "Royality is required",
                          })}
                        />
                        {errors.royality && (
                          <ErrorText>{errors.royality?.message}</ErrorText>
                        )}
                      </div>
                    </div> */}

                      {/* <div className="col-md-4 col-sm-4">
                      <div className="input-box pb--20 rn-check-box">
                        <input
                          className="rn-check-box-input"
                          type="checkbox"
                          id="putonsale"
                        />
                        <label
                          className="rn-check-box-label"
                          htmlFor="putonsale"
                        >
                          Put on Sale
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div className="input-box pb--20 rn-check-box">
                        <input
                          className="rn-check-box-input"
                          type="checkbox"
                          id="instantsaleprice"
                        />
                        <label
                          className="rn-check-box-label"
                          htmlFor="instantsaleprice"
                        >
                          Instant Sale Price
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div className="input-box pb--20 rn-check-box">
                        <input
                          className="rn-check-box-input"
                          type="checkbox"
                          id="unlockpurchased"
                        />
                        <label
                          className="rn-check-box-label"
                          htmlFor="unlockpurchased"
                        >
                          Unlock Purchased
                        </label>
                      </div>
                    </div> */}

                      {/* <div className="col-md-12 col-xl-4">
                      <div className="input-box">
                        <Button
                          color="primary-alta"
                          fullwidth
                          type="submit"
                          data-btn="preview"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Preview
                        </Button>
                      </div>
                    </div> */}

                      <div className="col-md-12 col-xl-12 mt_lg--15 mt_md--15 mt_sm--15">
                        <div className="input-box">
                          <Button type="submit" fullwidth>
                            {!btnsubmit ? (
                              "Submit Item"
                            ) : (
                              // <Image
                              //   src={loader}
                              //   alt="loader"
                              //   width={20}
                              //   height={16}
                              // />
                              <div className="create-load"> </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                  <h5> Note: </h5>
                  <span>
                    {" "}
                    Service fee : <strong>2.5%</strong>{" "}
                  </span>{" "}
                  <br />
                  <span>
                    {" "}
                    You will receive : <strong>25.00 ETH $50,000</strong>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
        {showProductModal && (
          <ProductModal
            show={showProductModal}
            handleModal={handleProductModal}
            data={previewData}
          />
        )}
      </>
    );
  }
};

// export async function getStaticProps({ params: { id } }) {
//   // ↓add
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// }

EditNft.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1]),
};

EditNft.defaultProps = {
  space: 1,
};

const mapStateToProps = (state) => {
  return {
    Collections: state.main.collectionsData,
    getContract: state.main.getContract,
    getUser: state.main.getCurrentUser,
    nft: state.main.getAllStoreNft,
    loader: state.main.loader,
    getStore: state.main.getCurrentStoreData,
  };
};

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export default connect(mapStateToProps)(EditNft);
