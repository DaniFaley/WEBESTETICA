<template>
    <h3 class="h3_Titulo">Roles</h3>

    <section class="contenedor_section_tabla">
      <div v-for="(rol, index) in roles" :key="index" class="card">
        <RouterLink class="contenedor_router" :to="{ path: '/rol/' + rol.id_rol + '/detalles' }">
          <button type="button" class="boton_card">
            <div class="bloque_datos">
              <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">Rol:</strong> {{ rol.nombre }}</p>
            </div>
          </button>
        </RouterLink>
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
  @import '../../../assets/styles_new.css';
</style> 