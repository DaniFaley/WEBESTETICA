<template>
  <section class="contenedor_detalles">
    <h3 class="h3_Titulo">Detalles</h3>

    <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
      Datos actualizados correctamente
    </div>

    <div v-else v-for="(rol, index) in rols" :key="index" class="card">
      <div class="bloque_datos" id="tablaUsuario">
        <p class="p_valor"><i class="ri-id-card-fill icon"></i> <strong class="p_dato">ID:</strong> {{ rol.id_rol }}</p>
        <p class="p_valor"><i class="ri-account-circle-fill icon"></i> <strong class="p_dato">Nombre:</strong> {{ rol.nombre }}</p>
    </div>

    <div class="contenedor_botones_detalles">
      <RouterLink class="nav-link item boton_modificar" :to="`/rol/${rol.id_rol}/editar`">
        <i class="ri-settings-4-line"></i>
      </RouterLink>
      <RouterLink class="nav-link item boton_eliminar" :to="`/rol/${rol.id_rol}/eliminar`">
        <i class="ri-close-circle-line"></i>
      </RouterLink>   
      </div>
    </div>
  </section>
</template>

  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRol } from '../controllers/useRol';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const { traeRolId, mensaje, rols } = useRol();
  const route = useRoute();
  const routeRedirect = useRouter();
  
  // Cargar el rol por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idRol = Number(route.params.id_rol);
    await traeRolId(idRol); // Cargar datos del ingreso
  });
</script>
  


<style scoped>
  @import '../../../assets/styles_registro_corte_detalles.css';
</style> 