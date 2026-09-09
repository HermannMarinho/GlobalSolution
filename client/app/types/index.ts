// Tipos para as entidades do sistema

export interface Abrigo {
  id?: number;
  nome: string;
  capacidadeTotal: number;
  capacidadeAtual: number;
  endereco: string;
}

export interface Pessoa {
  id?: number;
  nome: string;
  telefone: string;
  documento: string;
  status: "Deslocada" | "Resgatada" | "Abrigada";
  abrigoId?: number;
  abrigo?: Abrigo;
}

export interface Ocorrencia {
  id?: number;
  tipo: "Enchente" | "Incêndio" | "Deslizamento" | "Outro";
  data: string;
  localAfetado: string;
  descricao?: string;
}

export interface KPIs {
  totalAbrigos: number;
  totalPessoasAbrigadas: number;
  totalOcorrencias: number;
  capacidadeDisponivel: number;
}
