import axios from 'axios';

let url = 'http://localhost:8080/api/book';

const getBooks = async (number, size, sort) => {
   const page = {
      number,
      size,
     sort
   };
   try {
      const response = await axios.post(url+"/",{ page });
      return response.data;
   } catch (error) {
      throw error;
   }
};

export default {
   getBooks
};