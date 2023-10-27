import Button from "../ui/Button";
import "./Form.css";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { CategoryContext } from "../../services/context/CategoryContext";
import {
  postTransactionsApi,
  updateTransactionsApi,
} from "../../services/apis/TransactionsApi";
import { TransactionsContext } from "../../services/context/TransactionsContext";

let initialData = {
  title: "",
  amount: "",
  type: "income",
  category: "",
  date: "",
};

const Form = ({ closeModel, defaultTransaction }) => {
  if (defaultTransaction) {
    initialData = { ...defaultTransaction };
  }
  const { data: categories, loading } = useContext(CategoryContext);
  const [data, setData] = useState(initialData);
  const isMount = useRef(false);
  const [validation, setValidation] = useState({
    isValid: false,
    isTouched: false,
    data: {}, //title {isValid , isTouched , error}
  });
  const { fetchData } = useContext(TransactionsContext);

  const handleValidation = useCallback(
    (touchKey) => {
      let vData = { ...validation };
      vData.isTouched = true;
      vData.isValid = true;

      let stateData = { ...data };

      Object.keys(stateData).forEach((key) => {
        let isValid = true;
        let error = null;
        let isTouched = vData.data[key]?.isTouched || false;
        if (touchKey && touchKey === key) {
          isTouched = true;
        }
        if (key === "amount" && stateData[key] && isNaN(stateData[key])) {
          error = "Please add a valid number";
        }

        if (
          key === "amount" &&
          stateData[key] &&
          !isNaN(stateData[key]) &&
          +stateData[key] <= 0
        ) {
          error = "Please add a number bigger than zero";
        }
        if (!stateData[key] || !stateData[key].toString().trim()) {
          isValid = false;
          error = `${key.charAt(0).toUpperCase()}${key.slice(
            1
          )} filed is required !`;
        }

        if (!isTouched) {
          vData.isTouched = false;
          error = null;
        }
        vData.data[key] = { isTouched, isValid, error };
        if (!isValid) {
          vData.isValid = false;
        }
      });
      setValidation(vData);
    },
    [data, validation]
  );

  useEffect(() => {
    if (!isMount.current) {
      handleValidation();

      isMount.current = true;
    }
  }, [data, validation, handleValidation]);

  useEffect(() => {
    if (!defaultTransaction) {
      clearForm();
    }
  }, [defaultTransaction]);

  const clearForm = () => {
    setData({
      title: "",
      amount: "",
      type: "income",
      category: "",
      date: "",
    });
  };
  const handleChange = (e) => {
    setValidation((d) => {
      d.data[e.target.name].error = null;
      return d;
    });

    setData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  };
  const handleBlur = (e) => {
    handleValidation(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (defaultTransaction) {
      try {
        await updateTransactionsApi(data);
        fetchData();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        await postTransactionsApi(data);
        fetchData();
      } catch (error) {
        console.log(error.message);
      }
    }
    closeModel();
  };

  return (
    <div className="budget-form">
      <h2>{defaultTransaction ? "Edit budget" : " Add new budget"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title..."
            id="title"
            name="title"
            className={`${validation.data.title?.error ? "error" : ""}`}
            value={data.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {validation.data.title?.error && (
            <p className="error">{validation.data.title.error}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Amount..."
            id="amount"
            name="amount"
            className={`${validation.data.amount?.error ? "error" : ""}`}
            value={data.amount}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {validation.data.amount?.error && (
            <p className="error">{validation.data.amount.error}</p>
          )}
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="type">Type</label>
            <select
              placeholder="type..."
              id="type"
              name="type"
              className={`${validation.data.type?.error ? "error" : ""}`}
              value={data.type}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="income">Income</option>
              <option value="expanse">Expanse</option>
            </select>
            {validation.data.type?.error && (
              <p className="error">{validation.data.type.error}</p>
            )}
          </div>
          {loading ? (
            <p className="loading">loading ...</p>
          ) : (
            <div>
              <label htmlFor="category">Category</label>
              <select
                placeholder="category..."
                id="category"
                name="category"
                className={`${validation.data.category?.error ? "error" : ""}`}
                value={data.category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {validation.data.category?.error && (
                <p className="error">{validation.data.category.error}</p>
              )}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            placeholder="date..."
            id="date"
            name="date"
            className={`${validation.data.date?.error ? "error" : ""}`}
            value={data.date}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {validation.data.date?.error && (
            <p className="error">{validation.data.date.error}</p>
          )}
        </div>

        <Button
          size="large"
          block
          onClick={handleSubmit}
          disabled={!validation.isValid}
        >
          {defaultTransaction ? "Edit" : "Save"}
        </Button>
      </form>
    </div>
  );
};
Form.propTypes = {
  closeModel: PropTypes.func,
  defaultTransaction: PropTypes.object,
};

export default Form;
