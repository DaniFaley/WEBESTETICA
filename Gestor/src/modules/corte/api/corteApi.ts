import axios from "axios";
/*
const corteApi = axios.create({
    baseURL: 'http://localhost:3001/api/corte'
});
*/
const corteApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/corte`
});

export default corteApi;