# NodeTask
NodeTask é uma aplicação de lista de tarefas construída com Node.js e Express.js. Ele fornece endpoints HTTP RESTful para operações CRUD (criar, ler, atualizar e excluir) em tarefas, além de autenticação de usuário usando JWT (JSON Web Token).

## Endpoints
A seguir está a lista de todos os endpoints suportados pela API do NodeTask:

* ``GET /``: Retorna todas os usuários.
* ``GET /:status``: Retorna as tarefas com um status especificado.
* ``GET /buscar/:id``: Retorna um usuário com o ID especificado.
* ``GET /insights``: Retorna o total de tarefas criadas no sistema e o total de tarefas marcadas como concluída.
* ``POST /new``: Cria uma nova tarefa.
* ``POST /register``: Registra um novo usuário
* ``POST /login``: Realiza o login do usuário
* ``PUT /:id``: Atualiza uma tarefa ou um usuário existente com o ID especificado.
* ``PATCH /:id``: Atualiza parcialmente os dados de um usuário existente com o ID especificado.
* ``DELETE /:id``: Exclui um usuário ou uma tarefa com o ID especificado.
* ``HEAD /alltasks``: Retorna apenas os cabeçalhos de resposta HTTP para a lista de tarefas.
* ``OPTIONS /:id``: Retorna os métodos HTTP suportados para o endpoint.

## Autenticação
Para autenticar na API, o usuário deve enviar um token JWT válido no cabeçalho de autorização da solicitação com o formato Bearer `token`. O token pode ser obtido fazendo login no sistema.

## Instalação e execução
Para executar a aplicação, siga os seguintes passos:

1. Clone o repositório do GitHub:

```
git clone https://github.com/vilelas/Node-Task.git
```

2. Instale as dependências do projeto:

```
cd Node-Task
npm i
```

3. Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis de ambiente:

```
MONGO_URL=mongodb://[username]:[password]@[host]:[port]/[database]
SECRET=sua_hash_aleatoria
```

4. Inicie o servidor:

```
npm start
```

O servidor estará disponível em `http://localhost:5000`

## Licença
Este projeto está licenciado sob a Licença MIT.
