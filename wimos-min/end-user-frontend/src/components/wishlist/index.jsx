import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import {
  deleteWishlistInfo,
  delteCurrentWishlist,
} from "src/redux/actions/main";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useIPFS } from "../../hooks/useIPFS";
import { useState, useEffect } from "react";
import Button from "@ui/button";

const WishList = ({
  className,
  title,
  path,
  desc,
  time,
  date,
  author,
  image,
  status,
  nftId,
  wishId,
  collectionId,
  product,
}) => {
  const dispatch = useDispatch();
  //   console.log("prrooooooooooooooooo", product.collectionId);

  const { resolveLink } = useIPFS();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const [fetchSuccess, setFetchSuccess] = useState(true);

  useEffect(() => {
    GetNFTHandler(product);
  }, [product]);

  const GetNFTHandler = async (product) => {
    console.log("in", product);
    if (product) {
      setFetchSuccess(true);

      if (product?.uri) {
        try {
          if (product.uri.substring(8, 12) == "ipfs") {
            product.uri = product.uri.replace(
              /^.{28}/g,
              "https://gateway.moralisipfs.com"
            );
          } else {
            product.uri = uri;
          }
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
    }
  };

  const handleDeleteAddToWishList = () => {
    const Data = {
      nftId: product?.id,
    };
    // console.log("data", Data);
    dispatch(delteCurrentWishlist(Data));
  };
  //   console.log("immmmmmmmmmm", NFTTokenIds);

  return (
    <>
      <div className={clsx("single-activity-wrapper-wishlist", className)}>
        <div className="inner">
          <div className="read-content">
            {/* {image?.src && ( */}
            <div className="thumbnail">
              <Anchor path={`/product/${product?.id}`}>
                <Image
                  // src="/images/bg/bg-image-9.jpg"
                  src={NFTTokenIds?.image || "/images/bg/bg-image-9.jpg"}
                  // alt={image?.alt || "Nft_Profile"}
                  width={500}
                  height={500}
                />
              </Anchor>
            </div>
            {/* )} */}
            <div className="content">
              <Anchor path={`/product/${product?.id}`}>
                {/* path={`/product/${id}`} */}
                <h6 className="title">{title}</h6>
              </Anchor>
              <Anchor path={`/collections/${product?.collectionId?.id}`}>
                <p>{product?.collectionId?.name}</p>
              </Anchor>
              <div className="time-maintane">
                <div className="time data">
                  <i className="feather-clock" />
                  <span> {moment(date).format("DD MMM YYYY")}</span>
                </div>
                {/* <div className="user-area data">
                <i className="feather-user" />
                <Anchor path={"#"}>author.name</Anchor>
              </div> */}
              </div>
            </div>
          </div>
          <div
            className="icone-area-close"
            style={{ cursor: "pointer" }}
            onClick={handleDeleteAddToWishList}
          >
            {/* 4d4e4e */}
            {/* <i className="bi bi-x-circle" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
WishList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.shape({
    src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]).isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  status: PropTypes.oneOf(["follow", "sale", "like", "offer"]),
};

export default WishList;
