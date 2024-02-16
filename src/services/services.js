import axios from 'axios';

let url_book = 'http://localhost:8080/api/book';
let url_category = 'http://localhost:8080/api/category';

const getBooks = async () => {
   try {
      const response = await axios.post(url_book+"/");
      return response.data;
   } catch (error) {
      throw error;
   }
};

const postBook = async (book) => {
   try {
      const response = await axios.post(url_book+"/add", book);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

const getCategories = async () => {
   try {
      const response = await axios.get(url_category+"/");
      console.log(response.data);
      return response.data;
  }catch (error) {
      console.error(error);
  }
}

export default {
   getBooks,
   postBook,
   getCategories,
};