<template>
    <div class="contenedor_formulario" v-if="usuarios[0]">
      <div class="formulario">
  
        <h3 class="h3_Titulo">Modificar Registro</h3>
  
        <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
          Registro modificado exitosamente
        </div>
  
        <div class="input">
          <p class="p_input">ID:</p>
          <input type="number" class="form-control campo_input" v-model="usuarios[0].id_datos_usuario" disabled />
        </div>
        <div class="input">
          <p class="p_input">Primer Nombre:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].primer_nombre" />
        </div>
        <div class="input">
          <p class="p_input">Segundo Nombre:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].segundo_nombre" />
        </div>
        <div class="input">
          <p class="p_input">Primer Apellido:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].primer_apellido" />
        </div>
        <div class="input">
          <p class="p_input">Segundo Apellido:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].segundo_apellido" />
        </div>
        <div class="input">
          <p class="p_input">Calle:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].calle" />
        </div>
        <div class="input">
          <p class="p_input">Numero De Casa:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].numero_casa" />
        </div>
        <div class="input">
          <p class="p_input">Colonia:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].colonia" />
        </div>
        <div class="input">
          <p class="p_input">Ciudad:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].ciudad" />
        </div>
        <div class="input">
          <p class="p_input">Estado:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].estado" />
        </div>
        <div class="input">
          <p class="p_input">Codigo Postal:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].codigo_postal" />
        </div>
        <div class="input">
          <p class="p_input">RFC:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].rfc" />
        </div>
        <div class="input">
          <p class="p_input">CURP:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].curp" />
        </div>
        <div class="input">
          <p class="p_input">Telefono:</p>
          <input type="text" class="form-control campo_input" v-model="usuarios[0].telefono" />
        </div>
        <div class="contenedor_boton">
          <button class="btn btn-primary boton_accion boton_accion--editar" @click="actualizarUsuario(usuarios[0])">
            <i class="ri-arrow-left-right-line icon"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
    import { ref, onMounted, watch, computed } from 'vue';
    import { useUsuario } from '../controllers/useUsuario';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';
  
    const { traeUsuarioId, actualizarUsuario, mensaje, usuarios } = useUsuario();
    const route = useRoute();
    const routeRedirect = useRouter();
  
    // Cargar el Usuario por ID, las cuentas y las categorías disponibles
    onMounted(async () => {
      const idUsuario = Number(route.params.id_datos_usuario);
      await traeUsuarioId(idUsuario); // Cargar datos del ingreso
    });
  
    // Observa cambios en mensaje para redirigir después de actualizar
    watch(
      () => mensaje.value,
      (newValue) => {
        if (newValue === 1) {
          setTimeout(() => {
            routeRedirect.push('/usuario'); // Redirige después de 1 segundo
          }, 0);
        }
      }
    );
  
  </script>
  
  <style scoped>
    @import '../../../assets/styles_corte_formulario.css';
  </style>