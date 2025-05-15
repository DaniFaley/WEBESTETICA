<template>
    <h3 class="h3_Titulo">Roles</h3>
    <!--
    <section class="contenedor_section_botones">
        <div class="contenedor_boton_hijo contenedor_boton_hijo--usuario">
            <div class="contenedor_boton_add">
              <RouterLink :to="{ path: '/rol/agregar' }">
                <button class="btn btn-sm boton_accion boton_agregar">
                  <i class="ri-add-circle-fill icon"></i>
                </button>
              </RouterLink>
            </div>
        </div>
    </section>
    -->
    

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
    <div v-for="(rol, index) in rols" :key="index" class="card">
      <div class="bloque_datos">
        <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">ID:</strong> {{ rol.id_rol }}</p>
        <p class="p_valor"><i class="ri-money-dollar-circle-fill icon_card"></i> <strong class="p_dato">Nombre:</strong> {{ rol.nombre }}</p>
      </div>
      <div class="contenedor_boton_detalles">
        <RouterLink :to="{ path: '/rol/' + rol.id_rol + '/detalles' }">
          <button type="button" class="boton_detalles">
            <i class="ri-expand-diagonal-fill icon icon_detalles"></i>
          </button>
        </RouterLink>
      </div>
    </div>
  </section>


</template>


<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useRol } from '../controllers/useRol';
    const { traeRol, rols } = useRol();

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        await traeRol();
    });
</script>

<style scoped>
  @import '../../../assets/styles_registro_corte.css';
</style> 