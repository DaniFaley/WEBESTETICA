// Obtener el valor del campo nombre respecto a su fk
import axios from 'axios';

// Obtener fk de: CorteVue.vue, CorteDetallesVue.vue y CorteEliminarVue.vue
// Se usan para obtenrer un valor por el id
export const getSexo = async (): Promise<Record<number, string>> => {
  const sexos: Record<number, string> = {};
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/sexo/');
    response.data.forEach((sexo: any) => {
      sexos[sexo.id_sexo] = sexo.nombre;
    });
  } catch (error) {
    console.error('Error al obtener los sexos:', error);
  }
  return sexos;
};

export const getServicio = async (): Promise<Record<number, string>> => {
  const servicios: Record<number, string> = {};
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/servicio/');
    response.data.forEach((servicio: any) => {
      servicios[servicio.id_servicio] = servicio.nombre;
    });
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
  }
  return servicios;
};


// Obtener fk de: CorteAgregar.ts y CorteEditar.ts
// Se usa para poder poner un menu de opciones
export const fetchSexo = async (): Promise<{ id_sexo: number; nombre: string }[]> => {
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/sexo/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los sexos:', error);
    return [];
  }
};

export const fetchServicio = async (): Promise<{ id_servicio: number; nombre: string }[]> => {
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/servicio/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    return [];
  }
};

// Obtener el único usuario registrado: Para los datos en el pdf
export const obtenerUsuario = async (): Promise<any | null> => {
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/usuario/');
    return response.data[0]; // asumimos que hay un solo usuario
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
};