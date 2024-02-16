<template>
    <div>
        <b-button v-b-modal.insertar>Insertar</b-button>
        <b-modal id="insertar" @show="resetModal" @hidden="resetModal" @ok="handleOk" scrollable title="Agregar un nuevo libro" cancel-variant="outline-danger" ok-variant="outline-success">
            <b-form class="my-4" @submit.prevent="validarForm" @submit="handleSubmit">
                <p v-if="errors.length">
                    <b>{{ errors.length > 1 ? "Por favor corrige los siguientes errores: " : "Por favor corrige el siguiente error: " }}</b>
                    <ul>
                        <li v-for="error in errors" :key="error.index">{{ error }}</li>
                    </ul>
                </p>
                <b-form-group id="nombre-group" label="Nombre" label-for="nombre">
                    <b-form-input id="nombre" v-model="form.name" type="text" name="nombre" required></b-form-input>
                </b-form-group>
                <b-form-group id="autor-group" class="mt-3" label="Autor" label-for="autor">
                    <b-form-input id="autor" v-model="form.autor" type="text" name="autor" required></b-form-input>
                </b-form-group>
                <b-form-group id="category-group" class="mt-3" label="Genero" label-for="category">
                    <b-form-select id="category" v-model="form.category.id" :options="options" value-field="id" text-field="name">
                        <template>
                            <option :value="null" disabled>Selecciona uno de los siguientes generos</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion">
                    <b-form-input id="publicacion" v-model="form.año" type="number" name="publicacion" required></b-form-input>
                </b-form-group>
            </b-form>
            <ModalSpinner :isLoading="isLoading" />
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue";
    import service from "../services/services";
    import ModalSpinner from "@/components/ModalSpinner.vue";

    export default Vue.extend({
        components: {
            ModalSpinner,
        },
        data() {
            return {
                form: {
                    name: null,
                    autor: null,
                    category: {
                        id: null
                    },
                    año: null,
                },
                options: [],
                errors: [],
                isLoading: false,
            };
        },
        mounted() {
            this.getCategories();
        },
        methods: {
            async getCategories() {
                try {
                    const data = await service.getCategories();
                    this.options = data.map((category) => {
                        return {
                            value: category.id,
                            text: category.name
                        }
                    });
                    console.log(this.options);
                } catch (error) {
                    console.error(error);
                }
            },
            async validarForm(e) {
                this.errors = [];

                if (!this.form.name) {
                    this.errors.push("Nombre del libro obligatorio.");
                }

                if (!this.form.autor) {
                    this.errors.push("Nombre del autor obligatorio.");
                }

                // if (!this.form.category.id) {
                //     this.errors.push("Genero del libro es obligatorio.");
                // }

                if (!this.form.año) {
                    this.errors.push("El año de publicacion es obligatorio.");
                } else if (this.form.año < 1000 || this.form.año > new Date().getFullYear()) {
                    this.errors.push("Coloca un año de publicacion valido.");
                }

                if (!this.errors.length > 0) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
            },
            resetModal() {
                this.form.name = null
                this.form.autor = null
                this.form.category = {
                    id: null
                }
                this.form.año = null
                this.errors = []
            },
            handleOk(bvModalEvent) {
                bvModalEvent.preventDefault()
                this.handleSubmit()
            },
            async handleSubmit() {
                this.validarForm()
                this.isLoading = true;
                try {
                    const response = await service.postBook(this.form);
                    console.log("Respuesta del servidor:", response);
                    this.$bvModal.hide('insertar');
                    this.$emit('postBook', response);
                    this.$v?.$reset();
                } catch (e) {
                    console.log(e);
                }finally {
                    this.isLoading = false
                }
            }
        }
    });
</script>

<style></style>