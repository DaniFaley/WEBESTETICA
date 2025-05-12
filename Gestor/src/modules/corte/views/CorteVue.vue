<template>
  <h3 class="h3_Titulo">Registros</h3>
  <div class="card_total">
    <div class="card_total_hijo">
      <strong class="p_total">Total</strong>
      <!--
      <p class="monto_total">${{ totalMontos.toFixed(2) }}</p>
      -->
      <p class="monto_total">${{ totalMontos}}</p>
      
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
      <div class="bloque_datos">
        <p class="p_valor"><i class="ri-account-circle-fill icon_card"></i> <strong class="p_dato">Cliente:</strong> {{ registro.nombre_cliente }}</p>
        <!--
        <p class="p_valor"><i class="ri-group-fill icon_card"></i> <strong class="p_dato">Sexo:</strong> {{ sexos[registro.fk_id_sexo] }}</p>
        <p class="p_valor"><i class="ri-chat-3-fill icon_card"></i> <strong class="p_dato">Comentario:</strong> {{ registro.comentario }}</p>
        -->
        <p class="p_valor"><i class="ri-scissors-fill icon_card"></i> <strong class="p_dato">Servicio:</strong> {{ servicios[registro.fk_id_servicio] }}</p>
        <p class="p_valor"><i class="ri-money-dollar-circle-fill icon_card"></i> <strong class="p_dato">Monto:</strong> ${{ registro.monto }}</p>
        <p class="p_valor"><i class="ri-calendar-fill icon_card"></i> <strong class="p_dato">Fecha:</strong> {{ formatDate(registro.fecha) }}</p>
      </div>
      <div class="contenedor_boton_detalles">
        <RouterLink :to="{ path: '/corte/' + registro.id_corte + '/detalles' }">
          <button type="button" class="boton_detalles">
            <i class="ri-expand-diagonal-fill icon icon_detalles"></i>
          </button>
        </RouterLink>
      </div>
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
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';
  import axios from 'axios';

// Ahora TypeScript reconocerá la propiedad `lastAutoTable` en el objeto `pdf`.

  const { traeCorte, cortes } = useCorte();
  const fechaSeleccionada = ref('');
  const ordenDescendente = ref(true);

interface Corte {
  id_corte: number;
  nombre_cliente: string;
  fk_id_sexo: number;
  fk_id_servicio: number;
  monto: number;
  fecha: string | Date;  // Cambié aquí para permitir ambos tipos
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

  // Funcion para calcular el total de los montos de los registros del día seleccionado
  const totalMontos = computed(() => {
    return registrosDelDia.value.reduce((total, registro) => total + registro.monto, 0);
  });

  // Funcion para dar formato a la fecha
  const formatDate = (date: string | Date) => {
    const formattedDate = typeof date === 'string' ? new Date(date) : date;
    return formattedDate.toLocaleDateString('es-ES');
  };
  // Funcion para ordenar los registros de lo mas reciente a lo mas antiguo y viceversa
  const alternarOrden = () => {
    ordenDescendente.value = !ordenDescendente.value;
  };
    

  //----------------------------------------------------------
  //Obtener valores de fk
  // Para mostrar nombre de sexo y servicio
  const sexos = ref<Record<number, string>>({});
  const servicios = ref<Record<number, string>>({});
    
  // Obtener sexos
  const obtenerSexo = async () => {
    try {
      // const response = await axios.get('http://localhost:3001/api/sexo/');
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/sexo/`);
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
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/servicio/`);
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
      const response = await axios.get(`https://apiestetica-production-5f1e.up.railway.app/api/usuario/`);
      return response.data[0]; // asumimos que hay un solo usuario
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  };

  // Cargar cortes y datos de catálogos
  onMounted(async () => {
    await traeCorte();
    await obtenerSexo();
    await obtenerServicio();
  });
  



  //----------------------------------------------------------
  // Descargar el PDF con diseño de factura
  const descargarPDF = async () => {
    if (!fechaSeleccionada.value) {
      alert("Por favor, selecciona una fecha.");
      return;
    }
  
    const registrosParaImprimir = registrosDelDia.value;
  
    if (registrosParaImprimir.length === 0) {
      alert("No hay registros para la fecha seleccionada.");
      return;
    }
  
    const usuario = await obtenerUsuario();
    if (!usuario) {
      alert("No se pudo obtener la información del usuario.");
      return;
    }
  
    const pdf = new jsPDF();
  
    // Cargar logo de empresa desde /public/logo.png
    const logoImg = new Image();
    logoImg.src = '/logo_nota.png';
  
    logoImg.onload = () => {
      pdf.addImage(logoImg, 'PNG', 10, 10, 40, 20); // x, y, width, height
  
      // Título
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("Nota De Venta", pdf.internal.pageSize.width / 2, 20, { align: "center" });
  
      // Datos del negocio
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const nombreCompleto = [usuario.primer_nombre, usuario.segundo_nombre || '', usuario.primer_apellido, usuario.segundo_apellido || ''].filter(Boolean).join(' ');
      const direccion = [usuario.calle || '', usuario.numero_casa || '', usuario.colonia || '', usuario.ciudad || '', usuario.estado || ''].filter(Boolean).join(', ');
  
      const datosEmpresa = [
        `Fecha: ${formatDate(registrosParaImprimir[0].fecha)}`,
        `Nombre: ${nombreCompleto.toLocaleUpperCase()}`,
        `Dirección: ${direccion.toLocaleUpperCase()}`,
        `Código Postal: ${usuario.codigo_postal || ''}`,
        `RFC: ${usuario.rfc.toLocaleUpperCase() || ''}`,
        `CURP: ${usuario.curp.toLocaleUpperCase() || ''}`,
        `Teléfono: ${usuario.telefono || ''}`
      ];
  
      let y = 35;
      datosEmpresa.forEach((linea) => {
        pdf.setFont("helvetica", "bold");
        pdf.text(linea, 10, y);
        y += 5;
      });
  
      // Tabla de registros
      const columns = ['Cliente', 'Servicio', 'Monto', 'Fecha'];
      const rows = registrosParaImprimir.map((registro) => [
        registro.nombre_cliente,
        servicios.value[registro.fk_id_servicio],
        `$${registro.monto}`,
        formatDate(registro.fecha),
      ]);
  
      autoTable(pdf, {
        head: [columns],
        body: rows,
        startY: y + 5,
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204] },
        styles: {
          font: "helvetica",
          fontSize: 9,
          cellPadding: 3
        }
      });
  
      // Total
      const total = totalMontos.value;
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(`Total = $${total.toFixed(2)}`, pdf.internal.pageSize.width - 15,  10, { align: "right" });
  
      // Pie de página
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "italic");
      // pdf.text("Gracias por su preferencia.", 10, 285);
  
      // Guardar archivo
      pdf.save(`factura-${fechaSeleccionada.value}.pdf`);
    };
  };
</script>
  
<style scoped>
  @import '../../../assets/styles_registro_corte.css';
</style> 