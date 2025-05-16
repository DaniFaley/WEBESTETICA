// Obtener el valor del fk de rol
import axios from 'axios';

// Obtener fk de: RolusuarioVue.vue, RolusuarioDetallesVue.vue y RolusuarioEliminarVue.vue
// Se usan para obtener un valor por el id
export const getRol = async (): Promise<Record<number, string>> => {
  const roles: Record<number, string> = {};
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/rol/');
    response.data.forEach((rol: any) => {
      roles[rol.id_rol] = rol.nombre;
    });
  } catch (error) {
    console.error('Error al obtener los roles:', error);
  }
  return roles;
};

// Obtener fk de: RolusuarioAgregar.ts y RolusuarioEditar.ts
// Se usa para poder poner un menu de opciones
export const fetchRol = async (): Promise<{ id_rol: number; nombre: string }[]> => {
  try {
    const response = await axios.get('https://apiestetica-production-5f1e.up.railway.app/api/rol/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    return [];
  }
};