import PropTypes from "prop-types";
const Tab = ({ children }) => {
  return <div>{children}</div>;
};
Tab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Tab;
