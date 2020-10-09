import axios from 'axios';

/**
 * criar a conexão com banco de dados
 */

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api;