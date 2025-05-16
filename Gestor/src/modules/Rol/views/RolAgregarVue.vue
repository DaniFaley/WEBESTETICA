<template>
  <div class="contenedor_formulario">
    <Form class="formulario" @submit="onTodoBien">
      <h3 class="h3_Titulo">Agregar Rol</h3>

      <div v-if="mensaje == 1" class="alert alert-success mensaje_alerta" role="alert">
        Registro agregado exitosamente
      </div>

      <div class="input">
        <p class="p_input">Nombre:</p>
        <Field name="nombre_cliente" type="text" class="form-control campo_input" v-model="rol.nombre" />
        <ErrorMessage name="nombre_cliente" class="errorValidacion" />
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--agregar" type="submit">
          <i class="ri-add-circle-fill icon"></i>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { RolAgregar } from '../interfaces/rol-interfaces';
import { useRol } from '../controllers/useRol';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useRouter } from 'vue-router';

const { agregarRol, mensaje } = useRol();
const routeRedirect = useRouter();

let rol = ref<RolAgregar>({
  nombre: ''
});

// Función para manejar el envío del formulario
  const onTodoBien = async () => {
      await agregarRol(rol.value);
  };

  watch(
      () => mensaje.value,
      (newValue) => {
          if (newValue === 1) {
              setTimeout(() => {
                  routeRedirect.push('/rol'); // Redirige después de 1 segundo
              }, 0); // Espera 1 segundo antes de redirigir
          }
      }
  );
</script>

<style scoped>
@import '../../../assets/styles_corte_formulario.css';
</style>
