export interface Corte{
    id_corte: number,
    nombre_cliente: string,
    fk_id_sexo: number,
    fk_id_servicio: number,
    monto: number,
    fecha: string; // ← permite ambos
    comentario: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type CorteAgregar = Omit<Corte,'id_corte'>