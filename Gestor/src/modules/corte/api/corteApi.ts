import axios from "axios";
/*
const corteApi = axios.create({
    baseURL: 'http://localhost:3001/api/corte'
});
*/
const corteApi = axios.create({
  baseURL: `https://apiestetica-production-5f1e.up.railway.app/api/corte`
});

export default corteApi;