import { useContext } from "react";
import BudgetNumber from "./BudgetNumber";
import "./Hero.css";
import { Coins, Wallet, CreditCard } from "phosphor-react";
import { TransactionsContext } from "../../services/context/TransactionsContext";

const Hero = () => {
  const { totals } = useContext(TransactionsContext);
  return (
    <div className="hero">
      <div className="hero-bg">
        <img src="https://picsum.photos/1200/400" alt="random background" />
      </div>
      <div className="container">
        <div className="hero-budget-number">
          <BudgetNumber money={totals.total} title="total">
            <Coins size={32} weight="duotone" />
          </BudgetNumber>
          <BudgetNumber money={totals.income} title="income">
            <Wallet size={32} weight="duotone" />
          </BudgetNumber>
          <BudgetNumber money={totals.expanse} title="expanse">
            <CreditCard size={32} weight="duotone" />
          </BudgetNumber>
        </div>
      </div>
    </div>
  );
};

export default Hero;
