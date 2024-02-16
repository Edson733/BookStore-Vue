import axios from 'axios';

let url = 'http://localhost:8080/api/book';

const getBooks = async () => {
   try {
      const response = await axios.post(url+"/");
      return response.data;
   } catch (error) {
      throw error;
   }
};

export default {
   getBooks
};