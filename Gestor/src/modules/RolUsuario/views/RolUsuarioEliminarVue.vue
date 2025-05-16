<template>
    <div class="contenedor_formulario" v-if="roles_usuario[0]">
          <div class="formulario">

            <h3 class="h3_Titulo">Eliminar Registro</h3>

            <div class="alert alert-warning mensaje_alerta" role="alert">
              <i class="ri-error-warning-line"></i> ¿Estas seguro que deseas eliminar el registro? <i class="ri-error-warning-line"></i>
            </div>
            <div class="input">
              <p class="p_input">Correo:</p>
              <input type="text" class="form-control campo_input" v-model="roles_usuario[0].correo" disabled />
            </div>
            <div class="input">
              <p class="p_input">Rol:</p>
              <input
                type="text"
                class="form-control campo_input"
                :value="roles[roles_usuario[0].fk_id_rol] || 'Desconocido'"
                disabled
              />
            </div>
            <div class="contenedor_boton">
              <button class="btn btn-danger boton_accion boton_accion--eliminar" @click="borrarRolUsuario(roles_usuario[0])">
                <i class="ri-delete-bin-5-fill icon"></i>
              </button>
            </div>
          </div>
        </div>
  </template>
  
<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useRolUsuario } from '../controllers/rol_usuarioRol';
  import { getRol } from '../utils/getFK';

  const { traeRolUsuarioId, borrarRolUsuario, mensaje, roles_usuario } = useRolUsuario();

  const route = useRoute();
  const routeRedirect = useRouter();

  // Obtener valores para las fk: Variables para sexos y servicios
  const roles = ref<Record<number, string>>({});

  // Cargar datos
  onMounted(async () => {
    const idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(idRolUsuario);
    // Obtener valores para las fk
    roles.value = await getRol();
  });

  // Observador(Watch): sirve para ver el comportamiento de una variable
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