import axios from "axios";

let url = "http://localhost:8080/api/category/";

const getCategories = async () => {
    try {
       const response = await axios.get(url);
       return response.data;
   }catch (error) {
       console.error(error);
   }
};

export default {
    getCategories,
};