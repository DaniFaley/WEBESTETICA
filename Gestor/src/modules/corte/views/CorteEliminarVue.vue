<template>
  <div class="contenedor_formulario" v-if="cortes[0]">
    <div class="formulario">

      <h3 class="h3_Titulo">Eliminar Registro</h3>

      <div class="alert alert-warning mensaje_alerta" role="alert">
        <i class="ri-error-warning-line"></i> ¿Estas seguro que deseas eliminar el registro? <i class="ri-error-warning-line"></i>
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
        <input type="date" class="form-control campo_input" v-model="cortes[0].fecha" disabled />
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
  import { ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useCorte } from '../controllers/useCorte';
  import { getSexo, getServicio } from '../utils/getFK';  // ← Importa las funciones reutilizables

  const { traeCorteId, borrarCorte, mensaje, cortes } = useCorte();

  const route = useRoute();
  const routeRedirect = useRouter();

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

  watch(
    () => mensaje.value,
    (newValue) => {
      if (newValue === 1) {
        setTimeout(() => {
          routeRedirect.push('/corte'); // Redirigir después de eliminar
        }, 0);
      }
    }
  );
</script>

<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>