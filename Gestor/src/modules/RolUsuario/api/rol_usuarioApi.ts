import axios from "axios";
/*
const rol_usuarioApi = axios.create({
    baseURL: 'http://localhost:3001/api/rol_usuario'
});
*/
const rol_usuarioApi = axios.create({
  baseURL: `https://apiestetica-production-5f1e.up.railway.app/api/rol_usuario`
});

export default rol_usuarioApi;