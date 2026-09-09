import api from "../api/apiClient";
import type { Pessoa } from "../types";

// Serviço para gerenciar pessoas desabrigadas
export const pessoaService = {
  // Listar todas as pessoas
  listarTodas: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoas");
    return response.data;
  },

  // Buscar pessoa por ID
  buscarPorId: async (id: number): Promise<Pessoa> => {
    const response = await api.get<Pessoa>(`/pessoas/${id}`);
    return response.data;
  },

  // Cadastrar nova pessoa
  cadastrar: async (pessoa: Omit<Pessoa, "id">): Promise<Pessoa> => {
    const response = await api.post<Pessoa>("/pessoas", pessoa);
    return response.data;
  },

  // Atualizar pessoa existente
  atualizar: async (id: number, pessoa: Partial<Pessoa>): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/${id}`, pessoa);
    return response.data;
  },

  // Deletar pessoa
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/pessoas/${id}`);
  },

  // Atualizar status da pessoa
  atualizarStatus: async (
    id: number,
    status: "Deslocada" | "Resgatada" | "Abrigada"
  ): Promise<Pessoa> => {
    const response = await api.patch<Pessoa>(`/pessoas/${id}/status`, { status });
    return response.data;
  },

  // Associar pessoa a um abrigo
  associarAbrigo: async (pessoaId: number, abrigoId: number): Promise<Pessoa> => {
    const response = await api.patch<Pessoa>(`/pessoas/${pessoaId}/abrigo`, {
      abrigoId,
    });
    return response.data;
  },
};
