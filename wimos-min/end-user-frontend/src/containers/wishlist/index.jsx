import { useState, useSelector } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Activity from "@components/activity";
import WishList from "@components/wishlist";
import Sticky from "@ui/sticky";
import { IDType, ImageType } from "@utils/types";
import { flatDeep } from "@utils/methods";
import { connect, useDispatch } from "react-redux";
import { getCurrentUser } from "src/redux/actions/main";
import animation from "@containers/author-profile/anim.gif";
import Button from "@ui/button";
import { clearallWishlist } from "src/redux/actions/main";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

const WishlistArea = ({ space, className, getUser, loaders }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, []);
  // console.log("wishhhhhhhhhhhhh", getUser.wishlist);

  const [loader, setLoader] = useState(false);
  // const loaders = useSelector((state) => state.main.loader);
  const { theme } = useTheme();
  const clearallHandler = () => {
    setLoader(true);
    dispatch(clearallWishlist(setLoader));
  };

  return (
    <>
      {getUser?.wishlist?.length > 0 ? (
        <div style={{ float: "right", paddingRight: "30px" }}>
          <Button onClick={clearallHandler}>
            {!loader ? (
              "Clear all"
            ) : (
              <div className="create-load" style={{ paddingRight: "24px" }}>
                {" "}
              </div>
            )}
          </Button>
        </div>
      ) : (
        ""
      )}
      <div
        className={clsx(
          "rn-activity-area",
          space === 1 && "rn-section-gapTop",
          className
        )}
      >
        <div className="container">
          {/* <div className="row mb--30">
            <h3 className="title">All following Acivity</h3>
          </div> */}
          <div className="row g-6 activity-direction">
            {getUser?.wishlist?.length > 0 ? (
              <div className="col-lg-8 mb_dec--15">
                {getUser?.wishlist?.map((item) => (
                  <WishList
                    key={item._id}
                    image={item.nftId?.url}
                    title={item.nftId?.name}
                    // path={item.slug}
                    // desc={item.description}
                    // time={item.time}
                    product={item.nftId}
                    date={item.addedAt}
                    // author={item.author}
                    // status={item.status}
                    collectionId={item.nftId?.collectionId}
                    nftId={item.nftId}
                    wishId={item._id}
                  />
                ))}
              </div>
            ) : getUser?.wishlist === "" || getUser?.wishlist === undefined ? (
              <>
                {loaders && theme && (
                  <div className="col-lg-8 mb_dec--15">
                    <Skeleton
                      width={350}
                      height={50}
                      style={{ borderRadius: "10px" }}
                      count={5}
                      // wrapper={InlineWrapperWithMargin}
                      inline
                      border={"1px"}
                      display={"flex"}
                      lineHeight={2}
                      padding={"1rem"}
                      // baseColor={"red"}
                      // highlightColor={"yellow"}
                      baseColor={
                        theme && theme === "dark" ? "#303030" : "#dbdbdb"
                      }
                      highlightColor={
                        theme && theme === "dark" ? "#404040" : "#bfbfbf"
                      }
                    />{" "}
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <img
                  src={animation.src}
                  style={{ height: "150px", width: "150px" }}
                />
                <p>There is no wish list</p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

WishlistArea.propTypes = {
  space: PropTypes.oneOf([1, 2]),
  className: PropTypes.string,
  data: PropTypes.shape({
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: IDType,
        title: PropTypes.string,
        slug: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        author: PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string,
        }),
        image: ImageType,
        status: PropTypes.oneOf(["follow", "sale", "like", "offer"]),
        marketFilters: PropTypes.arrayOf(PropTypes.string),
        userFilters: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};

WishlistArea.defaultProps = {
  space: 1,
};

const mapStateToProps = (state) => {
  return {
    getUser: state.main.getCurrentUser,
    getStore: state.main.getCurrentStoreData,
    loaders: state.main.loader,
  };
};
export default connect(mapStateToProps)(WishlistArea);
