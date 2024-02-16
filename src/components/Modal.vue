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
                <b-form-group id="nombre-group" label="Nombre" label-for="nombre" :state="nombre ? null : false">
                    <b-form-input id="nombre" v-model="form.nombre" type="text" name="nombre" required></b-form-input>
                </b-form-group>
                <b-form-group id="autor-group" class="mt-3" label="Autor" label-for="autor" :state="autor ? null : false">
                    <b-form-input id="autor" v-model="form.autor" type="text" name="autor" required></b-form-input>
                </b-form-group>
                <b-form-group id="genero-group" class="mt-3" label="Genero" label-for="genero" :state="genero ? null : false">
                    <b-form-select id="genero" v-model="form.genero.id" :options="options">
                        <template>
                            <option :value="null" disabled>Selecciona alguno de los siguientes generos</option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion" :state="publicacion ? null : false">
                    <b-form-input id="publicacion" v-model="form.publicacion" type="number" name="publicacion" required></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend( {
        data() {
            return {
                form: {
                    nombre: null,
                    autor: null,
                    genero: {
                        id: null
                    },
                    publicacion: null,
                },
                options: [],
                errors: [],
            };
        },
        methods: {
            async validarForm(e) {
                this.errors = [];

                if (!this.form.nombre) {
                    this.errors.push("Nombre del libro obligatorio.");
                }

                if (!this.form.autor) {
                    this.errors.push("Nombre del autor obligatorio.");
                }

                if (!this.form.genero.id) {
                    this.errors.push("Genero del libro es obligatorio.");
                }

                if (!this.form.publicacion) {
                    this.errors.push("El año de publicacion es obligatorio.");
                } else if (this.form.publicacion < 1000 || this.form.publicacion > new Date().getFullYear()) {
                    this.errors.push("Coloca un año de publicacion valido.");
                }

                if (!this.errors.length > 0) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
            },
            resetModal() {
                this.form.nombre = null
                this.form.autor = null
                this.form.genero = {
                    id: null
                }
                this.form.publicacion = null
                this.errors = []
            },
            handleOk(bvModalEvent) {
                bvModalEvent.preventDefault()
                this.handleSubmit()
            },
            async handleSubmit() {
                this.validarForm()
                try {
                    this.$bvModal.hide('insertar')
                    this.$v?.$reset();
                } catch (e) {
                    console.log(e);
                }
            },
        }
    });
</script>

<style></style>