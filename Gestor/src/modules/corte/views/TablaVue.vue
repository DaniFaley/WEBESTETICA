<template>
  <h3 class="h3_Titulo">Descargar Notas</h3>

  <!-- Filtros -->
  <section class="contenedor_section_botones">
  <div class="contenedor_boton_hijo">
    <div class="contenedor_boton_filtros">
      <select v-model="filtroAño" class="boton_accion boton_accion_ano">
        <option value="">Año</option>
        <option v-for="año in añosDisponibles" :key="año" :value="año">{{ año }}</option>
      </select>

      <select v-model="filtroMes" class="boton_accion boton_accion_mes">
        <option value="">Mes</option>
        <option v-for="(mes, index) in meses" :key="index" :value="index + 1">{{ mes }}</option>
      </select>
      <div class="contenedor_orden">
        <button @click="alternarOrden" class="btn btn-sm boton_accion boton_orden">
          <i v-if="ordenDescendente" class="ri-arrow-up-circle-fill icon"></i>
          <i v-else class="ri-arrow-down-circle-fill icon"></i>
        </button>
      </div>
    </div>
  </div>
</section>
  <!-- Mostrar los registros si hay -->
  <section class="contenedor_section_tabla" v-if="fechasOrdenadas.length">
      <div v-for="(fecha, index) in fechasOrdenadas" :key="index" class="card">
        <div class="contenedor_router" @click="descargarNotaDelDia(fecha)">
          <button type="button" class="boton_card">
            <div class="bloque_datos">
              <p class="p_valor">
                <i class="ri-calendar-fill icon_card"></i> <strong class="p_dato">Fecha:</strong> {{ fecha }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>

  <section v-else class="contenedor_section_tabla">
    <p class="no_registros">No hay registros<i class="ri-error-warning-line icon"></i></p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCorte } from '../controllers/useCorte';
import { getServicio } from '../utils/getFK';
import { generarPDF } from '../utils/pdf';
import type { Corte } from '../interfaces/corte-interfaces';

// Corte y servicios
const { traeCorte, cortes } = useCorte();
const servicios = ref<Record<number, string>>({});

// Filtros
const filtroAño = ref('');
const filtroMes = ref('');

// Estado de ordenamiento (true = descendente, false = ascendente)
const ordenDescendente = ref(true);

// Meses disponibles
const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Años disponibles
const añosDisponibles = computed(() => {
  const años = cortes.value.map(c => new Date(c.fecha).getFullYear());
  return [...new Set(años)].sort((a, b) => b - a);
});

// Agrupación por fecha (YYYY-MM-DD)
const diasConRegistros = computed(() => {
  const agrupados: Record<string, Corte[]> = {};

  for (const corte of cortes.value) {
    const fechaObj = new Date(corte.fecha);
    const yyyyMMdd = fechaObj.toISOString().split('T')[0];

    if (
      (filtroAño.value && fechaObj.getFullYear() !== Number(filtroAño.value)) ||
      (filtroMes.value && fechaObj.getMonth() + 1 !== Number(filtroMes.value)) 
    ) {
      continue;
    }

    if (!agrupados[yyyyMMdd]) {
      agrupados[yyyyMMdd] = [];
    }
    agrupados[yyyyMMdd].push(corte);
  }

  return agrupados;
});

// Lista de fechas ordenadas según el estado ordenDescendente
const fechasOrdenadas = computed(() => {
  const fechas = Object.keys(diasConRegistros.value);
  fechas.sort((a, b) => {
    if (ordenDescendente.value) {
      // Más reciente primero
      return new Date(b).getTime() - new Date(a).getTime();
    } else {
      // Más antiguo primero
      return new Date(a).getTime() - new Date(b).getTime();
    }
  });
  return fechas;
});

// Acción para descargar PDF del día
const descargarNotaDelDia = (fecha: string) => {
  const registros = diasConRegistros.value[fecha];
  if (!registros || registros.length === 0) {
    alert('No hay registros ese día');
    return;
  }

  const total = registros.reduce((sum, r) => sum + Number(r.monto), 0);
  generarPDF(registros, servicios.value, total);
};

// Cargar datos iniciales
onMounted(async () => {
  await traeCorte();
  servicios.value = await getServicio();
});
// Función para ordenar los registros de lo más reciente a lo más antiguo y viceversa
  const alternarOrden = () => {
    ordenDescendente.value = !ordenDescendente.value;
  };
</script>

<style scoped>
  @import '../../../assets/table.css';
</style> 
