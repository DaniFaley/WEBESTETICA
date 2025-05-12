<template>
  <div class="contenedor_formulario">
    <Form class="formulario" @submit="onTodoBien">
      <h3 class="h3_Titulo">Agregar Corte</h3>

      <div v-if="mensaje == 1" class="alert alert-success mensaje_alerta" role="alert">
        Corte agregado exitosamente
      </div>

      <div class="input">
        <p class="p_input">Cliente:</p>
        <Field name="nombre_cliente" type="text" class="form-control campo_input" v-model="corte.nombre_cliente" />
        <ErrorMessage name="nombre_cliente" class="errorValidacion" />
      </div>

      <div class="input">
        <p class="p_input">Sexo:</p>
        <select name="fk_id_sexo" class="form-control campo_input" v-model="corte.fk_id_sexo">
          <option v-for="sexo in sexos" :key="sexo.id_sexo" :value="sexo.id_sexo">
            {{ sexo.nombre }}
          </option>
        </select>
        <ErrorMessage name="fk_id_sexo" class="errorValidacion" />
      </div>

      <div class="input">
        <p class="p_input">Tipo De Servicio:</p>
        <select name="fk_id_servicio" class="form-control campo_input" v-model="corte.fk_id_servicio">
          <option v-for="servicio in servicios" :key="servicio.id_servicio" :value="servicio.id_servicio">
            {{ servicio.nombre }}
          </option>
        </select>
        <ErrorMessage name="fk_id_servicio" class="errorValidacion" />
      </div>

      <div class="input">
        <p class="p_input">Monto:</p>
        <Field name="monto" type="number" class="form-control campo_input" v-model="corte.monto" />
        <ErrorMessage name="monto" class="errorValidacion" />
      </div>

      <div class="input">
        <p class="p_input">Fecha:</p>
        <Field name="fecha" type="date" class="form-control campo_input" v-model="corte.fecha" />
        <ErrorMessage name="fecha" class="errorValidacion" />
      </div>

      <div class="input">
        <p class="p_input">Comentario:</p>
        <Field name="comentario" type="text" class="form-control campo_input" v-model="corte.comentario" />
        <ErrorMessage name="comentario" class="errorValidacion" />
      </div>

      <div class="contenedor_boton">
        <button class="btn btn-primary boton_accion boton_accion--agregar" type="submit">
          <i class="ri-add-circle-fill icon"></i>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { CorteAgregar } from '../interfaces/corte-interfaces';
import { useCorte } from '../controllers/useCorte';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useRouter } from 'vue-router';
import axios from 'axios';

const { agregarCorte, mensaje } = useCorte();
const routeRedirect = useRouter();

let corte = ref<CorteAgregar>({
  nombre_cliente: '',
  fk_id_sexo: 0,
  fk_id_servicio: 0,
  monto: 0,
  fecha: '',
  comentario: ''
});

// ✅ Función corregida para enviar la fecha correctamente sin ajustes de zona horaria
const onTodoBien = async () => {
  const corteAEnviar = { ...corte.value };

  // Asegurarse de que la fecha esté en formato YYYY-MM-DD
  if (corteAEnviar.fecha instanceof Date) {
    // Convertir la fecha a formato YYYY-MM-DD sin ajustar por zona horaria
    corteAEnviar.fecha = corteAEnviar.fecha.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  await agregarCorte(corteAEnviar);
};

// Obtener sexos
const sexos = ref<{ id_sexo: number; nombre: string }[]>([]);
const fetchSexo = async () => {
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/sexo/');
    sexos.value = response.data;
  } catch (error) {
    console.error('Error al obtener sexos:', error);
  }
};
onMounted(fetchSexo);

// Obtener servicios
const servicios = ref<{ id_servicio: number; nombre: string }[]>([]);
const fetchServicio = async () => {
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/servicio/');
    servicios.value = response.data;
  } catch (error) {
    console.error('Error al obtener servicios:', error);
  }
};
onMounted(fetchServicio);

// Redirigir si se agregó exitosamente
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      setTimeout(() => {
        routeRedirect.push('/corte');
      }, 0);
    }
  }
);
</script>

<style scoped>
@import '../../../assets/styles_corte_formulario.css';
</style>
