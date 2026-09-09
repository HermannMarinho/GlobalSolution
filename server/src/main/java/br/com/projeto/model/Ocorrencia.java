package br.com.projeto.model;

import java.time.LocalDate;

public class Ocorrencia {

    private Long idOcorrencia;
    private String tipo;
    private LocalDate dataOcorrencia;
    private String regiaoAfetada;

    public Ocorrencia() {
    }

    public Ocorrencia(Long idOcorrencia, String tipo,
                      LocalDate dataOcorrencia, String regiaoAfetada) {
        this.idOcorrencia = idOcorrencia;
        this.tipo = tipo;
        this.dataOcorrencia = dataOcorrencia;
        this.regiaoAfetada = regiaoAfetada;
    }

    public Long getIdOcorrencia() {
        return idOcorrencia;
    }

    public void setIdOcorrencia(Long idOcorrencia) {
        this.idOcorrencia = idOcorrencia;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDate getDataOcorrencia() {
        return dataOcorrencia;
    }

    public void setDataOcorrencia(LocalDate dataOcorrencia) {
        this.dataOcorrencia = dataOcorrencia;
    }

    public String getRegiaoAfetada() {
        return regiaoAfetada;
    }

    public void setRegiaoAfetada(String regiaoAfetada) {
        this.regiaoAfetada = regiaoAfetada;
    }

    @Override
    public String toString() {
        return "Ocorrencia{" +
                "idOcorrencia=" + idOcorrencia +
                ", tipo='" + tipo + '\'' +
                ", dataOcorrencia=" + dataOcorrencia +
                ", regiaoAfetada='" + regiaoAfetada + '\'' +
                '}';
    }
}
