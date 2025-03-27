# Desafio Teste Técnico Pleno – CRUD API REST de Pokémons com Integração à API POKEDEX

Este repositório contém a implementação de um desafio Full Stack, com separação entre **Backend** e **Frontend** (opcional).

## Tecnologias Utilizadas

- **Frontend:** React (Next.js)
- **Backend:** Node.js com NestJS
- **Banco de Dados:** SQLITE

## Estrutura do Repositório

```
/
|-- poke_fontend/  # Código do Frontend
|-- pode_backend/   # Código do Backend
|  
```

## Configuração e Execução do Projeto

### 1. Clonar o Repositório

```sh
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### 2. Instalar Dependências

Instale as dependências tanto no **Backend** quanto no **Frontend**:

```sh
cd pode_backend
npm install
```

```sh
cd ../poke_fontend
npm install
```

### 4. Executar o Backend

Acesse a pasta `pode_backend` e execute:

```sh
npm run start:dev
```

### 5. Executar o Frontend

Acesse a pasta `poke_fontend` e execute:

```sh
npm run dev
```

### 6. Acessar a Aplicação

- **Backend** roda em: `http://localhost:8080` (ou a porta configurada no .env projeto)
- **Frontend** roda em: `http://localhost:3000`


## Rotas da API

A seguir estão as rotas disponíveis no backend para gerenciar os Pokémons:

### Criar Pokémon
- **POST** `/pokemons`
- Cadastra um novo Pokémon.
- Durante o cadastro, busca informações da API POKEDEX para validar/enriquecer os dados (tipos, habilidades etc.).

### Listar Todos os Pokémons
- **GET** `/pokemons`
- Retorna todos os Pokémons cadastrados no banco.

### Buscar Pokémon por ID
- **GET** `/pokemons/:id`
- Retorna um Pokémon específico com base no ID.

### Atualizar Pokémon
- **PUT** ou **PATCH** `/pokemons/:id`
- Atualiza os dados de um Pokémon (com validações e possível atualização de dados vindos da POKEDEX).

### Deletar Pokémon
- **DELETE** `/pokemons/:id`
- Remove o Pokémon do banco de dados.

---

## Demonstração em GIF

Você pode conferir o funcionamento da aplicação neste vídeo:

![Demonstração da aplicação](./midia/demo.gif)


## Considerações Finais

- Se encontrar problemas ao rodar o projeto, verifique se todas as dependências foram instaladas corretamente.

---