<template>
    <b-container fluid>
        <b-row class="justify-content-center mt-3">
            <h4>Filtro de busqueda</h4>
            <b-col cols="5" class="mb-3" v-if="filter === 'nombre'">
                <b-form-group label="Buscar libro:" label-for="searchLibro">
                    <b-form-input v-model="nombreFilter" placeholder="Nombre del Libro" type="text" id="searchLibro" @input="getBooksByName()"/>
                </b-form-group>
            </b-col>
            <b-col cols="5" class="mb-3" v-else-if="filter === 'autor'">
                <b-form-group label="Buscar autor:" label-for="searchAutor">
                    <b-form-input v-model="autorFilter" placeholder="Autor del Libro" type="text" id="searchAutor" @input="getBooksByAutor()"/>
                </b-form-group>
            </b-col>
            <b-col cols="5" class="mb-3" v-else-if="filter === 'category'">
                <b-form-group label="Buscar genero:" label-for="searchCategory">
                    <b-form-select id="searchCategory" v-model="selectedCategory" :options="categories" value-field="name" text-field="name" @change="getBooksByCategory()"/>
                </b-form-group>
            </b-col>
            <b-row v-else-if="filter === 'dateRange'">
                <b-col cols="4">
                <b-form-group label="Fecha inicial:" label-for="fechaInicial">
                    <b-form-input v-model="fechaInicio" placeholder="Año de publicacion" type="number" id="fechaInicial"/>
                </b-form-group>
                </b-col>
                <b-col cols="4">
                <b-form-group label="Fecha final:" label-for="fechaFinal">
                    <b-form-input v-model="fechaFin" placeholder="Año de publicacion" type="number" id="fechaFinal"/>
                </b-form-group>
                </b-col>
                <b-col cols="4">
                <b-form-group label="Buscar entre años:" label-for="btnFilter">
                    <b-button variant="outline-primary" @click="getBooksByDateRange()">Buscar</b-button>
                </b-form-group>
                </b-col>
            </b-row>
            <b-col cols="5" v-else>
                <b-form-group label="Orden por año de publicacion:">
                    <b-button variant="outline-primary" @click="getBooksByDateDesc()">Ordenar Descendentemente</b-button>
                </b-form-group>
            </b-col>
            <b-col cols="5">
                <b-form-group label="Realizar la busqueda por:" label-for="searchSelect">
                    <b-form-select v-model="filter" :options="options" id="searchSelect"/>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="container-fluid text-center">
            <ModalSpinner :isLoading="isLoading"/>
            <b-row cols="4" v-if="!isLoading">
                <b-col v-for="book in books" :key="book.key" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 mb-4">
                    <b-card :title="book.name" img-src="https://www.enago.com/academy/wp-content/uploads/2021/12/BookChapter-750x340.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem" class="card rounded shadow mb-2" >
                        <b-card-text>
                            <b>Autor:</b> {{ book.autor }}
                            <br/>
                            <b>Genero:</b> {{ book.category.name }}
                            <br/>
                            <b>Año de publicación:</b> {{ book.año }}
                        </b-card-text>
                        <div class="text-center">
                            <b-button class="m-1" variant="outline-primary" @click="update(book)"><b-icon icon="pen-fill"></b-icon></b-button>
                            <b-button class="m-1" variant="outline-danger" @click="deleteOne(book.id)"><b-icon icon="trash-fill"></b-icon></b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    import Vue from "vue";
    import bookService from "../services/Book";
    import categoryService from "../services/Category";

    export default Vue.extend({
        data() {
            return {
                books: [],
                filter: "nombre",
                options: [
                    { value: "nombre", text: "Nombre del libro" },
                    { value: "autor", text: "Autor del libro" },
                    { value: "category", text: "Genero del libro" },
                    { value: "dateRange", text: "Rango de fecha" },
                    { value: "dateDesc", text: "Ordenar por año descendente" },
                ],
                selectedCategory: null,
                fechaInicio: null,
                fechaFin: null,
                categories: [],
                nombreFilter: "",
                autorFilter: "",
                isLoading: true,
            };
        },
        components: {
            ModalSpinner: () => import("@/components/ModalSpinner.vue")
        },
        mounted() {
            this.getAllBooks();
            this.getCategories();
        },
        methods: {
            async getCategories() {
                try {
                    const data = await categoryService.getCategories();
                    this.categories = [...data]
                    console.log(this.categories);
                } catch (error) {
                    console.error(error);
                }
            },
            async getAllBooks() {
                try {
                    const data = await bookService.getAllBooks();
                    this.books = [...data];
                    this.isLoading = false;
                } catch (error) {
                    console.log(error);
                }
            },
            async getBooksByName() {
                try {
                    const data = await bookService.getBookByName(this.nombreFilter);
                    this.books = [...data];
                } catch (error) {
                    console.log(error);
                }
            },
            async getBooksByAutor() {
                try {
                    const data = await bookService.getBookByAutor(this.autorFilter);
                    this.books = [...data];
                } catch (error) {
                    console.log(error);
                }
            },
            async getBooksByCategory() {
                try {
                    const data = await bookService.getBookByCategory(this.selectedCategory);
                    this.books = [...data];
                } catch (error) {
                    console.log(error);
                }
            },
            async getBooksByDateRange() {
                if (this.fechaInicio !== null && this.fechaFin !== null) {
                    try {
                        const data = await bookService.getBookByDateBetween(this.fechaInicio, this.fechaFin);
                        this.books = [...data];
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    console.log("Los años ingresados nos son validos");
                }
            },
            async getBooksByDateDesc() {
                try {
                    const data = await bookService.getBookByDateDesc();
                    this.books = [...data];
                } catch (error) {
                    console.log(error);
                }
            },
        }
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