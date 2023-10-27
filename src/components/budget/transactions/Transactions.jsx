import TransactionContent from "./TransactionContent";
import TransactionHeader from "./TransactionHeader";
import "./Transactions.css";

const Transactions = () => {
  return (
    <section className="trans">
      <TransactionHeader />
      <TransactionContent />
    </section>
  );
};

export default Transactions;
