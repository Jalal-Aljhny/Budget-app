import "./Model.css";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

const Model = ({ visible, children, closeModel }) => {
  if (!visible) {
    return null;
  }
  return ReactDom.createPortal(
    <div className="model-overlay" onClick={closeModel}>
      <div
        className="model"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.querySelector("#model-root")
  );
};

Model.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  closeModel: PropTypes.func,
};

export default Model;
