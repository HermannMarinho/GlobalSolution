package br.com.projeto.dao;

import br.com.projeto.config.ConnectionFactory;
import br.com.projeto.model.Pessoa;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PessoaDao {

    public List<Pessoa> listarTodas() {
        String sql = "SELECT id_pessoa, nome, telefone, documento, status, " +
                "id_abrigo, id_ocorrencia FROM pessoa";

        List<Pessoa> pessoas = new ArrayList<>();

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Pessoa p = new Pessoa();
                p.setIdPessoa(rs.getLong("id_pessoa"));
                p.setNome(rs.getString("nome"));
                p.setTelefone(rs.getString("telefone"));
                p.setDocumento(rs.getString("documento"));
                p.setStatus(rs.getString("status"));

                long idAbrigo = rs.getLong("id_abrigo");
                if (!rs.wasNull()) {
                    p.setIdAbrigo(idAbrigo);
                }

                long idOcorrencia = rs.getLong("id_ocorrencia");
                if (!rs.wasNull()) {
                    p.setIdOcorrencia(idOcorrencia);
                }

                pessoas.add(p);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar pessoas", e);
        }

        return pessoas;
    }
    
    public List<Pessoa> listarPorAbrigo(Long abrigoId) {
        String sql = "SELECT id_pessoa, nome, telefone, documento, status, " +
                "id_abrigo, id_ocorrencia FROM pessoa WHERE id_abrigo = ?";
        List<Pessoa> pessoas = new ArrayList<>();

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, abrigoId);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Pessoa p = new Pessoa();
                    p.setIdPessoa(rs.getLong("id_pessoa"));
                    p.setNome(rs.getString("nome"));
                    p.setTelefone(rs.getString("telefone"));
                    p.setDocumento(rs.getString("documento"));
                    p.setStatus(rs.getString("status"));

                    long idAbrigo = rs.getLong("id_abrigo");
                    if (!rs.wasNull()) {
                        p.setIdAbrigo(idAbrigo);
                    }

                    long idOcorrencia = rs.getLong("id_ocorrencia");
                    if (!rs.wasNull()) {
                        p.setIdOcorrencia(idOcorrencia);
                    }
                    pessoas.add(p);
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar pessoas por abrigo", e);
        }

        return pessoas;
    }

    public Pessoa buscarPorId(Long id) {
        String sql = "SELECT id_pessoa, nome, telefone, documento, status, " +
                "id_abrigo, id_ocorrencia " +
                "FROM pessoa WHERE id_pessoa = ?";

        Pessoa p = null;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    p = new Pessoa();
                    p.setIdPessoa(rs.getLong("id_pessoa"));
                    p.setNome(rs.getString("nome"));
                    p.setTelefone(rs.getString("telefone"));
                    p.setDocumento(rs.getString("documento"));
                    p.setStatus(rs.getString("status"));

                    long idAbrigo = rs.getLong("id_abrigo");
                    if (!rs.wasNull()) {
                        p.setIdAbrigo(idAbrigo);
                    }

                    long idOcorrencia = rs.getLong("id_ocorrencia");
                    if (!rs.wasNull()) {
                        p.setIdOcorrencia(idOcorrencia);
                    }
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar pessoa por id", e);
        }

        return p;
    }

    public void inserir(Pessoa p) {
        String sql = "INSERT INTO pessoa (nome, telefone, documento, status, id_abrigo, id_ocorrencia) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, p.getNome());
            ps.setString(2, p.getTelefone());
            ps.setString(3, p.getDocumento());
            ps.setString(4, p.getStatus());

            if (p.getIdAbrigo() != null) {
                ps.setLong(5, p.getIdAbrigo());
            } else {
                ps.setNull(5, java.sql.Types.NUMERIC);
            }

            if (p.getIdOcorrencia() != null) {
                ps.setLong(6, p.getIdOcorrencia());
            } else {
                ps.setNull(6, java.sql.Types.NUMERIC);
            }

            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir pessoa", e);
        }
    }

    public void atualizar(Pessoa p) {
        String sql = "UPDATE pessoa " +
                "SET nome = ?, telefone = ?, documento = ?, status = ?, " +
                "id_abrigo = ?, id_ocorrencia = ? " +
                "WHERE id_pessoa = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, p.getNome());
            ps.setString(2, p.getTelefone());
            ps.setString(3, p.getDocumento());
            ps.setString(4, p.getStatus());

            if (p.getIdAbrigo() != null) {
                ps.setLong(5, p.getIdAbrigo());
            } else {
                ps.setNull(5, java.sql.Types.NUMERIC);
            }

            if (p.getIdOcorrencia() != null) {
                ps.setLong(6, p.getIdOcorrencia());
            } else {
                ps.setNull(6, java.sql.Types.NUMERIC);
            }
            
            ps.setLong(7, p.getIdPessoa());

            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar pessoa", e);
        }
    }

    public void deletar(Long id) {
        String sql = "DELETE FROM pessoa WHERE id_pessoa = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar pessoa", e);
        }
    }
    
    public void atualizarStatus(Long pessoaId, String status) {
        String sql = "UPDATE pessoa SET status = ? WHERE id_pessoa = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, status);
            ps.setLong(2, pessoaId);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar status da pessoa", e);
        }
    }

    public void atualizarAbrigo(Long pessoaId, Long abrigoId) {
        String sql = "UPDATE pessoa SET id_abrigo = ? WHERE id_pessoa = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            if (abrigoId != null) {
                ps.setLong(1, abrigoId);
            } else {
                ps.setNull(1, java.sql.Types.NUMERIC);
            }
            ps.setLong(2, pessoaId);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar abrigo da pessoa", e);
        }
    }
}
