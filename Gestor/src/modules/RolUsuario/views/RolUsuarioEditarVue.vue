<template>
  <div class="contenedor_formulario" v-if="rol_usuarios[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        rol_usuario modificado exitosamente
      </div>

      <div class="input">
        <p class="p_input">ID:</p>
        <input type="number" class="form-control campo_input" v-model="rol_usuarios[0].id_usuario" disabled />
      </div>

      <div class="input">
        <p class="p_input">Correo:</p>
        <input type="text" class="form-control campo_input" v-model="rol_usuarios[0].correo" />
      </div>

      <div class="input">
        <p class="p_input">Contraseña:</p>
        <input type="text" class="form-control campo_input" v-model="rol_usuarios[0].contrasena" />
      </div>

      <div class="input">
        <p class="p_input">Rol:</p>
        <select name="fk_id_rol" class="form-control campo_input" v-model="rol_usuarios[0].fk_id_rol">
          <option v-for="rol in rols" :key="rol.id_rol" :value="rol.id_rol">
            {{ rol.nombre }}
          </option>
        </select>
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--editar" @click="actualizarRolUsuario(rol_usuarios[0])">
          <i class="ri-arrow-left-right-line icon"></i>
        </button>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { useRolUsuario } from '../controllers/rol_usuarioRol';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const { traeRolUsuarioId, actualizarRolUsuario, mensaje, rol_usuarios } = useRolUsuario();
  const route = useRoute();
  const routeRedirect = useRouter();

  // Cargar el RolUsuario por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(idRolUsuario); // Cargar datos del ingreso
  });

  // Observa cambios en mensaje para redirigir después de actualizar
  watch(
    () => mensaje.value,
    (newValue) => {
      if (newValue === 1) {
        setTimeout(() => {
          routeRedirect.push('/id_usuario'); // Redirige después de 1 segundo
        }, 0);
      }
    }
  );

  // Variables para las sexos
  const rols = ref<{ id_rol: number; nombre: string }[]>([]);

  // Función para obtener sexos del backend
  const fetchRol = async () => {
    try {
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/rol/`);
      rols.value = response.data;
    } catch (error) {
      console.error('Error al obtener las sexos:', error);
    }
  };

  onMounted(async () => {
    await fetchRol(); 
  });

</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>