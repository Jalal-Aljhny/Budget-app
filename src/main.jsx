import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TransactionsProvider } from "./services/context/TransactionsContext.jsx";
import { CategoryProvider } from "./services/context/CategoryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TransactionsProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </TransactionsProvider>
  </React.StrictMode>
);
