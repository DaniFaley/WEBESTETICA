<template>
  <h3 class="h3_Titulo">Registros</h3>
  
  <div class="card_total">
    <div class="card_total_hijo">
      <strong class="p_total">Total</strong>
      <p class="monto_total">${{ totalMontos.toFixed(2) }}</p>
    </div>
  </div>

  <section class="contenedor_section_botones">
    <div class="contenedor_boton_hijo">
      <div class="contenedor_boton_add">
        <RouterLink :to="{ path: '/corte/agregar' }">
          <button class="btn btn-sm boton_accion boton_agregar">
            <i class="ri-add-circle-fill icon"></i>
          </button>
        </RouterLink>
      </div>
      <div class="contenedor_boton_filtros">
        <input type="date" v-model="fechaSeleccionada" class="boton_accion boton_fecha" />
        <button @click="alternarOrden" class="btn btn-sm boton_accion">
          <i v-if="ordenDescendente" class="ri-arrow-up-circle-fill icon"></i>
          <i v-else class="ri-arrow-down-circle-fill icon"></i>
        </button>
        <button @click="descargarPDF" class="btn btn-sm boton_accion">
          <i class="ri-file-download-fill icon"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- Mostrar los registros si hay -->
  <section class="contenedor_section_tabla" v-if="registrosDelDia.length > 0">
      <div v-for="(registro, index) in registrosDelDia" :key="index" class="card">
        <RouterLink class="contenedor_router" :to="{ path: '/corte/' + registro.id_corte + '/detalles' }">
          <button type="button" class="boton_card">
            <div class="bloque_datos">
              <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">Cliente:</strong> {{ registro.nombre_cliente }}</p>
              <p class="p_valor"><i class="ri-scissors-fill icon_card"></i> <strong class="p_dato">Servicio:</strong> {{ servicios[registro.fk_id_servicio] }}</p>
              <p class="p_valor"><i class="ri-money-dollar-circle-fill icon_card"></i> <strong class="p_dato">Monto:</strong> ${{ registro.monto }}</p>
              <p class="p_valor"><i class="ri-calendar-fill icon_card"></i> <strong class="p_dato">Fecha:</strong> {{ registro.fecha }}</p>
            </div>
          </button>
        </RouterLink>
      </div>
    </section>


  <!-- Mostrar mensaje si no hay registros -->
  <section class="contenedor_section_tabla" v-else>
    <div class="no-registros">
      <p class="no_registros">No hay registros<i class="ri-error-warning-line icon"></i></p>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useCorte } from '../controllers/useCorte';
  import { getServicio, obtenerUsuario } from '../utils/getFK';
  import { generarPDF } from '../utils/pdf';

  const { traeCorte, cortes } = useCorte();
  const fechaSeleccionada = ref('');
  const ordenDescendente = ref(true);

  interface Corte {
    id_corte: number;
    nombre_cliente: string;
    fk_id_servicio: number;
    monto: number;
    fecha: string | Date;
    comentario: string;
  }

  // Registros del día seleccionados
  const registrosDelDia = computed(() => {
    let registros = fechaSeleccionada.value
      ? cortes.value.filter((corte: Corte) => {
          const fechaCorte = new Date(corte.fecha).toISOString().split('T')[0];
          return fechaCorte === fechaSeleccionada.value;
        })
      : [...cortes.value];
    
    return registros.sort((a: Corte, b: Corte) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return ordenDescendente.value ? fechaB - fechaA : fechaA - fechaB;
    });
  });

  // Obtener la suma total de los montos
  const totalMontos = computed(() => {
    return registrosDelDia.value.reduce((total, registro) => {
      // Asegurarnos de que el monto sea un número
      const monto = parseFloat(registro.monto.toString());
      return total + monto;
    }, 0);
  });

  // Función para ordenar los registros de lo más reciente a lo más antiguo y viceversa
  const alternarOrden = () => {
    ordenDescendente.value = !ordenDescendente.value;
  };

  // Obtener valor de la fk de servicio
  const servicios = ref<Record<number, string>>({});
  // Obtener los datos del usuario para el pdf
  const usuario = ref<any | null>(null);

  onMounted(async () => {
    usuario.value = await obtenerUsuario();
    console.log('Usuario obtenido:', usuario.value);

    await traeCorte();
    servicios.value = await getServicio();
  });


  // PDF
  const descargarPDF = () => {
    if (!fechaSeleccionada.value) {
      alert('Por favor, selecciona una fecha.');
      return;
    }
    if (registrosDelDia.value.length === 0) {
      alert('No hay registros para la fecha seleccionada.');
      return;
    }
    generarPDF(registrosDelDia.value, servicios.value, totalMontos.value);
  };
</script>

<style scoped>
  @import '../../../assets/styles_new.css';
</style> 