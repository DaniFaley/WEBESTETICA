<template>
  <div class="contenedor_formulario" v-if="cortes[0]">
    <div class="formulario">
      <h3 class="h3_Titulo">Modificar Registro</h3>

      <div v-if="mensaje === 1" class="alert alert-success mensaje_alerta" role="alert">
        Registro modificado exitosamente
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
  import { ref, onMounted, watch } from 'vue';
  import { useCorte } from '../controllers/useCorte';
  import { useRoute, useRouter } from 'vue-router';
  // Importa las funciones desde getfk.ts
  import { fetchSexo, fetchServicio } from '../utils/getFK';

  const { traeCorteId, actualizarCorte, mensaje, cortes } = useCorte();
  const route = useRoute();
  const routeRedirect = useRouter();

  //Obteber vlaores de las fk: Mediante el ID
  onMounted(async () => {
    const idCorte = Number(route.params.id_corte);
    await traeCorteId(idCorte); // Cargar datos del ingreso

    // Cargar sexos y servicios
    sexos.value = await fetchSexo();
    servicios.value = await fetchServicio();
  });

  // Variables para sexos y servicios
  const sexos = ref<{ id_sexo: number; nombre: string }[]>([]);
  const servicios = ref<{ id_servicio: number; nombre: string }[]>([]);

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
</script>


<style scoped>
  @import '../../../assets/styles_corte_formulario.css';
</style>