<template>
  <section class="contenedor_detalles">
    <h3 class="h3_Titulo">Detalles</h3>

    <div v-for="(corte, index) in cortes" :key="index" class="card">
      <div class="bloque_datos">
        <p class="p_valor">
          <i class="ri-account-circle-fill icon"></i> 
          <strong class="p_dato">Cliente:</strong> {{ corte.nombre_cliente }}
        </p>
        <p class="p_valor">
          <i class="ri-group-fill icon"></i> 
          <strong class="p_dato">Sexo:</strong> {{ sexos[corte.fk_id_sexo] || 'Desconocido' }}
        </p>
        <p class="p_valor">
          <i class="ri-scissors-fill icon"></i> 
          <strong class="p_dato">Servicio:</strong> {{ servicios[corte.fk_id_servicio] || 'Desconocido' }}
        </p>
        <p class="p_valor">
          <i class="ri-money-dollar-circle-fill icon"></i> 
          <strong class="p_dato">Monto:</strong> {{ corte.monto }}
        </p>
        <p class="p_valor">
          <i class="ri-calendar-fill icon"></i> 
          <strong class="p_dato">Fecha:</strong> {{ corte.fecha }}
        </p>
        <p class="p_valor">
          <i class="ri-chat-3-fill icon"></i> 
          <strong class="p_dato">Comentario:</strong> {{ corte.comentario }}
        </p>
      </div>

      <div class="contenedor_botones_detalles">
        <RouterLink 
          class="nav-link item boton_modificar" 
          :to="`/corte/${corte.id_corte}/editar`">
          <i class="ri-settings-4-line"></i>
        </RouterLink>
        <RouterLink 
          class="nav-link item boton_eliminar" 
          :to="`/corte/${corte.id_corte}/eliminar`">
          <i class="ri-close-circle-line"></i>
        </RouterLink>   
      </div>
      
    </div>
  </section>
</template>

  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useCorte } from '../controllers/useCorte';
  import { useRoute } from 'vue-router';
  import { getSexo, getServicio } from '../utils/getFK'; // ← Importación

  const { traeCorteId, cortes } = useCorte();
  const route = useRoute();

  // Obtener valores para las fk: Variables para sexos y servicios
  const sexos = ref<Record<number, string>>({});
  const servicios = ref<Record<number, string>>({});

  // Cargar datos
  onMounted(async () => {
    const idCorte = Number(route.params.id_corte);
    await traeCorteId(idCorte);
    // Obtener valores para las fk
    sexos.value = await getSexo();
    servicios.value = await getServicio();
  });
</script>


<style scoped>
  @import '../../../assets/styles_registro_corte_detalles.css';
</style> 