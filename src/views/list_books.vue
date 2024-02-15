<template>
  <b-container class="mt-5">
    <Modal/>
    <div class="overflow-auto">
      <Card/>
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
        sortBy: "name",

        perPage: 3,
        currentPage: 1,
        items: [],
        fields: [
        { key: "name", label: "Nombre", sortable: false },
        { key: "autor", label: "Autor", sortable: false },
        { key: "año", label: "Año de publicacion", sortable: false },
        { key: "category.name", label: "Genero", sortable: false },
      ],
        
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
        const data = await service.getBooks(this.currentPage,
          this.perPage,this.sortBy);
        this.items = data.content;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
   
  },
  }
</script>