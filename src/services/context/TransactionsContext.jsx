import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  TransactionsApi,
  deleteTransactionsApi,
} from "../apis/TransactionsApi";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const TransactionsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
      // eslint-disable-next-line no-unreachable
      break;
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
      // eslint-disable-next-line no-unreachable
      break;
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
      // eslint-disable-next-line no-unreachable
      break;

    default:
      return state;
  }
};

export const TransactionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMount = useRef(false);
  const [filters, setFilters] = useState({
    keys: null,
    categories: null,
    type: null,
  });

  const handleFilters = (filtersObj) => {
    setFilters(filtersObj);
  };

  const filterData = useMemo(() => {
    let data = [...state.data];

    if (filters.keys && filters.keys === "date") {
      data = data.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();

        return bDate - aDate;
      });
      if (filters.keys && filters.keys === "amount") {
        data = data.sort((a, b) => {
          return +b.amount - +a.amount;
        });
      }
    }
    if (filters.categories) {
      data = data.filter((d) => d.category == filters.categories);
    }
    if (filters.type) {
      data = data.filter((d) => d.type == filters.type);
    }
    return data;
  }, [filters.keys, state.data, filters.categories, filters.type]);

  const totals = useMemo(() => {
    let income = 0;
    let expanse = 0;
    if (state.data && state.data.length) {
      state.data.forEach((d) => {
        if (d.type === "income") {
          income += Number(d.amount);
        } else {
          expanse += Number(d.amount);
        }
      });
    }
    return { income, expanse, total: income - expanse };
  }, [state.data]);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await TransactionsApi();
      dispatch({ type: "FETCH_SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      dispatch({ type: "FETCH_START" });
      await deleteTransactionsApi(id);
      fetchData();
      // dispatch({ type: "FETCH_SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);

  return (
    <TransactionsContext.Provider
      value={{
        ...state,
        handleDelete,
        fetchData,
        handleFilters,
        filterData,
        totals,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
TransactionsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
