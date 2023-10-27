import axios from "axios";

export const TransactionsApi = async () => {
  // const data = await axios.get("http://localhost:5000/transactions");
  const data = await axios.get(
    "https://my-json-server.typicode.com/Jalal-Aljhny/Budget-app-api/transactions"
  );

  return data;
};

export const deleteTransactionsApi = async (id) => {
  const data = await axios.delete(
    "https://my-json-server.typicode.com/Jalal-Aljhny/Budget-app-api/transactions" +
      id
  );
  return data;
};
export const postTransactionsApi = async (body) => {
  await axios.post(
    "https://my-json-server.typicode.com/Jalal-Aljhny/Budget-app-api/transactions",
    body
  );
};
export const updateTransactionsApi = async (body) => {
  console.log(body);
  await axios.put(
    "https://my-json-server.typicode.com/Jalal-Aljhny/Budget-app-api/transactions" +
      body.id,
    body
  );
};
