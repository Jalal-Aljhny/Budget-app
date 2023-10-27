import { useContext, useMemo } from "react";
import "./BudgetContent.css";
import Tab from "./Tab";
import Tabs from "./Tabs";
import Transactions from "./transactions/Transactions";
import { TransactionsContext } from "../../services/context/TransactionsContext";
import { CategoryContext } from "../../services/context/CategoryContext";
import Chart from "../ui/Chart";

const incomeColors = [
  "#557B83",
  "#82954B",
  "#A2D5AB",
  "#E5EFC1",
  "#85C88A",
  "#0d5235",
  "#82A284",
  "#BABD42",
];

const expanseColors = [
  "#4C0033",
  "#790252",
  "#AF0171",
  "#E80F88",
  "#513252",
  "#7A4069",
  "#CA4E79",
  "#FFC18E",
];

const BudgetContent = () => {
  const { data: transactios } = useContext(TransactionsContext);
  const { data: categories } = useContext(CategoryContext);

  const chartData = useMemo(() => {
    const transData = [...transactios];
    const catData = [...categories];

    const chartData = { income: null, expanse: null };
    if (transData && transData.length && catData && catData.length) {
      chartData.income = {};
      chartData.expanse = {};

      transData.forEach((t) => {
        let catName = catData.find((c) => c.id === Number(t.category)).name;
        if (t.type === "income") {
          if (chartData.income[catName]) {
            chartData.income[catName] += +t.amount;
          } else {
            chartData.income[catName] = +t.amount;
          }
        } else {
          if (chartData.expanse[catName]) {
            chartData.expanse[catName] += +t.amount;
          } else {
            chartData.expanse[catName] = +t.amount;
          }
        }
      });
    }

    return chartData;
  }, [transactios, categories]);

  return (
    <div className="budget-content">
      <div className="container">
        <Tabs>
          <Tab title="transactions">
            <Transactions />
          </Tab>
          <Tab title="income">
            <Chart data={chartData.income} colors={incomeColors} />
          </Tab>
          <Tab title="expanse">
            <Chart data={chartData.expanse} colors={expanseColors} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BudgetContent;
