import axios from "axios";
/*
const rolApi = axios.create({
    baseURL: 'http://localhost:3001/api/rol'
});
*/
const rolApi = axios.create({
  baseURL: `https://apiestetica-production-5f1e.up.railway.app/api/rol`
});

export default rolApi;