import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { CategoriesApi } from "../apis/CategoriesApi";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const CategoryContext = createContext();

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

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMount = useRef(false);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await CategoriesApi();
      dispatch({ type: "FETCH_SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  useEffect(() => {
    if (!isMount.current) {
      fetchData();
      isMount.current = true;
    }
  }, [fetchData]);

  return (
    <CategoryContext.Provider value={{ ...state }}>
      {children}
    </CategoryContext.Provider>
  );
};
CategoryProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
