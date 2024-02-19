<template>
  <b-container class="mt-3" fluid>
    <b-row class="mb-3 text-center">
      <b-col cols="10"><h1>Biblioteca</h1></b-col>
      <b-col cols="2"><Modal /></b-col>
    </b-row>

    <b-row class="justify-content-center mt-3">
      <h4>Filtro de busqueda</h4>
      <b-col cols="5" class="mb-3" v-if="filter === 'title' || filter === 'autor'">
        <b-form-group label="Buscar libro:" label-for="searchLibro">
          <b-form-input v-model="textFilter" placeholder="Nombre o Autor del Libro" type="text" id="searchLibro" />
        </b-form-group>
      </b-col>
      <b-col cols="5" class="mb-3" v-else-if="filter === 'category'">
        <b-form-group label="Buscar genero:" label-for="searchCategory">
          <b-form-select id="searchCategory" v-model="selectedCategory" :options="categories">
            <!-- <option v-for="item in options"  key="item.id">{{ item.name }}</option> -->
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-row v-else-if="filter === 'dateRange'">
        <b-col cols="4">
          <b-form-group label="Fecha inicial:" label-for="fechaInicial">
            <b-form-input v-model="fechaInicio" placeholder="Año de publicacion" type="number" id="fechaInicial" />
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Fecha final:" label-for="fechaFinal">
            <b-form-input v-model="fechaFin" placeholder="Año de publicacion" type="number" id="fechaFinal" />
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Buscar entre años:" label-for="btnFilter">
            <b-button variant="outline-primary">Buscar</b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-col cols="5" v-else>
        <b-form-group label="Orden por año de publicacion:">
          <b-button variant="outline-primary">Ordenar Descendentemente</b-button>
        </b-form-group>
      </b-col>
      <b-col cols="5">
        <b-form-group label="Realizar la busqueda por:" label-for="searchSelect">
          <b-form-select v-model="filter" :options="options" id="searchSelect"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="row mt-5">
          <Card/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import service from "../services/services";

  export default Vue.extend({
    data() {
      return {
        books: [],
        filter: "title",
        options: [
          { value: "title", text: "Titulo del libro" },
          { value: "autor", text: "Autor del libro" },
          { value: "category", text: "Genero del libro" },
          { value: "dateRange", text: "Rango de fecha" },
          { value: "dateDesc", text: "Ordenar por año descendente" },
        ],
        selectedCategory: null,
        fechaInicio: null,
        fechaFin: null,
        categories: [],
        textFilter: "",
        isLoading: true
      }
    },
    components:{
      Modal: () => import("@/components/Modal.vue"),
      Card: () => import("@/components/Card.vue"),
      ModalSpinner: () => import("@/components/ModalSpinner.vue")
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
  });
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