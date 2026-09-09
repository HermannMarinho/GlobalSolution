package br.com.projeto.config;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionFactory {

    private static final String PROPERTIES_FILE = "db.properties";

    private static String url;
    private static String user;
    private static String password;
    private static String driver;

    static {
        try (InputStream input =
                     ConnectionFactory.class.getClassLoader().getResourceAsStream(PROPERTIES_FILE)) {

            if (input == null) {
                throw new RuntimeException("Arquivo " + PROPERTIES_FILE + " não encontrado no classpath.");
            }

            Properties props = new Properties();
            props.load(input);

            url = props.getProperty("db.url");
            user = props.getProperty("db.user");
            password = props.getProperty("db.password");
            driver = props.getProperty("db.driver");

            Class.forName(driver);

        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException("Erro ao carregar configurações de banco de dados.", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }
}
