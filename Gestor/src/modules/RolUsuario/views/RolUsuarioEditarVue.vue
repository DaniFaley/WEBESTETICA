<template>
  <div class="contenedor_formulario" v-if="roles_usuario[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        Registtro modificado exitosamente
      </div>
      
      <div class="input">
        <p class="p_input">Correo:</p>
        <input type="text" class="form-control campo_input" v-model="roles_usuario[0].correo" />
      </div>
      <div class="input">
        <p class="p_input">Contraseña:</p>
        <input type="password" class="form-control campo_input" v-model="roles_usuario[0].contrasena" />
      </div>
      <div class="input">
        <p class="p_input">Rol:</p>
        <select name="fk_id_rol" class="form-control campo_input" v-model="roles_usuario[0].fk_id_rol">
          <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
            {{ rol.nombre }}
          </option>
        </select>
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--editar" @click="actualizarRolUsuario(roles_usuario[0])">
          <i class="ri-arrow-left-right-line icon"></i>
        </button>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRolUsuario } from '../controllers/rol_usuarioRol';
  import { useRoute, useRouter } from 'vue-router';
  // Importa las funciones desde getfk.ts
  import { fetchRol } from '../utils/getFK';

  const { traeRolUsuarioId, actualizarRolUsuario, mensaje, roles_usuario } = useRolUsuario();
  const route = useRoute();
  const routeRedirect = useRouter();

  //Obteber vlaores de las fk: Mediante el ID
  onMounted(async () => {
    const idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(idRolUsuario); // Cargar datos del ingreso

    // Cargar sexos y servicios
    roles.value = await fetchRol();
  });

  // Variables para roles
  const roles = ref<{ id_rol: number; nombre: string }[]>([]);

  // Observa cambios en mensaje para redirigir después de actualizar
  watch(
    () => mensaje.value,
    (newValue) => {
      if (newValue === 1) {
        setTimeout(() => {
          routeRedirect.push('/rol_usuario'); // Redirige después de 1 segundo
        }, 0);
      }
    }
  );
</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>