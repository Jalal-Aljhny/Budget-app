import { useContext, useState } from "react";
import { CategoryContext } from "../../../services/context/CategoryContext";
import { TransactionsContext } from "../../../services/context/TransactionsContext";

const TransactionHeader = () => {
  const { data: categories } = useContext(CategoryContext);
  const { handleFilters } = useContext(TransactionsContext);
  const [selects, setSelects] = useState({
    keys: "",
    categories: "",
    type: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newSelects = { ...selects, [name]: value };
    setSelects(newSelects);
    handleFilters(newSelects);
  };
  return (
    <div className="trans-header">
      <h2 className="trans-header-title">Recent Transactions</h2>
      <div className="trans-header-filters">
        <select name="keys" onChange={handleChange} value={selects.keys}>
          <option value=""> Sort By</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <select
          name="categories"
          onChange={handleChange}
          value={selects.categories}
        >
          <option>Categories</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <select name="type" onChange={handleChange} value={selects.type}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expanse">Expanse</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionHeader;
