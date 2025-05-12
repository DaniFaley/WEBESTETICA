import { ref } from "vue"
import type { Usuario, UsuarioAgregar } from "../interfaces/usuario-interfaces"
import usuarioApi from "../api/usuarioApi";

export const useUsuario = () =>{
    //Se crea la estructura del arreglo: personal-interfaces.ts
    const usuarios = ref<Usuario[]>([])
    //Se mostrara el mensaje cuandol este en 1 y no cuando este en 0
    let mensaje = ref(0);

    //Traer todos los registros de la tabla
    const traeUsuario = async () =>{
        const respuesta = await usuarioApi.get<Usuario[]>('/')
        //Cuando si traiga datos
        usuarios.value = respuesta.data
    }
    //Traer 1 registro en especifico para poderlo modificar
    const traeUsuarioId = async (id_datos_usuario:number) => {
        const respuesta = await usuarioApi.get<Usuario[]>('/'+id_datos_usuario)
        usuarios.value = respuesta.data
    }

    //Agregar un nuevo registro
    const agregarUsuario = async (usuarios:UsuarioAgregar) => {
    const respuesta = await usuarioApi.post('/', usuarios)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Modificar registro
    const actualizarUsuario = async (usuarios:Usuario) => {
        const respuesta = await usuarioApi.put('/',usuarios)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Eliminar registro
    const borrarUsuario = async (usuarios:Usuario) => {
        const respuesta = await usuarioApi.delete('/',{data: {id_datos_usuario: usuarios.id_datos_usuario}})
        if(respuesta.data.fieldCount >= 0) {
            mensaje.value = 1;
        }
    }

    return{
        usuarios,
        mensaje,
        traeUsuario,
        traeUsuarioId,
        agregarUsuario,
        actualizarUsuario,
        borrarUsuario
    }
}
