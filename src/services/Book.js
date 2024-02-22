import axios from 'axios';

let url = 'http://localhost:8080/api/book';

const getAllBooks = async () => {
   try {
      const response = await axios.post(url+"/");
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
};

const getBookByName = async (name) => {
   try {
      const response = await axios.post(`${url}/${name}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByAutor = async (autor) => {
   try {
      const response = await axios.post(`${url}/${autor}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByCategory = async (name) => {
   try {
      const response = await axios.get(`${url}/category/${name}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByDateBetween = async (inicio, fin) => {
   try {
      const response = await axios.post(`${url}/dates?inicio=${inicio}&fin=${fin}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByDateDesc = async () => {
   try {
      const response = await axios.get(url+"/dateDesc");
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const saveBook = async (book) => {
   try {
      console.log(book);
      const response = await axios.post(url+"/add", book);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

const updateBook = async (book) => {
   try {
      console.log(book);
      const response = await axios.post(url+"/update", book);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const deleteBook = async (id) => {
   try {
      console.log(id);
      const response = await axios.post(url+"/delete", id);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

export default {
   getAllBooks,
   getBookByName,
   getBookByAutor,
   getBookByCategory,
   getBookByDateBetween,
   getBookByDateDesc,
   saveBook,
   updateBook,
   deleteBook
};