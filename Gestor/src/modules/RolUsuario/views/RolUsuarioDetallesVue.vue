<template>
  <section class="contenedor_detalles">
    <h3 class="h3_Titulo">Detalles</h3>

    <div v-for="(rol_usuario, index) in roles_usuario" :key="index" class="card">
      <div class="bloque_datos">
          <p class="p_valor">
            <i class="ri-mail-fill icon"></i> 
            <strong class="p_dato">Correo:</strong> {{ rol_usuario.correo }}
          </p>
          <p class="p_valor">
            <i class="ri-account-circle-fill icon"></i> 
            <strong class="p_dato">Rol:</strong> {{ roles[rol_usuario.fk_id_rol]}}
          </p>
      </div>

      <div class="contenedor_botones_detalles">
        <RouterLink class="nav-link item boton_modificar" :to="`/rol_usuario/${rol_usuario.id_usuario}/editar`">
          <i class="ri-settings-4-line"></i>
        </RouterLink>
        <RouterLink class="nav-link item boton_eliminar" :to="`/rol_usuario/${rol_usuario.id_usuario}/eliminar`">
          <i class="ri-close-circle-line"></i>
        </RouterLink>   
      </div>
    </div>
  
  </section>
</template>

  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRolUsuario } from '../controllers/rol_usuarioRol';
  import { useRoute } from 'vue-router';
  import { getRol } from '../utils/getFK';

  const { traeRolUsuarioId, roles_usuario } = useRolUsuario();
  const route = useRoute();
  
  // Obtener valores para las fk: Variables para sexos y servicios
  const roles = ref<Record<number, string>>({});

  // Cargar datos
  onMounted(async () => {
    const idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(idRolUsuario);
    // Obtener valores para las fk
    roles.value = await getRol();
  });
</script>
  


<style scoped>
  @import '../../../assets/styles_registro_corte_detalles.css';
</style> 