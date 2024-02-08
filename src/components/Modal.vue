<template>
    <div>
        <b-button v-b-modal.insertar>Insertar</b-button>
        <b-modal id="insertar" scrollable title="Agregar un nuevo libro">
            <b-form class="my-4" @submit.prevent="validarForm" action="" method="post" novalidate>
                <p v-if="errors.length">
                    <b>{{ errors.length > 1 ? "Por favor corrige los siguientes errores: " : "Por favor corrige el siguiente error: " }}</b>
                    <ul>
                        <li v-for="error in errors" :key="error.index">{{ error }}</li>
                    </ul>
                </p>
                <b-form-group id="nombre-group" label="Nombre:" label-for="nombre" :state="nombre ? null : false">
                    <b-form-input id="nombre" v-model="nombre" type="text" required></b-form-input>
                </b-form-group>
                <b-form-group id="autor-group" class="mt-3" label="Autor" label-for="autor" :state="autor ? null : false">
                    <b-form-input id="autor" v-model="autor" type="text" required></b-form-input>
                </b-form-group>
                <b-form-select v-model="genero" :options="options"></b-form-select>
                <b-form-group id="publicacion-group" class="mt-3" label="Año de Publicacion" label-for="publicacion" :state="publicacion ? null : false">
                    <b-form-input id="publicacion" v-model="publicacion" type="text" required></b-form-input>
                </b-form-group>
                <b-button class="mt-3" type="submit" variant="outline-success">Enviar</b-button><br>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend( {
        data() {
            return {
                errors: [],
                nombre: null,
                autor: null,
                genero: null,
                options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'a', text: 'This is First option' },
                    { value: 'b', text: 'Selected Option' },
                    { value: { C: '3PO' }, text: 'This is an option with object value' },
                    { value: 'd', text: 'This one is disabled', disabled: true }
                ],
                publicacion: null,
                validarEdad: false,
                validarImagen: false,
            };
        },
        methods: {
            validarForm: function (e) {
                this.errors = [];

                if (!this.nombre) {
                this.errors.push("Nombre del libro obligatorio.");
                }

                if (!this.autor) {
                this.errors.push("Nombre del autor obligatorio.");
                }

                if (!this.direccion) {
                this.errors.push("Direccion obligatoria.");
                }

                if (!this.nacimiento) {
                this.errors.push("Fecha de Nacimiento obligatoria.");
                } else {
                const hoy = new Date();
                const fechaNacimiento = new Date(this.nacimiento);
                const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                const diferenciaMes = hoy.getMonth() - fechaNacimiento.getMonth();
                if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                    this.validarEdad = edad - 1;
                } else {
                    this.validarEdad = edad;
                }
                if (fechaNacimiento > Date.now()) {
                    this.errors.push("Fecha de Nacimiento no puede ser mayor a la fecha actual.");
                }else if (this.validarEdad < 18) {
                    this.errors.push("La edad debe ser de 18 o más.");
                }
                }

                if (!this.email) {
                this.errors.push("Correo Electrónico obligatorio.");
                } else if (!this.validarEmail(this.email)) {
                this.errors.push("Por favor ingresa una dirección de correo válida.");
                }

                if (!this.numero) {
                this.errors.push("El número de teléfono es obligatorio.");
                } else if (this.numero.length != 10) {
                this.errors.push("El número de teléfono debe tener al menos 10 digitos.");
                }

                if (!this.imagen) {
                this.errors.push("La foto es obligatoria.");
                } else if (!this.validarImagen) {
                this.errors.push("La foto debe tener menos de 3 MB.");
                }

                if (!this.errors.length) {
                return true;
                }

                e.preventDefault();
            },
            validarEmail: function (email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            validarNumero: function (numero) {
                return true;
            },
            handleFileChange(event) {
                const fileInput = event.target;
                if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const tamañoMaximoMB = 3;

                if (file.size > tamañoMaximoMB * 1024 * 1024) {
                    this.validarImagen = false;
                    this.errors.push(`El tamaño de la foto debe ser menos de ${tamañoMaximoMB} MB.`);
                } else {
                    this.validPhoto = true;
                }
                }
            },
        }
    });
</script>

<style></style>