package br.com.projeto.model;

public class Pessoa {

    private Long idPessoa;
    private String nome;
    private String telefone;
    private String documento;
    private String status;
    private Long idAbrigo;
    private Long idOcorrencia;

    public Pessoa() {
    }

    public Pessoa(Long idPessoa, String nome, String telefone,
                  String documento, String status,
                  Long idAbrigo, Long idOcorrencia) {
        this.idPessoa = idPessoa;
        this.nome = nome;
        this.telefone = telefone;
        this.documento = documento;
        this.status = status;
        this.idAbrigo = idAbrigo;
        this.idOcorrencia = idOcorrencia;
    }

    public Long getIdPessoa() {
        return idPessoa;
    }

    public void setIdPessoa(Long idPessoa) {
        this.idPessoa = idPessoa;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getIdAbrigo() {
        return idAbrigo;
    }

    public void setIdAbrigo(Long idAbrigo) {
        this.idAbrigo = idAbrigo;
    }

    public Long getIdOcorrencia() {
        return idOcorrencia;
    }

    public void setIdOcorrencia(Long idOcorrencia) {
        this.idOcorrencia = idOcorrencia;
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "idPessoa=" + idPessoa +
                ", nome='" + nome + '\'' +
                ", telefone='" + telefone + '\'' +
                ", documento='" + documento + '\'' +
                ", status='" + status + '\'' +
                ", idAbrigo=" + idAbrigo +
                ", idOcorrencia=" + idOcorrencia +
                '}';
    }
}
