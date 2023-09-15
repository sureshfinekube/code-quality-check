import PropTypes from "prop-types";
import clsx from "clsx";

const AddressBox = ({
  className,
  icon,
  title,
  phoneNumbers,
  emails,
  address,
}) => (
  <div className={clsx("rn-address", className)}>
    <div className="icon">
      <i className={icon} />
    </div>
    <div className="inner">
      <h4 className="title">{title}</h4>
      {/* {phoneNumbers?.map((phone) => ( */}
      <p>
        <a href={`tel:${phoneNumbers}`}>{phoneNumbers}</a>
      </p>
      {/* ))} */}
      {/* {emails?.map((email) => ( */}
      <p>
        <a href={`mailto:${emails}`}>{emails}</a>
      </p>
      {/* ))} */}
      {address && <p dangerouslySetInnerHTML={{ __html: address }} />}
    </div>
  </div>
);

AddressBox.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  phoneNumbers: PropTypes.arrayOf(PropTypes.string),
  emails: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
};
export default AddressBox;
