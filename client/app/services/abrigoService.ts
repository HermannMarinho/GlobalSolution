import api from "../api/apiClient";
import type { Abrigo } from "../types";

// Serviço para gerenciar abrigos
export const abrigoService = {
  // Listar todos os abrigos
  listarTodos: async (): Promise<Abrigo[]> => {
    const response = await api.get<Abrigo[]>("/abrigos");
    return response.data;
  },

  // Buscar abrigo por ID
  buscarPorId: async (id: number): Promise<Abrigo> => {
    const response = await api.get<Abrigo>(`/abrigos/${id}`);
    return response.data;
  },

  // Cadastrar novo abrigo
  cadastrar: async (abrigo: Omit<Abrigo, "id">): Promise<Abrigo> => {
    const response = await api.post<Abrigo>("/abrigos", abrigo);
    return response.data;
  },

  // Atualizar abrigo existente
  atualizar: async (id: number, abrigo: Partial<Abrigo>): Promise<Abrigo> => {
    const response = await api.put<Abrigo>(`/abrigos/${id}`, abrigo);
    return response.data;
  },

  // Deletar abrigo
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/abrigos/${id}`);
  },

  // Atualizar capacidade do abrigo
  atualizarCapacidade: async (id: number, novaCapacidade: number): Promise<Abrigo> => {
    const response = await api.patch<Abrigo>(`/abrigos/${id}/capacidade`, {
      capacidade: novaCapacidade,
    });
    return response.data;
  },

  // Listar pessoas em um abrigo específico
  listarPessoas: async (id: number): Promise<any[]> => {
    const response = await api.get(`/abrigos/${id}/pessoas`);
    return response.data;
  },
};
