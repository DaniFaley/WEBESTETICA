// src/utils/pdf.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Corte } from '../interfaces/corte-interfaces';
import { obtenerUsuario } from './getFK';

interface Servicios {
  [key: number]: string;
}

export const generarPDF = async (
  registros: Corte[],
  servicios: Servicios,
  totalMontos: number
) => {
  if (!registros.length) {
    alert('No hay registros para generar el PDF.');
    return;
  }

  const numeroNota = prompt('Ingresa el número de nota:');
  if (!numeroNota) {
    alert('Número de nota es requerido.');
    return;
  }

  const usuario = await obtenerUsuario();
  if (!usuario) {
    alert('No se pudo obtener la información del usuario.');
    return;
  }

  const pdf = new jsPDF();

  const logoImg = new Image();
  logoImg.src = '/logo_nota.png';

  logoImg.onload = () => {
    pdf.addImage(logoImg, 'PNG', 10, 10, 40, 20);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(`No#${numeroNota}`, pdf.internal.pageSize.width - 10, 10, { align: "right" });

    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("Nota De Venta", pdf.internal.pageSize.width / 2, 20, { align: "center" });

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    const nombreCompleto = [usuario.primer_nombre, usuario.segundo_nombre || '', usuario.primer_apellido, usuario.segundo_apellido || ''].filter(Boolean).join(' ');
    const direccion = [usuario.calle || '', usuario.numero_casa || '', usuario.colonia || '', usuario.ciudad || '', usuario.estado || ''].filter(Boolean).join(', ');

    const datosEmpresa = [
      `Fecha: ${registros[0].fecha}`,
      `Nombre: ${nombreCompleto.toUpperCase()}`,
      `Dirección: ${direccion.toUpperCase()}`,
      `Código Postal: ${usuario.codigo_postal || ''}`,
      `RFC: ${usuario.rfc?.toUpperCase() || ''}`,
      `CURP: ${usuario.curp?.toUpperCase() || ''}`,
      `Teléfono: ${usuario.telefono || ''}`
    ];

    let y = 35;
    datosEmpresa.forEach((linea) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(linea, 10, y);
      y += 5;
    });

    const columns = ['Cliente', 'Servicio', 'Monto', 'Fecha'];
    const rows = registros.map((registro) => [
      registro.nombre_cliente,
      servicios[registro.fk_id_servicio],
      `$${registro.monto}`,
      registro.fecha
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

    const finalY = (pdf as any).lastAutoTable.finalY || y + 10;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Total = $${totalMontos.toFixed(2)}`, pdf.internal.pageSize.width - 15, finalY + 10, { align: "right" });

    pdf.save(`nota-${numeroNota}.pdf`);
  };
};
