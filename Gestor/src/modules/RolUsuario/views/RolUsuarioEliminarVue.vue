<template>
    <div class="contenedor_formulario" v-if="rol_usuarios[0]">
          <div class="formulario">

            <h3 class="h3_Titulo">Eliminar Registro</h3>

            <div class="alert alert-warning mensaje_alerta" role="alert">
              <i class="ri-error-warning-line"></i> ¿Estas seguro que deseas eliminar el registro? <i class="ri-error-warning-line"></i>
            </div>

            <div class="input">
              <p class="p_input">ID:</p>
              <input type="number" class="form-control campo_input" v-model="rol_usuarios[0].id_usuario" disabled />
            </div>
            <div class="input">
              <p class="p_input">Correo:</p>
              <input type="text" class="form-control campo_input" v-model="rol_usuarios[0].correo" disabled />
            </div>
            <div class="input">
              <p class="p_input">Rol:</p>
              <input
                type="text"
                class="form-control campo_input"
                :value="rols[rol_usuarios[0].fk_id_rol] || 'Desconocido'"
                disabled
              />
            </div>
            <div class="contenedor_boton">
              <button class="btn btn-danger boton_accion boton_accion--eliminar" @click="borrarRolUsuario(rol_usuarios[0])">
                <i class="ri-delete-bin-5-fill icon"></i>
              </button>
            </div>
          </div>
        </div>
  </template>
  
<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useRolUsuario } from '../controllers/rol_usuarioRol';
  import axios from 'axios';

  const { traeRolUsuarioId, borrarRolUsuario, mensaje, rol_usuarios } = useRolUsuario();

  // Traer los datos del registro de cada id
  let idRolUsuario = 0;

  // Para los parámetros de la URL
  const route = useRoute();

  // Para moverme de URL: A otra página
  const routeRedirect = useRouter();

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

  onMounted(async () => {
    idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(Number(idRolUsuario));
  });

const rols = ref<Record<number, string>>({});

  // Obtener sexos
  const obtenerRol = async () => {
    try {
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/rol/`);
      response.data.forEach((rol: any) => {
        rols.value[rol.id_rol] = rol.nombre;
      });
    } catch (error) {
      console.error('Error al obtener los rol:', error);
    }
  };
   onMounted(async () => {
    await obtenerRol();
  });

</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>