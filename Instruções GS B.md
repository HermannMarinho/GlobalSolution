O objetivo é criar um MVP web para auxiliar na **gestão de desabrigados e abrigos** durante eventos extremos da natureza, utilizando as tecnologias:

- **Back-End:** Java com Maven, Jersey (Jakarta RESTful Web Services) e JDBC.
- **Front-End:** React (consumindo APIs REST).

---

## Instruções (Back-End em Java/Maven/Jersey)

Bento é responsável pela **lógica de negócio**, **persistência** e **exposição das APIs REST** para integração com o Front-End.

### Requisitos Técnicos

* **Linguagem:** Java (uso obrigatório de POO).
* **Build:** Maven (estrutura padronizada e dependências no `pom.xml`).
* **Framework REST:** Jersey (Jakarta RESTful Web Services).
* **Persistência:** JDBC puro para acesso ao banco.
* **Banco de Dados:** Relacional (Oracle ou PostgreSQL) com CRUD completo.
* **Estrutura de Dados:** Mínimo de 3 entidades com relacionamentos (ex.: Pessoa, Ocorrência, Abrigo).
* **Integração:** O Back-End deve expor endpoints REST (JSON) que serão consumidos pelo Front-End React.

---

### Passo a Passo Detalhado

#### Modelagem e Configuração

1. **Modelo de Entidades (Diagrama ER):** Criar um Diagrama Entidade-Relacionamento (DER) com 3 entidades principais:
   * **Pessoa Desabrigada (ou Atingida):** *ID, Nome, Telefone, Documento, Status (Deslocada/Resgatada), ID_Abrigo (FK)*.
   * **Abrigo:** *ID, Nome do Local, Capacidade Total, Capacidade Atual, Endereço*.
   * **Ocorrência/Desastre:** *ID, Tipo (Enchente/Incêndio), Data, Local/Região Afetada*.
2. **Script SQL:** Gerar e fornecer o script `.sql` com a criação das tabelas e relacionamentos.

---

#### Estrutura Java (POO, Maven e Camadas)

1. **Pacotes sugeridos:**
```
br.com.projeto.model  
br.com.projeto.dao  
br.com.projeto.service  
br.com.projeto.resource  
br.com.projeto.config

```
2. **Classes Model:** Criar as classes Java para as entidades `Pessoa`, `Abrigo`, e `Ocorrencia` com:
* Atributos privados.
* Construtores.
* Getters e setters.
* Sobrescrita de `toString()` quando útil para debug.

3. **Configuração do Maven:**
* Criar o arquivo `pom.xml` com dependências principais:
  - `javax.ws.rs` ou `jakarta.ws.rs` (para Jersey).
  - `jersey-container-servlet`.
  - `jersey-media-json-binding` (para JSON).
  - `postgresql` ou `oracle` driver.
  - `jakarta.servlet-api`.
* Estrutura de diretórios padrão Maven:
  ```
  src/
    main/
      java/
      resources/
      webapp/WEB-INF/web.xml
  ```

---

#### Acesso a Dados (DAO - JDBC)

1. **Classes DAO:** Criar uma classe DAO para cada entidade (`PessoaDAO`, `AbrigoDAO`, `OcorrenciaDAO`).
2. **Métodos CRUD:** Implementar métodos usando JDBC.
* Exemplo `AbrigoDAO`:
  ```java
  public void cadastrar(Abrigo abrigo);
  public List<Abrigo> listarTodos();
  public Abrigo buscarPorId(int id);
  public void atualizarCapacidade(int id, int novaCapacidade);
  public void deletar(int id);
  ```

3. **Conexão com o Banco:**
* Criar classe utilitária `ConnectionFactory` com método estático `getConnection()` para abrir conexões JDBC.
* Parametrizar via arquivo `db.properties`.

---

#### Lógica de Negócio e API REST (Jersey)

1. **Recursos REST (Resources):**
* Criar classes anotadas com `@Path` para expor endpoints HTTP.
* Cada classe deve representar uma entidade.
  - `AbrigoResource` → `/api/abrigos`
  - `PessoaResource` → `/api/pessoas`
  - `OcorrenciaResource` → `/api/ocorrencias`
* Exemplo de método básico:
  ```java
  @Path("/abrigos")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public class AbrigoResource {
      private AbrigoDAO dao = new AbrigoDAO();

      @GET
      public List<Abrigo> listar() {
          return dao.listarTodos();
      }

      @POST
      public Response cadastrar(Abrigo abrigo) {
          dao.cadastrar(abrigo);
          return Response.status(Response.Status.CREATED).build();
      }
  }
  ```

2. **Configuração do Jersey:**
* Criar classe `ApplicationConfig` com anotação `@ApplicationPath("/api")`.
* Registrar manualmente os resources se necessário.

---

### Entregáveis Esperados

- Estrutura Maven funcional (`pom.xml` configurado).
- Endpoints REST funcionando e retornando JSON.
- CRUD completo para `Pessoa`, `Abrigo`, e `Ocorrencia`.
- Script `.sql` com tabelas e relacionamentos.
- Documentação breve das rotas (endpoints, métodos, parâmetros, retornos).