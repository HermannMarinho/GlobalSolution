import axios from "axios";

// Configuração do cliente Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor para tratamento de erros global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro de resposta do servidor
      console.error("Erro na resposta:", error.response.data);
    } else if (error.request) {
      // Erro de requisição (sem resposta)
      console.error("Erro na requisição:", error.request);
    } else {
      // Outro tipo de erro
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
