package br.com.projeto.service;

import br.com.projeto.dao.OcorrenciaDao;
import br.com.projeto.model.Ocorrencia;

import java.util.List;

public class OcorrenciaService {

    private final OcorrenciaDao ocorrenciaDao;

    public OcorrenciaService() {
        this.ocorrenciaDao = new OcorrenciaDao();
    }

    public List<Ocorrencia> listarTodas() {
        return ocorrenciaDao.listarTodas();
    }

    public List<Ocorrencia> listarRecentes() {
        return ocorrenciaDao.listarRecentes();
    }

    public Ocorrencia buscarPorId(Long id) {
        return ocorrenciaDao.buscarPorId(id);
    }

    public void inserir(Ocorrencia ocorrencia) {
        ocorrenciaDao.inserir(ocorrencia);
    }

    public void atualizar(Ocorrencia ocorrencia) {
        ocorrenciaDao.atualizar(ocorrencia);
    }

    public void deletar(Long id) {
        ocorrenciaDao.deletar(id);
    }
}