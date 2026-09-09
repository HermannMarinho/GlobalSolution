package br.com.projeto.service;

import br.com.projeto.dao.AbrigoDao;
import br.com.projeto.dao.PessoaDao;
import br.com.projeto.model.Abrigo;
import br.com.projeto.model.Pessoa;

import java.util.List;

public class PessoaService {

    private final PessoaDao pessoaDao;
    private final AbrigoDao abrigoDao;

    public PessoaService() {
        this.pessoaDao = new PessoaDao();
        this.abrigoDao = new AbrigoDao(); // Para validar a capacidade do abrigo
    }

    public List<Pessoa> listarTodas() {
        return pessoaDao.listarTodas();
    }

    public List<Pessoa> listarPorAbrigo(Long abrigoId) {
        return pessoaDao.listarPorAbrigo(abrigoId);
    }

    public Pessoa buscarPorId(Long id) {
        return pessoaDao.buscarPorId(id);
    }

    public void inserir(Pessoa pessoa) {
        if (pessoa.getIdAbrigo() != null) {
            associarAbrigo(pessoa.getIdPessoa(), pessoa.getIdAbrigo());
        } else {
            pessoaDao.inserir(pessoa);
        }
    }

    public void atualizar(Pessoa pessoa) {
        pessoaDao.atualizar(pessoa);
    }

    public void deletar(Long id) {
        pessoaDao.deletar(id);
    }

    public Pessoa atualizarStatus(Long pessoaId, String status) {
        pessoaDao.atualizarStatus(pessoaId, status);
        return pessoaDao.buscarPorId(pessoaId);
    }

    public Pessoa associarAbrigo(Long pessoaId, Long abrigoId) {
        Pessoa pessoa = pessoaDao.buscarPorId(pessoaId);
        if (pessoa == null) {
            throw new IllegalArgumentException("Pessoa não encontrada.");
        }

        // Lógica para desassociar
        if (abrigoId == null) {
            Long abrigoAntigoId = pessoa.getIdAbrigo();
            if (abrigoAntigoId != null) {
                Abrigo abrigoAntigo = abrigoDao.buscarPorId(abrigoAntigoId);
                if (abrigoAntigo != null) {
                    abrigoDao.atualizarCapacidade(abrigoAntigoId, abrigoAntigo.getCapacidadeAtual() - 1);
                }
            }
            pessoaDao.atualizarAbrigo(pessoaId, null);
            return pessoaDao.buscarPorId(pessoaId);
        }
        
        Abrigo abrigo = abrigoDao.buscarPorId(abrigoId);
        if (abrigo == null) {
            throw new IllegalArgumentException("Abrigo não encontrado.");
        }

        if (abrigo.getCapacidadeAtual() >= abrigo.getCapacidadeTotal()) {
            throw new IllegalStateException("O abrigo está lotado.");
        }

        // Atualiza capacidade
        abrigoDao.atualizarCapacidade(abrigoId, abrigo.getCapacidadeAtual() + 1);
        pessoaDao.atualizarAbrigo(pessoaId, abrigoId);

        return pessoaDao.buscarPorId(pessoaId);
    }
}
