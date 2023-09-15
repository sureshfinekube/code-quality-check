import PropTypes from "prop-types";
import Anchor from "@ui/anchor";
import { flatDeep, slugify } from "@utils/methods";

const TagWidget = ({ tags, rootPage }) => {
  //   const tagss = [...new Set(flatDeep(tags).map((tag) => tag.title))];
  return (
    <div className="rbt-single-widget widget_tag_cloud mt--40">
      <h3 className="title">Tags</h3>
      <div className="inner mt--20">
        <div className="tagcloud">
          {tags?.map((tag) => (
            <Anchor key={tag} path={`#`} style={{ cursor: "default" }}>
              {tag}
            </Anchor>
          ))}
        </div>
      </div>
    </div>
  );
};

TagWidget.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  rootPage: PropTypes.string,
};

TagWidget.defaultProps = {
  rootPage: "/blog",
};
export default TagWidget;
