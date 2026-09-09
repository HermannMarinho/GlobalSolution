package br.com.projeto.model;

public class Abrigo {

    private Long idAbrigo;
    private String nome;
    private Integer capacidadeTotal;
    private Integer capacidadeAtual;
    private String endereco;

    public Abrigo() {
    }

    public Abrigo(Long idAbrigo, String nome, Integer capacidadeTotal,
                  Integer capacidadeAtual, String endereco) {
        this.idAbrigo = idAbrigo;
        this.nome = nome;
        this.capacidadeTotal = capacidadeTotal;
        this.capacidadeAtual = capacidadeAtual;
        this.endereco = endereco;
    }

    public Long getIdAbrigo() {
        return idAbrigo;
    }

    public void setIdAbrigo(Long idAbrigo) {
        this.idAbrigo = idAbrigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCapacidadeTotal() {
        return capacidadeTotal;
    }

    public void setCapacidadeTotal(Integer capacidadeTotal) {
        this.capacidadeTotal = capacidadeTotal;
    }

    public Integer getCapacidadeAtual() {
        return capacidadeAtual;
    }

    public void setCapacidadeAtual(Integer capacidadeAtual) {
        this.capacidadeAtual = capacidadeAtual;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    @Override
    public String toString() {
        return "Abrigo{" +
                "idAbrigo=" + idAbrigo +
                ", nome='" + nome + '\'' +
                ", capacidadeTotal=" + capacidadeTotal +
                ", capacidadeAtual=" + capacidadeAtual +
                ", endereco='" + endereco + '\'' +
                '}';
    }
}
