import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import type { Route } from "./+types/abrigos.$id";
import Layout from "../components/Layout";
import { abrigoService } from "../services/abrigoService";
import { pessoaService } from "../services/pessoaService";
import type { Abrigo, Pessoa } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalhes do Abrigo - Sistema de Gestão" },
    { name: "description", content: "Visualize os detalhes do abrigo" },
  ];
}

export default function DetalheAbrigo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [abrigo, setAbrigo] = useState<Abrigo | null>(null);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = async () => {
    const abrigoId = parseInt(id || "", 10);
    if (isNaN(abrigoId)) {
      setError("ID de abrigo inválido.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // O endpoint /abrigos/{id}/pessoas já foi implementado no backend
      const [abrigoData, pessoasDoAbrigo] = await Promise.all([
        abrigoService.buscarPorId(abrigoId),
        abrigoService.listarPessoas(abrigoId),
      ]);

      setAbrigo(abrigoData);
      setPessoas(pessoasDoAbrigo);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados do abrigo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [id]);

  const handleRemoverPessoa = async (pessoaId: number) => {
    if (!confirm("Deseja remover esta pessoa do abrigo?")) {
      return;
    }

    try {
      // Atualizar pessoa removendo o abrigoId
      await pessoaService.atualizar(pessoaId, { abrigoId: undefined });
      await carregarDados();
      alert("Pessoa removida do abrigo com sucesso!");
    } catch (err) {
      console.error("Erro ao remover pessoa:", err);
      alert("Erro ao remover pessoa do abrigo.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (error || !abrigo) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Abrigo não encontrado"}
          </h2>
          <Link to="/abrigos" className="text-blue-500 hover:underline">
            Voltar para lista de abrigos
          </Link>
        </div>
      </Layout>
    );
  }

  const percentualOcupacao = Math.round(
    (abrigo.capacidadeAtual / abrigo.capacidadeTotal) * 100
  );
  const vagasDisponiveis = abrigo.capacidadeTotal - abrigo.capacidadeAtual;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Link to="/abrigos" className="text-blue-500 hover:underline text-sm mb-2 inline-block">
              ← Voltar para abrigos
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">{abrigo.nome}</h1>
            <p className="text-gray-600 mt-1">{abrigo.endereco}</p>
          </div>

        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Capacidade Total</h3>
            <p className="text-3xl font-bold text-gray-800">{abrigo.capacidadeTotal}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Ocupação Atual</h3>
            <p className="text-3xl font-bold text-blue-600">{abrigo.capacidadeAtual}</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    percentualOcupacao >= 90
                      ? "bg-red-500"
                      : percentualOcupacao >= 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${percentualOcupacao}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{percentualOcupacao}% ocupado</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Vagas Disponíveis</h3>
            <p className="text-3xl font-bold text-green-600">{vagasDisponiveis}</p>
          </div>
        </div>

        {/* Pessoas no Abrigo */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Pessoas no Abrigo ({pessoas.length})
            </h2>
          </div>

          {pessoas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma pessoa cadastrada neste abrigo.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pessoas.map((pessoa) => (
                    <tr key={pessoa.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pessoa.nome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{pessoa.telefone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{pessoa.documento}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pessoa.status === "Abrigada"
                              ? "bg-green-100 text-green-800"
                              : pessoa.status === "Resgatada"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {pessoa.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoverPessoa(pessoa.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
