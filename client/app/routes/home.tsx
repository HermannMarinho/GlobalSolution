import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import Layout from "../components/Layout";
import { abrigoService } from "../services/abrigoService";
import { pessoaService } from "../services/pessoaService";
import { ocorrenciaService } from "../services/ocorrenciaService";
import type { Abrigo, Pessoa, Ocorrencia } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sistema de Gestão de Abrigos" },
    { name: "description", content: "Gestão de desabrigados e abrigos durante eventos extremos" },
  ];
}

export default function Home() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const [abrigosData, pessoasData, ocorrenciasData] = await Promise.all([
          abrigoService.listarTodos(),
          pessoaService.listarTodas(),
          ocorrenciaService.listarRecentes().catch(() => ocorrenciaService.listarTodas()),
        ]);

        setAbrigos(abrigosData);
        setPessoas(pessoasData);
        setOcorrencias(ocorrenciasData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados. Verifique se o backend está rodando.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  // Calcular KPIs
  const totalAbrigos = abrigos.length;
  const totalPessoasAbrigadas = pessoas.filter(p => p.status === "Abrigada").length;
  const totalOcorrencias = ocorrencias.length;
  const capacidadeTotal = abrigos.reduce((acc, a) => acc + a.capacidadeTotal, 0);
  const capacidadeUsada = abrigos.reduce((acc, a) => acc + a.capacidadeAtual, 0);
  const capacidadeDisponivel = capacidadeTotal - capacidadeUsada;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistema de Gestão de Abrigos
          </h1>
          <p className="text-gray-600">
            Gestão de desabrigados durante eventos extremos da natureza
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* KPIs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total de Abrigos</p>
                <p className="text-3xl font-bold text-gray-800">{totalAbrigos}</p>
              </div>
              <div className="text-blue-500 text-4xl">🏠</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pessoas Abrigadas</p>
                <p className="text-3xl font-bold text-gray-800">{totalPessoasAbrigadas}</p>
              </div>
              <div className="text-green-500 text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Capacidade Disponível</p>
                <p className="text-3xl font-bold text-gray-800">{capacidadeDisponivel}</p>
              </div>
              <div className="text-yellow-500 text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Ocorrências Recentes</p>
                <p className="text-3xl font-bold text-gray-800">{totalOcorrencias}</p>
              </div>
              <div className="text-red-500 text-4xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/abrigos/novo"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
            >
              + Cadastrar Abrigo
            </Link>
            <Link
              to="/pessoas/novo"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
            >
              + Cadastrar Pessoa
            </Link>
            <Link
              to="/abrigos"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
            >
              Ver Todos os Abrigos
            </Link>
          </div>
        </div>

        {/* Recent Occurrences */}
        {ocorrencias.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ocorrências Recentes</h2>
            <div className="space-y-3">
              {ocorrencias.slice(0, 5).map((ocorrencia) => (
                <div
                  key={ocorrencia.id}
                  className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{ocorrencia.tipo}</p>
                      <p className="text-sm text-gray-600">{ocorrencia.localAfetado}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(ocorrencia.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
