<template>
  <div class="contenedor_formulario" v-if="roles_usuario[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        Registro modificado exitosamente
      </div>

      <div class="input">
        <p class="p_input">Correo:</p>
        <input
          type="text"
          class="form-control campo_input"
          v-model="usuarioEditable.correo"
        />
      </div>

      <div class="input">
        <p class="p_input">Contraseña:</p>
        <input
          type="password"
          class="form-control campo_input"
          v-model="nuevaContrasena"
        />
      </div>

      <div class="input">
        <p class="p_input">Rol:</p>
        <select
          name="fk_id_rol"
          class="form-control campo_input"
          v-model="usuarioEditable.fk_id_rol"
        >
          <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
            {{ rol.nombre }}
          </option>
        </select>
      </div>

      <div class="contenedor_boton">
        <button
          class="btn btn-primary boton_accion boton_accion--editar"
          @click="onActualizar"
        >
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
  import bcrypt from 'bcryptjs';
  import { fetchRol } from '../utils/getFK';

  const { traeRolUsuarioId, actualizarRolUsuario, mensaje, roles_usuario } = useRolUsuario();
  const route = useRoute();
  const routeRedirect = useRouter();

  const roles = ref<{ id_rol: number; nombre: string }[]>([]);

  // Variable para nueva contraseña
  const nuevaContrasena = ref('');

  // Copia editable del usuario (sin contraseña)
  const usuarioEditable = ref({
    correo: '',
    contrasena: '',
    fk_id_rol: 0,
  });

  onMounted(async () => {
    const idRolUsuario = Number(route.params.id_usuario);
    await traeRolUsuarioId(idRolUsuario);

    const original = roles_usuario.value[0];
    usuarioEditable.value = {
      correo: original.correo,
      contrasena: '',
      fk_id_rol: original.fk_id_rol,
    };

    roles.value = await fetchRol();
  });

  const onActualizar = async () => {
  const original = roles_usuario.value[0];

  const usuarioModificado = {
    ...usuarioEditable.value,
    contrasena: nuevaContrasena.value
      ? bcrypt.hashSync(nuevaContrasena.value, bcrypt.genSaltSync(10))
      : original.contrasena,
    id_usuario: original.id_usuario, // <-- requerido por la interfaz RolUsuario
  };

  await actualizarRolUsuario(usuarioModificado);
};


  watch(
    () => mensaje.value,
    (newValue) => {
      if (newValue === 1) {
        setTimeout(() => {
          routeRedirect.push('/rol_usuario');
        }, 0);
      }
    }
  );
</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>