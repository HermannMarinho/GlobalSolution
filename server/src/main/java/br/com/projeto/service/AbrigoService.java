package br.com.projeto.service;

import br.com.projeto.dao.AbrigoDao;
import br.com.projeto.model.Abrigo;

import java.util.List;

public class AbrigoService {

    private final AbrigoDao abrigoDao;

    public AbrigoService() {
        this.abrigoDao = new AbrigoDao();
    }

    public List<Abrigo> listarTodos() {
        return abrigoDao.listarTodos();
    }

    public Abrigo buscarPorId(Long id) {
        return abrigoDao.buscarPorId(id);
    }

    public void inserir(Abrigo abrigo) {
        // Regra simples: se capacidadeAtual vier nula, zera
        if (abrigo.getCapacidadeAtual() == null) {
            abrigo.setCapacidadeAtual(0);
        }
        abrigoDao.inserir(abrigo);
    }

    public void atualizar(Abrigo abrigo) {
        abrigoDao.atualizar(abrigo);
    }

    public Abrigo atualizarCapacidade(Long id, int novaCapacidade) {
        Abrigo abrigo = abrigoDao.buscarPorId(id);
        if (abrigo == null) {
            return null; // Ou lançar exceção
        }

        if (novaCapacidade < 0 || novaCapacidade > abrigo.getCapacidadeTotal()) {
            throw new IllegalArgumentException("Capacidade inválida.");
        }

        abrigoDao.atualizarCapacidade(id, novaCapacidade);
        return abrigoDao.buscarPorId(id); // Retorna o abrigo atualizado
    }

    public void deletar(Long id) {
        abrigoDao.deletar(id);
    }
}