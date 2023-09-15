import clsx from "clsx";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import ProductDetailsArea from "@containers/product-details";
import { useSelector, connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useIPFS } from "../../hooks/useIPFS";
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
  getNFTData,
  getMyCollectionsNFT,
} from "src/redux/actions/main";
import { useDispatch } from "react-redux";
import Loader from "@containers/loader";
import MoreThisCollection from "./moreThisCollection";
import OfferPage from "./offer-page";
import { useTheme } from "next-themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export async function getStaticProps() {
  return { props: { className: "template-color-1" } };
}

const ProductDetails = ({ className, nftGet, loaders }) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.main.loader);
  const storedata = useSelector((state) => state.main.getCurrentStoreData);
  const collectionNFTdata = useSelector(
    (state) => state.main.getCollectionsNFT
  );
  const { theme } = useTheme();

  // Calling all major APIs if redux store data is empty (page refresh condition)
  useEffect(() => {
    // console.log('here')
    // console.count()
    if (storedata === "") {
      dispatch(updateLoader(true));
      dispatch(getHomeData());
      dispatch(getCurrentStore());
      dispatch(getContract());
      dispatch(getCollection());
      dispatch(getTopCollections());
      dispatch(getTopNfts());
      dispatch(getBlogsData());
      dispatch(getAuctionNft());
    }
  }, [storedata]);

  const router = useRouter();
  useEffect(() => {
    // dispatch(getAllStoreNfts());
    console.log("tijo superada");
    dispatch(getNFTData(router.query?.id));
  }, [router]);

  // const [product, setProduct] = useState();
  let product = "";
  // const nft = useSelector((state) => state.main.getAllStoreNft);
  const nft = useSelector((state) => state.main.getNFT);
  // const nft = useSelector((state) => state.main.getCollectionsNFT);

  try {
    // console.log("jaango", nft);
    product = nft?.find(({ id }) => id === router.query.id);
    // console.log("jaangoproduct", product);

    // product = nft;
  } catch (error) {
    // console.log(error);
  }
  // console.log("productproduct++", product);

  const { resolveLink } = useIPFS();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const [collectionNFTDatas, setCollectioNFTDatas] = useState([]);

  useEffect(() => {
    GetNFTHandler(product);
    dispatch(getMyCollectionsNFT(product?.collectionId));
  }, [product]);

  const GetNFTHandler = async (product) => {
    console.log('ramachan')
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

          /*          !!Temporary work around to avoid CORS issues when retrieving NFT images!!
            Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
            Replace <your url here> with your proxy server_url below
            Remove comments :)

              try {
                await fetch(`<your url here>/${NFT.token_uri}`)
                .then(response => response.json())
                .then(data => {
                  NFT.image = resolveLink(data.image);
                });
              } catch (error) {
                setFetchSuccess(false);
              }
 */
        }
      }

      setNFTTokenIds(product);
    }
  };

  useEffect(() => {
    GetCollectionNFTsHandler(collectionNFTdata);
  }, [collectionNFTdata]);

  const GetCollectionNFTsHandler = async (collectionNFTdata) => {
    if (collectionNFTdata) {
      // const NFTs = nft.result;
      //setTotalNFTs(nft.total);
      setFetchSuccess(true);
      for (let NFT of collectionNFTdata) {
        // if (NFT?.metadata) {
        //   NFT.metadata = JSON.parse(NFT.metadata);
        //   NFT.image = resolveLink(NFT.metadata?.image);
        // } else
        if (NFT?.uri) {
          try {
            if (NFT.uri.substring(8, 12) == "ipfs") {
              NFT.uri = NFT.uri.replace(
                /^.{28}/g,
                "https://gateway.moralisipfs.com"
              );
            } else {
              NFT.uri = uri;
            }
            await fetch(NFT.uri)
              .then((response) => response.json())
              .then((data) => {
                NFT.image = resolveLink(data.image);
                NFT.metadata = {
                  name: data.name,
                  description: data.description,
                  copies: data.copies,
                  block_chain: data.block_chain,
                };
              });
          } catch (error) {
            setFetchSuccess(false);
            /*          !!Temporary work around to avoid CORS issues when retrieving NFT images!!
            Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
            Replace <your url here> with your proxy server_url below
            Remove comments :)
              try {
                await fetch(`<your url here>/${NFT.token_uri}`)
                .then(response => response.json())
                .then(data => {
                  NFT.image = resolveLink(data.image);
                });
              } catch (error) {
                setFetchSuccess(false);
              }
  */
          }
        }
      }
      setCollectioNFTDatas(collectionNFTdata);
    }
  };

  useEffect(() => {
    console.log("NFTTokenIdsJJJ", NFTTokenIds);
  }, [NFTTokenIds]);

  if (loaders) {
    return <Loader />;
  } else {
    return (
      <Wrapper>
        <SEO pageTitle="Product Details" />
        <Header />
        <main id="main-content">
          {/* <Breadcrumb
            pageTitle="NFT Details"
            currentPage="NFT Details"
          /> */}
          {/* {product ? <ProductDetailsArea product={NFTTokenIds} /> : ""} */}
          <ProductDetailsArea product={NFTTokenIds} />
          {/* <OfferPage /> */}
          {/* <ProductArea
            data={{
              section_title: { title: "Recent View" },
              products: recentViewProducts,
            }}
          />
          <ProductArea
            data={{
              section_title: { title: "Related Item" },
              products: relatedProducts,
            }}

          /> */}

          <div style={{ paddingLeft: "80px" }}>
            <br />
            {loader && theme ? (
              <Skeleton
                width={550}
                height={50}
                count={1}
                // wrapper={InlineWrapperWithMargin}
                inline
                border={"1px"}
                display={"flex"}
                lineHeight={2}
                style={{ borderRadius: "10px" }}
                // padding={"1rem"}
                // baseColor={"red"}
                // highlightColor={"yellow"}
                baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                highlightColor={
                  theme && theme === "dark" ? "#404040" : "#bfbfbf"
                }
              />
            ) : (
              <h5>More from this collection</h5>
            )}
            <br /> <br />
            {loader && theme ? (
              <Skeleton
                width={250}
                height={300}
                count={4}
                // wrapper={InlineWrapperWithMargin}
                inline
                border={"1px"}
                display={"flex"}
                lineHeight={2}
                style={{ borderRadius: "10px", marginLeft: "10px" }}
                // padding={"1rem"}
                // baseColor={"red"}
                // highlightColor={"yellow"}
                baseColor={theme && theme === "dark" ? "#303030" : "#dbdbdb"}
                highlightColor={
                  theme && theme === "dark" ? "#404040" : "#bfbfbf"
                }
              />
            ) : (
              <MoreThisCollection
                data={{
                  products: collectionNFTDatas.slice(0, 5),
                  currentProduct: router.query?.id,
                }}
              />
            )}
          </div>
        </main>

        <Footer />
      </Wrapper>
    );
  }
};

