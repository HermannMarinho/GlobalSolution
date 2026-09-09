package br.com.projeto.resource;

import br.com.projeto.model.Pessoa;
import br.com.projeto.service.PessoaService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("/pessoas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PessoaResource {

    private final PessoaService pessoaService = new PessoaService();

    @GET
    public Response listarTodas() {
        List<Pessoa> pessoas = pessoaService.listarTodas();
        return Response.ok(pessoas).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Pessoa pessoa = pessoaService.buscarPorId(id);
        if (pessoa == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(pessoa).build();
    }

    @POST
    public Response criar(Pessoa pessoa) {
        pessoaService.inserir(pessoa);
        return Response.status(Response.Status.CREATED)
                .entity(pessoa)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, Pessoa pessoa) {
        pessoa.setIdPessoa(id);
        pessoaService.atualizar(pessoa);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletar(@PathParam("id") Long id) {
        pessoaService.deletar(id);
        return Response.noContent().build();
    }
    
    @PATCH
    @Path("/{id}/status")
    public Response atualizarStatus(@PathParam("id") Long id, Map<String, String> payload) {
        try {
            String novoStatus = payload.get("status");
            if (novoStatus == null || novoStatus.trim().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Payload precisa conter a chave 'status'.")
                        .build();
            }
            Pessoa pessoaAtualizada = pessoaService.atualizarStatus(id, novoStatus);
            return Response.ok(pessoaAtualizada).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @PATCH
    @Path("/{id}/abrigo")
    public Response associarAbrigo(@PathParam("id") Long id, Map<String, Long> payload) {
        try {
            Long abrigoId = payload.get("abrigoId");
            Pessoa pessoaAtualizada = pessoaService.associarAbrigo(id, abrigoId);
            return Response.ok(pessoaAtualizada).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (IllegalStateException e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build();
        }
    }
}