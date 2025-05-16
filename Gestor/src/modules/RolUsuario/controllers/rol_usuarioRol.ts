import { ref } from "vue"
import type { RolUsuario, RolUsuarioAgregar } from "../interfaces/rol_usuario-interfaces"
import rol_usuarioApi from "../api/rol_usuarioApi";

export const useRolUsuario = () =>{
    //Se crea la estructura del arreglo: personal-interfaces.ts
    const roles_usuario = ref<RolUsuario[]>([])
    //Se mostrara el mensaje cuandol este en 1 y no cuando este en 0
    let mensaje = ref(0);

    //Traer todos los registros de la tabla
    const traeRolUsuario = async () =>{
        const respuesta = await rol_usuarioApi.get<RolUsuario[]>('/')
        //Cuando si traiga datos
        roles_usuario.value = respuesta.data
    }
    //Traer 1 registro en especifico para poderlo modificar
    const traeRolUsuarioId = async (id_usuario:number) => {
        const respuesta = await rol_usuarioApi.get<RolUsuario[]>('/'+id_usuario)
        roles_usuario.value = respuesta.data
    }

    //Agregar un nuevo registro
    const agregarRolUsuario = async (roles_usuario:RolUsuarioAgregar) => {
    const respuesta = await rol_usuarioApi.post('/', roles_usuario)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Modificar registro
    const actualizarRolUsuario = async (roles_usuario:RolUsuario) => {
        const respuesta = await rol_usuarioApi.put('/',roles_usuario)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Eliminar registro
    const borrarRolUsuario = async (roles_usuario:RolUsuario) => {
        const respuesta = await rol_usuarioApi.delete('/',{data: {id_usuario: roles_usuario.id_usuario}})
        if(respuesta.data.fieldCount >= 0) {
            mensaje.value = 1;
        }
    }

    return{
        roles_usuario,
        mensaje,
        traeRolUsuario,
        traeRolUsuarioId,
        agregarRolUsuario,
        actualizarRolUsuario,
        borrarRolUsuario
    }
}
