import axios from "axios";
/*
const usuarioApi = axios.create({
    baseURL: 'http://localhost:3001/api/usuario'
});
*/
const usuarioApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/usuario`
});

export default usuarioApi;