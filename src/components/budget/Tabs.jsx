import { useState } from "react";
import "./Tabs.css";
import PropTypes, { element } from "prop-types";

const Tabs = ({ children, activeTab = 0 }) => {
  const [active, setActive] = useState(activeTab);
  const tabs = [...children];
  const tabsTitle = tabs.map((tab) => tab.props.title);
  const tabsContent = tabs.map((tab) => tab.props.children);
  return (
    <div className="tabs">
      <div className="tabs-titles">
        {tabsTitle.map((title, index) => (
          <div
            key={`tab-title-${index}`}
            className={`tab-title ${active === index ? "active" : ""}`}
            onClick={() => {
              setActive(index);
            }}
          >
            {title}
          </div>
        ))}
      </div>

      <div className="tab-content">{tabsContent[active]}</div>
    </div>
  );
};
Tabs.propTypes = {
  children: PropTypes.arrayOf(element),
  activeTab: PropTypes.number,
};

export default Tabs;
