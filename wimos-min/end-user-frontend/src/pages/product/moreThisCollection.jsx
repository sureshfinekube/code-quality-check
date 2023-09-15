import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-01";
import Product from "@components/product/layout-02";
import Slider, { SliderItem } from "@ui/slider";
import { SectionTitleType, ProductType } from "@utils/types";
import Anchor from "@ui/anchor";

const SliderOptions = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
};

const MoreThisCollection = ({ data, className, space, align, ...rest }) => {
  //data = data.filter(({ type }) => type === "auction");
  //   console.log("data?.products ", data?.products[0]?.collectionId);
  return (
    <div
      className={clsx(
        "rn-live-bidding-area",
        space === 1 && "rn-section-gapTop",
        className
      )}
      style={{ paddingTop: "0px", marginLeft: "-37px" }}
    >
      <div className="container">
        {data?.section_title && (
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <SectionTitle {...data.section_title} className="mb-0" />
          </div>
        )}

        {data?.products && data?.products.length > 4 && (
          <div
            className="col-lg-12 col-md-12 col-sm-12 col-12 mt_mobile--15"
            style={{ textAlign: "right" }}
          >
            <div className="">
              <Anchor
                className="btn-transparent"
                path={`/collections/${data?.products[0]?.collectionId}`}
              >
                VIEW ALL
                <i className="feather feather-arrow-right" />
              </Anchor>
            </div>{" "}
          </div>
        )}
        {/* Live Bidding */}
        <br />

        {data?.products && data?.products.length > 1 ? (
          <div className="row">
            <div className="col-lg-12">
              <Slider
                options={SliderOptions}
                className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
              >
                {Array.isArray(data?.products) &&
                  data?.products.map((prod) => {
                    if (
                      !data?.currentProduct ||
                      data?.currentProduct !== prod?.id
                    ) {
                      return (
                        <SliderItem
                          key={prod?.id}
                          className="single-slide-product"
                        >
                          <Product
                            id={prod?.id}
                            sell={prod?.status}
                            overlay
                            // placeBid
                            copies={prod?.metadata?.copies}
                            name={prod?.metadata?.name || prod?.name}
                            // slug={prod.slug}
                            // latestBid={prod.latestBid}
                            price={prod?.price}
                            // likeCount={prod.likeCount}
                            // auction_date={prod.auction_date}
                            image={prod?.image}
                            // authors={prod.authors}
                            // bitCount={prod.bitCount}
                            product={prod}
                          />
                        </SliderItem>
                      );
                    }
                  })}
              </Slider>
            </div>
          </div>
        ) : data?.products === "" ? (
          <div style={{ textAlign: "center" }}>
            <div className="main-loader"> </div>
          </div>
        ) : (
          <div>
            <div className="rn-not-found-wrapper">
              <h2 className="medium-title">
                <i className="feather-thumbs-down" />
              </h2>
              <h6>No more items to display!</h6>
              {/* <Button path="/create">Create NFT</Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
MoreThisCollection.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1, 2]),
  data: PropTypes.shape({
    section_title: SectionTitleType,
    products: PropTypes.arrayOf(ProductType).isRequired,
    placeBid: PropTypes.bool,
  }),
};

MoreThisCollection.defaultProps = {
  space: 1,
};

export default MoreThisCollection;
