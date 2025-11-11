# Instruções para Hermann (Front-End em React, HTML/CSS/JS)

O objetivo é criar um MVP web para auxiliar na **gestão de desabrigados e abrigos** durante eventos extremos da natureza

Hermann é responsável pela interface web funcional em **React**. O front-end deve consumir as APIs REST do Back-End expostas em `/api/*`.

---

## Requisitos Técnicos (atualizados)

* **Stack:** React (obrigatório). Pode usar Vite ou Create React App.
* **Estilização:** Tailwind CSS recomendado. Outras libs opcionais: React Router, Axios, React Hook Form.
* **Funcionalidade:** Protótipo funcional que permita CRUD de abrigos, CRUD de pessoas e visualização de ocorrências.
* **Responsividade:** Layout responsivo.
* **Integração:** Consumir endpoints REST do Bento (ex.: `/api/abrigos`, `/api/pessoas`, `/api/ocorrencias`).
* **Entrega rápida:** priorizar velocidade de implementação e clareza do código para demo.

---

## Dependências mínimas

* react, react-dom
* react-router-dom
* axios (ou fetch nativo)
* tailwindcss, postcss, autoprefixer
* react-hook-form

---

## Páginas

**Páginas principais**

* `Home` — Visão geral. KPIs: total de abrigos, pessoas abrigadas, ocorrências recentes.
* `ListaAbrigos` — Tabela com todos os abrigos e ações (editar, gerenciar pessoas, ver capacidade).
* `CadastroAbrigo` — Formulário criar/editar abrigo.
* `CadastroPessoa` — Formulário criar pessoa e selecionar abrigo associado.
* `DetalheAbrigo` — Lista de pessoas no abrigo e controle de capacidade.

---

## 2.2 API Client e Services

**Configuração base (`src/api/apiClient.js`)**

```javascript
import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
headers: { "Content-Type": "application/json" },
timeout: 10000
});

export default api;
````

**Exemplo de serviço `abrigoService.js`**

```javascript
import api from "../api/apiClient";

export const listarAbrigos = () => api.get("/abrigos").then(r => r.data);
export const buscarAbrigo = id => api.get(`/abrigos/${id}`).then(r => r.data);
export const cadastrarAbrigo = abrigo => api.post("/abrigos", abrigo).then(r => r.data);
export const atualizarAbrigo = (id, abrigo) => api.put(`/abrigos/${id}`, abrigo).then(r => r.data);
export const deletarAbrigo = id => api.delete(`/abrigos/${id}`);
export const atualizarCapacidade = (id, novaCapacidade) =>
api.patch(`/abrigos/${id}/capacidade`, { capacidade: novaCapacidade });
```

**Contrato esperado dos endpoints (exemplos)**

- `GET /api/abrigos` → `[{ id, nome, capacidadeTotal, capacidadeAtual, endereco }]`
- `POST /api/abrigos` → corpo `{ nome, capacidadeTotal, endereco }`
- `GET /api/pessoas` → `[{ id, nome, telefone, documento, status, abrigoId }]`
- `POST /api/pessoas` → corpo `{ nome, telefone, documento, status, abrigoId }`


(Alinhar com Bento se campos/rotas diferentes.)

---

## 2.5 Rotas e Navegação

Usar `react-router-dom`. Roteamento básico:

- `/` → `Home`
- `/abrigos` → `ListaAbrigos`
- `/abrigos/novo` → `CadastroAbrigo`
- `/abrigos/:id` → `DetalheAbrigo`
- `/pessoas/novo` → `CadastroPessoa`

---

## Checklist mínimo de entrega

- [ ] Projeto React inicializado (Vite/Cra).
- [ ] Tailwind configurado ou CSS organizado.
- [ ] Páginas: Home, ListaAbrigos, CadastroAbrigo, CadastroPessoa, DetalheAbrigo.
- [ ] Serviços implementados (`abrigoService`, `pessoaService`).
- [ ] Validação de formulários no cliente.
- [ ] Consumo real das rotas `/api/*`.
- [ ] Documentação curta: como rodar (`npm install`, `npm run dev`), variável de API.
- [ ] Demonstração funcionando localmente (rotas do Bento apontadas corretamente).

---

## Entregáveis esperados do Front-End

1. Instruções de execução no `README.md`.
2. Build pronto para deploy.
3. Documentação curta das rotas consumidas e exemplos de payloads.
4. Protótipo navegável com CRUDs funcionando.

---

## Observações finais técnicas

- Priorizar integração funcional ao invés de features extras.
- Se houver divergência no contrato da API, alinhar com Bento imediatamente.
- Para demonstração rápida, usar Fetch nativo é aceitável. Para produtividade e tratamento de erros, usar Axios.
- Para formulários complexos, usar React Hook Form.