import { useContext } from "react";
import Transaction from "./Transaction";
import { TransactionsContext } from "../../../services/context/TransactionsContext";
import { CategoryContext } from "../../../services/context/CategoryContext";

const TransactionContent = () => {
  const { filterData: data, loading, error } = useContext(TransactionsContext);
  const { data: category, loading: catLoading } = useContext(CategoryContext);
  return (
    <div className="trans-content">
      {!loading && !catLoading && data.length && category.length ? (
        <>
          {data.map((d) => (
            <Transaction
              transaction={d}
              key={d.id}
              title={d.title}
              amount={parseInt(d.amount)}
              date={d.date}
              categoryId={d.category}
              type={d.type}
              id={d.id}
              category={category}
            />
          ))}
        </>
      ) : (
        <></>
      )}
      {!loading && !data.length && !error && (
        <p className="no-data">no data...</p>
      )}

      {loading || (catLoading && <p className="loading">loading</p>)}
      {error && !loading && <p className="error">{error}</p>}
    </div>
  );
};

export default TransactionContent;
