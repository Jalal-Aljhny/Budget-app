import axios from "axios";

export const CategoriesApi = async () => {
  const data = await axios.get(
    "https://my-json-server.typicode.com/Jalal-Aljhny/Budget-app-api/categories"
  );
  return data;
};
