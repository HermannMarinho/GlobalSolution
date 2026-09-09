import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { Route } from "./+types/pessoas.novo";
import Layout from "../components/Layout";
import { pessoaService } from "../services/pessoaService";
import { abrigoService } from "../services/abrigoService";
import type { Pessoa, Abrigo } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cadastrar Pessoa - Sistema de Gestão" },
    { name: "description", content: "Cadastre uma nova pessoa desabrigada" },
  ];
}

type FormData = Omit<Pessoa, "id" | "abrigo">;

export default function CadastroPessoa() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const carregarAbrigos = async () => {
      try {
        const data = await abrigoService.listarTodos();
        setAbrigos(data);
      } catch (err) {
        console.error("Erro ao carregar abrigos:", err);
      }
    };

    carregarAbrigos();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      // Converter abrigoId para número ou undefined
      const pessoaData = {
        ...data,
        abrigoId: data.abrigoId ? Number(data.abrigoId) : undefined,
      };

      await pessoaService.cadastrar(pessoaData);
      alert("Pessoa cadastrada com sucesso!");
      navigate("/");
    } catch (err) {
      console.error("Erro ao cadastrar pessoa:", err);
      setError("Erro ao cadastrar pessoa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cadastrar Nova Pessoa</h1>
          <p className="text-gray-600 mt-2">
            Preencha os dados abaixo para cadastrar uma pessoa desabrigada
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
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome"
                {...register("nome", { required: "Nome é obrigatório" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: João Silva"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <input
                type="tel"
                id="telefone"
                {...register("telefone", { required: "Telefone é obrigatório" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: (11) 98765-4321"
              />
              {errors.telefone && (
                <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
              )}
            </div>

            {/* Documento */}
            <div>
              <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">
                Documento (CPF/RG) *
              </label>
              <input
                type="text"
                id="documento"
                {...register("documento", { required: "Documento é obrigatório" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 123.456.789-00"
              />
              {errors.documento && (
                <p className="mt-1 text-sm text-red-600">{errors.documento.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                {...register("status", { required: "Status é obrigatório" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um status</option>
                <option value="Deslocada">Deslocada</option>
                <option value="Resgatada">Resgatada</option>
                <option value="Abrigada">Abrigada</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            {/* Abrigo */}
            <div>
              <label htmlFor="abrigoId" className="block text-sm font-medium text-gray-700 mb-1">
                Abrigo (Opcional)
              </label>
              <select
                id="abrigoId"
                {...register("abrigoId")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nenhum abrigo selecionado</option>
                {abrigos.map((abrigo) => (
                  <option key={abrigo.id} value={abrigo.id}>
                    {abrigo.nome} ({abrigo.capacidadeAtual}/{abrigo.capacidadeTotal})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Selecione um abrigo se a pessoa já estiver alocada
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cadastrando..." : "Cadastrar Pessoa"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
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
