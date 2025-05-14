<template>
  <section class="contenedor_detalles">
    <h3 class="h3_Titulo">Detalles</h3>

    <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
      Datos actualizados correctamente
    </div>

    <div v-else v-for="(rol_usuario, index) in rol_usuarios" :key="index" class="card">
      <div class="bloque_datos" id="tablaUsuario">
        <p class="p_valor"><i class="ri-id-card-fill icon"></i> <strong class="p_dato">Correo:</strong> {{ rol_usuario.correo }}</p>
        <p class="p_valor"><i class="ri-scissors-fill icon"></i> <strong class="p_dato">Rol:</strong> {{ rols[rol_usuario.fk_id_rol] }}</p>
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
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const { traeRolUsuarioId, mensaje, rol_usuarios } = useRolUsuario();
  const route = useRoute();
  const routeRedirect = useRouter();
  
  // Cargar el rol por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(idRolUsuario); // Cargar datos del ingreso
  });


  const rols = ref<Record<number, string>>({});
    
  // Obtener servicios
  const obtenerRol = async () => {
    try {
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/rol/`);
      response.data.forEach((rol: any) => {
        rols.value[rol.id_rol] = rol.nombre;
      });
    } 
    catch (error) {
      console.error("Error al obtener los rols:", error);
    }
  };

    onMounted(async () => {
    await obtenerRol();
  });
</script>
  


<style scoped>
  @import '../../../assets/styles_registro_corte_detalles.css';
</style> 