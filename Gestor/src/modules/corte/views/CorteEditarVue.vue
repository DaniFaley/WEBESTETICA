<template>
  <div class="contenedor_formulario" v-if="cortes[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        Corte modificado exitosamente
      </div>

      <div class="input">
        <p class="p_input">ID:</p>
        <input type="number" class="form-control campo_input" v-model="cortes[0].id_corte" disabled />
      </div>

      <div class="input">
        <p class="p_input">Cliente:</p>
        <input type="text" class="form-control campo_input" v-model="cortes[0].nombre_cliente" />
      </div>

      <div class="input">
        <p class="p_input">Sexo:</p>
        <select name="fk_id_sexo" class="form-control campo_input" v-model="cortes[0].fk_id_sexo">
          <option v-for="sexo in sexos" :key="sexo.id_sexo" :value="sexo.id_sexo">
            {{ sexo.nombre }}
          </option>
        </select>
      </div>

      <div class="input">
        <p class="p_input">Tipo De Servicio:</p>
        <select name="fk_id_servicio" class="form-control campo_input" v-model="cortes[0].fk_id_servicio">
          <option v-for="servicio in servicios" :key="servicio.id_servicio" :value="servicio.id_servicio">
            {{ servicio.nombre }}
          </option>
        </select>
      </div>

      <div class="input">
        <p class="p_input">Monto:</p>
        <input type="number" class="form-control campo_input" v-model="cortes[0].monto" />
      </div>

      <div class="input">
        <p class="p_input">Fecha:</p>
        <input type="date" class="form-control campo_input" v-model="cortes[0].fecha" />
      </div>

      <!--
      <div class="input">
        <p class="p_input">Fecha:</p>
        <input type="date" class="form-control campo_input" v-model="formattedFecha" />
      </div>
      -->

      <div class="input">
        <p class="p_input">Comentario:</p>
        <input type="text" class="form-control campo_input" v-model="cortes[0].comentario" />
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--editar" @click="actualizarCorte(cortes[0])">
          <i class="ri-arrow-left-right-line icon"></i>
        </button>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { useCorte } from '../controllers/useCorte';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const { traeCorteId, actualizarCorte, mensaje, cortes } = useCorte();
  const route = useRoute();
  const routeRedirect = useRouter();

  // Cargar el corte por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idCorte = Number(route.params.id_corte);
    await traeCorteId(idCorte); // Cargar datos del ingreso
  });

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

  // Variables para las sexos
  const sexos = ref<{ id_sexo: number; nombre: string }[]>([]);

  // Función para obtener sexos del backend
  const fetchSexo = async () => {
    try {
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/sexo/`);
      sexos.value = response.data;
    } catch (error) {
      console.error('Error al obtener las sexos:', error);
    }
  };

  onMounted(async () => {
    await fetchSexo(); 
  });

  // Variables para las sexos
  const servicios = ref<{ id_servicio: number; nombre: string }[]>([]);

  // Función para obtener servicios del backend
  const fetchServicio = async () => {
    try {
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/servicio/`);
      servicios.value = response.data;
    } catch (error) {
      console.error('Error al obtener las servicios:', error);
    }
  };

  onMounted(async () => {
    await fetchServicio(); 
  });

  // Formatear la fecha al formato que acepta el input tipo date (YYYY-MM-DD)
  /*
    const formattedFecha = computed({
    get: () => {
      if (!cortes.value[0]?.fecha) return ''; // Si no hay fecha, retornamos cadena vacía
      const date = new Date(cortes.value[0].fecha);
      return date.toISOString().substring(0, 10); // formato YYYY-MM-DD
    },
    set: (newDate) => {
      cortes.value[0].fecha = newDate; // Actualizamos la fecha en cortes[0]
    }
  });
  */
</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>