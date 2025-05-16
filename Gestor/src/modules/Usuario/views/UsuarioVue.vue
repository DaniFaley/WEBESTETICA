<template>
    <h3 class="h3_Titulo">Datos Fiscales</h3>

    <section class="contenedor_section_botones">
        <div class="contenedor_boton_hijo contenedor_boton_hijo--usuario">
            <div class="contenedor_boton_add">
                <!-- Mostrar botón de agregar solo si no hay usuarios -->
            <RouterLink
                v-if="usuarios.length === 0"
                :to="{ path: '/usuario/agregar' }"
            >
                <button class="btn btn-sm boton_accion boton_agregar">
                    <i class="ri-add-circle-fill icon icon--add"></i>
                </button>
            </RouterLink>
            </div>
        </div>
    </section>

    <section class="contenedor_section_tabla">
        <!-- Si no hay usuarios, mostrar un mensaje -->
        <div v-if="usuarios.length == 0" class="no-registros">
            <p class="no_registros"><i class="ri-error-warning-line"></i> No hay registro <i class="ri-error-warning-line"></i></p>
        </div>

        <!-- Mostrar los usuarios en bloques -->
        <div v-else v-for="(usuario, index) in usuarios" :key="index" class="card">
            <div class="bloque_datos" id="tablaUsuario">
                <p class="p_valor"><i class="ri-account-circle-fill p_icon"></i> Nombre: <strong class="p_dato">{{ obtenerNombreCompleto(usuario) }}</strong></p>
                <p class="p_valor"><i class="ri-id-card-fill p_icon"></i> CURP: <strong class="p_dato">{{ usuario.curp }}</strong></p>
                <p class="p_valor"><i class="ri-id-card-fill p_icon"></i> RFC: <strong class="p_dato">{{ usuario.rfc }}</strong></p>
                <p class="p_valor"><i class="ri-home-2-fill p_icon"></i> Calle: <strong class="p_dato">{{ usuario.calle }}</strong></p>
                <p class="p_valor"><i class="ri-home-2-fill p_icon"></i> Numero De Casa: <strong class="p_dato">{{ usuario.numero_casa }}</strong></p>
                <p class="p_valor"><i class="ri-home-2-fill p_icon"></i> Colonia: <strong class="p_dato">{{ usuario.colonia }}</strong></p>
                <p class="p_valor"><i class="ri-home-2-fill p_icon"></i> Codigo Postal: <strong class="p_dato">{{ usuario.codigo_postal }}</strong></p>
                <p class="p_valor"><i class="ri-gps-fill p_icon"></i> Ciudad: <strong class="p_dato">{{ usuario.ciudad }}</strong></p>
                <p class="p_valor"><i class="ri-gps-fill p_icon"></i> Estado: <strong class="p_dato">{{ usuario.estado }}</strong></p>
            </div>
            <div class="contenedor_botones_card contenedor_botones_card--usuario">
                <RouterLink class="nav-link item boton_accion boton_modificar" :to="`/usuario/${usuario.id_datos_usuario}/editar`">
                    <i class="ri-settings-4-line icon icon_detalles"></i>
                </RouterLink>
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useUsuario } from '../controllers/useUsuario';
    const { traeUsuario, usuarios } = useUsuario();

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        await traeUsuario();
    });

    function obtenerNombreCompleto(usuario: any): string {
        return [
            usuario.primer_nombre,
            usuario.segundo_nombre,
            usuario.primer_apellido,
            usuario.segundo_apellido
        ]
            .map(n => n?.trim()) // aseguramos que no falle si alguno es null/undefined
            .filter(n => n) // eliminamos vacíos si alguno está en blanco
            .join(' ');
    }
</script>

<style scoped>
  @import '../../../assets/styles_datos_fiscales.css';
</style> 