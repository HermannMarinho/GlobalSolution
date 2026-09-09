import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { Route } from "./+types/abrigos.novo";
import Layout from "../components/Layout";
import { abrigoService } from "../services/abrigoService";
import type { Abrigo } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cadastrar Abrigo - Sistema de Gestão" },
    { name: "description", content: "Cadastre um novo abrigo" },
  ];
}

type FormData = Omit<Abrigo, "id">;

export default function CadastroAbrigo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      // Garantir que capacidadeAtual comece em 0
      const abrigoData = {
        ...data,
        capacidadeAtual: 0,
      };

      await abrigoService.cadastrar(abrigoData);
      alert("Abrigo cadastrado com sucesso!");
      navigate("/abrigos");
    } catch (err) {
      console.error("Erro ao cadastrar abrigo:", err);
      setError("Erro ao cadastrar abrigo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cadastrar Novo Abrigo</h1>
          <p className="text-gray-600 mt-2">
            Preencha os dados abaixo para cadastrar um novo abrigo
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Abrigo *
              </label>
              <input
                type="text"
                id="nome"
                {...register("nome", { required: "Nome é obrigatório" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Ginásio Municipal Centro"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            {/* Endereço */}
            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço *
              </label>
              <input
                type="text"
                id="endereco"
                {...register("endereco", { required: "Endereço é obrigatório" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Rua das Flores, 123 - Centro"
              />
              {errors.endereco && (
                <p className="mt-1 text-sm text-red-600">{errors.endereco.message}</p>
              )}
            </div>

            {/* Capacidade Total */}
            <div>
              <label
                htmlFor="capacidadeTotal"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Capacidade Total *
              </label>
              <input
                type="number"
                id="capacidadeTotal"
                {...register("capacidadeTotal", {
                  required: "Capacidade total é obrigatória",
                  min: { value: 1, message: "Capacidade deve ser no mínimo 1" },
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 100"
              />
              {errors.capacidadeTotal && (
                <p className="mt-1 text-sm text-red-600">{errors.capacidadeTotal.message}</p>
              )}
            </div>

            {/* Capacidade Atual (hidden - sempre começa em 0) */}
            <input
              type="hidden"
              {...register("capacidadeAtual", { valueAsNumber: true })}
              value={0}
            />

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cadastrando..." : "Cadastrar Abrigo"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/abrigos")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
