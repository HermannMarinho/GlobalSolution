package br.com.projeto.dao;

import br.com.projeto.config.ConnectionFactory;
import br.com.projeto.model.Ocorrencia;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OcorrenciaDao {

    public List<Ocorrencia> listarTodas() {
        String sql = "SELECT id_ocorrencia, tipo, data_ocorrencia, regiao_afetada FROM ocorrencia ORDER BY data_ocorrencia DESC";
        List<Ocorrencia> ocorrencias = new ArrayList<>();

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Ocorrencia oc = new Ocorrencia();
                oc.setIdOcorrencia(rs.getLong("id_ocorrencia"));
                oc.setTipo(rs.getString("tipo"));

                Date data = rs.getDate("data_ocorrencia");
                LocalDate dataLocal = data != null ? data.toLocalDate() : null;
                oc.setDataOcorrencia(dataLocal);

                oc.setRegiaoAfetada(rs.getString("regiao_afetada"));

                ocorrencias.add(oc);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar ocorrências", e);
        }

        return ocorrencias;
    }
    
    public List<Ocorrencia> listarRecentes() {
        String sql = "SELECT id_ocorrencia, tipo, data_ocorrencia, regiao_afetada FROM ocorrencia " +
                     "ORDER BY data_ocorrencia DESC FETCH FIRST 10 ROWS ONLY";
        List<Ocorrencia> ocorrencias = new ArrayList<>();

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Ocorrencia oc = new Ocorrencia();
                oc.setIdOcorrencia(rs.getLong("id_ocorrencia"));
                oc.setTipo(rs.getString("tipo"));

                Date data = rs.getDate("data_ocorrencia");
                LocalDate dataLocal = data != null ? data.toLocalDate() : null;
                oc.setDataOcorrencia(dataLocal);

                oc.setRegiaoAfetada(rs.getString("regiao_afetada"));

                ocorrencias.add(oc);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar ocorrências recentes", e);
        }

        return ocorrencias;
    }

    public Ocorrencia buscarPorId(Long id) {
        String sql = "SELECT id_ocorrencia, tipo, data_ocorrencia, regiao_afetada " +
                "FROM ocorrencia WHERE id_ocorrencia = ?";
        Ocorrencia oc = null;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    oc = new Ocorrencia();
                    oc.setIdOcorrencia(rs.getLong("id_ocorrencia"));
                    oc.setTipo(rs.getString("tipo"));

                    Date data = rs.getDate("data_ocorrencia");
                    LocalDate dataLocal = data != null ? data.toLocalDate() : null;
                    oc.setDataOcorrencia(dataLocal);

                    oc.setRegiaoAfetada(rs.getString("regiao_afetada"));
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar ocorrência por id", e);
        }

        return oc;
    }

    public void inserir(Ocorrencia oc) {
        String sql = "INSERT INTO ocorrencia (tipo, data_ocorrencia, regiao_afetada) " +
                "VALUES (?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, oc.getTipo());
            ps.setDate(2, oc.getDataOcorrencia() != null ? Date.valueOf(oc.getDataOcorrencia()) : null);
            ps.setString(3, oc.getRegiaoAfetada());

            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir ocorrência", e);
        }
    }

    public void atualizar(Ocorrencia oc) {
        String sql = "UPDATE ocorrencia " +
                "SET tipo = ?, data_ocorrencia = ?, regiao_afetada = ? " +
                "WHERE id_ocorrencia = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, oc.getTipo());
            ps.setDate(2, oc.getDataOcorrencia() != null ? Date.valueOf(oc.getDataOcorrencia()) : null);
            ps.setString(3, oc.getRegiaoAfetada());
            ps.setLong(4, oc.getIdOcorrencia());

            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar ocorrência", e);
        }
    }

    public void deletar(Long id) {
        String sql = "DELETE FROM ocorrencia WHERE id_ocorrencia = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar ocorrência", e);
        }
    }
}