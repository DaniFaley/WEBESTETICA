<template>
    <div class="contenedor_formulario" v-if="roles[0]">
          <div class="formulario">

            <h3 class="h3_Titulo">Eliminar Registro</h3>

            <div class="alert alert-warning mensaje_alerta" role="alert">
              <i class="ri-error-warning-line"></i> ¿Estas seguro que deseas eliminar el registro? <i class="ri-error-warning-line"></i>
            </div>
            <div class="input">
              <p class="p_input">ID:</p>
              <input type="number" class="form-control campo_input" v-model="roles[0].id_rol" disabled />
            </div>
            <div class="input">
              <p class="p_input">Nombre:</p>
              <input type="text" class="form-control campo_input" v-model="roles[0].nombre" disabled />
            </div>

            <div class="contenedor_boton">
              <button class="btn btn-danger boton_accion boton_accion--eliminar" @click="borrarRol(roles[0])">
                <i class="ri-delete-bin-5-fill icon"></i>
              </button>
            </div>
          </div>
        </div>
  </template>
  
<script setup lang="ts">
  import { onMounted, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useRol } from '../controllers/useRol';

  const { traeRolId, borrarRol, mensaje, roles } = useRol();

  // Traer los datos del registro de cada id
  let idRol = 0;

  // Para los parámetros de la URL
  const route = useRoute();

  // Para moverme de URL: A otra página
  const routeRedirect = useRouter();

  // Observador(Watch): sirve para ver el comportamiento de una variable
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

  onMounted(async () => {
    idRol = Number(route.params.id_rol);
    await traeRolId(Number(idRol));
  });
</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>