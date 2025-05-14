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

        <!--
    <section class="contenedor_section_tabla">

        <div v-if="rols.length == 0" class="no-registros">
            <p class="no_registros"><i class="ri-error-warning-line"></i> No hay registro <i class="ri-error-warning-line"></i></p>
        </div>


        
        <div v-else v-for="(rol, index) in rols" :key="index" class="card">
            <div class="bloque_datos" id="tablaRol">
                <p class="p_valor"><i class="ri-id-card-fill p_icon"></i> ID: <strong class="p_dato">{{ rol.id_rol }}</strong></p>
                <p class="p_valor"><i class="ri-id-card-fill p_icon"></i> Nombre: <strong class="p_dato">{{ rol.nombre }}</strong></p>
            </div>
        </div>
        <div class="contenedor_boton_detalles">
        <RouterLink :to="{ path: '/rol/' + rol.id_rol + '/detalles' }">
          <button type="button" class="boton_detalles">
            <i class="ri-expand-diagonal-fill icon icon_detalles"></i>
          </button>
        </RouterLink>
      </div>
    </section>
   -->
    <section class="contenedor_section_tabla">
    <div v-for="(rol_usuario, index) in rol_usuarios" :key="index" class="card">
      <div class="bloque_datos">
        <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">Correo:</strong> {{ rol_usuario.correo }}</p>
        <p class="p_valor"><i class="ri-money-dollar-circle-fill icon_card"></i> <strong class="p_dato">Rol:</strong> {{ rols[rol_usuario.fk_id_rol] }}</p>
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
    const { traeRolUsuario, rol_usuarios } = useRolUsuario();
    import axios from 'axios';

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        await traeRolUsuario();
    });


  const rols = ref<Record<number, string>>({});

  // Obtener servicios
  const obtenerRol = async () => {
    try {
      const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/rol/');
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
  @import '../../../assets/styles_datos_fiscales.css';
</style> 