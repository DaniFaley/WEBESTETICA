import axios from "axios";
/*
const usuarioApi = axios.create({
    baseURL: 'http://localhost:3001/api/usuario'
});
*/
const usuarioApi = axios.create({
  baseURL: `https://apiestetica-production-5f1e.up.railway.app/api/usuario`
});

export default usuarioApi;