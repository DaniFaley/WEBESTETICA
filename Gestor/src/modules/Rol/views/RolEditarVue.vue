<template>
  <div class="contenedor_formulario" v-if="roles[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        Registro modificado exitosamente
      </div>

      <div class="input">
        <p class="p_input">ID:</p>
        <input type="number" class="form-control campo_input" v-model="roles[0].id_rol" disabled />
      </div>

      <div class="input">
        <p class="p_input">Nombre:</p>
        <input type="text" class="form-control campo_input" v-model="roles[0].nombre" />
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--editar" @click="actualizarRol(roles[0])">
          <i class="ri-arrow-left-right-line icon"></i>
        </button>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
  import { onMounted, watch} from 'vue';
  import { useRol } from '../controllers/useRol';
  import { useRoute, useRouter } from 'vue-router';

  const { traeRolId, actualizarRol, mensaje, roles } = useRol();
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