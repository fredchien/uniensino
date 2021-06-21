import axios from 'axios';

const api = axios.create({
  baseURL: "http://homologacao.uniensinovirtual.com.br/api/v1"
});

export default api;
