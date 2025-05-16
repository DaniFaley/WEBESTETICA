<template>
  <div class="contenedor_formulario">
    <Form class="formulario" @submit="onTodoBien">
      <h3 class="h3_Titulo">Agregar Usuario</h3>

      <div v-if="mensaje == 1" class="alert alert-success mensaje_alerta" role="alert">
        Registro agregado exitosamente
      </div>

      <div class="input">
        <p class="p_input">Correo:</p>
        <Field name="correo" type="text" class="form-control campo_input" v-model="rol_usuario.correo" />
        <ErrorMessage name="correo" class="errorValidacion" />
      </div>
      <div class="input">
        <p class="p_input">Contraseña:</p>
        <Field name="contrasena" type="text" class="form-control campo_input" v-model="rol_usuario.contrasena" />
        <ErrorMessage name="contrasena" class="errorValidacion" />
      </div>
      <div class="input">
        <p class="p_input">Rol:</p>
        <select name="fk_id_rol" class="form-control campo_input" v-model="rol_usuario.fk_id_rol">
          <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
            {{ rol.nombre }}
          </option>
        </select>
        <ErrorMessage name="fk_id_servicio" class="errorValidacion" />
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--agregar" type="submit">
          <i class="ri-add-circle-fill icon"></i>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import type { RolUsuarioAgregar } from '../interfaces/rol_usuario-interfaces';
  import { useRolUsuario } from '../controllers/rol_usuarioRol';
  import { Field, Form, ErrorMessage } from 'vee-validate';
  import { useRouter } from 'vue-router';
    // Importa las funciones reutilizables desde getfk.ts
  import { fetchRol } from '../utils/getFK';

  const { agregarRolUsuario, mensaje } = useRolUsuario();
  const routeRedirect = useRouter();

  let rol_usuario = ref<RolUsuarioAgregar>({
    correo: '',
    contrasena: '',
    fk_id_rol: 0
  });

  // Obtener valores de la fk
  const roles = ref<{ id_rol: number; nombre: string }[]>([]);

  // Cargar datos
  onMounted(async () => {
    roles.value = await fetchRol();

  });

  // Función para manejar el envío del formulario
  const onTodoBien = async () => {
    await agregarRolUsuario(rol_usuario.value);
  };

  watch(
      () => mensaje.value,
      (newValue) => {
          if (newValue === 1) {
              setTimeout(() => {
                  routeRedirect.push('/rol_usuario'); // Redirige después de 1 segundo
              }, 0); // Espera 1 segundo antes de redirigir
          }
      }
  );
</script>

<style scoped>
@import '../../../assets/styles_corte_formulario.css';
</style>
