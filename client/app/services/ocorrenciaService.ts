import api from "../api/apiClient";
import type { Ocorrencia } from "../types";

// Serviço para gerenciar ocorrências/desastres
export const ocorrenciaService = {
  // Listar todas as ocorrências
  listarTodas: async (): Promise<Ocorrencia[]> => {
    const response = await api.get<Ocorrencia[]>("/ocorrencias");
    return response.data;
  },

  // Buscar ocorrência por ID
  buscarPorId: async (id: number): Promise<Ocorrencia> => {
    const response = await api.get<Ocorrencia>(`/ocorrencias/${id}`);
    return response.data;
  },

  // Cadastrar nova ocorrência
  cadastrar: async (ocorrencia: Omit<Ocorrencia, "id">): Promise<Ocorrencia> => {
    const response = await api.post<Ocorrencia>("/ocorrencias", ocorrencia);
    return response.data;
  },

  // Atualizar ocorrência existente
  atualizar: async (id: number, ocorrencia: Partial<Ocorrencia>): Promise<Ocorrencia> => {
    const response = await api.put<Ocorrencia>(`/ocorrencias/${id}`, ocorrencia);
    return response.data;
  },

  // Deletar ocorrência
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/ocorrencias/${id}`);
  },

  // Listar ocorrências recentes (últimas 10)
  listarRecentes: async (): Promise<Ocorrencia[]> => {
    const response = await api.get<Ocorrencia[]>("/ocorrencias/recentes");
    return response.data;
  },
};
