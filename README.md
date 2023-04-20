# NodeTask
NodeTask é uma aplicação de lista de tarefas construída com Node.js e Express.js. Ele fornece endpoints HTTP RESTful para operações CRUD (criar, ler, atualizar e excluir) em tarefas, além de autenticação de usuário usando JWT (JSON Web Token).

## Documentação (em construção)
A documentação da API pode ser acessada em ``/api-docs``. Lá, você encontrará informações detalhadas sobre todas as rotas disponíveis, bem como exemplos de solicitações e respostas. Certifique-se de verificar a documentação antes de usar a API para garantir que você está fazendo solicitações corretas e recebendo as respostas esperadas.

## Autenticação
Para autenticar na API, o usuário deve enviar um token JWT válido no cabeçalho de autorização da solicitação com o formato de um token Bearer.

## Instalação e execução
Para executar a aplicação, siga os seguintes passos:

1. Clone o repositório do GitHub:

```bash
git clone https://github.com/vilelas/Node-Task.git
```

2. Instale as dependências do projeto:

```js
cd Node-Task
npm i
```

3. Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis de ambiente:

```js
MONGO_URL=mongodb://[username]:[password]@[host]:[port]/[database]
SECRET=sua_hash_aleatoria
```

4. Inicie o servidor:

```js
npm start
```

## Licença
Este projeto está licenciado sob a Licença MIT.
