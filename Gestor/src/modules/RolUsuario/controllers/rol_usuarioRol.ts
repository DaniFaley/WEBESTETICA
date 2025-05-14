import { ref } from "vue"
import type { RolUsuario, RolUsuarioAgregar } from "../interfaces/rol_usuario-interfaces"
import rol_usuarioApi from "../api/rol_usuarioApi";

export const useRolUsuario = () =>{
    //Se crea la estructura del arreglo: personal-interfaces.ts
    const rol_usuarios = ref<RolUsuario[]>([])
    //Se mostrara el mensaje cuandol este en 1 y no cuando este en 0
    let mensaje = ref(0);

    //Traer todos los registros de la tabla
    const traeRolUsuario = async () =>{
        const respuesta = await rol_usuarioApi.get<RolUsuario[]>('/')
        //Cuando si traiga datos
        rol_usuarios.value = respuesta.data
    }
    //Traer 1 registro en especifico para poderlo modificar
    const traeRolUsuarioId = async (id_usuario:number) => {
        const respuesta = await rol_usuarioApi.get<RolUsuario[]>('/'+id_usuario)
        rol_usuarios.value = respuesta.data
    }

    //Agregar un nuevo registro
    const agregarRolUsuario = async (rol_usuarios:RolUsuarioAgregar) => {
    const respuesta = await rol_usuarioApi.post('/', rol_usuarios)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Modificar registro
    const actualizarRolUsuario = async (rol_usuarios:RolUsuario) => {
        const respuesta = await rol_usuarioApi.put('/',rol_usuarios)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Eliminar registro
    const borrarRolUsuario = async (rol_usuarios:RolUsuario) => {
        const respuesta = await rol_usuarioApi.delete('/',{data: {id_usuario: rol_usuarios.id_usuario}})
        if(respuesta.data.fieldCount >= 0) {
            mensaje.value = 1;
        }
    }

    return{
        rol_usuarios,
        mensaje,
        traeRolUsuario,
        traeRolUsuarioId,
        agregarRolUsuario,
        actualizarRolUsuario,
        borrarRolUsuario
    }
}
