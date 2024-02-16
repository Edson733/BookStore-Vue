<template>
  <b-container class="mt-5" fluid>
    <b-row>
      <b-col>
        <Modal />
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="charging" class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
      </b-col>
      <b-col>
        <div class="row mt-5">
          <div v-for="book in books" :key="book.key" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div class="card rounded shadow">
              <div class="card-body">
                <h5 class="card-title">Libro: {{ book.name }}</h5>
                <p class="card-text">Autor: {{ book.autor }}</p>
                <p class="card-text">Genero: {{ book.category.name }}</p>
                <p class="card-text">Año de publicacion: {{ book.año }}</p>
                <b-button variant="danger" @click="deleteOne(book.id)">Eliminar</b-button>
                <b-button variant="success" @click="update(book)">Eliminar</b-button>
              </div>

            </div>
          </div>

        </div>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import service from "../services/services";
import Modal from "../components/Modal.vue";
import Card from "../components/Card.vue";

export default {
  data() {
    return {
      books: [],
      items: [],
      charging: false,
      bookUpdate: {
        id: null,
        autor: '',
        name: '',
        category: '',
        year: '',
      },
      autor: '',
      name: '',
      category: '',
      year: ''
    }
  },
  components: {
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
        this.charging = true;
        const data = await service.getBooks();
        this.books = [...data];
        this.charging = false;
      } catch (error) {
        console.error(error);
        this.charging = false;
      }
    },
    async deleteOne(id) {

    },
    async update(book) {
      this.bookUpdate = { ...book };
      this.autor = this.bookUpdate.autor
      this.name = this.bookUpdate.name
      this.category = this.bookUpdate.category
      this.year = this.bookUpdate.year
    }
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