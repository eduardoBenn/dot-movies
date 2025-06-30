# dot-movies

Um projeto simples para busca de filmes, adição aos favoritos, adição ao carrinho de compras e possuindo a opção de 'compra'

### Importante

- O arquivo .env está disponível com a id de sessão apenas para fins didáticos

## Como rodar a aplicação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [npm](https://www.npmjs.com/) (já incluso no Node.js)

### Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/dot-movies.git
   cd dot-movies
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

### Rodando em modo desenvolvimento

```sh
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no seu navegador.

### Build para produção

```sh
npm run build
```

### Preview do build de produção

```sh
npm run preview
```

### Testes

- Testes unitários:
  ```sh
  npm run test:unit
  ```
- Testes end-to-end:
  ```sh
  npm run test:e2e
  ```

### Outras tarefas

- Lint e correção automática:
  ```sh
  npm run lint
  ```
- Formatação de código:
  ```sh
  npm run format
  ```

---

## Próximos passos

- [ ] Buscar filmes
- [ ] Cobertura 100% com testes unitários
- [ ] Cobertura dos requisitos com E2E
- [ ] Configuração .env file
- [ ] CI/CD com esteira para Github Actions
- [ ] Adição do Docker e hospedagem cloud

> Projeto feito com [Vue 3](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/), [PrimeVue](https://primevue.org/), [TailwindCSS](https://tailwindcss.com/) e [Vite](https://vitejs.dev/).
