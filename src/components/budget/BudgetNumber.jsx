import PropTypes from "prop-types";
const BudgetNumber = ({ children, money, title }) => {
  return (
    <div className="budget-number">
      <div className="budget-number-icon">{children}</div>
      <div className="budget-number-money">
        <div>${money}</div>
        <small>{title}</small>
      </div>
    </div>
  );
};

BudgetNumber.propTypes = {
  children: PropTypes.element.isRequired,
  money: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  title: PropTypes.string.isRequired,
};

export default BudgetNumber;
