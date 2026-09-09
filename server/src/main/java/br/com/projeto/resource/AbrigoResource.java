package br.com.projeto.resource;

import br.com.projeto.model.Abrigo;
import br.com.projeto.model.Pessoa;
import br.com.projeto.service.AbrigoService;
import br.com.projeto.service.PessoaService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("/abrigos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AbrigoResource {

    private final AbrigoService abrigoService = new AbrigoService();
    private final PessoaService pessoaService = new PessoaService();

    @GET
    public Response listarTodos() {
        List<Abrigo> abrigos = abrigoService.listarTodos();
        return Response.ok(abrigos).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Abrigo abrigo = abrigoService.buscarPorId(id);
        if (abrigo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(abrigo).build();
    }
    
    @GET
    @Path("/{id}/pessoas")
    public Response listarPessoasPorAbrigo(@PathParam("id") Long id) {
        List<Pessoa> pessoas = pessoaService.listarPorAbrigo(id);
        return Response.ok(pessoas).build();
    }

    @POST
    public Response criar(Abrigo abrigo) {
        abrigoService.inserir(abrigo);
        return Response.status(Response.Status.CREATED)
                .entity(abrigo)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, Abrigo abrigo) {
        abrigo.setIdAbrigo(id);
        abrigoService.atualizar(abrigo);
        return Response.noContent().build();
    }

    @PATCH
    @Path("/{id}/capacidade")
    public Response atualizarCapacidade(@PathParam("id") Long id, Map<String, Integer> payload) {
        try {
            Integer novaCapacidade = payload.get("capacidade");
            if (novaCapacidade == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Payload precisa conter a chave 'capacidade'.")
                        .build();
            }
            Abrigo abrigoAtualizado = abrigoService.atualizarCapacidade(id, novaCapacidade);
            if (abrigoAtualizado == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            return Response.ok(abrigoAtualizado).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deletar(@PathParam("id") Long id) {
        abrigoService.deletar(id);
        return Response.noContent().build();
    }
}
