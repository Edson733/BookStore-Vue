<template>
  <b-container class="mt-3" fluid>
    <b-row class="mb-3 text-center">
      <b-col cols="10"><h1>Biblioteca</h1></b-col>
      <b-col cols="2"><Modal/></b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="row">
          <Card/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    components:{
      Modal: () => import("@/components/Modal.vue"),
      Card: () => import("@/components/Card.vue"),
    },
  });
</script>

<style></style>