# 📄 Casos de Teste – API Serverest

## 🎯 Objetivo

Este documento reúne os **principais casos de teste** para praticar **testes de API** utilizando **Bruno** e **Playwright**, aplicando técnicas formais de projeto de testes para garantir **100% de cobertura funcional** da API Serverest.

API base: [https://serverest.dev/](https://serverest.dev/)

---

## 🔐 Endpoint: /login

### Técnicas aplicadas

* Partição de Equivalência
* Cobertura de Sentença
* Cobertura de Decisão

| ID   | Descrição           | Entrada                       | Resultado Esperado |
| ---- | ------------------- | ----------------------------- | ------------------ |
| CT01 | Login válido        | Email válido + senha válida   | 200 OK + token     |
| CT02 | Senha inválida      | Email válido + senha inválida | 401 Unauthorized   |
| CT03 | Email inexistente   | Email não cadastrado          | 401 Unauthorized   |
| CT04 | Email inválido      | Email sem formato válido      | 400 Bad Request    |
| CT05 | Campo senha ausente | Email válido + senha vazia    | 400 Bad Request    |

---

## 👤 Endpoint: /usuarios

### Técnicas aplicadas

* Partição de Equivalência
* Análise do Valor Limite
* Cobertura de Decisão

| ID   | Descrição                      | Entrada                     | Resultado Esperado |
| ---- | ------------------------------ | --------------------------- | ------------------ |
| CT06 | Criar usuário válido           | Nome, email e senha válidos | 201 Created        |
| CT07 | Email duplicado                | Email já cadastrado         | 400 Bad Request    |
| CT08 | Email inválido                 | Email fora do padrão        | 400 Bad Request    |
| CT09 | Nome vazio                     | Nome em branco              | 400 Bad Request    |
| CT10 | Senha vazia                    | Senha ausente               | 400 Bad Request    |
| CT11 | Buscar usuário por ID válido   | ID existente                | 200 OK             |
| CT12 | Buscar usuário por ID inválido | ID inexistente              | 400 Bad Request    |

---

## 📦 Endpoint: /produtos

### Técnicas aplicadas

* Partição de Equivalência
* Análise do Valor Limite
* Tabela de Decisão

> ⚠️ Requer token de administrador

| ID   | Descrição                      | Entrada                     | Resultado Esperado |
| ---- | ------------------------------ | --------------------------- | ------------------ |
| CT13 | Criar produto válido           | Token admin + dados válidos | 201 Created        |
| CT14 | Criar produto sem token        | Sem autenticação            | 401 Unauthorized   |
| CT15 | Preço zero                     | Preço = 0                   | 400 Bad Request    |
| CT16 | Preço negativo                 | Preço < 0                   | 400 Bad Request    |
| CT17 | Nome duplicado                 | Produto já existente        | 400 Bad Request    |
| CT18 | Listar produtos                | GET sem filtro              | 200 OK             |
| CT19 | Buscar produto por ID inválido | ID inexistente              | 400 Bad Request    |
| CT20 | Excluir produto em carrinho    | Produto vinculado           | 400 Bad Request    |

---

## 🛒 Endpoint: /carrinhos

### Técnicas aplicadas

* Partição de Equivalência
* Tabela de Decisão
* Cobertura de Decisão

| ID   | Descrição                    | Entrada                                       | Resultado Esperado |
| ---- | ---------------------------- | --------------------------------------------- | ------------------ |
| CT21 | Criar carrinho válido        | Token + produto existente + quantidade válida | 201 Created        |
| CT22 | Produto inexistente          | ID inválido                                   | 400 Bad Request    |
| CT23 | Quantidade maior que estoque | Quantidade inválida                           | 400 Bad Request    |
| CT24 | Criar carrinho sem token     | Não autenticado                               | 401 Unauthorized   |
| CT25 | Finalizar compra             | Carrinho existente                            | 200 OK             |
| CT26 | Cancelar compra              | Carrinho existente                            | 200 OK             |

---

## 🧠 Observações para Prática

* Cada caso pode ser executado manualmente no **Bruno**
* Automatize os fluxos críticos no **Playwright (APIRequestContext)**
* Valide sempre:

  * Status Code
  * Mensagem da API
  * Estrutura do JSON

---

## 🚀 Próximos Exercícios Sugeridos

* Converter os casos para **BDD (Gherkin)**
* Criar **scripts automatizados em Playwright**
* Montar uma **matriz de rastreabilidade (Requisito x Teste)**
* Publicar no **GitHub como portfólio QA**

---

📌 Documento criado para fins de estudo e prática em Qualidade de Software.
