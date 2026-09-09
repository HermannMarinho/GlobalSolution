import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/abrigos";
import Layout from "../components/Layout";
import { abrigoService } from "../services/abrigoService";
import type { Abrigo } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lista de Abrigos - Sistema de Gestão" },
    { name: "description", content: "Visualize todos os abrigos cadastrados" },
  ];
}

export default function ListaAbrigos() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarAbrigos = async () => {
    try {
      setLoading(true);
      const data = await abrigoService.listarTodos();
      setAbrigos(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar abrigos:", err);
      setError("Erro ao carregar abrigos. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAbrigos();
  }, []);

  const handleDeletar = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este abrigo?")) {
      return;
    }

    try {
      await abrigoService.deletar(id);
      await carregarAbrigos();
    } catch (err) {
      console.error("Erro ao deletar abrigo:", err);
      alert("Erro ao deletar abrigo. Verifique se não há pessoas associadas a ele.");
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

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Lista de Abrigos</h1>
          <Link
            to="/abrigos/novo"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            + Novo Abrigo
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {abrigos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">Nenhum abrigo cadastrado.</p>
              <Link
                to="/abrigos/novo"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Cadastre o primeiro abrigo
              </Link>
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
                      Endereço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ocupação
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
                  {abrigos.map((abrigo) => {
                    const percentualOcupacao = Math.round(
                      (abrigo.capacidadeAtual / abrigo.capacidadeTotal) * 100
                    );
                    const isLotado = percentualOcupacao >= 90;
                    const isQuaseLotado = percentualOcupacao >= 70 && percentualOcupacao < 90;

                    return (
                      <tr key={abrigo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {abrigo.nome}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{abrigo.endereco}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {abrigo.capacidadeAtual} / {abrigo.capacidadeTotal}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  isLotado
                                    ? "bg-red-500"
                                    : isQuaseLotado
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${percentualOcupacao}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {percentualOcupacao}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              isLotado
                                ? "bg-red-100 text-red-800"
                                : isQuaseLotado
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {isLotado ? "Lotado" : isQuaseLotado ? "Quase lotado" : "Disponível"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Link
                            to={`/abrigos/${abrigo.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver
                          </Link>
                          <button
                            onClick={() => handleDeletar(abrigo.id!)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Deletar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
