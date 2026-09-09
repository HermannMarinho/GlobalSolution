# Documentação da API - Sistema de Gestão de Abrigos

Esta documentação descreve os endpoints REST que o front-end espera consumir do back-end.

## Base URL

```
http://localhost:8080/api
```

---

## Endpoints

### 1. Abrigos

#### 1.1. Listar Todos os Abrigos

**Endpoint:** `GET /api/abrigos`

**Descrição:** Retorna todos os abrigos cadastrados no sistema.

**Response 200 (Success):**
```json
[
  {
    "id": 1,
    "nome": "Ginásio Municipal Centro",
    "capacidadeTotal": 100,
    "capacidadeAtual": 45,
    "endereco": "Rua das Flores, 123 - Centro"
  },
  {
    "id": 2,
    "nome": "Escola Estadual São Paulo",
    "capacidadeTotal": 150,
    "capacidadeAtual": 120,
    "endereco": "Av. Paulista, 456 - Bela Vista"
  }
]
```

---

#### 1.2. Buscar Abrigo por ID

**Endpoint:** `GET /api/abrigos/:id`

**Descrição:** Retorna um abrigo específico pelo ID.

**Parâmetros:**
- `id` (path) - ID do abrigo

**Response 200 (Success):**
```json
{
  "id": 1,
  "nome": "Ginásio Municipal Centro",
  "capacidadeTotal": 100,
  "capacidadeAtual": 45,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

**Response 404 (Not Found):**
```json
{
  "error": "Abrigo não encontrado"
}
```

---

#### 1.3. Cadastrar Novo Abrigo

**Endpoint:** `POST /api/abrigos`

**Descrição:** Cadastra um novo abrigo no sistema.

**Request Body:**
```json
{
  "nome": "Ginásio Municipal Centro",
  "capacidadeTotal": 100,
  "capacidadeAtual": 0,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

**Validações:**
- `nome`: obrigatório, string não vazia
- `capacidadeTotal`: obrigatório, número inteiro > 0
- `capacidadeAtual`: obrigatório, número inteiro >= 0
- `endereco`: obrigatório, string não vazia

**Response 201 (Created):**
```json
{
  "id": 3,
  "nome": "Ginásio Municipal Centro",
  "capacidadeTotal": 100,
  "capacidadeAtual": 0,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

**Response 400 (Bad Request):**
```json
{
  "error": "Dados inválidos",
  "details": ["Nome é obrigatório"]
}
```

---

#### 1.4. Atualizar Abrigo

**Endpoint:** `PUT /api/abrigos/:id`

**Descrição:** Atualiza os dados de um abrigo existente.

**Parâmetros:**
- `id` (path) - ID do abrigo

**Request Body:**
```json
{
  "nome": "Ginásio Municipal Centro - Atualizado",
  "capacidadeTotal": 120,
  "capacidadeAtual": 50,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

**Response 200 (Success):**
```json
{
  "id": 1,
  "nome": "Ginásio Municipal Centro - Atualizado",
  "capacidadeTotal": 120,
  "capacidadeAtual": 50,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

---

#### 1.5. Deletar Abrigo

**Endpoint:** `DELETE /api/abrigos/:id`

**Descrição:** Remove um abrigo do sistema.

**Parâmetros:**
- `id` (path) - ID do abrigo

**Response 204 (No Content)**

**Response 400 (Bad Request):**
```json
{
  "error": "Não é possível deletar abrigo com pessoas associadas"
}
```

---

#### 1.6. Atualizar Capacidade

**Endpoint:** `PATCH /api/abrigos/:id/capacidade`

**Descrição:** Atualiza a capacidade atual de um abrigo.

**Parâmetros:**
- `id` (path) - ID do abrigo

**Request Body:**
```json
{
  "capacidade": 55
}
```

**Response 200 (Success):**
```json
{
  "id": 1,
  "nome": "Ginásio Municipal Centro",
  "capacidadeTotal": 100,
  "capacidadeAtual": 55,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

---

### 2. Pessoas

#### 2.1. Listar Todas as Pessoas

**Endpoint:** `GET /api/pessoas`

**Descrição:** Retorna todas as pessoas cadastradas no sistema.

**Response 200 (Success):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "telefone": "(11) 98765-4321",
    "documento": "123.456.789-00",
    "status": "Abrigada",
    "abrigoId": 1
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "telefone": "(11) 91234-5678",
    "documento": "987.654.321-00",
    "status": "Resgatada",
    "abrigoId": null
  }
]
```

---

#### 2.2. Buscar Pessoa por ID

**Endpoint:** `GET /api/pessoas/:id`

**Descrição:** Retorna uma pessoa específica pelo ID.

**Parâmetros:**
- `id` (path) - ID da pessoa

**Response 200 (Success):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "documento": "123.456.789-00",
  "status": "Abrigada",
  "abrigoId": 1
}
```

---

#### 2.3. Cadastrar Nova Pessoa

**Endpoint:** `POST /api/pessoas`

**Descrição:** Cadastra uma nova pessoa no sistema.

**Request Body:**
```json
{
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "documento": "123.456.789-00",
  "status": "Abrigada",
  "abrigoId": 1
}
```

**Validações:**
- `nome`: obrigatório, string não vazia
- `telefone`: obrigatório, string não vazia
- `documento`: obrigatório, string não vazia
- `status`: obrigatório, enum ["Deslocada", "Resgatada", "Abrigada"]
- `abrigoId`: opcional, número inteiro

**Response 201 (Created):**
```json
{
  "id": 3,
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "documento": "123.456.789-00",
  "status": "Abrigada",
  "abrigoId": 1
}
```

---

#### 2.4. Atualizar Pessoa

**Endpoint:** `PUT /api/pessoas/:id`

**Descrição:** Atualiza os dados de uma pessoa existente.

**Parâmetros:**
- `id` (path) - ID da pessoa

**Request Body:**
```json
{
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "documento": "123.456.789-00",
  "status": "Resgatada",
  "abrigoId": null
}
```

**Response 200 (Success):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "documento": "123.456.789-00",
  "status": "Resgatada",
  "abrigoId": null
}
```

---

#### 2.5. Deletar Pessoa

**Endpoint:** `DELETE /api/pessoas/:id`

**Descrição:** Remove uma pessoa do sistema.

**Parâmetros:**
- `id` (path) - ID da pessoa

**Response 204 (No Content)**

---

### 3. Ocorrências

#### 3.1. Listar Todas as Ocorrências

**Endpoint:** `GET /api/ocorrencias`

**Descrição:** Retorna todas as ocorrências cadastradas.

**Response 200 (Success):**
```json
[
  {
    "id": 1,
    "tipo": "Enchente",
    "data": "2024-01-15",
    "localAfetado": "Bairro Centro",
    "descricao": "Enchente devido às fortes chuvas"
  },
  {
    "id": 2,
    "tipo": "Incêndio",
    "data": "2024-01-20",
    "localAfetado": "Zona Rural",
    "descricao": "Incêndio em área de mata"
  }
]
```

---

#### 3.2. Listar Ocorrências Recentes

**Endpoint:** `GET /api/ocorrencias/recentes`

**Descrição:** Retorna as últimas 10 ocorrências cadastradas.

**Response 200 (Success):**
```json
[
  {
    "id": 10,
    "tipo": "Deslizamento",
    "data": "2024-02-01",
    "localAfetado": "Morro do Sol",
    "descricao": "Deslizamento de terra após chuvas"
  }
]
```

---

#### 3.3. Buscar Ocorrência por ID

**Endpoint:** `GET /api/ocorrencias/:id`

**Descrição:** Retorna uma ocorrência específica pelo ID.

**Parâmetros:**
- `id` (path) - ID da ocorrência

**Response 200 (Success):**
```json
{
  "id": 1,
  "tipo": "Enchente",
  "data": "2024-01-15",
  "localAfetado": "Bairro Centro",
  "descricao": "Enchente devido às fortes chuvas"
}
```

---

#### 3.4. Cadastrar Nova Ocorrência

**Endpoint:** `POST /api/ocorrencias`

**Descrição:** Cadastra uma nova ocorrência no sistema.

**Request Body:**
```json
{
  "tipo": "Enchente",
  "data": "2024-01-15",
  "localAfetado": "Bairro Centro",
  "descricao": "Enchente devido às fortes chuvas"
}
```

**Validações:**
- `tipo`: obrigatório, enum ["Enchente", "Incêndio", "Deslizamento", "Outro"]
- `data`: obrigatório, string formato ISO date
- `localAfetado`: obrigatório, string não vazia
- `descricao`: opcional, string

**Response 201 (Created):**
```json
{
  "id": 3,
  "tipo": "Enchente",
  "data": "2024-01-15",
  "localAfetado": "Bairro Centro",
  "descricao": "Enchente devido às fortes chuvas"
}
```

---

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Requisição bem-sucedida sem conteúdo de retorno
- `400 Bad Request` - Dados inválidos ou requisição malformada
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro interno do servidor

---

## CORS

O back-end deve permitir requisições do front-end em `http://localhost:5173` durante o desenvolvimento.

**Headers necessários:**
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Notas de Implementação

1. Todas as respostas devem ser em formato JSON
2. Todas as datas devem seguir o formato ISO 8601 (YYYY-MM-DD)
3. IDs devem ser números inteiros positivos
4. Validações devem ser feitas no back-end antes de persistir dados
5. Erros devem retornar mensagens claras e úteis para o usuário
6. A capacidadeAtual de um abrigo não pode exceder a capacidadeTotal
7. Ao deletar um abrigo, verificar se não há pessoas associadas
8. Ao associar uma pessoa a um abrigo, verificar se há vagas disponíveis

---

Documentação criada para o projeto Global Solution 2024 - FIAP
