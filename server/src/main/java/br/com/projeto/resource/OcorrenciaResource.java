package br.com.projeto.resource;

import br.com.projeto.model.Ocorrencia;
import br.com.projeto.service.OcorrenciaService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/ocorrencias")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OcorrenciaResource {

    private final OcorrenciaService ocorrenciaService = new OcorrenciaService();

    @GET
    public Response listarTodas() {
        List<Ocorrencia> ocorrencias = ocorrenciaService.listarTodas();
        return Response.ok(ocorrencias).build();
    }
    
    @GET
    @Path("/recentes")
    public Response listarRecentes() {
        List<Ocorrencia> ocorrencias = ocorrenciaService.listarRecentes();
        return Response.ok(ocorrencias).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Ocorrencia ocorrencia = ocorrenciaService.buscarPorId(id);
        if (ocorrencia == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(ocorrencia).build();
    }

    @POST
    public Response criar(Ocorrencia ocorrencia) {
        ocorrenciaService.inserir(ocorrencia);
        return Response.status(Response.Status.CREATED)
                .entity(ocorrencia)
                .build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, Ocorrencia ocorrencia) {
        ocorrencia.setIdOcorrencia(id);
        ocorrenciaService.atualizar(ocorrencia);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletar(@PathParam("id") Long id) {
        ocorrenciaService.deletar(id);
        return Response.noContent().build();
    }
}