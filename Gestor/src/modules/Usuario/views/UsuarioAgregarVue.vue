<template>
    <div class="contenedor_formulario">
      <Form class="formulario" @submit="onTodoBien">
  
        <h3 class="h3_Titulo">Agregar Usuario</h3>
  
        <div v-if="mensaje == 1" class="alert alert-success mensaje_alerta" role="alert">
          Registro agregado exitosamente
        </div>

        <div class="input">
          <p class="p_input">Primer Nombre:</p>
          <Field name="primer_nombre" type="text" class="form-control campo_input" v-model="usuario.primer_nombre"/>
          <ErrorMessage name="nombre_cliente" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Segundo Nombre:</p>
          <Field name="segundo_nombre" type="text" class="form-control campo_input" v-model="usuario.segundo_nombre"/>
          <ErrorMessage name="segundo_nombre" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Primer Apellido:</p>
          <Field name="primer_apellido" type="text" class="form-control campo_input" v-model="usuario.primer_apellido"/>
          <ErrorMessage name="primer_apellido" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Segundo Apellido:</p>
          <Field name="segundo_apellido" type="text" class="form-control campo_input" v-model="usuario.segundo_apellido"/>
          <ErrorMessage name="segundo_apellido" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Calle:</p>
          <Field name="calle" type="text" class="form-control campo_input" v-model="usuario.calle"/>
          <ErrorMessage name="calle" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Numero De Casa:</p>
          <Field name="numero_casa" type="text" class="form-control campo_input" v-model="usuario.numero_casa"/>
          <ErrorMessage name="numero_casa" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Colonia:</p>
          <Field name="colonia" type="text" class="form-control campo_input" v-model="usuario.colonia"/>
          <ErrorMessage name="colonia" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Ciudad:</p>
          <Field name="ciudad" type="text" class="form-control campo_input" v-model="usuario.ciudad"/>
          <ErrorMessage name="ciudad" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Estado:</p>
          <Field name="estado" type="text" class="form-control campo_input" v-model="usuario.estado"/>
          <ErrorMessage name="estado" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Codigo Postal:</p>
          <Field name="codigo_postal" type="text" class="form-control campo_input" v-model="usuario.codigo_postal"/>
          <ErrorMessage name="codigo_postal" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">RFC:</p>
          <Field name="rfc" type="text" class="form-control campo_input" v-model="usuario.rfc"/>
          <ErrorMessage name="rfc" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">CURP:</p>
          <Field name="curp" type="text" class="form-control campo_input" v-model="usuario.curp"/>
          <ErrorMessage name="curp" class="errorValidacion"/>
        </div>
        <div class="input">
          <p class="p_input">Telefono:</p>
          <Field name="telefono" type="text" class="form-control campo_input" v-model="usuario.telefono"/>
          <ErrorMessage name="telefono" class="errorValidacion"/>
        </div>
        <div class="contenedor_boton">
          <button class="btn btn-primary boton_accion boton_accion--agregar" type="submit"><i class="ri-add-circle-fill icon"></i></button>
        </div>
      </Form>

    </div>
  </template>
  


<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { UsuarioAgregar } from '../interfaces/usuario-interfaces';
  import { useUsuario } from '../controllers/useUsuario';
  import { Field, Form, ErrorMessage } from 'vee-validate';
  import { useRouter } from 'vue-router';

  const { agregarUsuario, mensaje } = useUsuario();
  const routeRedirect = useRouter();



  // Variable para el formulario
  let usuario = ref<UsuarioAgregar>({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    calle: '',
    numero_casa: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigo_postal: '',
    rfc: '',
    curp: '',
    telefono: ''
  });

  // Función para manejar el envío del formulario
  const onTodoBien = async () => {
      await agregarUsuario(usuario.value);
  };

  watch(
      () => mensaje.value,
      (newValue) => {
          if (newValue === 1) {
              setTimeout(() => {
                  routeRedirect.push('/usuario'); // Redirige después de 1 segundo
              }, 0); // Espera 1 segundo antes de redirigir
          }
      }
  );
</script>



<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style> 