// // export async function getStaticPaths() {
// export const getStaticPaths = (id) => {
//   console.log("id:", id);
//   const selector = useSelector((state) => state.main);
//   console.log("selector", selector);
//   // let Nft = "";
//   // getAllStoreNftsData()
//   //   .then((response) => {
//   //     Nft = response.data.data;
//   //   })
//   //   .catch((error) => {
//   //     console.log("errrallstorenft", error.response.data);
//   //   });
//   return {
//     paths: productData.map(({ slug }) => ({
//       params: {
//         slug,
//       },
//     })),
//     fallback: false,
//   };
// };

// export async function getStaticProps({ params }) {
//   const selector = useSelector((state) => state.main);
//   console.log("selector", selector);
//   const product = productData.find(({ slug }) => slug === params.slug);
//   const { categories } = product;
//   //   const recentViewProducts = shuffleArray(productData).slice(0, 5);
//   //   const relatedProducts = productData
//   //     .filter((prod) => prod.categories?.some((r) => categories?.includes(r)))
//   //     .slice(0, 5);
//   return {
//     props: {
//       className: "template-color-1",
//       product,
//       //   recentViewProducts,
//       //   relatedProducts,
//     }, // will be passed to the page component as props
//   };
// }

// ProductDetails.propTypes = {
//   product: PropTypes.shape({}),
//   //   recentViewProducts: PropTypes.arrayOf(PropTypes.shape({})),
//   //   relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
// };
export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}
const mapStateToProps = (state) => {
  return {
    getUser: state.main.getCurrentUser,
    getStore: state.main.getCurrentStoreData,
    nftGet: state.main.getNFT,
  };
};
export default connect(mapStateToProps)(ProductDetails);
