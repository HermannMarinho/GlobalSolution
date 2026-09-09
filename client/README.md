# Sistema de Gestão de Abrigos - Global Solution 2024

MVP web para auxiliar na **gestão de desabrigados e abrigos** durante eventos extremos da natureza.

## Tecnologias Utilizadas

- **React** 19 com TypeScript
- **React Router** v7 (com SSR)
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **React Hook Form** para gerenciamento de formulários

## Estrutura do Projeto

```
app/
├── api/
│   └── apiClient.ts          # Cliente Axios configurado
├── components/
│   └── Layout.tsx            # Layout principal com navegação
├── routes/
│   ├── home.tsx              # Página inicial com KPIs
│   ├── abrigos.tsx           # Lista de abrigos
│   ├── abrigos.novo.tsx      # Cadastro de abrigo
│   ├── abrigos.$id.tsx       # Detalhes do abrigo
│   └── pessoas.novo.tsx      # Cadastro de pessoa
├── services/
│   ├── abrigoService.ts      # Serviço de abrigos
│   ├── pessoaService.ts      # Serviço de pessoas
│   └── ocorrenciaService.ts  # Serviço de ocorrências
├── types/
│   └── index.ts              # Tipos TypeScript
└── routes.ts                 # Configuração de rotas
```

## Funcionalidades Implementadas

### Páginas

1. **Home** (`/`)
   - Dashboard com KPIs (total de abrigos, pessoas abrigadas, capacidade disponível)
   - Listagem de ocorrências recentes
   - Ações rápidas para navegação

2. **Lista de Abrigos** (`/abrigos`)
   - Tabela com todos os abrigos cadastrados
   - Indicadores visuais de ocupação
   - Ações: Ver detalhes, Editar, Deletar

3. **Cadastro de Abrigo** (`/abrigos/novo`)
   - Formulário com validação
   - Campos: Nome, Endereço, Capacidade Total

4. **Detalhes do Abrigo** (`/abrigos/:id`)
   - Informações detalhadas do abrigo
   - Lista de pessoas no abrigo
   - Controle de capacidade

5. **Cadastro de Pessoa** (`/pessoas/novo`)
   - Formulário com validação
   - Campos: Nome, Telefone, Documento, Status, Abrigo (opcional)

## Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- Back-end rodando em `http://localhost:8080` (ou configurar URL no `.env`)

### Passos

1. **Instalar dependências:**

```bash
npm install
```

2. **Configurar variável de ambiente:**

Copie o arquivo `.env.example` para `.env` e ajuste a URL da API se necessário:

```bash
cp .env.example .env
```

Conteúdo do `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

3. **Iniciar servidor de desenvolvimento:**

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Build para Produção

Para criar um build otimizado para produção:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm start
```

## Endpoints da API Consumidos

O front-end consome os seguintes endpoints do back-end:

### Abrigos
- `GET /api/abrigos` - Listar todos os abrigos
- `GET /api/abrigos/:id` - Buscar abrigo por ID
- `POST /api/abrigos` - Cadastrar novo abrigo
- `PUT /api/abrigos/:id` - Atualizar abrigo
- `DELETE /api/abrigos/:id` - Deletar abrigo
- `PATCH /api/abrigos/:id/capacidade` - Atualizar capacidade

### Pessoas
- `GET /api/pessoas` - Listar todas as pessoas
- `GET /api/pessoas/:id` - Buscar pessoa por ID
- `POST /api/pessoas` - Cadastrar nova pessoa
- `PUT /api/pessoas/:id` - Atualizar pessoa
- `DELETE /api/pessoas/:id` - Deletar pessoa

### Ocorrências
- `GET /api/ocorrencias` - Listar todas as ocorrências
- `GET /api/ocorrencias/recentes` - Listar ocorrências recentes

## Exemplos de Payloads

### Cadastrar Abrigo
```json
{
  "nome": "Ginásio Municipal Centro",
  "capacidadeTotal": 100,
  "capacidadeAtual": 0,
  "endereco": "Rua das Flores, 123 - Centro"
}
```

### Cadastrar Pessoa
```json
{
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "documento": "123.456.789-00",
  "status": "Abrigada",
  "abrigoId": 1
}
```

## Docker

Para executar com Docker:

```bash
docker build -t sistema-abrigos .
docker run -p 3000:3000 sistema-abrigos
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run typecheck` - Verifica tipos TypeScript

## Responsividade

O sistema é totalmente responsivo e adapta-se a diferentes tamanhos de tela:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## Tratamento de Erros

- Mensagens de erro amigáveis para o usuário
- Validação de formulários no cliente
- Tratamento de erros de rede (API offline)
- Feedback visual de loading

## Melhorias Futuras

- Autenticação e autorização
- Paginação para listas grandes
- Filtros e busca avançada
- Gráficos e relatórios
- Notificações em tempo real
- Exportação de dados (CSV, PDF)
- Modo offline com cache local

## Autores

Projeto desenvolvido como parte da Global Solution 2024 - FIAP

---

Desenvolvido com React Router v7, TypeScript e Tailwind CSS.
