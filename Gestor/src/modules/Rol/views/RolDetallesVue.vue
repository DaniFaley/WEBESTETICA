<template>
  <section class="contenedor_detalles">
    <h3 class="h3_Titulo">Detalles</h3>

    <div v-for="(rol, index) in roles" :key="index" class="card">
      <div class="bloque_datos">
        <p class="p_valor">
          <i class="ri-account-circle-fill icon"></i> 
          <strong class="p_dato">Nombre:</strong> {{ rol.nombre }}
        </p>
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
  import { onMounted } from 'vue';
  import { useRol } from '../controllers/useRol';
  import { useRoute } from 'vue-router';

  const { traeRolId, roles } = useRol();
  const route = useRoute();
  
  // Cargar el rol por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idRol = Number(route.params.id_rol);
    await traeRolId(idRol); // Cargar datos del ingreso
  });
</script>
  


<style scoped>
  @import '../../../assets/styles_registro_corte_detalles.css';
</style> 