<template>
  <section class="contenedor_detalles">
    <h3 class="h3_Titulo">Detalles</h3>

    <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
      Datos actualizados correctamente
    </div>

    <div v-else v-for="(corte, index) in cortes" :key="index" class="card">
      <div class="bloque_datos" id="tablaUsuario">
        <p class="p_valor"><i class="ri-id-card-fill icon"></i> <strong class="p_dato">ID:</strong> {{ corte.id_corte }}</p>
        <p class="p_valor"><i class="ri-account-circle-fill icon"></i> <strong class="p_dato">Cliente:</strong> {{ corte.nombre_cliente }}</p>
        <p class="p_valor"><i class="ri-group-fill icon"></i> <strong class="p_dato">Sexo:</strong> {{ sexos[corte.fk_id_sexo] || 'Desconocido' }}</p>
        <p class="p_valor"><i class="ri-scissors-fill icon"></i> <strong class="p_dato">Servicio:</strong> {{ servicios[corte.fk_id_servicio] || 'Desconocido' }}</p>
        <p class="p_valor"><i class="ri-money-dollar-circle-fill icon"></i> <strong class="p_dato">Monto:</strong> {{ corte.monto }}</p>
        <p class="p_valor"><i class="ri-calendar-fill icon"></i> <strong class="p_dato">Fecha:</strong> {{ formatDate(corte.fecha) }}</p>
        <p class="p_valor"><i class="ri-chat-3-fill icon"></i> <strong class="p_dato">Comentario:</strong> {{ corte.comentario }}</p>
    </div>

    <div class="contenedor_botones_detalles">
      <RouterLink class="nav-link item boton_modificar" :to="`/corte/${corte.id_corte}/editar`">
        <i class="ri-settings-4-line"></i>
      </RouterLink>
      <RouterLink class="nav-link item boton_eliminar" :to="`/corte/${corte.id_corte}/eliminar`">
        <i class="ri-close-circle-line"></i>
      </RouterLink>   
      </div>
    </div>
  </section>
</template>

  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useCorte } from '../controllers/useCorte';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const { traeCorteId, mensaje, cortes } = useCorte();
  const route = useRoute();
  const routeRedirect = useRouter();
  
  // Cargar el corte por ID, las cuentas y las categorías disponibles
  onMounted(async () => {
    const idCorte = Number(route.params.id_corte);
    await traeCorteId(idCorte); // Cargar datos del ingreso
  });
  

  // Funcion para dar formato a la fecha
  const formatDate = (date: string | Date) => {
    const formattedDate = typeof date === 'string' ? new Date(date) : date;
    return formattedDate.toLocaleDateString('es-ES');
  };

  //----------------------------------------------------------
  //Obtener valores de fk
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
    } 
    catch (error) {
      console.error("Error al obtener los sexos:", error);
    }
  };
    
  // Obtener servicios
  const obtenerServicio = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/servicio/`);
      response.data.forEach((servicio: any) => {
        servicios.value[servicio.id_servicio] = servicio.nombre;
      });
    } 
    catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };
    
  // Obtener el único usuario registrado
  const obtenerUsuario = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuario/`);
      return response.data[0]; // asumimos que hay un solo usuario
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  };

  // Cargar cortes y datos de catálogos
  onMounted(async () => {
    await obtenerSexo();
    await obtenerServicio();
  });
</script>
  


<style scoped>
  @import '../../../assets/styles_registro_corte_detalles.css';
</style> 