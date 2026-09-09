package br.com.projeto.dao;

import br.com.projeto.config.ConnectionFactory;
import br.com.projeto.model.Abrigo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AbrigoDao {

    public List<Abrigo> listarTodos() {
        String sql = "SELECT id_abrigo, nome, capacidade_total, capacidade_atual, endereco FROM abrigo";
        List<Abrigo> abrigos = new ArrayList<>();

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Abrigo abrigo = new Abrigo();
                abrigo.setIdAbrigo(rs.getLong("id_abrigo"));
                abrigo.setNome(rs.getString("nome"));
                abrigo.setCapacidadeTotal(rs.getInt("capacidade_total"));
                abrigo.setCapacidadeAtual(rs.getInt("capacidade_atual"));
                abrigo.setEndereco(rs.getString("endereco"));
                abrigos.add(abrigo);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar abrigos", e);
        }

        return abrigos;
    }

    public Abrigo buscarPorId(Long id) {
        String sql = "SELECT id_abrigo, nome, capacidade_total, capacidade_atual, endereco " +
                "FROM abrigo WHERE id_abrigo = ?";
        Abrigo abrigo = null;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    abrigo = new Abrigo();
                    abrigo.setIdAbrigo(rs.getLong("id_abrigo"));
                    abrigo.setNome(rs.getString("nome"));
                    abrigo.setCapacidadeTotal(rs.getInt("capacidade_total"));
                    abrigo.setCapacidadeAtual(rs.getInt("capacidade_atual"));
                    abrigo.setEndereco(rs.getString("endereco"));
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar abrigo por id", e);
        }

        return abrigo;
    }

    public void inserir(Abrigo abrigo) {
        String sql = "INSERT INTO abrigo (nome, capacidade_total, capacidade_atual, endereco) " +
                "VALUES (?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, abrigo.getNome());
            ps.setInt(2, abrigo.getCapacidadeTotal());
            ps.setInt(3, abrigo.getCapacidadeAtual() != null ? abrigo.getCapacidadeAtual() : 0);
            ps.setString(4, abrigo.getEndereco());

            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inserir abrigo", e);
        }
    }

    public void atualizar(Abrigo abrigo) {
        String sql = "UPDATE abrigo " +
                "SET nome = ?, capacidade_total = ?, capacidade_atual = ?, endereco = ? " +
                "WHERE id_abrigo = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, abrigo.getNome());
            ps.setInt(2, abrigo.getCapacidadeTotal());
            ps.setInt(3, abrigo.getCapacidadeAtual());
            ps.setString(4, abrigo.getEndereco());
            ps.setLong(5, abrigo.getIdAbrigo());

            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar abrigo", e);
        }
    }
    
    public void atualizarCapacidade(Long id, int novaCapacidade) {
        String sql = "UPDATE abrigo SET capacidade_atual = ? WHERE id_abrigo = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, novaCapacidade);
            ps.setLong(2, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar capacidade do abrigo", e);
        }
    }

    public void deletar(Long id) {
        String sql = "DELETE FROM abrigo WHERE id_abrigo = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar abrigo", e);
        }
    }
}