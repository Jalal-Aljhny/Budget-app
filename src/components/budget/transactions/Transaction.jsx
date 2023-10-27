import { CurrencyDollar, PencilLine, Trash } from "phosphor-react";
import Button from "../../ui/Button";
import PropTypes, { object } from "prop-types";
import { useContext, useMemo, useState } from "react";
import { TransactionsContext } from "../../../services/context/TransactionsContext";
import Model from "../../ui/Model";
import Form from "../Form";

const Transaction = ({
  transaction,
  title,
  amount,
  date,
  categoryId,
  type,
  id,
  category,
}) => {
  const { handleDelete } = useContext(TransactionsContext);
  const [showModel, setShowModel] = useState(false);
  const currentCategory = useMemo(() => {
    let cat = category.find((c) => c.id === parseInt(categoryId));
    if (cat && cat.name) {
      return cat.name;
    } else {
      return "";
    }
  }, [category, categoryId]);

  return (
    <div className="trans-item">
      <div className={`trans-item-icon ${type === "expanse" ? "error" : ""}`}>
        <CurrencyDollar />
      </div>
      <div className="trans-item-data">
        <h3>{title}</h3>
        <div>
          <small>${amount}</small> , <small>{date}</small> ,
          <small>{currentCategory}</small>
        </div>
      </div>
      <div className="trans-item-actions">
        <Button
          icon
          onClick={() => {
            setShowModel(true);
          }}
        >
          <PencilLine />
        </Button>
        <Button
          icon
          type="error"
          onClick={() => {
            handleDelete(id);
          }}
        >
          <Trash />
        </Button>
      </div>
      <Model
        visible={showModel}
        closeModel={() => {
          setShowModel(false);
        }}
      >
        <Form
          closeModel={() => {
            setShowModel(false);
          }}
          // defaultTransaction={{ title, amount, type, category, date }}
          defaultTransaction={transaction}
        />
      </Model>
    </div>
  );
};
Transaction.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  category: PropTypes.arrayOf(object),
  categoryId: PropTypes.string,
  transaction: PropTypes.object,
};

export default Transaction;
