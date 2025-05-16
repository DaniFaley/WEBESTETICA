<template>
    <h3 class="h3_Titulo">Usuarios</h3>

    <section class="contenedor_section_botones">
        <div class="contenedor_boton_hijo contenedor_boton_hijo--usuario">
            <div class="contenedor_boton_add">
              <RouterLink :to="{ path: '/rol_usuario/agregar' }">
                <button class="btn btn-sm boton_accion boton_agregar">
                  <i class="ri-add-circle-fill icon"></i>
                </button>
              </RouterLink>
            </div>
        </div>
    </section>

    <section class="contenedor_section_tabla">
    <div v-for="(rol_usuario, index) in roles_usuario" :key="index" class="card">
      <div class="bloque_datos">
        <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">Correo:</strong> {{ rol_usuario.correo }}</p>
        <p class="p_valor"><i class="ri-money-dollar-circle-fill icon_card"></i> <strong class="p_dato">Rol:</strong> {{ roles[rol_usuario.fk_id_rol] }}</p>
      </div>
      <div class="contenedor_boton_detalles">
        <RouterLink :to="{ path: '/rol_usuario/' + rol_usuario.id_usuario + '/detalles' }">
          <button type="button" class="boton_detalles">
            <i class="ri-expand-diagonal-fill icon icon_detalles"></i>
          </button>
        </RouterLink>
      </div>
    </div>
  </section>


</template>


<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRolUsuario } from '../controllers/rol_usuarioRol';
    const { traeRolUsuario, roles_usuario } = useRolUsuario();
    import { getRol } from '../utils/getFK';


  // Obtener valor de la fk de Rol
  const roles = ref<Record<number, string>>({});

  onMounted(async () => {
    await traeRolUsuario();
    roles.value = await getRol();
  });

</script>

<style scoped>
  @import '../../../assets/styles_registro_corte.css';
</style>