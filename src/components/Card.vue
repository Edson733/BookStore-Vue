<template>
    <div class="container-fluid text-center">
        <b-row cols="4">
            <b-col v-for="book in books" :key="book.key" class="col-xs-6 col-sm-6 col-md-4 col-lg-4 mb-4">
                <b-card :title="book.name" img-src="https://www.enago.com/academy/wp-content/uploads/2021/12/BookChapter-750x340.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem, background-color: #fcfcfc" class="card rounded shadow mb-2" >
                    <b-card-text>
                        <b>Autor:</b> {{ book.autor }}
                        <br />
                        <b>Genero:</b> {{ book.category.name }}
                        <br />
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
</template>

<script>
    import Vue from "vue";
    import service from "../services/services";

    export default Vue.extend({
        data() {
            return {
                books: [],
            };
        },
        mounted() {
            this.getBooks();
        },
        methods: {
            async getBooks() {
                try {
                    const data = await service.getBooks();
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