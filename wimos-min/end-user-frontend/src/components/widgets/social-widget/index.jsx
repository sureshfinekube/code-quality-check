import PropTypes from "prop-types";

const SocialWidget = ({ socials }) => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  // console.log("social", socials);
  return (
    <ul className="social-copyright">
      {socials?.map((social) => (
        <li key={social.id}>
          <a href={social.link} target="_blank">
            {/* <i className={social.icon} /> */}
            {/* <div onClick={() => openInNewTab(social?.link)}> */}
            <img
              src={
                "https://wimos-client-1.s3.us-west-2.amazonaws.com/store/" +
                social.storeId +
                "/" +
                social.image
              }
              // src={favimage.preview}
              alt="fav image"
              className="image-preview"
              style={{ borderRadius: "20px", height: "100%" }}
            />{" "}
            {/* </div> */}
          </a>
        </li>
      ))}
    </ul>
  );
};
SocialWidget.propTypes = {
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      icon: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default SocialWidget;
