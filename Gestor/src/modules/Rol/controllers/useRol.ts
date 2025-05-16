import { ref } from "vue"
import type { Rol, RolAgregar } from "../interfaces/rol-interfaces"
import rolApi from "../api/rolApi";

export const useRol = () =>{
    //Se crea la estructura del arreglo: personal-interfaces.ts
    const roles = ref<Rol[]>([])
    //Se mostrara el mensaje cuandol este en 1 y no cuando este en 0
    let mensaje = ref(0);

    //Traer todos los registros de la tabla
    const traeRol = async () =>{
        const respuesta = await rolApi.get<Rol[]>('/')
        //Cuando si traiga datos
        roles.value = respuesta.data
    }
    //Traer 1 registro en especifico para poderlo modificar
    const traeRolId = async (id_rol:number) => {
        const respuesta = await rolApi.get<Rol[]>('/'+id_rol)
        roles.value = respuesta.data
    }

    //Agregar un nuevo registro
    const agregarRol = async (roles:RolAgregar) => {
    const respuesta = await rolApi.post('/', roles)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Modificar registro
    const actualizarRol = async (roles:Rol) => {
        const respuesta = await rolApi.put('/',roles)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Eliminar registro
    const borrarRol = async (roles:Rol) => {
        const respuesta = await rolApi.delete('/',{data: {id_rol: roles.id_rol}})
        if(respuesta.data.fieldCount >= 0) {
            mensaje.value = 1;
        }
    }

    return{
        roles,
        mensaje,
        traeRol,
        traeRolId,
        agregarRol,
        actualizarRol,
        borrarRol
    }
}
