<template>
  <div class="contenedor_formulario" v-if="rols[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        Rol modificado exitosamente
      </div>

      <div class="input">
        <p class="p_input">ID:</p>
        <input type="number" class="form-control campo_input" v-model="rols[0].id_rol" disabled />
      </div>

      <div class="input">
        <p class="p_input">Nombre:</p>
        <input type="text" class="form-control campo_input" v-model="rols[0].nombre" />
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--editar" @click="actualizarRol(rols[0])">
          <i class="ri-arrow-left-right-line icon"></i>
        </button>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { useRol } from '../controllers/useRol';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const { traeRolId, actualizarRol, mensaje, rols } = useRol();
  const route = useRoute();
  const routeRedirect = useRouter();

  // Cargar el Rol por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idRol = Number(route.params.id_rol);
    await traeRolId(idRol); // Cargar datos del ingreso
  });

  // Observa cambios en mensaje para redirigir después de actualizar
  watch(
    () => mensaje.value,
    (newValue) => {
      if (newValue === 1) {
        setTimeout(() => {
          routeRedirect.push('/rol'); // Redirige después de 1 segundo
        }, 0);
      }
    }
  );

</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>