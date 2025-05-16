<template>
    <h3 class="h3_Titulo">Roles</h3>

    <section class="contenedor_section_tabla">
    <div v-for="(rol, index) in roles" :key="index" class="card">
      <div class="bloque_datos">
        <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">ID:</strong> {{ rol.id_rol }}</p>
        <p class="p_valor"><i class="ri-money-dollar-circle-fill icon_card"></i> <strong class="p_dato">Nombre:</strong> {{ rol.nombre }}</p>
      </div>
      <div class="contenedor_boton_detalles">
        <RouterLink :to="{ path: '/rol/' + rol.id_rol + '/detalles' }">
          <button type="button" class="boton_detalles">
            <i class="ri-expand-diagonal-fill icon icon_detalles"></i>
          </button>
        </RouterLink>
      </div>
    </div>
  </section>


</template>


<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRol } from '../controllers/useRol';
    const { traeRol, roles } = useRol();

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        await traeRol();
    });
</script>

<style scoped>
  @import '../../../assets/styles_registro_corte.css';
</style> 