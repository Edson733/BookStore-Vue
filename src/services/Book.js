import axios from 'axios';

let url = 'http://localhost:8080/api/book';

const getAllBooks = async () => {
   try {
      const response = await axios.post(url+"/");
      return response.data;
   } catch (error) {
      throw error;
   }
};

const getBookByName = async (name) => {
   try {
      const response = await axios.post(`${url}/${name}`);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByAutor = async (autor) => {
   try {
      const response = await axios.post(`${url}/${autor}`);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByCategory = async (name) => {
   try {
      const response = await axios.get(`${url}/category/${name}`);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByDateBetween = async (inicio, fin) => {
   try {
      const response = await axios.post(`${url}/dates?inicio=${inicio}&fin=${fin}`);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBookByDateDesc = async () => {
   try {
      const response = await axios.get(url+"/dateDesc");
      return response.data;
   } catch (error) {
      throw error;
   }
}

const saveBook = async (book) => {
   try {
      const response = await axios.post(url+"/add", book);
      return response.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

const updateBook = async (book) => {
   try {
      const id = book.id;
      const response = await axios.post(url+"/update"+id, book);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const deleteBook = async (id) => {
   try {
      const response = await axios.post(url+"/delete/"+id);
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