<template>
  <b-container class="mt-5">
      <Modal/>
  <div class="overflow-auto mt-5">
    <div v-for="book in books" :key="book.key" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 mb-4">
        <div class="card rounded shadow">
          <div class="card-body">
            <h5 class="card-title">Libro: {{ book.name }}</h5>
            <p class="card-text">Autor: {{ book.autor }}</p>
            <p class="card-text">Genero: {{ book.category.name }}</p>
            <p class="card-text">Año de publicacion: {{ book.año }}</p>
            <a href="#" class="btn btn-primary">Editar</a>
          </div>

        </div>
      </div>

  </div>
</b-container>

</template>

<script>
import service from "../services/services";
import Modal from "../components/Modal.vue";
import Card from "../components/Card.vue";

  export default {
    data() {
      return {
        books:[],
        items: [],
      }
    },
    components:{
      Modal,
      Card
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    mounted() {
    this.getBook();
  },
    methods: {
    async getBook() {
      try {
        const data = await service.getBooks();
        this.books = [...data];
      } catch (error) {
        console.error(error);
      }
    },
   
  },
  }
</script>
<style>
.card {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

}

.card:hover {
  transform: scale(1.05);
}

</style>