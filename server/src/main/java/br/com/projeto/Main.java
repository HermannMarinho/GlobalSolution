package br.com.projeto;

import br.com.projeto.config.ApplicationConfig;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.io.IOException;
import java.net.URI;

public class Main {
    // Define a URI base onde a aplicação estará disponível
    public static final String BASE_URI = "http://localhost:8080/api/";

    /**
     * Inicia o servidor HTTP Grizzly expondo os recursos JAX-RS.
     * @return HttpServer
     */
    public static HttpServer startServer() {
        // Usa a classe ApplicationConfig que já define o @ApplicationPath e os pacotes
        final ResourceConfig rc = new ApplicationConfig();

        // Cria e retorna uma nova instância do servidor Grizzly HTTP
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
    }

    /**
     * Método principal.
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        final HttpServer server = startServer();
        System.out.println(String.format("Jersey app started with endpoints available at "
                + "%s%nHit Ctrl-C to stop it...", BASE_URI));
        System.in.read();
        server.shutdownNow();
    }
}