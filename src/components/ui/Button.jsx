import "./Button.css";
import PropTypes, { string } from "prop-types";
const Button = ({
  children,
  type = "primary",
  size = "normal",
  icon = false,
  block = false,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size} ${icon ? "btn-icon" : ""} ${
        block ? "btn-block" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.bool,
  block: PropTypes.bool,
  props: PropTypes.arrayOf(string),
};

export default Button;
