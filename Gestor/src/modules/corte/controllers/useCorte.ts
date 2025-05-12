import { ref } from "vue"
import type { Corte, CorteAgregar } from "../interfaces/corte-interfaces"
import corteApi from "../api/corteApi";

export const useCorte = () =>{
    //Se crea la estructura del arreglo: personal-interfaces.ts
    const cortes = ref<Corte[]>([])
    //Se mostrara el mensaje cuandol este en 1 y no cuando este en 0
    let mensaje = ref(0);

    //Traer todos los registros de la tabla
    const traeCorte = async () =>{
        const respuesta = await corteApi.get<Corte[]>('/')
        //Cuando si traiga datos
        cortes.value = respuesta.data
    }
    //Traer 1 registro en especifico para poderlo modificar
    const traeCorteId = async (id_corte:number) => {
        const respuesta = await corteApi.get<Corte[]>('/'+id_corte)
        cortes.value = respuesta.data
    }

    //Agregar un nuevo registro
    const agregarCorte = async (cortes:CorteAgregar) => {
    const respuesta = await corteApi.post('/', cortes)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Modificar registro
    const actualizarCorte = async (cortes:Corte) => {
        const respuesta = await corteApi.put('/',cortes)
        if(respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }
    //Eliminar registro
    const borrarCorte = async (cortes:Corte) => {
        const respuesta = await corteApi.delete('/',{data: {id_corte: cortes.id_corte}})
        if(respuesta.data.fieldCount >= 0) {
            mensaje.value = 1;
        }
    }

    return{
        cortes,
        mensaje,
        traeCorte,
        traeCorteId,
        agregarCorte,
        actualizarCorte,
        borrarCorte
    }
}
