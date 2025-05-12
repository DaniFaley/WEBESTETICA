<template>
    <div class="contenedor_formulario" v-if="cortes[0]">
          <div class="formulario">

            <h3 class="h3_Titulo">Eliminar Registro</h3>

            <div class="alert alert-warning mensaje_alerta" role="alert">
              <i class="ri-error-warning-line"></i> ¿Estas seguro que deseas eliminar el registro? <i class="ri-error-warning-line"></i>
            </div>

            <div class="input">
              <p class="p_input">ID:</p>
              <input type="number" class="form-control campo_input" v-model="cortes[0].id_corte" disabled />
            </div>
            <div class="input">
              <p class="p_input">Cliente:</p>
              <input type="text" class="form-control campo_input" v-model="cortes[0].nombre_cliente" disabled />
            </div>
            <div class="input">
              <p class="p_input">Sexo:</p>
              <input
                type="text"
                class="form-control campo_input"
                :value="sexos[cortes[0].fk_id_sexo] || 'Desconocido'"
                disabled
              />
            </div>
            <div class="input">
              <p class="p_input">Servicio:</p>
              <input
                type="text"
                class="form-control campo_input"
                :value="servicios[cortes[0].fk_id_servicio] || 'Desconocido'"
                disabled
              />
            </div>
            <div class="input">
              <p class="p_input">Monto:</p>
              <input type="number" class="form-control campo_input" v-model="cortes[0].monto" disabled />
            </div>
            <div class="input">
              <p class="p_input">Fecha:</p>
              <input
                type="date"
                class="form-control campo_input"
                :value="formattedFecha"
                disabled
              />
            </div>
            <div class="input">
              <p class="p_input">Comentario:</p>
              <input type="text" class="form-control campo_input" v-model="cortes[0].comentario" disabled />
            </div>
            <div class="contenedor_boton">
              <button class="btn btn-danger boton_accion boton_accion--eliminar" @click="borrarCorte(cortes[0])">
                <i class="ri-delete-bin-5-fill icon"></i>
              </button>
            </div>
          </div>
        </div>
  </template>
  
<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useCorte } from '../controllers/useCorte';
  import axios from 'axios';

  const { traeCorteId, borrarCorte, mensaje, cortes } = useCorte();

  // Traer los datos del registro de cada id
  let idCorte = 0;

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
          routeRedirect.push('/corte'); // Redirige después de 1 segundo
        }, 0);
      }
    }
  );

  onMounted(async () => {
    idCorte = Number(route.params.id_corte);
    await traeCorteId(Number(idCorte));
  });

  // Para mostrar nombre de sexo y servicio
  const sexos = ref<Record<number, string>>({});
  const servicios = ref<Record<number, string>>({});

  // Obtener sexos
  const obtenerSexo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/sexo/`);
      response.data.forEach((sexo: any) => {
        sexos.value[sexo.id_sexo] = sexo.nombre;
      });
    } catch (error) {
      console.error('Error al obtener los sexos:', error);
    }
  };

  // Obtener servicios
  const obtenerServicio = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/servicio/`);
      response.data.forEach((servicio: any) => {
        servicios.value[servicio.id_servicio] = servicio.nombre;
      });
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  // Cargar cortes y datos de catálogos
  onMounted(async () => {
    await obtenerSexo();
    await obtenerServicio();
  });

  // Formatear la fecha al formato que acepta el input tipo date (YYYY-MM-DD)
  const formattedFecha = computed(() => {
    if (!cortes.value[0]?.fecha) return '';
    const date = new Date(cortes.value[0].fecha);
    return date.toISOString().substring(0, 10); // formato YYYY-MM-DD
  });
</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>