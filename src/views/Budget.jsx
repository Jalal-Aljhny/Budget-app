import BudgetContent from "../components/budget/BudgetContent";
import Hero from "../components/budget/Hero";
import Header from "../components/layout/Header";

const Budget = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BudgetContent />
      </main>
    </>
  );
};

export default Budget;
